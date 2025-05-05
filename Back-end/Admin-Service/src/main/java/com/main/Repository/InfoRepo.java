package com.main.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.main.Entity.Booking_Entity;
import com.main.Entity.Info_Entity;

public interface InfoRepo extends JpaRepository<Info_Entity, Integer>{

	// Getting the info by First Name
	Info_Entity findByFirstNameIgnoreCase(String Name);
	
	// Getting the Info By Info ID
	Info_Entity findByInfoId(Integer id);
	
	// Getting info details by User Name
	@Query("SELECT u FROM Info_Entity u WHERE u.authentication.username = :username")
    Info_Entity findByAuthenticationUsername(@Param("username") String username);
}

