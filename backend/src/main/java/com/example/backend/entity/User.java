package com.example.backend.entity;

import com.example.backend.enums.UserRole;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User extends BaseEntity {
    
    @Column(nullable = false)
    private String fullName;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(name = "monthly_net_income")
    private Double monthlyNetIncome;
    
    @Column(name = "work_hours_per_month")
    private Integer workHoursPerMonth;
    
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.USER;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Transaction> transactions = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Bill> bills = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SavingsGoal> savingsGoals = new ArrayList<>();
    
    // Constructors
    public User() {}
    
    public User(String fullName, String email, String password) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }
    
    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public Double getMonthlyNetIncome() { return monthlyNetIncome; }
    public void setMonthlyNetIncome(Double monthlyNetIncome) { this.monthlyNetIncome = monthlyNetIncome; }
    
    public Integer getWorkHoursPerMonth() { return workHoursPerMonth; }
    public void setWorkHoursPerMonth(Integer workHoursPerMonth) { this.workHoursPerMonth = workHoursPerMonth; }
    
    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }
    
    public List<Transaction> getTransactions() { return transactions; }
    public void setTransactions(List<Transaction> transactions) { this.transactions = transactions; }
    
    public List<Bill> getBills() { return bills; }
    public void setBills(List<Bill> bills) { this.bills = bills; }
    
    public List<SavingsGoal> getSavingsGoals() { return savingsGoals; }
    public void setSavingsGoals(List<SavingsGoal> savingsGoals) { this.savingsGoals = savingsGoals; }
}