package com.example.backend.entity;

import com.example.backend.enums.GoalStatus;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "savings_goals")
public class SavingsGoal extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private Double targetAmount;
    
    @Column(nullable = false)
    private Double currentAmount = 0.0;
    
    @Column(name = "target_date")
    private LocalDate targetDate;
    
    @Column(name = "progress_percentage")
    private Double progressPercentage = 0.0;
    
    @Enumerated(EnumType.STRING)
    private GoalStatus status = GoalStatus.IN_PROGRESS;
    
    // Constructors
    public SavingsGoal() {}
    
    // Getters and Setters
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public Double getTargetAmount() { return targetAmount; }
    public void setTargetAmount(Double targetAmount) { this.targetAmount = targetAmount; }
    
    public Double getCurrentAmount() { return currentAmount; }
    public void setCurrentAmount(Double currentAmount) { 
        this.currentAmount = currentAmount;
        calculateProgress();
    }
    
    public LocalDate getTargetDate() { return targetDate; }
    public void setTargetDate(LocalDate targetDate) { this.targetDate = targetDate; }
    
    public Double getProgressPercentage() { return progressPercentage; }
    
    public GoalStatus getStatus() { return status; }
    public void setStatus(GoalStatus status) { this.status = status; }
    
    private void calculateProgress() {
        if (targetAmount != null && targetAmount > 0) {
            this.progressPercentage = (currentAmount / targetAmount) * 100;
            if (this.progressPercentage >= 100) {
                this.status = GoalStatus.COMPLETED;
            }
        }
    }
}