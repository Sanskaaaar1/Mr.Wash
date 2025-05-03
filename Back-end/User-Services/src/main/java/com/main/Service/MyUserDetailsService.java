package com.main.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.main.Entity.Authentication_Entity;
import com.main.Model.UserPrincipal;
import com.main.Repository.AuthRepo;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private AuthRepo authRepo; // Autowired repository to interact with the authentication database

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return authRepo.findByUsername(username) // Fetch user by username from repository
                .map(UserPrincipal::new) // Map the found Authentication_Entity to UserPrincipal
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username)); // Throw exception if user not found
    }

}
