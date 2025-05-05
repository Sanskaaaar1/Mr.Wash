package com.main.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(StatusNotFoundException.class)
    public ResponseEntity<String> handleStatusNotFoundException(StatusNotFoundException ex) {
        // Respond with a custom error message and HTTP status 404 (Not Found)
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(IdNotFoundException.class)
    public  ResponseEntity<String> handelIdNotFoundException(IdNotFoundException ex){
    	return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    
    }
    
    @ExceptionHandler(StatusIsNotPending.class)
    public  ResponseEntity<String> handelStatusIsNotPending(StatusIsNotPending ex){
    	return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    
    }
    
    @ExceptionHandler(NoTodayTaskException.class)
    public ResponseEntity<String> handleNoTodayTaskException(NoTodayTaskException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(FirstNameExceprtion.class)
    public ResponseEntity<String> handleFirstNameExceprtion(FirstNameExceprtion ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(MiddleNameException.class)
    public ResponseEntity<String> handleMiddleNameException(MiddleNameException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(LastNameException.class)
    public ResponseEntity<String> handleLastNameException(LastNameException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(PhoneNoNullException.class)
    public ResponseEntity<String> handlePhoneNoNullException(PhoneNoNullException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(PhoneNoInValid.class)
    public ResponseEntity<String> handlePhoneNoInValid(PhoneNoInValid ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(CityException.class)
    public ResponseEntity<String> handleCityException(CityException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(AdressException.class)
    public ResponseEntity<String> handleAdressException(AdressException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(AgeNullException.class)
    public ResponseEntity<String> handleAgeNullException(AgeNullException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(AgeLimitException.class)
    public ResponseEntity<String> handleAgeLimitException(AgeLimitException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(GenderException.class)
    public ResponseEntity<String> handleGenderException(GenderException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(UserNameException.class)
    public ResponseEntity<String> handleUserNameException(UserNameException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(NullPassword.class)
    public ResponseEntity<String> handleNullPassword(NullPassword ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(NullMailException.class)
    public ResponseEntity<String> handleNullMailException(NullMailException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(MailInvalidException.class)
    public ResponseEntity<String> handleMailInvalidException(MailInvalidException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }@ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
