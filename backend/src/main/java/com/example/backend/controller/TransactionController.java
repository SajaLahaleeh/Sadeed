package com.example.backend.controller;

import com.example.backend.dto.request.TransactionRequest;
import com.example.backend.dto.response.TransactionResponse;
import com.example.backend.entity.Transaction;
import com.example.backend.entity.User;
import com.example.backend.service.TransactionService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    
    @Autowired
    private UserService userService;

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
}