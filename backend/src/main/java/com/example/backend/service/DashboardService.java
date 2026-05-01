package com.example.backend.service;

import com.example.backend.entity.Category;
import com.example.backend.entity.User;
import com.example.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private BillService billService;
    
    @Autowired
    private CategoryRepository categoryRepository;

    public Map<String, Object> getDashboardSummary(User user) {
        Map<String, Object> summary = new HashMap<>();
        
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0);
        LocalDateTime now = LocalDateTime.now();
        
        Double totalBalance = transactionService.getCurrentBalance(user);
        Double monthlyExpenses = transactionService.getTotalExpenses(user, startOfMonth, now);
        Double totalDebt = billService.getTotalPendingBills(user);
        
        summary.put("totalBalance", totalBalance);
        summary.put("monthlyExpenses", monthlyExpenses);
        summary.put("totalDebt", totalDebt);
        summary.put("balanceStatus", totalBalance > 10000 ? "Safe Zone" : "Watch Spending");
        summary.put("expenseStatus", monthlyExpenses > 5000 ? "Overdue" : "Watch Spending");
        
        return summary;
    }

    public Map<String, Double> getSpendingIndicators(User user) {
        Map<String, Double> indicators = new HashMap<>();
        
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0);
        LocalDateTime now = LocalDateTime.now();
        
        // Get housing category
        Category housing = categoryRepository.findByName("Housing & Bills").orElse(null);
        if (housing != null) {
            Double housingExpense = transactionService.getTotalExpenses(user, startOfMonth, now);
            indicators.put("Housing & Bills", housingExpense != null ? (housingExpense / 3500) * 100 : 0);
        }
        
        // Food expenses (assuming budget of 1500 SAR)
        indicators.put("Food & Entertainment", 82.0); // Sample data
        indicators.put("Subscriptions & Luxuries", 95.0); // Sample data
        
        return indicators;
    }
}