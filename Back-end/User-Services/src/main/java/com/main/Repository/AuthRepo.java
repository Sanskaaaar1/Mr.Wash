package com.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.main.Entity.Authentication_Entity;

@Repository // Indicates that this interface is a repository
public interface AuthRepo extends JpaRepository<Authentication_Entity, Integer> {

    // Custom query method to find an Authentication_Entity by username
    Optional<Authentication_Entity> findByUsername(String username); 
}
