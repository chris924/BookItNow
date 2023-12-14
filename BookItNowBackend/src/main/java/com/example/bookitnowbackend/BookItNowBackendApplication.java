package com.example.bookitnowbackend;

import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.entity.Role;
import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.repository.IRoleRepository;
import com.example.bookitnowbackend.repository.IUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@SpringBootApplication
@RestController
public class BookItNowBackendApplication {

	public static void main(String[] args) throws InterruptedException {

			Thread.sleep(15000);



		SpringApplication.run(BookItNowBackendApplication.class, args);
	}



}
