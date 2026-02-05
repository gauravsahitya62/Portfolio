package com.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {

    @Value("${portfolio.admin.username:admin}")
    private String adminUsername;

    @Value("${portfolio.admin.password:admin123}")
    private String adminPassword;

    private String currentToken;

    public String login(String username, String password) {
        if (!adminUsername.equals(username) || !adminPassword.equals(password)) {
            return null;
        }
        currentToken = UUID.randomUUID().toString();
        return currentToken;
    }

    public boolean isValidToken(String token) {
        return token != null && token.equals(currentToken);
    }
}

