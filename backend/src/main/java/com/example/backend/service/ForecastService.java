package com.example.backend.service;

import com.example.backend.entity.Forecast;
import com.example.backend.entity.User;
import com.example.backend.repository.ForecastRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ForecastService {

    @Autowired
    private ForecastRepository forecastRepository;
    
    @Autowired
    private BillService billService;

    public Map<String, Object> getForecastSummary(User user) {
        Map<String, Object> summary = new HashMap<>();
        
        YearMonth currentMonth = YearMonth.now();
        Forecast forecast = forecastRepository.findByUserAndForecastMonth(user, currentMonth)
            .orElse(null);
        
        if (forecast != null) {
            summary.put("totalPredicted", forecast.getTotalPredicted());
            summary.put("totalPaid", forecast.getTotalPaid());
            summary.put("totalRemaining", forecast.getTotalRemaining());
            summary.put("notes", forecast.getNotes());
        } else {
            Double totalBills = billService.getTotalPendingBills(user);
            summary.put("totalPredicted", totalBills);
            summary.put("totalPaid", 0.0);
            summary.put("totalRemaining", totalBills);
            summary.put("notes", "Based on your upcoming bills");
        }
        
        return summary;
    }

    public Map<String, Object> getCalendarBills(User user) {
        Map<String, Object> calendar = new HashMap<>();
        
        // Get bills grouped by due date
        var bills = billService.getUpcomingBills(user);
        Map<Integer, List<Map<String, Object>>> billsByDay = new HashMap<>();
        
        for (var bill : bills) {
            int day = bill.getDueDate().getDayOfMonth();
            Map<String, Object> billInfo = new HashMap<>();
            billInfo.put("name", bill.getName());
            billInfo.put("amount", bill.getAmount());
            billInfo.put("status", bill.getStatus().toString());
            
            billsByDay.computeIfAbsent(day, k -> new java.util.ArrayList<>()).add(billInfo);
        }
        
        calendar.put("billsByDay", billsByDay);
        calendar.put("currentMonth", YearMonth.now().toString());
        
        return calendar;
    }
}