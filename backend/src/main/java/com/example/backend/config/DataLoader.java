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
        // Load default categories
        loadDefaultCategories();
        
        // Load awareness tips
        loadAwarenessTips();
        
        // Create demo user (for testing)
        createDemoUser();
        
        System.out.println("✅ Database initialized successfully!");
    }
    
    private void loadDefaultCategories() {
        if (categoryRepository.count() == 0) {
            System.out.println("📝 Loading default categories...");
            
            // Expense Categories
            Category housing = new Category("Housing & Bills", CategoryType.EXPENSE);
            Category food = new Category("Food & Entertainment", CategoryType.EXPENSE);
            Category subscriptions = new Category("Subscriptions & Luxuries", CategoryType.EXPENSE);
            Category transport = new Category("Transport", CategoryType.EXPENSE);
            Category shopping = new Category("Shopping", CategoryType.EXPENSE);
            Category health = new Category("Health", CategoryType.EXPENSE);
            Category education = new Category("Education", CategoryType.EXPENSE);
            Category others = new Category("Others", CategoryType.EXPENSE);
            
            // Set icons and colors
            housing.setIcon("🏠");
            housing.setColor("#FF6B6B");
            
            food.setIcon("🍔");
            food.setColor("#4ECDC4");
            
            subscriptions.setIcon("📺");
            subscriptions.setColor("#FFE66D");
            
            transport.setIcon("🚗");
            transport.setColor("#95E77E");
            
            shopping.setIcon("🛍️");
            shopping.setColor("#FF8C42");
            
            health.setIcon("💊");
            health.setColor("#A8E6CF");
            
            education.setIcon("📚");
            education.setColor("#FFD3B6");
            
            others.setIcon("📌");
            others.setColor("#9B59B6");
            
            categoryRepository.save(housing);
            categoryRepository.save(food);
            categoryRepository.save(subscriptions);
            categoryRepository.save(transport);
            categoryRepository.save(shopping);
            categoryRepository.save(health);
            categoryRepository.save(education);
            categoryRepository.save(others);
            
            // Income Categories
            Category salary = new Category("Salary", CategoryType.INCOME);
            salary.setIcon("💰");
            salary.setColor("#4CAF50");
            
            Category freelance = new Category("Freelance", CategoryType.INCOME);
            freelance.setIcon("💻");
            freelance.setColor("#2196F3");
            
            Category investment = new Category("Investment", CategoryType.INCOME);
            investment.setIcon("📈");
            investment.setColor("#9C27B0");
            
            Category gift = new Category("Gift", CategoryType.INCOME);
            gift.setIcon("🎁");
            gift.setColor("#FF9800");
            
            Category refund = new Category("Refund", CategoryType.INCOME);
            refund.setIcon("↩️");
            refund.setColor("#F44336");
            
            categoryRepository.save(salary);
            categoryRepository.save(freelance);
            categoryRepository.save(investment);
            categoryRepository.save(gift);
            categoryRepository.save(refund);
            
            System.out.println("✅ Loaded " + categoryRepository.count() + " categories");
        }
    }
    
    private void loadAwarenessTips() {
        if (awarenessTipRepository.count() == 0) {
            System.out.println("💡 Loading awareness tips...");
            
            AwarenessTip tip1 = new AwarenessTip();
            tip1.setTitle("The 24-Hour Rule");
            tip1.setContent("Wait 24 hours before completing any non-essential purchase that costs more than 5 work hours. Often the impulse fades and you realize you don't truly need it.");
            tip1.setCategory("Mindful Spending");
            tip1.setIsActive(true);
            awarenessTipRepository.save(tip1);
            
            AwarenessTip tip2 = new AwarenessTip();
            tip2.setTitle("Cost in Work Hours");
            tip2.setContent("When considering a purchase, calculate how many hours you need to work to afford it. This simple conversion makes spending decisions more logical and less emotional.");
            tip2.setCategory("Time Value");
            tip2.setIsActive(true);
            awarenessTipRepository.save(tip2);
            
            AwarenessTip tip3 = new AwarenessTip();
            tip3.setTitle("Track Small Expenses");
            tip3.setContent("Small daily expenses like coffee or snacks can add up to significant amounts over time. Track them for a month to see where your money really goes.");
            tip3.setCategory("Budgeting");
            tip3.setIsActive(true);
            awarenessTipRepository.save(tip3);
            
            AwarenessTip tip4 = new AwarenessTip();
            tip4.setTitle("Emergency Fund First");
            tip4.setContent("Before investing or making big purchases, build an emergency fund covering 3-6 months of expenses. This protects you from unexpected financial shocks.");
            tip4.setCategory("Savings");
            tip4.setIsActive(true);
            awarenessTipRepository.save(tip4);
            
            AwarenessTip tip5 = new AwarenessTip();
            tip5.setTitle("50/30/20 Rule");
            tip5.setContent("A simple budgeting framework: 50% for needs, 30% for wants, and 20% for savings and debt repayment. Adjust based on your situation.");
            tip5.setCategory("Budgeting");
            tip5.setIsActive(true);
            awarenessTipRepository.save(tip5);
            
            AwarenessTip tip6 = new AwarenessTip();
            tip6.setTitle("Review Subscriptions");
            tip6.setContent("Regularly review your subscription services. Cancel those you rarely use. You might save hundreds annually.");
            tip6.setCategory("Savings");
            tip6.setIsActive(true);
            awarenessTipRepository.save(tip6);
            
            AwarenessTip tip7 = new AwarenessTip();
            tip7.setTitle("Pay Yourself First");
            tip7.setContent("When you receive income, immediately transfer a portion to savings before paying bills or spending. Make saving automatic.");
            tip7.setCategory("Savings");
            tip7.setIsActive(true);
            awarenessTipRepository.save(tip7);
            
            AwarenessTip tip8 = new AwarenessTip();
            tip8.setTitle("Compare Before Buying");
            tip8.setContent("For purchases over 200 SAR, compare prices across at least 3 different stores or websites before buying.");
            tip8.setCategory("Smart Shopping");
            tip8.setIsActive(true);
            awarenessTipRepository.save(tip8);
            
            System.out.println("✅ Loaded " + awarenessTipRepository.count() + " awareness tips");
        }
    }
    
    private void createDemoUser() {
        if (userRepository.count() == 0) {
            System.out.println("👤 Creating demo user...");
            
            // Create demo user
            User demoUser = new User();
            demoUser.setFullName("Sadeed Ahmed");
            demoUser.setEmail("sadeed@example.com");
            demoUser.setPassword(passwordEncoder.encode("password123"));
            demoUser.setMonthlyNetIncome(18000.00);
            demoUser.setWorkHoursPerMonth(160);
            demoUser.setRole(UserRole.USER);  // Make sure UserRole is imported from enums package
            
            userRepository.save(demoUser);
            System.out.println("✅ Demo user created: sadeed@example.com / password123");
            
            // Create sample transactions
            createSampleTransactions(demoUser);
            
            // Create sample bills
            createSampleBills(demoUser);
            
            // Create savings goals
            createSampleSavingsGoals(demoUser);
            
            // Create forecast
            createSampleForecast(demoUser);
        }
    }
    
    private void createSampleTransactions(User user) {
        // Get categories
        Category housing = categoryRepository.findByName("Housing & Bills").orElse(null);
        Category food = categoryRepository.findByName("Food & Entertainment").orElse(null);
        Category subscriptions = categoryRepository.findByName("Subscriptions & Luxuries").orElse(null);
        Category shopping = categoryRepository.findByName("Shopping").orElse(null);
        Category salary = categoryRepository.findByName("Salary").orElse(null);
        
        if (salary != null) {
            // Income transaction (Salary)
            Transaction salaryTransaction = new Transaction();
            salaryTransaction.setUser(user);
            salaryTransaction.setCategory(salary);
            salaryTransaction.setAmount(18000.00);
            salaryTransaction.setDescription("Monthly Salary");
            salaryTransaction.setTransactionDate(LocalDateTime.now().withDayOfMonth(25));
            salaryTransaction.setPaymentMethod(PaymentMethod.ONLINE_BANKING);
            salaryTransaction.setTransactionType(TransactionType.INCOME);
            transactionRepository.save(salaryTransaction);
        }
        
        // Recent expense transactions
        if (housing != null) {
            Transaction housingTransaction = new Transaction();
            housingTransaction.setUser(user);
            housingTransaction.setCategory(housing);
            housingTransaction.setAmount(2150.00);
            housingTransaction.setDescription("Housing & Bills - Monthly");
            housingTransaction.setTransactionDate(LocalDateTime.now().withDayOfMonth(1));
            housingTransaction.setPaymentMethod(PaymentMethod.AUTO_PAY);
            housingTransaction.setTransactionType(TransactionType.EXPENSE);
            transactionRepository.save(housingTransaction);
        }
        
        if (food != null) {
            Transaction supermarket = new Transaction();
            supermarket.setUser(user);
            supermarket.setCategory(food);
            supermarket.setAmount(450.00);
            supermarket.setDescription("Riyadh Supermarket");
            supermarket.setTransactionDate(LocalDateTime.now());
            supermarket.setPaymentMethod(PaymentMethod.BANK_CARD);
            supermarket.setTransactionType(TransactionType.EXPENSE);
            transactionRepository.save(supermarket);
            
            Transaction restaurant = new Transaction();
            restaurant.setUser(user);
            restaurant.setCategory(food);
            restaurant.setAmount(240.00);
            restaurant.setDescription("Elite Restaurant");
            restaurant.setTransactionDate(LocalDateTime.now().minusDays(1));
            restaurant.setPaymentMethod(PaymentMethod.BANK_CARD);
            restaurant.setTransactionType(TransactionType.EXPENSE);
            transactionRepository.save(restaurant);
            
            Transaction coffee = new Transaction();
            coffee.setUser(user);
            coffee.setCategory(food);
            coffee.setAmount(35.00);
            coffee.setDescription("Starbucks Coffee");
            coffee.setTransactionDate(LocalDateTime.now().minusDays(2));
            coffee.setPaymentMethod(PaymentMethod.BANK_CARD);
            coffee.setTransactionType(TransactionType.EXPENSE);
            transactionRepository.save(coffee);
        }
        
        if (subscriptions != null) {
            Transaction netflix = new Transaction();
            netflix.setUser(user);
            netflix.setCategory(subscriptions);
            netflix.setAmount(89.00);
            netflix.setDescription("Netflix Subscription");
            netflix.setTransactionDate(LocalDateTime.now().withDayOfMonth(15));
            netflix.setPaymentMethod(PaymentMethod.AUTO_PAY);
            netflix.setTransactionType(TransactionType.EXPENSE);
            transactionRepository.save(netflix);
            
            Transaction spotify = new Transaction();
            spotify.setUser(user);
            spotify.setCategory(subscriptions);
            spotify.setAmount(49.00);
            spotify.setDescription("Spotify Premium");
            spotify.setTransactionDate(LocalDateTime.now().withDayOfMonth(10));
            spotify.setPaymentMethod(PaymentMethod.AUTO_PAY);
            spotify.setTransactionType(TransactionType.EXPENSE);
            transactionRepository.save(spotify);
        }
        
        if (shopping != null) {
            Transaction amazon = new Transaction();
            amazon.setUser(user);
            amazon.setCategory(shopping);
            amazon.setAmount(350.00);
            amazon.setDescription("Amazon Purchase");
            amazon.setTransactionDate(LocalDateTime.now().minusDays(3));
            amazon.setPaymentMethod(PaymentMethod.ONLINE_BANKING);
            amazon.setTransactionType(TransactionType.EXPENSE);
            transactionRepository.save(amazon);
        }
        
        System.out.println("✅ Created sample transactions");
    }
    
    private void createSampleBills(User user) {
        // Current month bills
        Bill houseRent = new Bill();
        houseRent.setUser(user);
        houseRent.setName("House Rent");
        houseRent.setDescription("Monthly rent payment");
        houseRent.setAmount(3500.00);
        houseRent.setDueDate(LocalDate.now().withDayOfMonth(1));
        houseRent.setBillType(BillType.HOUSE_RENT);
        houseRent.setPaymentMethod(PaymentMethod.AUTO_PAY);
        houseRent.setStatus(BillStatus.PENDING);
        houseRent.setIsPredicted(false);
        billRepository.save(houseRent);
        
        Bill electricity = new Bill();
        electricity.setUser(user);
        electricity.setName("Electricity Bill");
        electricity.setDescription("Saudi Electricity Co.");
        electricity.setAmount(450.00);
        electricity.setDueDate(LocalDate.now().withDayOfMonth(15));
        electricity.setBillType(BillType.ELECTRICITY);
        electricity.setPaymentMethod(PaymentMethod.ONLINE_BANKING);
        electricity.setStatus(BillStatus.PENDING);
        electricity.setIsPredicted(false);
        billRepository.save(electricity);
        
        Bill internet = new Bill();
        internet.setUser(user);
        internet.setName("Internet Bill");
        internet.setDescription("STC Fiber");
        internet.setAmount(299.00);
        internet.setDueDate(LocalDate.now().withDayOfMonth(20));
        internet.setBillType(BillType.INTERNET);
        internet.setPaymentMethod(PaymentMethod.AUTO_PAY);
        internet.setStatus(BillStatus.PENDING);
        internet.setIsPredicted(false);
        billRepository.save(internet);
        
        Bill carInstallment = new Bill();
        carInstallment.setUser(user);
        carInstallment.setName("Car Installment");
        carInstallment.setDescription("Auto loan payment");
        carInstallment.setAmount(1200.00);
        carInstallment.setDueDate(LocalDate.now().withDayOfMonth(10));
        carInstallment.setBillType(BillType.CAR_INSTALLMENT);
        carInstallment.setPaymentMethod(PaymentMethod.AUTO_PAY);
        carInstallment.setStatus(BillStatus.PENDING);
        carInstallment.setIsPredicted(false);
        billRepository.save(carInstallment);
        
        // Predicted bill (next month)
        Bill predictedElectricity = new Bill();
        predictedElectricity.setUser(user);
        predictedElectricity.setName("Electricity Bill (Predicted)");
        predictedElectricity.setDescription("Predicted based on history");
        predictedElectricity.setAmount(504.00);
        predictedElectricity.setDueDate(LocalDate.now().plusMonths(1).withDayOfMonth(15));
        predictedElectricity.setBillType(BillType.ELECTRICITY);
        predictedElectricity.setPaymentMethod(PaymentMethod.ONLINE_BANKING);
        predictedElectricity.setStatus(BillStatus.PREDICTED);
        predictedElectricity.setIsPredicted(true);
        predictedElectricity.setPredictionConfidence(0.85);
        billRepository.save(predictedElectricity);
        
        // Overdue bill (past month)
        Bill overdueBill = new Bill();
        overdueBill.setUser(user);
        overdueBill.setName("Previous Electricity Bill");
        overdueBill.setDescription("Last month's bill");
        overdueBill.setAmount(380.00);
        overdueBill.setDueDate(LocalDate.now().minusDays(10));
        overdueBill.setBillType(BillType.ELECTRICITY);
        overdueBill.setPaymentMethod(PaymentMethod.ONLINE_BANKING);
        overdueBill.setStatus(BillStatus.OVERDUE);
        overdueBill.setIsPredicted(false);
        billRepository.save(overdueBill);
        
        System.out.println("✅ Created sample bills");
    }
    
    private void createSampleSavingsGoals(User user) {
        SavingsGoal emergencyFund = new SavingsGoal();
        emergencyFund.setUser(user);
        emergencyFund.setName("Emergency Fund");
        emergencyFund.setTargetAmount(30000.00);
        emergencyFund.setCurrentAmount(24600.00);
        emergencyFund.setTargetDate(LocalDate.now().plusMonths(6));
        savingsGoalRepository.save(emergencyFund);
        
        SavingsGoal summerTrip = new SavingsGoal();
        summerTrip.setUser(user);
        summerTrip.setName("Summer Trip");
        summerTrip.setTargetAmount(8000.00);
        summerTrip.setCurrentAmount(3200.00);
        summerTrip.setTargetDate(LocalDate.of(2025, 6, 1));
        savingsGoalRepository.save(summerTrip);
        
        System.out.println("✅ Created sample savings goals");
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
        
        System.out.println("✅ Created sample forecast");
    }
}