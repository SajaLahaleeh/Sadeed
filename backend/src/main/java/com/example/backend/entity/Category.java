package com.example.backend.entity;

import com.example.backend.enums.CategoryType;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category extends BaseEntity {
    
    @Column(unique = true, nullable = false)
    private String name;
    
    private String icon;
    
    private String color;
    
    @Enumerated(EnumType.STRING)
    private CategoryType type;
    
    @OneToMany(mappedBy = "category")
    private List<Transaction> transactions = new ArrayList<>();
    
    // Constructors
    public Category() {}
    
    public Category(String name, CategoryType type) {
        this.name = name;
        this.type = type;
    }
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    
    public CategoryType getType() { return type; }
    public void setType(CategoryType type) { this.type = type; }
    
    public List<Transaction> getTransactions() { return transactions; }
    public void setTransactions(List<Transaction> transactions) { this.transactions = transactions; }
}