package com.main.Entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Ignoring Hibernate-specific properties during JSON serialization
public class Info_Entity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate the ID
    private Integer infoId;
    
    @Column(nullable = false) // Ensures first name is not null
    private String firstName;
    
    @Column(nullable = false) // Ensures middle name is not null
    private String middleName;
    
    @Column(nullable = false) // Ensures last name is not null
    private String lastname;
    
    @Column(unique = true, nullable = false) // Ensures email is unique and not null
    private String email;
    
    @Column(nullable = false) // Ensures age is not null
    private Integer age;
    
    @Column(nullable = false) // Ensures phone number is not null
    private Long phoneNumber;
    
    @Enumerated(EnumType.STRING) // Enum type for gender
    private Gender gender;
    
    @Column(nullable = false) // Ensures address is not null
    private String address;
    
    @Column(nullable = false) // Ensures city is not null
    private String city;

    // One-to-one relationship with Authentication_Entity
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Authentication_Entity authentication;
    
    // One-to-many relationship with Booking_Entity (user can have multiple bookings)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Avoid circular reference in JSON
    private List<Booking_Entity> bookings = new ArrayList<>();
    
    // Enum to represent Gender
    public enum Gender {
        Male, Female, Other
    }

    // Getter for phoneNumber
    public Long getPhoneNumber() {
        return phoneNumber;
    }

    // Setter for phoneNumber
    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    // Getter for infoId (userId)
    public Integer getUserId() {
        return infoId;
    }

    // Setter for infoId (userId)
    public void setUserId(Integer userId) {
        this.infoId = userId;
    }

    // Getter for firstName
    public String getFirstName() {
        return firstName;
    }

    // Setter for firstName
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    // Getter for middleName
    public String getMiddleName() {
        return middleName;
    }

    // Setter for middleName
    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    // Getter for lastname
    public String getLastname() {
        return lastname;
    }

    // Setter for lastname
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    // Getter for email
    public String getEmail() {
        return email;
    }

    // Setter for email
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter for age
    public Integer getAge() {
        return age;
    }

    // Setter for age
    public void setAge(Integer age) {
        this.age = age;
    }

    // Getter for gender
    public Gender getGender() {
        return gender;
    }

    // Setter for gender
    public void setGender(Gender gender) {
        this.gender = gender;
    }

    // Getter for address
    public String getAddress() {
        return address;
    }

    // Setter for address
    public void setAddress(String address) {
        this.address = address;
    }

    // Getter for city
    public String getCity() {
        return city;
    }

    // Setter for city
    public void setCity(String city) {
        this.city = city;
    }

    // Getter for authentication
    public Authentication_Entity getAuthentication() {
        return authentication;
    }

    // Setter for authentication
    public void setAuthentication(Authentication_Entity authentication) {
        this.authentication = authentication;
    }

    // Getter for bookings
    public List<Booking_Entity> getBookings() {
        return bookings;
    }

    // Setter for bookings
    public void setBookings(List<Booking_Entity> bookings) {
        this.bookings = bookings;
    }
}
