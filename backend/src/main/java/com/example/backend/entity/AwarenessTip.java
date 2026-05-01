package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "awareness_tips")
public class AwarenessTip extends BaseEntity {
    
    @Column(nullable = false, length = 1000)
    private String title;
    
    @Column(nullable = false, length = 2000)
    private String content;
    
    private String category;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    // Constructors
    public AwarenessTip() {}
    
    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}