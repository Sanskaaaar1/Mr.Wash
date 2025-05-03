package com.main.Validator;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Validated  // Annotation to indicate validation is required for this class
public class BookingValidation {

    @NotNull(message = "Vehicle type is required") // Validate that vehicleType is not null
    private String vehicleType;

    @NotNull(message = "Vehicle company is required") // Validate that vehicleCompany is not null
    private String vehicleCompany;

    @NotBlank(message = "Vehicle name is required") // Validate that vehicleName is not blank
    private String vehicleName;

    @NotNull(message = "Date is required") // Validate that date is not null
    @Future(message = "Date must be in future") // Validate that date is in the future
    private LocalDate date;

    @NotNull(message = "Time is required") // Validate that time is not null
    private LocalTime time;

    @NotNull(message = "Service is required") // Validate that services is not null
    private String services;

    @NotBlank(message = "Vehicle number is required") // Validate that vehicleNumber is not blank
    @Pattern(regexp = "^[A-Z]{2}[ -][0-9]{1,2}[ -][A-Z]{1,2}[ -][0-9]{4}$", 
             message = "Format: MH 12 AB 1234") // Validate vehicle number format
    private String vehicleNumber;

    public String getVehicleNumber() {
        return vehicleNumber; // Return the vehicle number
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber; // Set the vehicle number
    }

    public String getVehicleType() {
        return vehicleType; // Return the vehicle type
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType; // Set the vehicle type
    }

    public String getVehicleCompany() {
        return vehicleCompany; // Return the vehicle company
    }

    public void setVehicleCompany(String vehicleCompany) {
        this.vehicleCompany = vehicleCompany; // Set the vehicle company
    }

    public String getVehicleName() {
        return vehicleName; // Return the vehicle name
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName; // Set the vehicle name
    }

    public LocalDate getDate() {
        return date; // Return the date
    }

    public void setDate(LocalDate date) {
        this.date = date; // Set the date
    }

    public LocalTime getTime() {
        return time; // Return the time
    }

    public void setTime(LocalTime time) {
        this.time = time; // Set the time
    }

    public String getServices() {
        return services; // Return the services
    }

    public void setServices(String services) {
        this.services = services; // Set the services
    }

}
