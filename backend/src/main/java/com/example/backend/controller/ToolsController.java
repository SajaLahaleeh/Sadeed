package com.example.backend.controller;

import com.example.backend.entity.TimeValueCalculation;
import com.example.backend.entity.User;
import com.example.backend.repository.TimeValueCalculationRepository;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.entity.AwarenessTip;
import com.example.backend.repository.AwarenessTipRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/tools")
public class ToolsController {

    @Autowired
    private AwarenessTipRepository awarenessTipRepository;

    @Autowired
    private UserService userService;
    
    @Autowired
    private TimeValueCalculationRepository timeValueRepository;

    @PostMapping("/time-value")
    public ResponseEntity<?> calculateTimeValue(@RequestParam Long userId,
                                                 @RequestBody Map<String, Object> request) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        // Get values from request or from user profile
        Double monthlyIncome;
        Integer workHoursPerMonth;
        Double itemPrice;
        
        if (request.containsKey("monthlyNetIncome")) {
            monthlyIncome = ((Number) request.get("monthlyNetIncome")).doubleValue();
        } else {
            monthlyIncome = user.get().getMonthlyNetIncome();
        }
        
        if (request.containsKey("workHoursPerMonth")) {
            workHoursPerMonth = (Integer) request.get("workHoursPerMonth");
        } else {
            workHoursPerMonth = user.get().getWorkHoursPerMonth();
        }
        
        itemPrice = ((Number) request.get("itemPrice")).doubleValue();
        
        // Calculate hourly rate
        double hourlyRate = monthlyIncome / workHoursPerMonth;
        
        // Calculate work hours needed
        double workHoursNeeded = itemPrice / hourlyRate;
        double workDaysNeeded = workHoursNeeded / 8; // Assuming 8-hour work day
        
        // Determine Impulse Index
        String impulseIndex;
        if (workHoursNeeded <= 2) {
            impulseIndex = "Low Risk - Easy purchase";
        } else if (workHoursNeeded <= 8) {
            impulseIndex = "Moderate Risk - Think twice";
        } else if (workHoursNeeded <= 40) {
            impulseIndex = "High Risk - Consider carefully";
        } else {
            impulseIndex = "Critical - This costs a week or more of your life!";
        }
        
        // Save calculation history
        TimeValueCalculation calculation = new TimeValueCalculation();
        calculation.setUser(user.get());
        calculation.setItemPrice(itemPrice);
        calculation.setWorkHoursNeeded(workHoursNeeded);
        calculation.setWorkDaysNeeded(workDaysNeeded);
        calculation.setImpulseIndex(impulseIndex);
        timeValueRepository.save(calculation);
        
        // Prepare response
        Map<String, Object> response = new HashMap<>();
        response.put("itemPrice", itemPrice);
        response.put("hourlyRate", Math.round(hourlyRate * 100.0) / 100.0);
        response.put("workHoursNeeded", Math.round(workHoursNeeded * 10.0) / 10.0);
        response.put("workDaysNeeded", Math.round(workDaysNeeded * 10.0) / 10.0);
        response.put("impulseIndex", impulseIndex);
        response.put("message", "This item costs you " + Math.round(workHoursNeeded) + " hours of your life!");
        
        // 24-Hour Rule Suggestion
        if (workHoursNeeded > 5) {
            response.put("suggestion", "Apply the 24-Hour Rule: Wait a day before buying this!");
        } else {
            response.put("suggestion", "This seems reasonable. Still, track your expenses!");
        }
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/time-value/history")
    public ResponseEntity<?> getCalculationHistory(@RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        var history = timeValueRepository.findByUserOrderByCreatedAtDesc(user.get());
        return ResponseEntity.ok(history);
    }


    @GetMapping("/awareness-tips")
    public ResponseEntity<?> getAllAwarenessTips() {
        List<AwarenessTip> tips = awarenessTipRepository.findByIsActiveTrue();
        
        List<Map<String, Object>> response = tips.stream().map(tip -> {
            Map<String, Object> t = new HashMap<>();
            t.put("id", tip.getId());
            t.put("title", tip.getTitle());
            t.put("content", tip.getContent());
            t.put("category", tip.getCategory());
            return t;
        }).collect(Collectors.toList());
    
        return ResponseEntity.ok(response);
    }


    @GetMapping("/awareness-tips/random")
    public ResponseEntity<?> getRandomTip() {
        AwarenessTip tip = awarenessTipRepository.findRandomActiveTip();
        
        if (tip == null) {
            Map<String, String> defaultTip = new HashMap<>();
            defaultTip.put("title", "The 24-Hour Rule");
            defaultTip.put("content", "Wait 24 hours before completing any non-essential purchase that costs more than 5 work hours.");
            return ResponseEntity.ok(defaultTip);
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", tip.getId());
        response.put("title", tip.getTitle());
        response.put("content", tip.getContent());
        response.put("category", tip.getCategory());
        
        return ResponseEntity.ok(response);
    }


    @GetMapping("/awareness-tips/category/{category}")
    public ResponseEntity<?> getTipsByCategory(@PathVariable String category) {
        List<AwarenessTip> tips = awarenessTipRepository.findByIsActiveTrue()
            .stream()
            .filter(tip -> tip.getCategory().equalsIgnoreCase(category))
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(tips);
    }

    

}