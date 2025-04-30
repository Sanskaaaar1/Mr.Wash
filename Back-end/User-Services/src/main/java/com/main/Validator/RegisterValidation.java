package com.main.Validator;

import org.springframework.validation.annotation.Validated;

@Validated  
public class RegisterValidation {

	private String firstName;
	
	private String middleName;
	
	private String lastName;
	
	private String PhoneNo;
	
	private String Mail;
	
	private String City;
	
	private String Address;
	
	private Integer age;
	
	private String Gender;
	
	private String username;
	
	private String Roll;
	
	private String Password;

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

	public RegisterValidation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setSurName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhoneNo() {
		return PhoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		PhoneNo = phoneNo;
	}

	public String getMail() {
		return Mail;
	}

	public void setMail(String mail) {
		Mail = mail;
	}

	public String getCity() {
		return City;
	}

	public void setCity(String city) {
		City = city;
	}

	public String getAddress() {
		return Address;
	}

	public void setAddress(String address) {
		Address = address;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getGender() {
		return Gender;
	}

	public void setGender(String gender) {
		Gender = gender;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRoll() {
		return Roll;
	}

	public void setRoll(String roll) {
		Roll = roll;
	}

	public String getPassword() {
		return Password;
	}

	public void setPassword(String password) {
		Password = password;
	}
}
