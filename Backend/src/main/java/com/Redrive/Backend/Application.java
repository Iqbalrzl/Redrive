package com.Redrive.Backend;

import com.Redrive.Backend.auth.JwtService;
import com.Redrive.Backend.user.UserRepository;
import com.Redrive.Backend.auth.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

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
			System.out.println();
//			var admin = new Admin();
//			admin.setUsername("Admin");
//			admin.setPassword(passwordEncoder.encode("password"));
//			admin.setRole(ADMIN);
//			var jwtToken = jwtService.generateToken(admin);
//			AuthenticationResponse response = new AuthenticationResponse();
//			response.setToken(jwtToken);
//			System.out.println("Admin token: " + jwtToken);
		};
	}
}
