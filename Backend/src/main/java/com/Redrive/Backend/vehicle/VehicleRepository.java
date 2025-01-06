package com.Redrive.Backend.vehicle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    List<Vehicle> findByModelContainingIgnoreCaseOrBrandContainingIgnoreCase(String model, String brand);
}
