package com.main.Service;

import java.util.List;
import com.main.Entity.Booking_Entity;

public interface BookingService {

    // Method to fetch the booking history of a user by their username
    List<Booking_Entity> getByUserHistory(String username);
}
