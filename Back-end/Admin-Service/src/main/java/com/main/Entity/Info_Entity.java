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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Info_Entity{

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer infoId;
	    
	    @Column(nullable = false)
	    private String firstName;
	    @Column(nullable = false)
	    private String middleName;
	    @Column( nullable = false)
	    private String lastname;
	    
	    @Column(unique = true, nullable = false)
	    private String email;
	    @Column(nullable = false)
	    private Integer age;
	    @Column(nullable=false)
	    private Long phoneNumber;
		@Enumerated(EnumType.STRING)
	    private Gender gender;
	    @Column(nullable = false)
	    private String address;
	    @Column(nullable = true)
	    private String city;
	    
	    
	    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	    private Authentication_Entity authentication;
	    
	    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	    @JsonIgnore
	    private List<Booking_Entity> bookings = new ArrayList<>();
	    
//	    public void addBooking(Booking_Entity booking) {
//	        bookings.add(booking);
//	        booking.setUser(this);
//	    }
//
//	    public void removeBooking(Booking_Entity booking) {
//	        bookings.remove(booking);
//	        booking.setUser(null);
//	    }
	    
	    // Getters and Setters
//	    public String getEmpName() {
//	        return empName;
//	    }
//
//	    public void setEmpName(String empName) {
//	        this.empName = empName;
//	    }

	    
	    public enum Gender {
	        Male, Female, Other
	    }

	    public Long getPhoneNumber() {
				return phoneNumber;
			}

		public void setPhoneNumber(Long phoneNumber) {
				this.phoneNumber = phoneNumber;
			}
		
		public Integer getUserId() {
			return infoId;
		}

		public void setUserId(Integer userId) {
			this.infoId = userId;
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

		public String getLastname() {
			return lastname;
		}

		public void setLastname(String lastname) {
			this.lastname = lastname;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public Integer getAge() {
			return age;
		}

		public void setAge(Integer age) {
			this.age = age;
		}

		public Gender getGender() {
			return gender;
		}

		public void setGender(Gender gender) {
			this.gender = gender;
		}

		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}

		public String getCity() {
			return city;
		}

		public void setCity(String city) {
			this.city = city;
		}

		public Authentication_Entity getAuthentication() {
			return authentication;
		}

		public void setAuthentication(Authentication_Entity authentication) {
			this.authentication = authentication;
		}

		public List<Booking_Entity> getBookings() {
			return bookings;
		}

		public void setBookings(List<Booking_Entity> bookings) {
			this.bookings = bookings;
		}
	    

}
