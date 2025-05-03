package com.main.RestController;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.main.DTO.JwtResponse;
import com.main.Entity.Authentication_Entity;
import com.main.Entity.Info_Entity;
import com.main.Exception.AdressException;
import com.main.Exception.AgeLimitException;
import com.main.Exception.AgeNullException;
import com.main.Exception.CityException;
import com.main.Exception.FirstNameExceprtion;
import com.main.Exception.GenderException;
import com.main.Exception.LastNameException;
import com.main.Exception.MailInvalidException;
import com.main.Exception.MiddleNameException;
import com.main.Exception.NullMailException;
import com.main.Exception.NullPassword;
import com.main.Exception.PhoneNoInValid;
import com.main.Exception.PhoneNoNullException;
import com.main.Exception.UserNameException;
import com.main.Repository.AuthRepo;
import com.main.Repository.InfoRepository;
import com.main.Service.AuthService;
import com.main.Service.AuthenticationService;
import com.main.Validator.RegisterValidation;

@RestController // Marks this class as a REST controller
@CrossOrigin(origins = "http://localhost:3000") // Allows cross-origin requests from this URL
public class AuthController {

    @Autowired
	public AuthService service; // Service for handling authentication logic
    @Autowired
    public  InfoRepository infoRepo; // Repository to handle Info_Entity database operations
    @Autowired
    public AuthRepo authRepo; // Repository to handle Authentication_Entity database operations
    @Autowired
    public BCryptPasswordEncoder passwordEncoder; // Bean for password encryption
    @Autowired
    public AuthenticationService authService; // Service to manage authentication operations

    // Endpoint for user registration
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterValidation registers) {
        // Validation checks for the input fields (all fields should be valid)
        if(registers.getFirstName()==null || registers.getFirstName().trim().isEmpty()) {
            throw new FirstNameExceprtion("First Name is Required");
        }
        if(registers.getMiddleName()==null || registers.getMiddleName().trim().isEmpty()) {
            throw new MiddleNameException("Middle Name is Required");
        }
        if(registers.getLastName()==null || registers.getLastName().trim().isEmpty()) {
            throw new LastNameException("Last Name is Required");
        }
        if(registers.getPhoneNo()==null) {
            throw new PhoneNoNullException("PhoneNo is Required");
        }
        if(!registers.getPhoneNo().matches("[0-9]{10}")) {
            throw new PhoneNoInValid("PhoneNo should be 10 digits");
        }
        if(registers.getCity()==null || registers.getCity().trim().isEmpty()) {
            throw new CityException("City is Required");
        }
        if(registers.getAddress()==null || registers.getAddress().trim().isEmpty()) {
            throw new AdressException("Address is Required");
        }
        if(registers.getAge()==null ) {
            throw new AgeNullException("Age is Required");
        }
        if(registers.getAge()<18) {
            throw new AgeLimitException("Age should be more than 18");
        }
        if(registers.getGender() == null || !registers.getGender().equalsIgnoreCase("male") && 
               !registers.getGender().equalsIgnoreCase("female")) {
              throw new GenderException("Gender should be MALE or FEMALE");
        }
        if(registers.getUsername()==null || registers.getUsername().trim().isEmpty()) {
            throw new UserNameException("User Name Required");
        }
        if(registers.getPassword()==null || registers.getPassword().trim().isEmpty()) {
            throw new NullPassword("Password is Required");
        }
        if(registers.getMail()==null || registers.getMail().trim().isEmpty()) {  
            throw new NullMailException("Mail is Required");
        }
        if (!registers.getMail().matches("^[a-zA-Z0-9._%+-]+@gmail\\.com$")) {
            throw new MailInvalidException("Mail is Invalid");
        }

        // Create and save Info_Entity first (user details like name, city, phone, etc.)
        Info_Entity info = new Info_Entity();
        info.setFirstName(registers.getFirstName());
        info.setMiddleName(registers.getMiddleName());
        info.setLastname(registers.getLastName());
        info.setEmail(registers.getMail());
        info.setAge(registers.getAge());
        info.setAddress(registers.getAddress());
        info.setCity(registers.getCity());
        info.setPhoneNumber(Long.parseLong(registers.getPhoneNo()));
        info.setGender(Info_Entity.Gender.valueOf(registers.getGender().substring(0, 1).toUpperCase() + registers.getGender().substring(1).toLowerCase()));

        // Create Authentication_Entity (username, password, role)
        Authentication_Entity auth = new Authentication_Entity();
        auth.setRole(Authentication_Entity.Role.USER); // Set default user role
        auth.setUsername(registers.getUsername());
        auth.setPassword(passwordEncoder.encode(registers.getPassword())); // Encrypt password
        
        // Establish the bidirectional relationship between Info_Entity and Authentication_Entity
        auth.setUser(info);  // Set the Info_Entity reference in Authentication_Entity
        info.setAuthentication(auth);  // Set the Authentication_Entity reference in Info_Entity
        
        // Save the entities (order matters due to foreign key constraints)
        info = infoRepo.save(info);  // Save Info_Entity first to generate ID
        authRepo.save(auth);         // Then save Authentication_Entity with the reference
        
        return ResponseEntity.ok("Account created successfully!"); // Success response
    }

    // Endpoint for user login (verifies user credentials)
    @PostMapping("/login")
    public  String login(@RequestBody Authentication_Entity user) {
        return service.verify(user); // Call service to verify user credentials
    }

    // Endpoint to search for user by username
    @GetMapping("/SearchUsername/{username}")
    public ResponseEntity<?> searchByUsername(@PathVariable String username) {
        Optional<Authentication_Entity> authOptional = authService.findByUsername(username);
        if (authOptional.isPresent()) {
            return ResponseEntity.ok(authOptional.get()); // If user found, return details
        } else {
            return ResponseEntity.ok(null); // If user not found, return null or 404
        }
    }
}
