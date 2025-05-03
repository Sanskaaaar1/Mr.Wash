package com.main.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // Marks this class as a configuration class
@Order(2) // Defines filter chain priority (executed after JwtSecurityConfig)
public class MvcSecurityConfig {

    @Bean
    public SecurityFilterChain mvcSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            // Apply security to specific MVC endpoints
            .securityMatcher("/admin/**", "/user/**") // All MVC endpoints
            
            // Authorization rules
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/admin/**").hasRole("ADMIN") // Admin restricted routes
                .requestMatchers("/user/**").hasRole("USER") // User restricted routes
                .anyRequest().authenticated() // All other requests require authentication
            )
            
            .formLogin(Customizer.withDefaults()) // Enable form-based login
            .logout(Customizer.withDefaults()) // Enable logout functionality
            .csrf(csrf -> csrf.disable()); // Disable CSRF (optional for frontend usage)

        return http.build(); // Build the security filter chain
    }
}
