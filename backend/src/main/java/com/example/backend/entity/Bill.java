package com.example.backend.entity;

import com.example.backend.enums.*;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bills")
public class Bill extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private String name;
    
    private String description;
    
    @Column(nullable = false)
    private Double amount;
    
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "bill_type")
    private BillType billType;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "bill_status")
    private BillStatus status = BillStatus.PENDING;
    
    @Column(name = "is_predicted")
    private Boolean isPredicted = false;
    
    @Column(name = "prediction_confidence")
    private Double predictionConfidence;
    
    // Constructors
    public Bill() {}
    
    // Getters and Setters
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    
    public BillType getBillType() { return billType; }
    public void setBillType(BillType billType) { this.billType = billType; }
    
    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }
    
    public BillStatus getStatus() { return status; }
    public void setStatus(BillStatus status) { this.status = status; }
    
    public Boolean getIsPredicted() { return isPredicted; }
    public void setIsPredicted(Boolean isPredicted) { this.isPredicted = isPredicted; }
    
    public Double getPredictionConfidence() { return predictionConfidence; }
    public void setPredictionConfidence(Double predictionConfidence) { this.predictionConfidence = predictionConfidence; }
}