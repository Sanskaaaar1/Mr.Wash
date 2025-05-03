package com.main.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.main.Entity.Booking_Entity;
import com.main.Entity.Info_Entity;

import jakarta.transaction.Transactional;

@Repository // Marks the interface as a repository
public interface BookingRepository extends JpaRepository<Booking_Entity, Integer> {

    // Method to find all bookings by a user (Info_Entity)
    List<Booking_Entity> findByUser(Info_Entity user);

    // Custom query to get a list of bookings for a user by username (through authentication)
    @Query("SELECT b FROM Booking_Entity b WHERE b.user.authentication.username = :username")
    List<Booking_Entity> getByUserHistory(@Param("username") String username);

    // Custom query to update the employee name associated with a booking
    @Modifying // Marks the method as a modifying query (it changes data in the database)
    @Transactional // Marks the method to execute within a transaction
    @Query("UPDATE Booking_Entity b SET b.empName = :empName WHERE b.bookingId = :bookingid")
    int AddEmp(@Param("bookingid") Integer bookingid, @Param("empName") String empName);
}
