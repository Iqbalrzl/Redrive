package com.Redrive.Backend.Customer;

import com.Redrive.Backend.auth.*;
import com.Redrive.Backend.exception.CustomerDoesNotExist;
import com.Redrive.Backend.exception.InvalidAuthorizationHeader;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public CustomerService(
            CustomerRepository repository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager
    ){
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public List<Customer> listCustomer(){
        return repository.findAll();
    }

    public Customer getCustomerById(Integer id){
        Optional<Customer> customer = repository.findById(id);
        if (customer != null){
            return customer.get();
        }
        return null;
    }

    public MeResponse register(RegisterCustomerRequest request){
        var customer = new Customer();
        customer.setUsername(request.getUsername());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setRole(Role.CUSTOMER);
        customer.setBirthdate(request.getBirthdate());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        repository.save(customer);
        MeResponse response = new MeResponse();
        response.setId(customer.getId());
        response.setUsername(customer.getUsername());
        response.setBirthdate(customer.getBirthdate());
        response.setPhone(customer.getPhone());
        response.setAddress(customer.getAddress());
        response.setReservations(customer.getReservations());
        return response;
    }

    public MeResponse me(
            @NonNull HttpServletRequest request
    ){
        Customer customer = getAuthenticatedCustomer(request);
        MeResponse response = new MeResponse();
        response.setId(customer.getId());
        response.setUsername(customer.getUsername());
        response.setBirthdate(customer.getBirthdate());
        response.setPhone(customer.getPhone());
        response.setAddress(customer.getAddress());
        response.setReservations(customer.getReservations());
        return response;

    }

    public Customer getAuthenticatedCustomer(
            @NonNull HttpServletRequest request
    ){
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new InvalidAuthorizationHeader("Invalid Authorization header.");
        }

        final String token = authHeader.substring(7);

        String username = jwtService.extractUsername(token);
        Optional<Customer> cust = repository.findByUsername(username);

        if (cust.isPresent()){
            Customer customer = cust.get();
            return customer;
        }else {
            throw new CustomerDoesNotExist("Customer does not exist.");
        }
    };

}
