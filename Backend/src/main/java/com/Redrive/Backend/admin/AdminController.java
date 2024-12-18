package com.Redrive.Backend.admin;


import com.Redrive.Backend.Customer.Customer;
import com.Redrive.Backend.Customer.CustomerController;
import com.Redrive.Backend.Customer.CustomerService;
import com.Redrive.Backend.auth.AuthenticationRequest;
import com.Redrive.Backend.auth.AuthenticationResponse;
import com.Redrive.Backend.auth.AuthenticationService;
import com.Redrive.Backend.auth.RegisterRequest;
import com.Redrive.Backend.reservation.Reservation;
import com.Redrive.Backend.reservation.ReservationService;
import com.Redrive.Backend.vehicle.CreateVehicleRequest;
import com.Redrive.Backend.vehicle.UpdateVehicleRequest;
import com.Redrive.Backend.vehicle.Vehicle;
import com.Redrive.Backend.vehicle.VehicleService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("api/admin")
public class AdminController {

    @Autowired
    private final AdminService service;

    @Autowired
    private final AuthenticationService authService;

    @Autowired
    private final VehicleService vhclService;

    @Autowired
    private final CustomerService custService;

    @Autowired
    private final ReservationService reservationService;


    public AdminController(
            AdminService service,
            AuthenticationService authService,
            VehicleService vhclService,
            CustomerService custService,
            ReservationService reservationService
    ){
        this.service = service;
        this.authService = authService;
        this.vhclService = vhclService;
        this.custService = custService;
        this.reservationService = reservationService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/me")
    public ResponseEntity<AdminResponse> me(
            @NonNull HttpServletRequest request
            ){
        return ResponseEntity.ok(service.me(request));
    }

    @GetMapping("/vehicle")
    public ResponseEntity<List<Vehicle>> listVehicle() {
        return ResponseEntity.ok(vhclService.listVehicle());
    }

    @GetMapping("/vehicle/{id}")
    public ResponseEntity<?> getVehicleById(@PathVariable Integer id) {
        Vehicle vehicle = vhclService.getVehicleById(id);
        if (vehicle != null)
            return ResponseEntity.ok(vehicle);
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "Vehicle does not exist"));
    }

    @PostMapping("/vehicle")
    //    @PreAuthorize("hasAuthority('admin:create')")
    public ResponseEntity<HashMap<String,String>> createVehicle(@Valid @RequestBody CreateVehicleRequest request) throws IOException {
        HashMap<String,String> message = new HashMap<>();
        message.put("message",vhclService.createVehicle(request));
        return ResponseEntity.ok(message);
    }

    @PutMapping("/vehicle/{id}/update")
    public ResponseEntity<Map<String,String>> updateVehicle(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateVehicleRequest request
    ){
        if (vhclService.updateVehicle(id,request)){
            return ResponseEntity.ok(Map.of("message","Successfully updated."));
        };
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "Vehicle does not exist."));
    }

    @DeleteMapping("/vehicle/{id}/delete")
    public ResponseEntity<Map<String,String>> deleteVehicle(
            @PathVariable Integer id
    ){
        Map<Boolean, String> message = vhclService.deleteVehicle(id);
        if (message.containsKey(true)){
            return ResponseEntity.ok(Map.of("message", message.get(true)));
        };
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", message.get(false)));
    }

    @PostMapping("/vehicle/{id}/image")
    public ResponseEntity<?> uploadVehicleImageById(
            @PathVariable Integer id,
            @RequestParam("image") MultipartFile file
    )throws IOException {
        String uploadImage = vhclService.setVehicleImage(id,file);
        return ResponseEntity.ok(uploadImage);
    }

    @GetMapping("/customer")
    public ResponseEntity<List<Customer>> listCustomer(){
       return ResponseEntity.ok(custService.listCustomer());
    }

    @GetMapping("customer/{id}")
    public ResponseEntity<?> getCustomerById(
            @PathVariable Integer id
    ){
        Customer customer = custService.getCustomerById(id);
        if (customer != null){
            return ResponseEntity.ok(customer);
        }
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("message","Customer does not exist"));
    }

    @GetMapping("/reservation")
    public ResponseEntity<List<Reservation>> listReservation(){
        return ResponseEntity.ok(reservationService.listReservation());
    }

    @GetMapping("/reservation/{id}")
    public ResponseEntity<?> getReservationById(
            @PathVariable Integer id
    ){
        Reservation reservation = reservationService.getReservationById(id);
        if(reservation != null){
            return ResponseEntity.ok(reservation);
        }
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "Reservation does not exist."));
    }

}
