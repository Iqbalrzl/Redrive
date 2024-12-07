package com.Redrive.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.Redrive.Backend")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
