package com.example.backend.repository;

import com.example.backend.entity.TimeValueCalculation;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TimeValueCalculationRepository extends JpaRepository<TimeValueCalculation, Long> {
    List<TimeValueCalculation> findByUserOrderByCreatedAtDesc(User user);
}