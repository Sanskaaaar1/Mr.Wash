package com.main.Validator;

import org.springframework.validation.annotation.Validated;

@Validated  // Annotation to indicate validation is required for this class
public class RegisterValidation {

    private String firstName;  // Field for the user's first name
    
    private String middleName;  // Field for the user's middle name
    
    private String lastName;  // Field for the user's last name
    
    private String PhoneNo;  // Field for the user's phone number
    
    private String Mail;  // Field for the user's email address
    
    private String City;  // Field for the user's city
    
    private String Address;  // Field for the user's address
    
    private Integer age;  // Field for the user's age
    
    private String Gender;  // Field for the user's gender
    
    private String username;  // Field for the user's username
    
    private String Roll;  // Field for the user's roll
    
    private String Password;  // Field for the user's password

    // Constructor to initialize all fields
    public RegisterValidation(String firstName, String middleName, String lastName, String phoneNo, String mail,
            String city, String address, Integer age, String gender, String username, String roll, String password) {
        super();
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        PhoneNo = phoneNo;
        Mail = mail;
        City = city;
        Address = address;
        this.age = age;
        Gender = gender;
        this.username = username;
        Roll = roll;
        Password = password;
    }

    // Default constructor
    public RegisterValidation() {
        super();
        // TODO Auto-generated constructor stub
    }

    // Getter and setter methods for firstName
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    // Getter and setter methods for middleName
    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    // Getter and setter methods for lastName
    public String getLastName() {
        return lastName;
    }

    public void setSurName(String lastName) {
        this.lastName = lastName;
    }

    // Getter and setter methods for PhoneNo
    public String getPhoneNo() {
        return PhoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        PhoneNo = phoneNo;
    }

    // Getter and setter methods for Mail
    public String getMail() {
        return Mail;
    }

    public void setMail(String mail) {
        Mail = mail;
    }

    // Getter and setter methods for City
    public String getCity() {
        return City;
    }

    public void setCity(String city) {
        City = city;
    }

    // Getter and setter methods for Address
    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    // Getter and setter methods for age
    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    // Getter and setter methods for Gender
    public String getGender() {
        return Gender;
    }

    public void setGender(String gender) {
        Gender = gender;
    }

    // Getter and setter methods for username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and setter methods for Roll
    public String getRoll() {
        return Roll;
    }

    public void setRoll(String roll) {
        Roll = roll;
    }

    // Getter and setter methods for Password
    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }
}
