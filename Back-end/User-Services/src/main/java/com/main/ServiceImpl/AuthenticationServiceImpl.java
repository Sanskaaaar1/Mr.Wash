package com.main.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.main.Entity.Authentication_Entity;
import com.main.Repository.AuthRepo;
import com.main.Service.AuthenticationService;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    AuthRepo authRepo; // Autowired repository to interact with the authentication database

    @Override
    public Optional<Authentication_Entity> findByUsername(String username) {
        Optional<Authentication_Entity> authOptional = authRepo.findByUsername(username); // Fetch user by username
        authOptional.ifPresent(auth -> auth.setPassword(null)); // remove password if user found
        return authOptional; // Return the optional containing the user data
    }
}
