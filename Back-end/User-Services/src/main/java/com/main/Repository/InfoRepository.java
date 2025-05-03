package com.main.Repository;

import com.main.Entity.Info_Entity;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository // Marks the interface as a Spring Data repository
public interface InfoRepository extends JpaRepository<Info_Entity, Integer> {

    // Method to check if an email exists in the database (fetching authentication relation eagerly)
    @EntityGraph(attributePaths = {"authentication"}) // Specifies that the 'authentication' relation should be eagerly fetched
    boolean existsByEmail(String email); 

    // Custom query to find Info_Entity by the username of its associated Authentication_Entity
    @Query("SELECT u FROM Info_Entity u WHERE u.authentication.username = :username")
    Info_Entity findByAuthenticationUsername(@Param("username") String username);
}
