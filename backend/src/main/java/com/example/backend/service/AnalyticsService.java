package com.example.backend.service;

import com.example.backend.entity.Transaction;
import com.example.backend.entity.User;
import com.example.backend.enums.TransactionType;
import com.example.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private TransactionService transactionService;
    
    @Autowired
    private TransactionRepository transactionRepository;

    public Map<String, Double> getSpendingDistribution(User user) {
        Map<String, Double> distribution = new HashMap<>();
        
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0);
        LocalDateTime now = LocalDateTime.now();
        
        List<Transaction> expenses = transactionRepository.findByUserAndTransactionDateBetween(user, startOfMonth, now)
            .stream()
            .filter(t -> t.getTransactionType() == TransactionType.EXPENSE)
            .collect(Collectors.toList());
        
        Double totalExpenses = expenses.stream().mapToDouble(Transaction::getAmount).sum();
        
        for (Transaction expense : expenses) {
            String categoryName = expense.getCategory() != null ? expense.getCategory().getName() : "Other";
            double percentage = (expense.getAmount() / totalExpenses) * 100;
            distribution.merge(categoryName, percentage, Double::sum);
        }
        
        return distribution;
    }

    public Map<String, Double> getSpendingTrend(User user) {
        Map<String, Double> trend = new LinkedHashMap<>();
        
        LocalDateTime now = LocalDateTime.now();
        
        // Get expenses for last 7 days
        for (int i = 6; i >= 0; i--) {
            LocalDateTime day = now.minusDays(i);
            LocalDateTime startOfDay = day.withHour(0).withMinute(0);
            LocalDateTime endOfDay = day.withHour(23).withMinute(59);
            
            Double dailyExpense = transactionService.getTotalExpenses(user, startOfDay, endOfDay);
            trend.put(day.getDayOfWeek().toString().substring(0, 3), dailyExpense);
        }
        
        return trend;
    }

    public String getSmartTip(User user) {
        List<String> tips = Arrays.asList(
            "You've spent 30% more in the 'Shopping' category this week compared to last month.",
            "You saved SAR 400 this month compared to last month in the 'Shopping' category. Keep up the good work!",
            "Consider reducing subscription services to save up to SAR 500 monthly.",
            "Your dining out expenses are high this month. Try cooking at home more often.",
            "Great job on your savings goal! You're 82% close to your Emergency Fund target."
        );
        
        Random random = new Random();
        return tips.get(random.nextInt(tips.size()));
    }
}