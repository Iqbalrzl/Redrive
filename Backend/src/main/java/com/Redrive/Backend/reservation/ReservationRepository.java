package com.Redrive.Backend.reservation;

import com.Redrive.Backend.vehicle.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByVehicle(Vehicle vehicle);
}
