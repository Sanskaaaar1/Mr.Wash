package com.main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.main.Entity.Authentication_Entity;

@Repository
public interface AuthRepo extends JpaRepository<Authentication_Entity, Integer> {

    Optional<Authentication_Entity> findByUsername(String username);
}
