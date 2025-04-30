package com.main.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.Entity.Booking_Entity;
import com.main.Entity.Info_Entity;
import com.main.Repository.InfoRepo;
import com.main.Service.InfoServices;

@Service
public class InfoServicesImpl implements InfoServices {
	
	@Autowired
	InfoRepo infoRepo;

	@Override
	public Info_Entity getByName(String Name) {
		// TODO Auto-generated method stub
		  return infoRepo.findByFirstNameIgnoreCase(Name);
	}
	@Override
	public Optional<Info_Entity> searchByInfoId(Integer id) {
	    Info_Entity info = infoRepo.findByInfoId(id);
	    return Optional.ofNullable(info);
	}

	

}
