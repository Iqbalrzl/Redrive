package com.Redrive.Backend.Customer;

import com.Redrive.Backend.auth.AuthenticationRequest;
import com.Redrive.Backend.auth.AuthenticationResponse;
import com.Redrive.Backend.auth.AuthenticationService;
import com.Redrive.Backend.vehicle.Vehicle;
import com.Redrive.Backend.vehicle.VehicleRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/customer")
public class CustomerController {

    @Autowired
    private CustomerRepository repository;

    @Autowired
    private CustomerService service;

    @Autowired
    private AuthenticationService authService;

    @GetMapping("")
    public List<Customer> list(){
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Customer> getById(@PathVariable Integer id){
        return repository.findById(id);
    }

    @PostMapping("/register")
    public ResponseEntity<MeResponse> register(
            @Valid @RequestBody RegisterCustomerRequest request
    ){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/me")
    public ResponseEntity<MeResponse> me(
            @NonNull HttpServletRequest request
    ){
        return ResponseEntity.ok(service.me(request));
    }

}
