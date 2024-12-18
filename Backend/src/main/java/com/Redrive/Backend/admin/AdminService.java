package com.Redrive.Backend.admin;

import com.Redrive.Backend.Customer.Customer;
import com.Redrive.Backend.Customer.CustomerRepository;
import com.Redrive.Backend.Customer.MeResponse;
import com.Redrive.Backend.auth.JwtService;
import com.Redrive.Backend.auth.RegisterCustomerRequest;
import com.Redrive.Backend.auth.Role;
import com.Redrive.Backend.exception.CustomerDoesNotExist;
import com.Redrive.Backend.exception.InvalidAuthorizationHeader;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AdminService(
            AdminRepository repository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager
    ){
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public Admin getAuthenticatedAdmin(
            @NonNull HttpServletRequest request
    ){
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new InvalidAuthorizationHeader("Invalid Authorization header.");
        }

        final String token = authHeader.substring(7);

        String username = jwtService.extractUsername(token);
        Optional<Admin> adm = repository.findByUsername(username);

        if (adm.isPresent()){
            Admin admin = adm.get();
            return admin;
        }else {
            throw new CustomerDoesNotExist("Customer does not exist.");
        }
    };

    public AdminResponse me(
            @NonNull HttpServletRequest request
    ){
        Admin admin = getAuthenticatedAdmin(request);
        AdminResponse response = new AdminResponse();
        response.setId(admin.getId());
        response.setUsername(admin.getUsername());
        return response;
    }

}
