package com.main.Exception;

public class StatusIsNotPending extends RuntimeException{
	public StatusIsNotPending(Integer id) {
		super("Booking of this id:"+id+" is not pending");
	}
}
