package com.example.backend.repository;

import com.example.backend.entity.AwarenessTip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AwarenessTipRepository extends JpaRepository<AwarenessTip, Long> {
    List<AwarenessTip> findByIsActiveTrue();
    
    @Query(value = "SELECT * FROM awareness_tips WHERE is_active = true ORDER BY RAND() LIMIT 1", nativeQuery = true)
    AwarenessTip findRandomActiveTip();
}