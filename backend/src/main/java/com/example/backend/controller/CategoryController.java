package com.example.backend.controller;

import com.example.backend.entity.Category;
import com.example.backend.enums.CategoryType;
import com.example.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<?> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        
        List<Map<String, Object>> response = categories.stream().map(category -> {
            Map<String, Object> cat = new HashMap<>();
            cat.put("id", category.getId());
            cat.put("name", category.getName());
            cat.put("icon", category.getIcon());
            cat.put("color", category.getColor());
            cat.put("type", category.getType().toString());
            return cat;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/expense")
    public ResponseEntity<?> getExpenseCategories() {
        List<Category> categories = categoryRepository.findByType(CategoryType.EXPENSE);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/income")
    public ResponseEntity<?> getIncomeCategories() {
        List<Category> categories = categoryRepository.findByType(CategoryType.INCOME);
        return ResponseEntity.ok(categories);
    }
}