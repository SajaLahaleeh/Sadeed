package com.example.backend.config;

import com.example.backend.entity.*;
import com.example.backend.enums.*;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private AwarenessTipRepository awarenessTipRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private BillRepository billRepository;
    
    @Autowired
    private SavingsGoalRepository savingsGoalRepository;
    
    @Autowired
    private ForecastRepository forecastRepository;
    
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🚀 DataLoader is running...");
        
        if (categoryRepository.count() == 0) {
            System.out.println("📝 Loading default categories...");
            loadDefaultCategories();
        }
        
        if (awarenessTipRepository.count() == 0) {
            System.out.println("💡 Loading awareness tips...");
            loadAwarenessTips();
        }
        
        if (userRepository.count() == 0) {
            System.out.println("👤 Creating demo user...");
            createDemoUser();
        }
        
        System.out.println("✅ Database initialization complete!");
    }
    
    // ADD THIS METHOD - Called when new user registers
    public void initializeUserData(User user) {
        System.out.println("📝 Creating sample data for new user: " + user.getEmail());
        createSampleTransactions(user);
        createSampleBills(user);
        createSampleSavingsGoals(user);
        createSampleForecast(user);
    }
    
    private void loadDefaultCategories() {
        // Expense Categories
        Category[] expenseCategories = {
            new Category("Housing & Bills", CategoryType.EXPENSE),
            new Category("Food & Entertainment", CategoryType.EXPENSE),
            new Category("Subscriptions & Luxuries", CategoryType.EXPENSE),
            new Category("Transport", CategoryType.EXPENSE),
            new Category("Shopping", CategoryType.EXPENSE),
            new Category("Health", CategoryType.EXPENSE),
            new Category("Education", CategoryType.EXPENSE),
            new Category("Others", CategoryType.EXPENSE)
        };
        
        for (Category category : expenseCategories) {
            category.setIcon(getIconForCategory(category.getName()));
            category.setColor(getColorForCategory(category.getName()));
            categoryRepository.save(category);
        }
        
        // Income Categories
        Category[] incomeCategories = {
            new Category("Salary", CategoryType.INCOME),
            new Category("Freelance", CategoryType.INCOME),
            new Category("Investment", CategoryType.INCOME),
            new Category("Gift", CategoryType.INCOME),
            new Category("Refund", CategoryType.INCOME)
        };
        
        for (Category category : incomeCategories) {
            category.setIcon(getIconForCategory(category.getName()));
            category.setColor(getColorForCategory(category.getName()));
            categoryRepository.save(category);
        }
        System.out.println("✅ Loaded " + categoryRepository.count() + " categories");
    }
    
    private String getIconForCategory(String name) {
        switch(name) {
            case "Housing & Bills": return "🏠";
            case "Food & Entertainment": return "🍔";
            case "Subscriptions & Luxuries": return "📺";
            case "Transport": return "🚗";
            case "Shopping": return "🛍️";
            case "Health": return "💊";
            case "Salary": return "💰";
            default: return "📌";
        }
    }
    
    private String getColorForCategory(String name) {
        switch(name) {
            case "Housing & Bills": return "#FF6B6B";
            case "Food & Entertainment": return "#4ECDC4";
            case "Subscriptions & Luxuries": return "#FFE66D";
            case "Transport": return "#95E77E";
            case "Shopping": return "#FF8C42";
            case "Salary": return "#4CAF50";
            default: return "#9B59B6";
        }
    }
    
    private void loadAwarenessTips() {
        AwarenessTip[] tips = {
            createTip("The 24-Hour Rule", "Wait 24 hours before completing any non-essential purchase that costs more than 5 work hours. Often the impulse fades.", "Mindful Spending"),
            createTip("Track Small Expenses", "Small daily expenses like coffee can add up to significant amounts over time. Track them for a month.", "Budgeting"),
            createTip("Emergency Fund First", "Build an emergency fund covering 3-6 months of expenses before investing.", "Savings"),
            createTip("50/30/20 Rule", "50% needs, 30% wants, 20% savings. A simple budgeting framework.", "Budgeting"),
            createTip("Review Subscriptions", "Regularly review your subscriptions. Cancel those you rarely use.", "Savings"),
            createTip("Pay Yourself First", "When you receive income, immediately transfer a portion to savings.", "Savings"),
            createTip("Compare Before Buying", "For purchases over 200 SAR, compare prices across at least 3 stores.", "Smart Shopping"),
            createTip("Cost in Work Hours", "Calculate how many hours you need to work to afford an item. Makes spending more logical.", "Time Value")
        };
        
        for (AwarenessTip tip : tips) {
            awarenessTipRepository.save(tip);
        }
        System.out.println("✅ Loaded " + awarenessTipRepository.count() + " awareness tips");
    }
    
    private AwarenessTip createTip(String title, String content, String category) {
        AwarenessTip tip = new AwarenessTip();
        tip.setTitle(title);
        tip.setContent(content);
        tip.setCategory(category);
        tip.setIsActive(true);
        return tip;
    }
    
    private void createDemoUser() {
        User demoUser = new User();
        demoUser.setFullName("Sadeed Ahmed");
        demoUser.setEmail("sadeed@example.com");
        demoUser.setPassword(passwordEncoder.encode("password123"));
        demoUser.setMonthlyNetIncome(18000.00);
        demoUser.setWorkHoursPerMonth(160);
        demoUser.setRole(UserRole.USER);
        demoUser.setCreatedAt(LocalDateTime.now());
        demoUser.setUpdatedAt(LocalDateTime.now());
        userRepository.save(demoUser);
        
        createSampleTransactions(demoUser);
        createSampleBills(demoUser);
        createSampleSavingsGoals(demoUser);
        createSampleForecast(demoUser);
        System.out.println("✅ Demo user created: sadeed@example.com");
    }
    
    private void createSampleTransactions(User user) {
        Category salary = categoryRepository.findByName("Salary").orElse(null);
        Category housing = categoryRepository.findByName("Housing & Bills").orElse(null);
        Category food = categoryRepository.findByName("Food & Entertainment").orElse(null);
        Category shopping = categoryRepository.findByName("Shopping").orElse(null);
        
        // Income
        if (salary != null) {
            Transaction t = new Transaction();
            t.setUser(user);
            t.setCategory(salary);
            t.setAmount(18000.00);
            t.setDescription("Monthly Salary");
            t.setTransactionDate(LocalDateTime.now().withDayOfMonth(25));
            t.setPaymentMethod(PaymentMethod.ONLINE_BANKING);
            t.setTransactionType(TransactionType.INCOME);
            transactionRepository.save(t);
        }
        
        // Expenses
        if (housing != null) {
            Transaction t = new Transaction();
            t.setUser(user);
            t.setCategory(housing);
            t.setAmount(2150.00);
            t.setDescription("Housing & Bills");
            t.setTransactionDate(LocalDateTime.now().withDayOfMonth(1));
            t.setPaymentMethod(PaymentMethod.AUTO_PAY);
            t.setTransactionType(TransactionType.EXPENSE);
            transactionRepository.save(t);
        }
        
        if (food != null) {
            Transaction t1 = new Transaction();
            t1.setUser(user);
            t1.setCategory(food);
            t1.setAmount(450.00);
            t1.setDescription("Riyadh Supermarket");
            t1.setTransactionDate(LocalDateTime.now());
            t1.setPaymentMethod(PaymentMethod.BANK_CARD);
            t1.setTransactionType(TransactionType.EXPENSE);
            transactionRepository.save(t1);
            
            Transaction t2 = new Transaction();
            t2.setUser(user);
            t2.setCategory(food);
            t2.setAmount(240.00);
            t2.setDescription("Elite Restaurant");
            t2.setTransactionDate(LocalDateTime.now().minusDays(1));
            t2.setPaymentMethod(PaymentMethod.BANK_CARD);
            t2.setTransactionType(TransactionType.EXPENSE);
            transactionRepository.save(t2);
        }
        
        if (shopping != null) {
            Transaction t = new Transaction();
            t.setUser(user);
            t.setCategory(shopping);
            t.setAmount(350.00);
            t.setDescription("Amazon Purchase");
            t.setTransactionDate(LocalDateTime.now().minusDays(3));
            t.setPaymentMethod(PaymentMethod.ONLINE_BANKING);
            t.setTransactionType(TransactionType.EXPENSE);
            transactionRepository.save(t);
        }
    }
    
    private void createSampleBills(User user) {
        Bill rent = new Bill();
        rent.setUser(user);
        rent.setName("House Rent");
        rent.setAmount(3500.00);
        rent.setDueDate(LocalDate.now().withDayOfMonth(1));
        rent.setBillType(BillType.HOUSE_RENT);
        rent.setPaymentMethod(PaymentMethod.AUTO_PAY);
        rent.setStatus(BillStatus.PENDING);
        rent.setIsPredicted(false);
        billRepository.save(rent);
        
        Bill electricity = new Bill();
        electricity.setUser(user);
        electricity.setName("Electricity Bill");
        electricity.setAmount(450.00);
        electricity.setDueDate(LocalDate.now().withDayOfMonth(15));
        electricity.setBillType(BillType.ELECTRICITY);
        electricity.setPaymentMethod(PaymentMethod.ONLINE_BANKING);
        electricity.setStatus(BillStatus.PENDING);
        electricity.setIsPredicted(false);
        billRepository.save(electricity);
    }
    
    private void createSampleSavingsGoals(User user) {
        SavingsGoal emergency = new SavingsGoal();
        emergency.setUser(user);
        emergency.setName("Emergency Fund");
        emergency.setTargetAmount(30000.00);
        emergency.setCurrentAmount(24600.00);
        savingsGoalRepository.save(emergency);
        
        SavingsGoal trip = new SavingsGoal();
        trip.setUser(user);
        trip.setName("Summer Trip");
        trip.setTargetAmount(8000.00);
        trip.setCurrentAmount(3200.00);
        savingsGoalRepository.save(trip);
    }
    
    private void createSampleForecast(User user) {
        Forecast forecast = new Forecast();
        forecast.setUser(user);
        forecast.setForecastMonth(YearMonth.now());
        forecast.setTotalPredicted(4250.00);
        forecast.setTotalPaid(1200.00);
        forecast.setTotalRemaining(3050.00);
        forecast.setNotes("We predict a 12% increase in electricity bill due to upcoming heatwave.");
        forecastRepository.save(forecast);
    }
}