package com.example.bookitnowbackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class BookItNowBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookItNowBackendApplication.class, args);
	}

	@Bean
	CommandLineRunner run(R)


}
