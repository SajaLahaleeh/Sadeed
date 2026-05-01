package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestParam Long userId) {
        var user = userService.findById(userId);
        
        if (user.isPresent()) {
            Map<String, Object> profile = new HashMap<>();
            profile.put("id", user.get().getId());
            profile.put("fullName", user.get().getFullName());
            profile.put("email", user.get().getEmail());
            profile.put("monthlyNetIncome", user.get().getMonthlyNetIncome());
            profile.put("workHoursPerMonth", user.get().getWorkHoursPerMonth());
            return ResponseEntity.ok(profile);
        }
        
        return ResponseEntity.notFound().build();
    }
}