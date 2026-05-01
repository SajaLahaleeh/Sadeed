package com.example.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
  
    
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello World! Your Spring Boot app is working!";
    }
    
    @GetMapping("/test")
    public String test() {
        return "Application is running successfully!";
    }   
}
