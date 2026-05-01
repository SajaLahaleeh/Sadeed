package com.example.backend.repository;

import com.example.backend.entity.SavingsGoal;
import com.example.backend.entity.User;
import com.example.backend.enums.GoalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SavingsGoalRepository extends JpaRepository<SavingsGoal, Long> {
    List<SavingsGoal> findByUser(User user);
    List<SavingsGoal> findByStatusAndUser(GoalStatus status, User user);
}