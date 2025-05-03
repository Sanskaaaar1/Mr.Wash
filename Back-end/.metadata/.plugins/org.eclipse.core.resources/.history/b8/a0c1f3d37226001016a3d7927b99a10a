package com.main.Repository;
import com.main.Entity.Info_Entity;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InfoRepository extends JpaRepository<Info_Entity,Integer>{

    @EntityGraph(attributePaths = {"authentication"})
    boolean existsByEmail(String email);
    @Query("SELECT u FROM Info_Entity u WHERE u.authentication.username = :username")
    Info_Entity findByAuthenticationUsername(@Param("username") String username);
}
