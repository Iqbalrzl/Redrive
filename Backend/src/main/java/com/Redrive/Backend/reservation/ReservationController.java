package com.Redrive.Backend.reservation;


import com.Redrive.Backend.exception.VehicleDoesNotExist;
import com.Redrive.Backend.vehicle.Vehicle;
import com.Redrive.Backend.vehicle.VehicleRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class ReservationController {

    @Autowired
    private final ReservationRepository repository;

    @Autowired
    private final VehicleRepository vhclrepository;

    @Autowired
    private final ReservationService service;

    public ReservationController(
            ReservationRepository repository,
            VehicleRepository vhclrepository,
            ReservationService service
    ){
        this.vhclrepository = vhclrepository;
        this.repository = repository;
        this.service = service;
    }

    @GetMapping("api/vehicle/{id}/reservation")
    public ResponseEntity<List<ReservationResponse>> reservationList (
            @PathVariable Integer id
    ){
        return ResponseEntity.ok(service.reservationListByVehicleId(id));
    }

    @PostMapping("api/vehicle/{id}/reservation")
    public ResponseEntity<ReservationResponse> createReservation(
            @NonNull HttpServletRequest request,
           @Valid @RequestBody ReservationRequest reservationRequest,
            @PathVariable Integer id
    ){
        return ResponseEntity.ok(service.createReservation(request,reservationRequest,id));
    }

}
