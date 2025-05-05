package com.main.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.main.Entity.Booking_Entity;

public interface BookingService {
	
	//Getting Booking List By Status
	 List<Booking_Entity> getBookingsByStatus(String status);
	 
	 //Update Booking by BookinID 
	 Optional<Booking_Entity> updateByBookingid(Integer id,String status);
	 
	 //Getting Booking List of Date
	 List<Booking_Entity> getBookingByDate(LocalDate slotDate);
	 
	 //Getting  Booking By Booking ID
	 Optional<Booking_Entity> getBookingById(Integer id);
	 
	 //Updating empName in Booking By Booking ID
	 Booking_Entity AddEmp(Integer bookingid,String empName);
	 
}
