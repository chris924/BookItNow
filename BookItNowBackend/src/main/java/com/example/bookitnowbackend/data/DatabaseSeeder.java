package com.example.bookitnowbackend.data;

import com.example.bookitnowbackend.entity.*;
import com.example.bookitnowbackend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final IUserRepository userRepository;
    private final IServiceRepository appServiceRepository;
    private final ICompanyRepository companyRepository;
    private final IAppointmentRepository appointmentRepository;

    private final IRoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(IAppointmentRepository appointmentRepository, ICompanyRepository companyRepository, IRoleRepository roleRepository, IServiceRepository appServiceRepository, IUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.appointmentRepository = appointmentRepository;
        this.companyRepository = companyRepository;
        this.appServiceRepository = appServiceRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

@Override
    public void run(String... args) {

  /*  appointmentRepository.deleteAll(); //FOR DELETING DATABASE ON STARTUP
    userRepository.deleteAll();
    appServiceRepository.deleteAll();
    companyRepository.deleteAll();
    roleRepository.deleteAll();*/


    CreateAdmin();
    CreateUser();
    CreateCompany();


    }

    private void CreateAdmin()
    {
        System.out.println("CREATING ADMIN");
        if(roleRepository.findByAuthority("ADMIN").isEmpty())
        {
            // Creating the admin role with authority "ADMIN"
            Role adminRole = new Role("ADMIN");
            roleRepository.save(adminRole);

            // Creating a user with the admin role
            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);

            List<Appointment> appointments = new ArrayList<>();
            User admin = new User();
            admin.setName("admin");
            admin.setUsername("admin");
            admin.setEmail("admin@admin.com");
            admin.setPassword(passwordEncoder.encode("password"));
            admin.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            admin.setAuthorities(roles);
            admin.setAppointments(appointments);

            userRepository.save(admin);
        }
    }

    private void CreateUser()
    {
        if(roleRepository.findByAuthority("USER").isEmpty())
        {
            // Creating the admin role with authority "ADMIN"
            Role userRole = new Role("USER");
            roleRepository.save(userRole);

            // Creating a user with the admin role
            Set<Role> roles = new HashSet<>();
            roles.add(userRole);

            List<Appointment> appointments = new ArrayList<>();
            User user = new User();
            user.setName("user");
            user.setUsername("user");
            user.setEmail("user@user.com");
            user.setPassword(passwordEncoder.encode("password"));
            user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            user.setAuthorities(roles);
            user.setAppointments(appointments);

            userRepository.save(user);
        }
    }

    private void CreateCompany()
    {
        if(roleRepository.findByAuthority("COMPANY").isEmpty())
        {
            Role companyRole = new Role("COMPANY");
            roleRepository.save(companyRole);
            Set<Role> roles = new HashSet<>();
            roles.add(companyRole);
            List<AppService> appServices = new ArrayList<>();
            Company company = new Company();
            company.setCompanyName("company");
            company.setEmail("company@company.com");
            company.setPassword(passwordEncoder.encode("password"));
            company.setAuthorities(roles);
            company.setDescription("company description");
            company.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            company.setServices(appServices);

            companyRepository.save(company);
        }
    }


}