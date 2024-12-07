package com.Redrive.Backend.controllers;

import com.Redrive.Backend.models.Vehicle;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.Redrive.Backend.repository.VehicleRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleRepository repository;

    @GetMapping("")
    public List<Vehicle> list(){
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Vehicle> getById(@PathVariable Integer id){
        return repository.findById(id);
    }

    @PostMapping("")
    public Vehicle createVehicle(@Valid @RequestBody Vehicle vehicle){
        return repository.save(vehicle);
    }
}
