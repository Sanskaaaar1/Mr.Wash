package com.main.Controller;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.main.Entity.Booking_Entity;
import com.main.Entity.Info_Entity;
import com.main.Repository.BookingRepository;
import com.main.Repository.InfoRepository;

import com.main.Validator.BookingValidation;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Controller
@Validated  
public class DashBoardController {
	
	@Autowired
	BookingRepository bookingRepository;
	@Autowired
	InfoRepository infoRepository;
    @ModelAttribute("vehicle_list") 
    public List<String> vehicleList() {
        return Arrays.asList("Car", "Bus", "Truck", "Auto");
    }
    
    @ModelAttribute("service_list")
    public List<String> serviceList() {
        return Arrays.asList("Basic", "Premium", "Deluxe");
    }
    

    @GetMapping("/dashboard")
    public ModelAndView dashBoardPage() {
        ModelAndView mav = new ModelAndView();
        mav.addObject("heading", "......CAR_WASHING_CENTER......");
        mav.setViewName("DashBoard");
        return mav;
    }

    @GetMapping("/booking-page")
    public ModelAndView bookingPage() {
        ModelAndView mav = new ModelAndView();
        mav.addObject("bookingValidator", new BookingValidation());
        mav.setViewName("Booking_Page");
        return mav;
    }

    @PostMapping("/process-booking")
    public String processBooking(
        @Valid @ModelAttribute("bookingValidator") BookingValidation bookingValidation,
        BindingResult bindingResult) {
    	
    	if (bookingValidation.getVehicleType() == null || bookingValidation.getVehicleType().trim().isEmpty()) {
    	    bindingResult.rejectValue("vehicleType", "vehicleType.invalid", "Vehicle type is required");
    	}

    	if (bookingValidation.getVehicleCompany() == null || bookingValidation.getVehicleCompany().trim().isEmpty()) {
    	    bindingResult.rejectValue("vehicleCompany", "vehicleCompany.invalid", "Vehicle Company is required");
    	}

    	if (bookingValidation.getVehicleName() == null || bookingValidation.getVehicleName().trim().isEmpty()) {
    	    bindingResult.rejectValue("vehicleName", "vehicleName.invalid", "Vehicle Name is required");
    	}

    	if (bookingValidation.getServices() == null || bookingValidation.getServices().trim().isEmpty()) {
    	    bindingResult.rejectValue("services", "services.invalid", "Service type is required");
    	}

    	if (bookingValidation.getVehicleNumber() == null || 
    	    !bookingValidation.getVehicleNumber().matches("^[A-Z]{2}[ -][0-9]{1,2}[ -][A-Z]{1,2}[ -][0-9]{4}$")) {
    	    bindingResult.rejectValue("vehicleNumber", "vehicleNumber.invalid", 
    	                              "Invalid format. Example: MH 12 AB 1234");
    	}

    	if (bookingValidation.getTime() != null) {
    	    if (bookingValidation.getTime().isBefore(LocalTime.of(10, 0))) {
    	        bindingResult.rejectValue("time", "time.invalid", "Time must be after 10 AM");
    	    } else if (bookingValidation.getTime().isAfter(LocalTime.of(18, 0))) {
    	        bindingResult.rejectValue("time", "time.invalid", "Time must be before 6 PM");
    	    }
    	} else {
    	    bindingResult.rejectValue("time", "time.required", "Time is required");
    	}

    	if (bookingValidation.getDate() == null) {
    	    bindingResult.rejectValue("date", "date.required", "Date is required");
    	} else if (bookingValidation.getDate().isBefore(LocalDate.now())) {
    	    bindingResult.rejectValue("date", "date.past", "Date must be in the future");
    	}

    	if (bindingResult.hasErrors()) {
    	    return "Booking_Page";
    	}
        
        try {
        	Booking_Entity booking=new Booking_Entity();
        	//String username=principal.getName();
        
        	Info_Entity user =infoRepository.findByAuthenticationUsername("sanskar11");
        	booking.setUser(user);
        	booking.setVehicleType(bookingValidation.getVehicleType());
        	booking.setVehicleCompany(bookingValidation.getVehicleCompany());
        	booking.setVehicleName(bookingValidation.getVehicleName());
        	booking.setVehicleNumber(bookingValidation.getVehicleNumber());
        	booking.setSlotDate(bookingValidation.getDate());
        	booking.setSlotTime(bookingValidation.getTime());
        	booking.setServiceType(bookingValidation.getServices());
        	booking.setBookingDate(LocalDate.now());
        	booking.setBookingTime(LocalTime.now());
        	booking.setStatus("pending");
        	//System.out.println(bookingValidation);
        	bookingRepository.save(booking);
        }catch(Exception e) {
	
        }

       return "Success";
    }
    
    @GetMapping("/history-page")
    public String History(Model model) {
    	Info_Entity user =infoRepository.findByAuthenticationUsername("sanskar11");
    	if(user!=null) {
    		List<Booking_Entity> bookings=user.getBookings();
    		model.addAttribute("bookings", bookings);
    	}
    	return "History_Page";
    }
}