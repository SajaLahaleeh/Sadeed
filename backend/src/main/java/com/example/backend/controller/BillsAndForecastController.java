package com.example.backend.controller;

import com.example.backend.entity.Bill;
import com.example.backend.entity.User;
import com.example.backend.service.BillService;
import com.example.backend.service.ForecastService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class BillsAndForecastController {

    @Autowired
    private BillService billService;
    
    @Autowired
    private ForecastService forecastService;
    
    @Autowired
    private UserService userService;

    @GetMapping("/forecasts/summary")
    public ResponseEntity<?> getForecastSummary(@RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Map<String, Object> summary = forecastService.getForecastSummary(user.get());
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/forecasts/calendar")
    public ResponseEntity<?> getForecastCalendar(@RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Map<String, Object> calendar = forecastService.getCalendarBills(user.get());
        return ResponseEntity.ok(calendar);
    }

    @GetMapping("/bills")
    public ResponseEntity<?> getBills(@RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        List<Bill> bills = billService.getUserBills(user.get());
        return ResponseEntity.ok(bills);
    }

    @PatchMapping("/bills/{id}/status")
    public ResponseEntity<?> markBillAsPaid(@PathVariable Long id, @RequestParam Long userId) {
        var user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        try {
            Bill bill = billService.markBillAsPaid(id, user.get());
            Map<String, String> response = new HashMap<>();
            response.put("message", "Bill marked as paid successfully");
            response.put("status", bill.getStatus().toString());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}