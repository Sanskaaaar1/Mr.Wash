package com.main.Exception;

public class StatusNotFoundException extends RuntimeException{
	public StatusNotFoundException(String status) {
		super("Booking of status "+status+" not Found");
	}
}
