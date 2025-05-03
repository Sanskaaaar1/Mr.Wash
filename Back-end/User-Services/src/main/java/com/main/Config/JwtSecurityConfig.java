package com.main.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration // Marks this class as a configuration class
@Order(1) // Defines filter chain priority
public class JwtSecurityConfig {

    @Autowired
    private JwtFilter jwtFilter; // Custom JWT filter

    @Bean
    public SecurityFilterChain jwtSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            .securityMatcher("/login/**", "/userAPI/**", "/register/**", "/SearchUsername/**", 
                            "/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html")
            
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login/**", "/register/**", "/SearchUsername/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll() // Allow Swagger
                .requestMatchers("/userAPI/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
            )
            
            // Rest of your configuration remains the same
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
