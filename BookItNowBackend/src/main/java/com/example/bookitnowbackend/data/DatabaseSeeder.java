package com.example.bookitnowbackend.data;

import com.example.bookitnowbackend.entity.*;
import com.example.bookitnowbackend.repository.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final IUserRepository userRepository;

    private final ICompanyRepository companyRepository;
    private final IAppointmentRepository appointmentRepository;

    private final IRoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(IAppointmentRepository appointmentRepository, ICompanyRepository companyRepository, IRoleRepository roleRepository, IUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.appointmentRepository = appointmentRepository;
        this.companyRepository = companyRepository;

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        resetDatabase();

    }

    @Scheduled(cron = "0 0 0 * * *") // MIDNIGHT RESET
    public void scheduledTask()
    {
        resetDatabase();

    }

    private void resetDatabase() {
        appointmentRepository.deleteAll();
        userRepository.deleteAll();
        companyRepository.deleteAll();
        roleRepository.deleteAll();

        createRolesIfNotExists();
        createAdmin();
        createEntities();
    }


    private void createAdmin() {

        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(roleRepository.findByAuthority("ADMIN").orElseThrow(() -> new RuntimeException("USER role not found")));

        User admin = new User();
        admin.setName("admin");
        admin.setUsername("admin");
        admin.setEmail("admin@admin.com");
        admin.setPassword(passwordEncoder.encode("password"));
        admin.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        admin.setAuthorities(adminRoles);
        admin.setAppointments(new ArrayList<>());

        userRepository.save(admin);
    }


    private void createEntities() {
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(roleRepository.findByAuthority("USER").orElseThrow(() -> new RuntimeException("USER role not found")));

       User user1 = createUser("John Doe", "john.doe", "john.doe@email.com", "password123", new Timestamp(System.currentTimeMillis()), new ArrayList<>(), userRoles);
       User user2 = createUser("Alice Smith", "alice.smith", "alice.smith@email.com", "securePass", new Timestamp(System.currentTimeMillis()), new ArrayList<>(), userRoles);
       User user3 = createUser("Bob Johnson", "bob.johnson", "bob.johnson@email.com", "qwerty", new Timestamp(System.currentTimeMillis()), new ArrayList<>(), userRoles);



        Set<Role> companyRoles = new HashSet<>();
        companyRoles.add(roleRepository.findByAuthority("COMPANY").orElseThrow(() -> new RuntimeException("COMPANY role not found")));


      Company company1 = createCompany("Car Detailing", "cardetailing@gmail.com", "password", "We work with cars with passion", "Car detailing", "We detail and customize your car!", companyRoles);
      Company company2 = createCompany("IT Solutions", "itsolutions@gmail.com", "password", "Providing cutting-edge IT solutions", "IT Services", "Customized IT solutions for your business", companyRoles);
      Company company3 = createCompany("Home Cleaning", "homecleaning@gmail.com", "password", "Your trusted partner in home cleaning", "Home Cleaning", "We make your home shine!", companyRoles);


      createAppointment(company1, 1);
        createAppointment(company1, 2);
      createAppointment(company2, 1);
        createAppointment(company2, 2);
      createAppointment(company3, 1);
        createAppointment(company3, 2);

    }


    @NotNull
    private User createUser(String name, String username, String email, String password, Timestamp createdAt, List<Appointment> appointments, Set<Role> roles) {

        User user = new User();
        user.setName(name);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setCreatedAt(createdAt);
        user.setAuthorities(roles);
        user.setAppointments(appointments);

        userRepository.save(user);

        return user;
    }





    private Company createCompany(String companyName, String email, String password, String description, String serviceName, String serviceDescription, Set<Role> roles) {

        Company company = new Company();
        company.setCompanyName(companyName);
        company.setEmail(email);
        company.setPassword(passwordEncoder.encode(password));
        company.setAuthorities(roles);
        company.setDescription(description);
        company.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        company.setServiceName(serviceName);
        company.setServiceDescription(serviceDescription);

        companyRepository.save(company);

        return company;
    }

    private void createAppointment(Company company, Integer plusDay) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime nextDay8AM = currentDateTime.plusDays(plusDay).withHour(8).withMinute(0).withSecond(0).withNano(0);


        DayOfWeek dayOfWeek = nextDay8AM.getDayOfWeek();
        if (dayOfWeek == DayOfWeek.SATURDAY || dayOfWeek == DayOfWeek.SUNDAY) {
            nextDay8AM = nextDay8AM.plusDays(2); // Move to Monday
        }

        Timestamp timestamp = Timestamp.valueOf(nextDay8AM);

        Appointment appointment = new Appointment();

        appointment.setCompany(company);
        appointment.setDateAndTime(timestamp);

        appointmentRepository.save(appointment);
        companyRepository.save(company);
    }



    private void createRolesIfNotExists() {
        if (roleRepository.findByAuthority("COMPANY").isEmpty()) {
            Role companyRole = new Role("COMPANY");
            roleRepository.save(companyRole);
        }

        if (roleRepository.findByAuthority("USER").isEmpty()) {
            Role userRole = new Role("USER");
            roleRepository.save(userRole);
        }

        if (roleRepository.findByAuthority("ADMIN").isEmpty()) {
            Role adminRole = new Role("ADMIN");
            roleRepository.save(adminRole);
        }
    }
}