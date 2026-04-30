package com.example.backend.entity;

import jakarta.persistence.*;
import java.time.YearMonth;

@Entity
@Table(name = "forecasts")
public class Forecast extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "forecast_month", nullable = false)
    private YearMonth forecastMonth;
    
    @Column(name = "total_predicted")
    private Double totalPredicted;
    
    @Column(name = "total_paid")
    private Double totalPaid = 0.0;
    
    @Column(name = "total_remaining")
    private Double totalRemaining;
    
    @Column(length = 500)
    private String notes;
    
    // Constructors
    public Forecast() {}
    
    // Getters and Setters
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public YearMonth getForecastMonth() { return forecastMonth; }
    public void setForecastMonth(YearMonth forecastMonth) { this.forecastMonth = forecastMonth; }
    
    public Double getTotalPredicted() { return totalPredicted; }
    public void setTotalPredicted(Double totalPredicted) { this.totalPredicted = totalPredicted; }
    
    public Double getTotalPaid() { return totalPaid; }
    public void setTotalPaid(Double totalPaid) { this.totalPaid = totalPaid; }
    
    public Double getTotalRemaining() { return totalRemaining; }
    public void setTotalRemaining(Double totalRemaining) { this.totalRemaining = totalRemaining; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}