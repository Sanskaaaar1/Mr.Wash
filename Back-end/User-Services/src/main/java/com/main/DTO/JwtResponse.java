package com.main.DTO;

public class JwtResponse {
    
    private String token; // Variable to hold the JWT token

    // Constructor to initialize JwtResponse with the token
    public JwtResponse(String token) {
        this.token = token;
    }

    // Getter method for the token
    public String getToken() {
        return token;
    }

    // Setter method to set the token
    public void setToken(String token) {
        this.token = token;
    }
}
