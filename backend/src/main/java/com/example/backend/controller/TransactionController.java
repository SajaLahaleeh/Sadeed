package com.example.backend.controller;

import com.example.backend.dto.request.TransactionRequest;
import com.example.backend.dto.response.TransactionResponse;
import com.example.backend.entity.Category;
import com.example.backend.entity.Transaction;
import com.example.backend.enums.PaymentMethod;
import com.example.backend.enums.TransactionType;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.TransactionRepository;
import com.example.backend.service.TransactionService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private CategoryRepository categoryRepository;  // ADD THIS LINE
    
    @Autowired
    private TransactionRepository transactionRepository;  // ADD THIS LINE

    @PostMapping
    public ResponseEntity<?> createTransaction(@RequestParam Long userId,
                                                @Valid @RequestBody TransactionRequest request) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Transaction transaction = transactionService.createTransaction(
            user.get(),
            request.getAmount(),
            request.getDescription(),
            request.getTransactionDate(),
            request.getPaymentMethod(),
            request.getTransactionType(),
            request.getCategoryId()
        );
        
        return ResponseEntity.ok(transaction);
    }

    @GetMapping
    public ResponseEntity<?> getUserTransactions(@RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        List<Transaction> transactions = transactionService.getUserTransactions(user.get());
        
        List<TransactionResponse> response = transactions.stream()
            .map(t -> new TransactionResponse(
                t.getId(),
                t.getAmount(),
                t.getDescription(),
                t.getTransactionDate(),
                t.getPaymentMethod(),
                t.getTransactionType(),
                t.getCategory() != null ? t.getCategory().getName() : "Other",
                t.getCategory() != null ? t.getCategory().getIcon() : "📌"
            ))
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/recent")
    public ResponseEntity<?> getRecentTransactions(@RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        List<Transaction> transactions = transactionService.getRecentTransactions(user.get(), 5);
        return ResponseEntity.ok(transactions);
    }

    // VOICE TRANSACTION ENDPOINT
    @PostMapping("/voice")
    public ResponseEntity<?> createVoiceTransaction(@RequestParam Long userId,
                                                     @RequestBody Map<String, String> voiceRequest) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        String voiceText = voiceRequest.get("text");
        if (voiceText == null || voiceText.isEmpty()) {
            return ResponseEntity.badRequest().body("No voice text provided");
        }
        
        // Parse voice text to extract amount and description
        Map<String, Object> parsedData = parseVoiceInput(voiceText);
        
        if (parsedData == null) {
            return ResponseEntity.badRequest().body("Could not parse voice input. Try: 'I bought coffee for 25 SAR'");
        }
        
        // Get category based on keywords
        Long categoryId = detectCategoryFromText(voiceText);
        
        // Create transaction
        Transaction transaction = transactionService.createTransaction(
            user.get(),
            (Double) parsedData.get("amount"),
            (String) parsedData.get("description"),
            LocalDateTime.now(),
            PaymentMethod.BANK_CARD,
            TransactionType.EXPENSE,
            categoryId
        );
        
        transaction.setIsVoiceTranscription(true);
        transactionRepository.save(transaction);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Voice transaction created successfully!");
        response.put("transaction", transaction);
        response.put("parsed_text", voiceText);
        
        return ResponseEntity.ok(response);
    }

    // Helper method to parse voice input
    private Map<String, Object> parseVoiceInput(String text) {
        Map<String, Object> result = new HashMap<>();
        
        // Pattern to find amount: numbers followed by SAR or riyal
        Pattern amountPattern = Pattern.compile("(\\d+(?:\\.\\d+)?)\\s*(?:SAR|riyal|riyals|sr)", Pattern.CASE_INSENSITIVE);
        Matcher amountMatcher = amountPattern.matcher(text);
        
        if (amountMatcher.find()) {
            double amount = Double.parseDouble(amountMatcher.group(1));
            result.put("amount", amount);
        } else {
            return null;
        }
        
        // Extract description (remove the amount part)
        String description = text.replaceAll("\\d+(?:\\.\\d+)?\\s*(?:SAR|riyal|riyals|sr)", "").trim();
        description = description.replaceAll("(i bought|i spent|paid for|purchased|for)", "").trim();
        description = description.substring(0, Math.min(description.length(), 100));
        
        if (description.isEmpty()) {
            description = "Voice transaction";
        }
        
        result.put("description", description);
        return result;
    }

    // Helper method to detect category from text
    private Long detectCategoryFromText(String text) {
        String lowerText = text.toLowerCase();
        
        // Food related keywords
        if (lowerText.contains("coffee") || lowerText.contains("restaurant") || 
            lowerText.contains("food") || lowerText.contains("lunch") || 
            lowerText.contains("dinner") || lowerText.contains("starbucks") ||
            lowerText.contains("cafe") || lowerText.contains("meal")) {
            return categoryRepository.findByName("Food & Entertainment")
                .map(Category::getId).orElse(null);
        }
        
        // Transport related keywords
        if (lowerText.contains("uber") || lowerText.contains("taxi") || 
            lowerText.contains("fuel") || lowerText.contains("gas") || 
            lowerText.contains("petrol") || lowerText.contains("car")) {
            return categoryRepository.findByName("Transport")
                .map(Category::getId).orElse(null);
        }
        
        // Shopping related keywords
        if (lowerText.contains("amazon") || lowerText.contains("buy") || 
            lowerText.contains("purchase") || lowerText.contains("mall") ||
            lowerText.contains("shop") || lowerText.contains("store")) {
            return categoryRepository.findByName("Shopping")
                .map(Category::getId).orElse(null);
        }
        
        // Subscriptions
        if (lowerText.contains("netflix") || lowerText.contains("spotify") || 
            lowerText.contains("subscription")) {
            return categoryRepository.findByName("Subscriptions & Luxuries")
                .map(Category::getId).orElse(null);
        }
        
        // Default to Others
        return categoryRepository.findByName("Others")
            .map(Category::getId).orElse(null);
    }
}