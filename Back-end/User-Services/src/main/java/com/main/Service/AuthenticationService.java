package com.main.Service;

import java.util.Optional;
import com.main.Entity.Authentication_Entity;

public interface AuthenticationService {

    // Method to find a user by their username. Returns an Optional containing the user details if found.
    Optional<Authentication_Entity> findByUsername(String username);
}
