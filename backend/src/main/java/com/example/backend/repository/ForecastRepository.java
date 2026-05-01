package com.example.backend.repository;

import com.example.backend.entity.Forecast;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.YearMonth;
import java.util.Optional;

@Repository
public interface ForecastRepository extends JpaRepository<Forecast, Long> {
    Optional<Forecast> findByUserAndForecastMonth(User user, YearMonth forecastMonth);
}