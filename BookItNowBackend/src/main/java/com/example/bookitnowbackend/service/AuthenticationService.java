package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.entity.Role;
import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.repository.IRoleRepository;
import com.example.bookitnowbackend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {

    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IRoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String name, String username, String email, String password)
    {
        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER").get();


        Set<Role> authorities = new HashSet<>();
        List<Appointment> appointments = new ArrayList<>();

        authorities.add(userRole);

        User newUser = new User();
        newUser.setName(name);
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(encodedPassword);
        newUser.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        newUser.setAppointments(appointments);
        newUser.setAuthorities(authorities);

        return userRepository.save(newUser);
    }



}
