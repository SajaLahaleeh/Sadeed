package com.example.backend.dto.response;

public class DashboardSummaryResponse {
    private Double totalBalance;
    private Double monthlyExpenses;
    private Double totalDebt;
    private String balanceStatus;
    private String expenseStatus;
    
    // Constructors
    public DashboardSummaryResponse() {}
    
    public DashboardSummaryResponse(Double totalBalance, Double monthlyExpenses, Double totalDebt) {
        this.totalBalance = totalBalance;
        this.monthlyExpenses = monthlyExpenses;
        this.totalDebt = totalDebt;
    }
    
    // Getters and Setters
    public Double getTotalBalance() { return totalBalance; }
    public void setTotalBalance(Double totalBalance) { this.totalBalance = totalBalance; }
    
    public Double getMonthlyExpenses() { return monthlyExpenses; }
    public void setMonthlyExpenses(Double monthlyExpenses) { this.monthlyExpenses = monthlyExpenses; }
    
    public Double getTotalDebt() { return totalDebt; }
    public void setTotalDebt(Double totalDebt) { this.totalDebt = totalDebt; }
    
    public String getBalanceStatus() { return balanceStatus; }
    public void setBalanceStatus(String balanceStatus) { this.balanceStatus = balanceStatus; }
    
    public String getExpenseStatus() { return expenseStatus; }
    public void setExpenseStatus(String expenseStatus) { this.expenseStatus = expenseStatus; }
}