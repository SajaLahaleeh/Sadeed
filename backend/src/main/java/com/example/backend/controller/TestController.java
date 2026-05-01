package com.example.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class TestController {
    
    @GetMapping("/")
    public String home() {
        return "🚀 Sadeed Finance API is running!";
    }
    
    @GetMapping("/health")
    public String health() {
        return "✅ Application is healthy!";
    }
    
    @GetMapping("/api/info")
    public Map<String, Object> getInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("app_name", "Sadeed Finance");
        info.put("version", "1.0.0");
        info.put("status", "running");
        info.put("hackathon_mode", "✅ Ready to go!");
        return info;
    }
}