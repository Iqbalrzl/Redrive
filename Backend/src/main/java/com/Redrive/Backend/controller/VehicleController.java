package com.Redrive.Backend.controller;

import com.Redrive.Backend.model.Vehicle;
import com.Redrive.Backend.config.Permission.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.Redrive.Backend.repository.VehicleRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/vehicles")
@PreAuthorize("hasRole('USER')")
public class VehicleController {

    @Autowired
    private VehicleRepository repository;

    @GetMapping("")
    @PreAuthorize("hasAuthority('user:read')")
    public List<Vehicle> list(){
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Vehicle> getById(@PathVariable Integer id){
        return repository.findById(id);
    }

    @PostMapping("")
    @PreAuthorize("hasAuthority('admin:create')")
    public Vehicle createVehicle(@Valid @RequestBody Vehicle vehicle){
        return repository.save(vehicle);
    }
}
