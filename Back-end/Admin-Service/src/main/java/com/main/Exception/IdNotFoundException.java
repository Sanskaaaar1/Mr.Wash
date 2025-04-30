package com.main.Exception;

public class IdNotFoundException extends RuntimeException{
public IdNotFoundException(Integer id) {
	super(id+": this id not found in Booking List");
}
}
