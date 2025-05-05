package com.main.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

import com.main.Entity.Booking_Entity;

public interface BookingService {
	 // get list of booking Info  by the status
	 List<Booking_Entity> getBookingsByStatus(String status);
	 
	 //Update the  Booking Info by the Booking ID
	 Optional<Booking_Entity> updateByBookingid(Integer id,String status);
	 
	 // Get Booking Details By date
	 List<Booking_Entity> getBookingByDate(LocalDate slotDate);
	 
	 //Get booking Details By Booking ID
	 Optional<Booking_Entity> getBookingById(Integer id);
	 
	 //Add the Employee Name in Booking Details
	 Booking_Entity AddEmp(Integer bookingid,String empName);
	 
	 // Get the Booking Which Are Service By Employee
	 List<Booking_Entity> getBookingsHandledByEmployee(String empName);

		

	    
}
