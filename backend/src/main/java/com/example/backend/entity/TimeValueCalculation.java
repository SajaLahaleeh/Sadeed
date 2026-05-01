package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "time_value_calculations")
public class TimeValueCalculation extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "item_price")
    private Double itemPrice;
    
    @Column(name = "work_hours_needed")
    private Double workHoursNeeded;
    
    @Column(name = "work_days_needed")
    private Double workDaysNeeded;
    
    @Column(name = "impulse_index")
    private String impulseIndex;
    
    // Constructors
    public TimeValueCalculation() {}
    
    // Getters and Setters
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public Double getItemPrice() { return itemPrice; }
    public void setItemPrice(Double itemPrice) { this.itemPrice = itemPrice; }
    
    public Double getWorkHoursNeeded() { return workHoursNeeded; }
    public void setWorkHoursNeeded(Double workHoursNeeded) { this.workHoursNeeded = workHoursNeeded; }
    
    public Double getWorkDaysNeeded() { return workDaysNeeded; }
    public void setWorkDaysNeeded(Double workDaysNeeded) { this.workDaysNeeded = workDaysNeeded; }
    
    public String getImpulseIndex() { return impulseIndex; }
    public void setImpulseIndex(String impulseIndex) { this.impulseIndex = impulseIndex; }
}