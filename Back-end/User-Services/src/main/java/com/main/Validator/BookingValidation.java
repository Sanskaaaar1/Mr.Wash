package com.main.Validator;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Validated  
public class BookingValidation {

	  	@NotNull(message = "Vehicle type is required")
	    private String vehicleType;
	    
	  

		@NotNull(message = "Vehicle company is required")
	    private String vehicleCompany;
	    
	    @NotBlank(message = "Vehicle name is required")
	    private String vehicleName;
	    
	    @NotNull(message = "Date is required")
	    @Future(message = "Date must be in future")
	    private LocalDate date;
	    
	    @NotNull(message = "Time is required")
	    private LocalTime time;
	    
	    @NotNull(message = "Service is required")
	    private String services;
	    
	    @NotBlank(message = "Vehicle number is required")
	    @Pattern(regexp = "^[A-Z]{2}[ -][0-9]{1,2}[ -][A-Z]{1,2}[ -][0-9]{4}$", 
	             message = "Format: MH 12 AB 1234")
	    private String vehicleNumber;

		public String getVehicleNumber() {
			return vehicleNumber;
		}

		public void setVehicleNumber(String vehicleNumber) {
			this.vehicleNumber = vehicleNumber;
		}

		public String getVehicleType() {
			return vehicleType;
		}

		public void setVehicleType(String vehicleType) {
			this.vehicleType = vehicleType;
		}

		public String getVehicleCompany() {
			return vehicleCompany;
		}

		public void setVehicleCompany(String vehicleCompany) {
			this.vehicleCompany = vehicleCompany;
		}

		public String getVehicleName() {
			return vehicleName;
		}

		public void setVehicleName(String vehicleName) {
			this.vehicleName = vehicleName;
		}

		public LocalDate getDate() {
			return date;
		}

		public void setDate(LocalDate date) {
			this.date = date;
		}

		public LocalTime getTime() {
			return time;
		}

		public void setTime(LocalTime time) {
			this.time = time;
		}

		public String getServices() {
			return services;
		}

		public void setServices(String services) {
			this.services = services;
		}
	
}
