package com.example.backend.controller;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.request.RegisterRequest;
import com.example.backend.dto.response.AuthResponse;
import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = userService.registerUser(
                request.getFullName(),
                request.getEmail(),
                request.getPassword()
            );
            
            AuthResponse response = new AuthResponse(
                "temp_token_" + user.getId(),
                user.getEmail(),
                user.getFullName(),
                "Registration successful!"
            );
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

@PostMapping("/login")
public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
    var user = userService.findByEmail(request.getEmail());
    
    if (user.isPresent() && userService.verifyPassword(request.getPassword(), user.get().getPassword())) {
        AuthResponse response = new AuthResponse(
            "temp_token_" + user.get().getId(),
            user.get().getEmail(),
            user.get().getFullName(),
            "Login successful!"
        );
        return ResponseEntity.ok(response);
    }
    
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body("Invalid email or password");
}

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        var user = userService.findByEmail(email);
        if (user.isPresent()) {
            // In hackathon, just return success message
            return ResponseEntity.ok("Password reset link sent to " + email);
        }
        return ResponseEntity.badRequest().body("Email not found");
    }

    @PostMapping("/test-create")
public ResponseEntity<?> createTestUser() {
    try {
        User user = userService.registerUser(
            "Test User",
            "test@example.com",
            "test123"
        );
        return ResponseEntity.ok(user);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
}