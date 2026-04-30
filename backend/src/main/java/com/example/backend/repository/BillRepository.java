package com.example.backend.repository;

import com.example.backend.entity.Bill;
import com.example.backend.enums.BillStatus;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByUserOrderByDueDateAsc(User user);
    List<Bill> findByUserAndStatus(User user, BillStatus status);
    List<Bill> findByUserAndDueDateBetween(User user, LocalDate start, LocalDate end);
    List<Bill> findByUserAndDueDateAfterOrderByDueDateAsc(User user, LocalDate date);
}