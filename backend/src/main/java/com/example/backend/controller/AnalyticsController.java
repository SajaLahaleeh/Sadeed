package com.example.backend.controller;

import com.example.backend.entity.SavingsGoal;
import com.example.backend.entity.User;
import com.example.backend.repository.SavingsGoalRepository;
import com.example.backend.service.AnalyticsService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private SavingsGoalRepository savingsGoalRepository;

    @GetMapping("/spending-distribution")
    public ResponseEntity<?> getSpendingDistribution(@RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Map<String, Double> distribution = analyticsService.getSpendingDistribution(user.get());
        return ResponseEntity.ok(distribution);
    }

    @GetMapping("/spending-trend")
    public ResponseEntity<?> getSpendingTrend(@RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Map<String, Double> trend = analyticsService.getSpendingTrend(user.get());
        return ResponseEntity.ok(trend);
    }

    @GetMapping("/savings-goals")
    public ResponseEntity<?> getSavingsGoals(@RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        List<SavingsGoal> goals = savingsGoalRepository.findByUser(user.get());
        
        Map<String, Object> response = new HashMap<>();
        for (SavingsGoal goal : goals) {
            Map<String, Object> goalData = new HashMap<>();
            goalData.put("targetAmount", goal.getTargetAmount());
            goalData.put("currentAmount", goal.getCurrentAmount());
            goalData.put("progress", goal.getProgressPercentage());
            goalData.put("status", goal.getStatus().toString());
            response.put(goal.getName(), goalData);
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/insights")
    public ResponseEntity<?> getInsights(@RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        String tip = analyticsService.getSmartTip(user.get());
        Map<String, String> response = new HashMap<>();
        response.put("tip", tip);
        return ResponseEntity.ok(response);
    }
}