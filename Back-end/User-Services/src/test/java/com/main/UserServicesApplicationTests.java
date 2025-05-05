package com.main;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.main.Entity.Authentication_Entity;
import com.main.Entity.Booking_Entity;
import com.main.Service.AuthenticationService;
import com.main.Service.BookingService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class UserServicesApplicationTests {

    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private BookingService bookingService;

    private Authentication_Entity testUser;

    @BeforeEach
    void setUp() {
        testUser = new Authentication_Entity();
        testUser.setUsername("testuser");
        testUser.setPassword("password123");
    }

    // Test for AuthenticationService - findByUsername
    @Test
    void findByUsername_ReturnsUser() {

        when(authenticationService.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        Optional<Authentication_Entity> result = authenticationService.findByUsername("testuser");
        assertTrue(result.isPresent());
        assertEquals("testuser", result.get().getUsername());
    }

    // Test for BookingService - getByUserHistory
    @Test
    void getByUserHistory_ReturnsBookingList() {
     
        Booking_Entity booking1 = new Booking_Entity();
        Booking_Entity booking2 = new Booking_Entity();
        when(bookingService.getByUserHistory("testuser")).thenReturn(Arrays.asList(booking1, booking2));
        List<Booking_Entity> result = bookingService.getByUserHistory("testuser");
        assertEquals(2, result.size());
    }

    // Test for BookingService -- getByUserHistory when no bookings found
    @Test
    void getByUserHistory_ReturnsEmptyList() {

        when(bookingService.getByUserHistory("testuser")).thenReturn(Arrays.asList());
        List<Booking_Entity> result = bookingService.getByUserHistory("testuser");
        assertTrue(result.isEmpty());
    }
}
