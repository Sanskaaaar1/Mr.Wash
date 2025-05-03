package com.main.AOPLogger;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

import com.main.Entity.Booking_Entity;
import com.main.Entity.Info_Entity;
import com.main.Exception.UserNotFoundException;
import org.springframework.security.core.Authentication;

@Aspect
@Component
public class AopLogger {
    
    private static final Logger logger = LoggerFactory.getLogger(AopLogger.class);

    // ========== Authentication Controller Pointcuts ==========
    @Pointcut("execution(* com.main.RestController.AuthController.login(..))")
    public void loginPointcut() {}
    
    @Pointcut("execution(* com.main.RestController.AuthController.register(..))")
    public void registerPointcut() {}

    // ========== Employee Controller Pointcuts ==========
    @Pointcut("execution(* com.main.RestController.MyRestController.searchByStatus(..))")
    public void searchByStatusPointcut() {}
    
    @Pointcut("execution(* com.main.RestController.MyRestController.updateById(..))")
    public void updateBookingStatusPointcut() {}
    
    @Pointcut("execution(* com.main.RestController.MyRestController.todaysTask(..))")
    public void todaysTaskPointcut() {}
    
    @Pointcut("execution(* com.main.RestController.MyRestController.searchByID(..))")
    public void searchByIDPointcut() {}
    
    @Pointcut("execution(* com.main.RestController.MyRestController.searchByName(..))")
    public void searchByNamePointcut() {}
    
    @Pointcut("execution(* com.main.RestController.MyRestController.MyDetails(..))")
    public void myDetailsPointcut() {}
    
    @Pointcut("execution(* com.main.RestController.MyRestController.addEmpname(..))")
    public void addEmpNamePointcut() {}
    
    @Pointcut("execution(* com.main.RestController.MyRestController.getMyHandledBookings(..))")
    public void employeeHistoryPointcut() {}

    // ========== Authentication Advices ==========
    @AfterReturning(pointcut = "loginPointcut()", returning = "result")
    public void afterSuccessfulLogin(Object result) {
        logger.info("Login successful");
    }

    @AfterThrowing(pointcut = "loginPointcut()", throwing = "ex")
    public void afterLoginException(Exception ex) {
        logger.error("Login failed: {}", ex.getMessage());
    }
    
    @AfterReturning(pointcut="registerPointcut()", returning="result")
    public void afterSuccessfullyRegister(Object result) {
        logger.info("Registration successful");
    }
    
    @AfterThrowing(pointcut="registerPointcut()", throwing="ex")
    public void afterRegisterException(Exception ex) {
        logger.error("Registration failed: {}", ex.getMessage());
    }

    // ========== Employee Controller Advices ==========
    @Before("searchByStatusPointcut() && args(status)")
    public void beforeSearchByStatus(String status) {
        logger.info("Searching bookings by status: {}", status);
    }

    @AfterReturning(pointcut = "searchByStatusPointcut()", returning = "bookings")
    public void afterSearchByStatus(List<Booking_Entity> bookings) {
        logger.info("Found {} bookings matching status", bookings.size());
    }

    @Before("updateBookingStatusPointcut() && args(id,status)")
    public void beforeUpdateStatus(Integer id, String status) {
        logger.info("Updating booking {} to status: {}", id, status);
    }

    @AfterReturning(pointcut = "updateBookingStatusPointcut()", returning = "booking")
    public void afterUpdateStatus(Optional<Booking_Entity> booking) {
        if (booking.isPresent()) {
            logger.info("Booking {} updated successfully", booking.get().getBookingId());
        } else {
            logger.warn("Booking not found for update");
        }
    }

    @AfterReturning(pointcut = "todaysTaskPointcut()", returning = "bookings")
    public void afterTodaysTask(List<Booking_Entity> bookings) {
        logger.info("Found {} bookings for today", bookings.size());
    }

    @Before("searchByIDPointcut() && args(id)")
    public void beforeSearchByID(Integer id) {
        logger.info("Searching booking by ID: {}", id);
    }

    @Before("searchByNamePointcut() && args(name)")
    public void beforeSearchByName(String name) {
        logger.info("Searching bookings by customer name: {}", name);
    }

    @AfterReturning(pointcut = "searchByNamePointcut()", returning = "bookings")
    public void afterSearchByName(List<Booking_Entity> bookings) {
        logger.info("Found {} bookings for customer", bookings.size());
    }

    @AfterReturning(pointcut = "myDetailsPointcut()", returning = "userDetails")
    public void afterGetMyDetails(Info_Entity userDetails) {
        logger.info("Retrieved details for employee: {}", userDetails.getFirstName());
    }

    @Before("addEmpNamePointcut() && args(bookingid)")
    public void beforeAddEmpName(Integer bookingid) {
        logger.info("Adding employee name to booking: {}", bookingid);
    }

    @AfterReturning(pointcut = "addEmpNamePointcut()", returning = "booking")
    public void afterAddEmpName(Booking_Entity booking) {
        logger.info("Booking {} assigned to employee: {}", 
                   booking.getBookingId(), booking.getEmpName());
    }

    @AfterReturning(pointcut = "employeeHistoryPointcut()", returning = "bookings")
    public void afterGetEmployeeHistory(List<Booking_Entity> bookings) {
        logger.info("Employee retrieved {} handled bookings", bookings.size());
    }

    // ========== Exception Handling ==========
    @AfterThrowing(pointcut = "within(com.main.RestController.MyRestController)", throwing = "ex")
    public void handleEmployeeControllerExceptions(UserNotFoundException ex) {
        logger.error("Employee operation failed: {}", ex.getMessage());
    }

    
}