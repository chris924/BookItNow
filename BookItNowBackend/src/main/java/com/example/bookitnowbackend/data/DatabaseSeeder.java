package com.example.bookitnowbackend.data;

import com.example.bookitnowbackend.entity.AppService;
import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.repository.IAppointmentRepository;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import com.example.bookitnowbackend.repository.IServiceRepository;
import com.example.bookitnowbackend.repository.IUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final IUserRepository userRepository;
    private final IServiceRepository appServiceRepository;
    private final ICompanyRepository companyRepository;
    private final IAppointmentRepository appointmentRepository;

    public DatabaseSeeder(IAppointmentRepository appointmentRepository, ICompanyRepository companyRepository, IServiceRepository appServiceRepository, IUserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.companyRepository = companyRepository;
        this.appServiceRepository = appServiceRepository;
        this.userRepository = userRepository;
    }

@Override
    public void run(String... args) {

        //Creating entities
        User user = new User();
        Company company = new Company();
        List<AppService> appServices = new ArrayList<>();
        List<Appointment> appointments = new ArrayList<>();

        //User details
        user.setName("John Doe");
        user.setUsername("john_doe");
        user.setEmail("john.doe@example.com");
        user.setPassword("password");
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        // Company details
        company.setCompanyName("ABC Company");
        company.setDescription("A company description");
        company.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        // Create an AppService associated with the company
        AppService appService = new AppService();
        appService.setName("Service A");
        appService.setDescription("Description of Service A");
        appService.setCompany(company);
        appService.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        appServices.add(appService);
        company.setServices(appServices);

        // Create an appointment associated with the user and AppService
        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setAppService(appService);
        appointment.setDateAndTime(new Timestamp(System.currentTimeMillis() + 86400000)); // Set date and time one day from now
        appointments.add(appointment);

    userRepository.save(user);
    companyRepository.save(company);
    appServiceRepository.save(appService);
    appointmentRepository.save(appointment);

    }



}
