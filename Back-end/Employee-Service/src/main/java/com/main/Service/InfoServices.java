package com.main.Service;

import java.util.List;

import com.main.Entity.Booking_Entity;
import com.main.Entity.Info_Entity;

public interface InfoServices {
	
	// Details get by name
	Info_Entity getByName(String Name);
}
