package com.Redrive.Backend;

import com.Redrive.Backend.jwt.JwtService;
import com.Redrive.Backend.model.User;
import com.Redrive.Backend.repository.UserRepository;
import com.Redrive.Backend.request.RegisterRequest;
import com.Redrive.Backend.response.AuthenticationResponse;
import com.Redrive.Backend.security.Role;
import com.Redrive.Backend.service.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import static com.Redrive.Backend.security.Role.ADMIN;

@SpringBootApplication(scanBasePackages = "com.Redrive.Backend")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			UserRepository repository,
			AuthenticationService service,
			JwtService jwtService,
			PasswordEncoder passwordEncoder
	) {
		return args -> {
			var admin = new User();
			admin.setUsername("Admin");
			admin.setPassword(passwordEncoder.encode("password"));
			admin.setRole(ADMIN);
			var jwtToken = jwtService.generateToken(admin);
			AuthenticationResponse response = new AuthenticationResponse();
			response.setToken(jwtToken);
			System.out.println("Admin token: " + jwtToken);
		};
	}
}
