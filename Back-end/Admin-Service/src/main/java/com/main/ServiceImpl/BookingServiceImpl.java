package com.main.ServiceImpl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.Entity.Booking_Entity;
import com.main.Exception.IdNotFoundException;
import com.main.Exception.NoTodayTaskException;
import com.main.Exception.StatusIsNotPending;
import com.main.Exception.StatusNotFoundException;
import com.main.Repository.BookingRepository;
import com.main.Service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public List <Booking_Entity> getBookingsByStatus(String status) {
    	
    	List<Booking_Entity> bookings = bookingRepository.findByStatus(status);
        
    	if (bookings.isEmpty()) {
            throw new StatusNotFoundException(status); // Throw exception if no bookings found
        }
        return bookings;
    }

	@Override
	public Optional<Booking_Entity> updateByBookingid(Integer id, String status) {
		// TODO Auto-generated method stub
		Optional<Booking_Entity> optionalBooking=  bookingRepository.findById(id);
		if(optionalBooking.isPresent()) {
			Booking_Entity booking=optionalBooking.get();
			
			booking.setStatus(status);
			booking=bookingRepository.save(booking);
			return Optional.of(booking);
		} else {
	        throw new IdNotFoundException(id);
		
	}
}

	@Override
	public List<Booking_Entity> getBookingByDate(LocalDate date) {
		List<Booking_Entity> booking=bookingRepository.getBookingsByDate(date);
		if(booking.isEmpty()) {
			throw new NoTodayTaskException(date);
		}
		List<Booking_Entity> lists=new ArrayList<>();
		for(Booking_Entity li:booking) {
			if("SCHEDULED".equalsIgnoreCase(li.getStatus())) {
				lists.add(li);
			}
		}
		if(lists.isEmpty()) {
			throw new NoTodayTaskException(date);
		}
		
		return lists;
		
	}

	@Override
	public Optional<Booking_Entity> getBookingById(Integer id) {
		// TODO Auto-generated method stub
		
		return bookingRepository.findById(id);
	}

	@Override
    public Booking_Entity AddEmp(Integer bookingid, String empName) {
        int updated = bookingRepository.AddEmp(bookingid, empName);
        if (updated == 0) {
            throw new RuntimeException("Booking not found or update failed");
        }
        return bookingRepository.findById(bookingid)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    
    }

	
}
