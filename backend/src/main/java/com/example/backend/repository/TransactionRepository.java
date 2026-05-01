package com.example.backend.repository;

import com.example.backend.entity.Transaction;
import com.example.backend.entity.User;
import com.example.backend.enums.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    // Get all transactions for a user, ordered by date (newest first)
    List<Transaction> findByUserOrderByTransactionDateDesc(User user);
    
    // Get transactions between dates
    List<Transaction> findByUserAndTransactionDateBetween(User user, LocalDateTime start, LocalDateTime end);
    
    // Get transactions by type
    List<Transaction> findByUserAndTransactionType(User user, TransactionType type);
    
    // Sum expenses by user and date range (EXPENSE type)
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user = :user AND t.transactionType = 'EXPENSE' AND t.transactionDate BETWEEN :start AND :end")
    Double sumExpensesByUserAndDateRange(@Param("user") User user, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    
    // Sum income by user and date range (INCOME type)
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user = :user AND t.transactionType = 'INCOME' AND t.transactionDate BETWEEN :start AND :end")
    Double sumIncomeByUserAndDateRange(@Param("user") User user, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    
    // Get top 5 recent transactions
    List<Transaction> findTop5ByUserOrderByTransactionDateDesc(User user);
    
    // Get transactions by category
    List<Transaction> findByUserAndCategoryId(User user, Long categoryId);
    
    // Count transactions by user
    long countByUser(User user);
}