package com.main.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.Entity.Booking_Entity;
import com.main.Entity.Info_Entity;
import com.main.Exception.NoHistoryFoundException;
import com.main.Repository.BookingRepository;
import com.main.Repository.InfoRepository;
import com.main.Service.BookingService;
@Service
public class BookingServiceImpl implements BookingService {

	@Autowired
	private InfoRepository infoRepository;
	@Autowired
	private BookingRepository bookingRepository;
	@Override
	public List<Booking_Entity> getByUserHistory(String username) {
		// TODO Auto-generated method stub
		
		List<Booking_Entity> list=bookingRepository.getByUserHistory(username);
		if(list.isEmpty()) {
			throw new NoHistoryFoundException();
		}
		
		return list;
	}

}
