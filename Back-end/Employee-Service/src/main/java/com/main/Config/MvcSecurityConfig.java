package com.main.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@Order(2)
public class MvcSecurityConfig {

    @Bean
    public SecurityFilterChain mvcSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            .securityMatcher("/admin/**", "/user/**") // All MVC endpoints
            .authorizeHttpRequests(auth -> auth
               // .requestMatchers( "/register").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/user/**").hasRole("USER")
                .anyRequest().authenticated()
            )
            .formLogin(Customizer.withDefaults()) // Form-based login
            .logout(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable()); // Optional depending on frontend usage

        return http.build();
    }
}
