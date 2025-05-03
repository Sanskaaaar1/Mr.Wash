package com.main.Entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
public class Booking_Entity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate ID
    private Integer bookingId;
    
    @ManyToOne(fetch = FetchType.LAZY) // Many-to-one relationship with Info_Entity (user)
    @JoinColumn(name = "info_id", nullable = false) // Foreign key for Info_Entity
    @JsonIgnoreProperties({"bookings", "authentication"}) // Ignore certain fields during JSON serialization
    private Info_Entity user;
    
    @Column(nullable = false) // Ensures the vehicle type is not null
    private String vehicleType;
    
    @Column(nullable = false) // Ensures the vehicle company is not null
    private String vehicleCompany;
    
    @Column(nullable = false) // Ensures the vehicle name is not null
    private String vehicleName;
    
    @Column(nullable = false) // Ensures the slot date is not null
    private LocalDate slotDate;
    
    @Column(nullable = false) // Ensures the slot time is not null
    private LocalTime slotTime;
    
    @Column(nullable = false) // Ensures the service type is not null
    private String serviceType;
    
    @Column(nullable = false) // Ensures the booking date is not null
    private LocalDate bookingDate; // Default could be set to LocalDate.now()
    
    @Column(nullable = false) // Ensures the booking time is not null
    private LocalTime bookingTime; // Default could be set to LocalTime.now()

    @Column(nullable = false) // Ensures the vehicle number is not null
    private String vehicleNumber;
    
    @Column(nullable = false) // Ensures the status is not null
    private String status;
    
    @Column(nullable = true) // Optional field for employee name
    private String empName;
    
    // Getter for empName
    public String getEmpName() {
        return empName;
    }

    // Setter for empName
    public void setEmpName(String empName) {
        this.empName = empName;
    }

    // Getter for status
    public String getStatus() {
        return status;
    }

    // Setter for status
    public void setStatus(String status) {
        this.status = status;
    }

    // Getter for bookingId
    public Integer getBookingId() {
        return bookingId;
    }

    // Setter for bookingId
    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }

    // Getter for user (Info_Entity)
    public Info_Entity getUser() {
        return user;
    }

    // Setter for user (Info_Entity)
    public void setUser(Info_Entity user) {
        this.user = user;
    }

    // Getter for vehicleType
    public String getVehicleType() {
        return vehicleType;
    }

    // Setter for vehicleType
    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    // Getter for vehicleCompany
    public String getVehicleCompany() {
        return vehicleCompany;
    }

    // Setter for vehicleCompany
    public void setVehicleCompany(String vehicleCompany) {
        this.vehicleCompany = vehicleCompany;
    }

    // Getter for vehicleName
    public String getVehicleName() {
        return vehicleName;
    }

    // Setter for vehicleName
    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    // Getter for slotDate
    public LocalDate getSlotDate() {
        return slotDate;
    }

    // Setter for slotDate
    public void setSlotDate(LocalDate slotDate) {
        this.slotDate = slotDate;
    }

    // Getter for slotTime
    public LocalTime getSlotTime() {
        return slotTime;
    }

    // Setter for slotTime
    public void setSlotTime(LocalTime slotTime) {
        this.slotTime = slotTime;
    }

    // Getter for serviceType
    public String getServiceType() {
        return serviceType;
    }

    // Setter for serviceType
    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    // Getter for bookingDate
    public LocalDate getBookingDate() {
        return bookingDate;
    }

    // Setter for bookingDate
    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    // Getter for bookingTime
    public LocalTime getBookingTime() {
        return bookingTime;
    }

    // Setter for bookingTime
    public void setBookingTime(LocalTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    // Getter for vehicleNumber
    public String getVehicleNumber() {
        return vehicleNumber;
    }

    // Setter for vehicleNumber
    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }
}
