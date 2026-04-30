package com.example.backend.service;

import com.example.backend.entity.Bill;
import com.example.backend.entity.User;
import com.example.backend.enums.BillStatus;
import com.example.backend.enums.BillType;
import com.example.backend.enums.PaymentMethod;
import com.example.backend.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    public Bill createBill(User user, String name, String description, Double amount,
                          LocalDate dueDate, BillType billType, PaymentMethod paymentMethod) {
        Bill bill = new Bill();
        bill.setUser(user);
        bill.setName(name);
        bill.setDescription(description);
        bill.setAmount(amount);
        bill.setDueDate(dueDate);
        bill.setBillType(billType);
        bill.setPaymentMethod(paymentMethod);
        bill.setStatus(BillStatus.PENDING);
        bill.setIsPredicted(false);
        
        return billRepository.save(bill);
    }

    public List<Bill> getUserBills(User user) {
        return billRepository.findByUserOrderByDueDateAsc(user);
    }

    public List<Bill> getUpcomingBills(User user) {
        return billRepository.findByUserAndDueDateAfterOrderByDueDateAsc(user, LocalDate.now());
    }

    public Bill markBillAsPaid(Long billId, User user) {
        Bill bill = billRepository.findById(billId)
            .orElseThrow(() -> new RuntimeException("Bill not found"));
        
        if (!bill.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        bill.setStatus(BillStatus.PAID);
        return billRepository.save(bill);
    }

    public Double getTotalPendingBills(User user) {
        List<Bill> pendingBills = billRepository.findByUserAndStatus(user, BillStatus.PENDING);
        return pendingBills.stream().mapToDouble(Bill::getAmount).sum();
    }
}