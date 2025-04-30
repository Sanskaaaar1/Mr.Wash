package com.main.Exception;

import java.time.LocalDate;

public class NoTodayTaskException extends RuntimeException {
	
	public NoTodayTaskException (LocalDate date) {
		super("Today, there is no Task");
	}

}
