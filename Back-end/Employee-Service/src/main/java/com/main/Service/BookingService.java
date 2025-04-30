package com.main.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

import com.main.Entity.Booking_Entity;

public interface BookingService {
	 List<Booking_Entity> getBookingsByStatus(String status);
	 Optional<Booking_Entity> updateByBookingid(Integer id,String status);
	 List<Booking_Entity> getBookingByDate(LocalDate slotDate);
	 Optional<Booking_Entity> getBookingById(Integer id);
	 Booking_Entity AddEmp(Integer bookingid,String empName);
	 
	 List<Booking_Entity> getBookingsHandledByEmployee(String empName);
		

	    
}
