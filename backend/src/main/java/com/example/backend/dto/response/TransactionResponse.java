package com.example.backend.dto.response;

import com.example.backend.enums.PaymentMethod;
import com.example.backend.enums.TransactionType;
import java.time.LocalDateTime;

public class TransactionResponse {
    private Long id;
    private Double amount;
    private String description;
    private LocalDateTime transactionDate;
    private PaymentMethod paymentMethod;
    private TransactionType transactionType;
    private String categoryName;
    private String categoryIcon;
    
    public TransactionResponse() {}
    
    public TransactionResponse(Long id, Double amount, String description, 
                               LocalDateTime transactionDate, PaymentMethod paymentMethod,
                               TransactionType transactionType, String categoryName, 
                               String categoryIcon) {
        this.id = id;
        this.amount = amount;
        this.description = description;
        this.transactionDate = transactionDate;
        this.paymentMethod = paymentMethod;
        this.transactionType = transactionType;
        this.categoryName = categoryName;
        this.categoryIcon = categoryIcon;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public LocalDateTime getTransactionDate() { return transactionDate; }
    public void setTransactionDate(LocalDateTime transactionDate) { this.transactionDate = transactionDate; }
    
    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }
    
    public TransactionType getTransactionType() { return transactionType; }
    public void setTransactionType(TransactionType transactionType) { this.transactionType = transactionType; }
    
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    
    public String getCategoryIcon() { return categoryIcon; }
    public void setCategoryIcon(String categoryIcon) { this.categoryIcon = categoryIcon; }
}