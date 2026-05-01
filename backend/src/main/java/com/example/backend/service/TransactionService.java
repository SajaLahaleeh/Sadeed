package com.example.backend.service;

import com.example.backend.entity.Category;
import com.example.backend.entity.Transaction;
import com.example.backend.entity.User;
import com.example.backend.enums.PaymentMethod;
import com.example.backend.enums.TransactionType;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Transaction createTransaction(User user, Double amount, String description, 
                                         LocalDateTime transactionDate, PaymentMethod paymentMethod,
                                         TransactionType transactionType, Long categoryId) {
        
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setAmount(amount);
        transaction.setDescription(description);
        transaction.setTransactionDate(transactionDate);
        transaction.setPaymentMethod(paymentMethod);
        transaction.setTransactionType(transactionType);
        
        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));
            transaction.setCategory(category);
        }
        
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getUserTransactions(User user) {
        return transactionRepository.findByUserOrderByTransactionDateDesc(user);
    }

    public List<Transaction> getRecentTransactions(User user, int limit) {
        return transactionRepository.findTop5ByUserOrderByTransactionDateDesc(user);
    }

    public Double getTotalExpenses(User user, LocalDateTime start, LocalDateTime end) {
        Double total = transactionRepository.sumExpensesByUserAndDateRange(user, start, end);
        return total != null ? total : 0.0;
    }

    public Double getTotalIncome(User user, LocalDateTime start, LocalDateTime end) {
        Double total = transactionRepository.sumIncomeByUserAndDateRange(user, start, end);
        return total != null ? total : 0.0;
    }

    public Double getCurrentBalance(User user) {
        LocalDateTime oneYearAgo = LocalDateTime.now().minusYears(1);
        LocalDateTime now = LocalDateTime.now();
        
        Double totalIncome = transactionRepository.sumIncomeByUserAndDateRange(user, oneYearAgo, now);
        Double totalExpenses = transactionRepository.sumExpensesByUserAndDateRange(user, oneYearAgo, now);
        
        totalIncome = totalIncome != null ? totalIncome : 0.0;
        totalExpenses = totalExpenses != null ? totalExpenses : 0.0;
        
        return totalIncome - totalExpenses;
    }
    
    // Get monthly expenses
    public Double getMonthlyExpenses(User user) {
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0);
        LocalDateTime now = LocalDateTime.now();
        return getTotalExpenses(user, startOfMonth, now);
    }
    
    // Get monthly income
    public Double getMonthlyIncome(User user) {
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0);
        LocalDateTime now = LocalDateTime.now();
        return getTotalIncome(user, startOfMonth, now);
    }
}