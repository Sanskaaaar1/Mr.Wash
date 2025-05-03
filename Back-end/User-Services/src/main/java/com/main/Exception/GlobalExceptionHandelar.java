package com.main.Exception;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletResponse;

@RestControllerAdvice // This annotation allows centralized exception handling across all controllers
public class GlobalExceptionHandelar {

    // Handler for NoHistoryFoundException
    @ExceptionHandler(NoHistoryFoundException.class)
    public ResponseEntity<String> handleNoHistoryFoundException(NoHistoryFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST); // Return 400 status with error message
    }

    // Handler for VehicleTypeException
    @ExceptionHandler(VehicleTypeException.class)
    public ResponseEntity<String> handleVehicleTypeException(VehicleTypeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST); // Return 400 status with error message
    }

    // Handler for VehicleCompanyException
    @ExceptionHandler(VehicleCompanyException.class)
    public ResponseEntity<String> handleVehicleCompanyException(VehicleCompanyException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST); // Return 400 status with error message
    }

    // Handler for VehicleNameException
    @ExceptionHandler(VehicleNameException.class)
    public ResponseEntity<String> handleVehicleNameException(VehicleNameException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST); // Return 400 status with error message
    }

    // Handler for ServicesException
    @ExceptionHandler(ServicesException.class)
    public ResponseEntity<String> handleServicesException(ServicesException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST); // Return 400 status with error message
    }

    // Handler for NumberInvalidException
    @ExceptionHandler(NumberInvalidException.class)
    public ResponseEntity<String> handleNumberInvalidException(NumberInvalidException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST); // Return 400 status with error message
    }

    // Handler for TimeBeforeException
    @ExceptionHandler(TimeBeforeException.class)
    public ResponseEntity<String> handleTimeBeforeException(TimeBeforeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST); // Return 400 status with error message
    }

    // Handler for TimeAfterException
    @ExceptionHandler(TimeAfterException.class)
    public ResponseEntity<String> handleTimeAfterException(TimeAfterException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST); // Return 400 status with error message
    }

    // Handler for TimeRequiredException
    @ExceptionHandler(TimeRequiredException.class)
    public ResponseEntity<String> handleTimeRequiredException(TimeRequiredException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST); // Return 400 status with error message
    }

    // Handler for DateRequiredException
    @ExceptionHandler(DateRequiredException.class)
    public ResponseEntity<String> handleDateRequiredException(DateRequiredException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST); // Return 400 status with error message
    }

    // Handler for DateFutureException
    @ExceptionHandler(DateFutureException.class)
    public ResponseEntity<String> handleDateFutureException(DateFutureException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST); // Return 400 status with error message
    }

    // Handler for FirstNameException
    @ExceptionHandler(FirstNameExceprtion.class)
    public ResponseEntity<String> handleFirstNameExceprtion(FirstNameExceprtion ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for MiddleNameException
    @ExceptionHandler(MiddleNameException.class)
    public ResponseEntity<String> handleMiddleNameException(MiddleNameException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for LastNameException
    @ExceptionHandler(LastNameException.class)
    public ResponseEntity<String> handleLastNameException(LastNameException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for PhoneNoNullException
    @ExceptionHandler(PhoneNoNullException.class)
    public ResponseEntity<String> handlePhoneNoNullException(PhoneNoNullException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for PhoneNoInvalidException
    @ExceptionHandler(PhoneNoInValid.class)
    public ResponseEntity<String> handlePhoneNoInValid(PhoneNoInValid ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for CityException
    @ExceptionHandler(CityException.class)
    public ResponseEntity<String> handleCityException(CityException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for AddressException
    @ExceptionHandler(AdressException.class)
    public ResponseEntity<String> handleAdressException(AdressException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for AgeNullException
    @ExceptionHandler(AgeNullException.class)
    public ResponseEntity<String> handleAgeNullException(AgeNullException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for AgeLimitException
    @ExceptionHandler(AgeLimitException.class)
    public ResponseEntity<String> handleAgeLimitException(AgeLimitException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for GenderException
    @ExceptionHandler(GenderException.class)
    public ResponseEntity<String> handleGenderException(GenderException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for UserNameException
    @ExceptionHandler(UserNameException.class)
    public ResponseEntity<String> handleUserNameException(UserNameException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for NullPasswordException
    @ExceptionHandler(NullPassword.class)
    public ResponseEntity<String> handleNullPassword(NullPassword ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for NullMailException
    @ExceptionHandler(NullMailException.class)
    public ResponseEntity<String> handleNullMailException(NullMailException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for MailInvalidException
    @ExceptionHandler(MailInvalidException.class)
    public ResponseEntity<String> handleMailInvalidException(MailInvalidException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }

    // Handler for UserNotFoundException
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND); // Return 404 status with error message
    }
}
