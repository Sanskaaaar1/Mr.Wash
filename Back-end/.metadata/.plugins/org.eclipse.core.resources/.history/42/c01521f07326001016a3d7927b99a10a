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
    private AuthRepo authRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return authRepo.findByUsername(username)
                .map(UserPrincipal::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

}
