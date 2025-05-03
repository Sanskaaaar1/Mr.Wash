package com.main.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.main.Entity.Booking_Entity;
import com.main.Entity.Info_Entity;

import jakarta.transaction.Transactional;
@Repository
public interface BookingRepository extends JpaRepository<Booking_Entity,Integer> {
	 List<Booking_Entity> findByUser(Info_Entity user);

	
	 
	 @Query("SELECT b from Booking_Entity b Where b.user.authentication.username =:username ")
	 List<Booking_Entity> getByUserHistory(@Param("username") String username);
	 
	 @Modifying
	 @Transactional
	 @Query("UPDATE Booking_Entity b SET b.empName = :empName WHERE b.bookingId = :bookingid")
	 int AddEmp(@Param("bookingid") Integer bookingid,@Param("empName") String empName);
		 
	 
}
