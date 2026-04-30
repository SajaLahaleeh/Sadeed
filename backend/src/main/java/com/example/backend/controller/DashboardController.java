package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.service.DashboardService;
import com.example.backend.service.TransactionService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;
    
    @Autowired
    private TransactionService transactionService;
    
    @Autowired
    private UserService userService;

    @GetMapping("/summary")
    public ResponseEntity<?> getSummary(@RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Map<String, Object> summary = dashboardService.getDashboardSummary(user.get());
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/indicators")
    public ResponseEntity<?> getIndicators(@RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Map<String, Double> indicators = dashboardService.getSpendingIndicators(user.get());
        return ResponseEntity.ok(indicators);
    }
}