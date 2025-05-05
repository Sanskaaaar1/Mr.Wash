package com.main.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.main.Entity.Booking_Entity;
import com.main.Entity.Info_Entity;

import jakarta.transaction.Transactional;

public interface BookingRepository extends JpaRepository<Booking_Entity, Integer> {
	// Getting List Of Booking Info By Status
    List<Booking_Entity> findByStatus(String status);
    
    // Getting Booking Info By BookingID
    Optional<Booking_Entity>  findById(Integer id);
    
    // Getting List of Booking by Date
    @Query("SELECT b FROM Booking_Entity b WHERE b.slotDate = :date")
    List<Booking_Entity> getBookingsByDate(@Param("date") LocalDate slotDate);

    
    //Updating EmpName in Booking ID
    @Modifying
	 @Transactional
	 @Query("UPDATE Booking_Entity b SET b.empName = :empName WHERE b.bookingId = :bookingid")
	 int AddEmp(@Param("bookingid") Integer bookingid,@Param("empName") String empName);
    
    //Getting The List of FindByEmpName
    @Query("SELECT b FROM Booking_Entity b WHERE LOWER(b.empName) = LOWER(:empName)")
    List<Booking_Entity> findByEmpName(String empName);
    
   
}
