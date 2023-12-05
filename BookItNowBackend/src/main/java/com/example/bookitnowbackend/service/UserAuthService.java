package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.entity.Role;
import com.example.bookitnowbackend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class UserAuthService implements UserDetailsService {

    @Autowired
    private PasswordEncoder encoder;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       System.out.println("In the user details service");

       if(!username.equals("Ethan")) throw new UsernameNotFoundException("Not Ethan");

        List<Appointment> appointments = new ArrayList<>();

        Set<Role> roles = new HashSet<>();
        roles.add(new Role(1, "USER"));

        return new User(1, "Ethan", "Ethan", "ethan@gmail.com", encoder.encode("password"),new Timestamp(System.currentTimeMillis()), appointments, roles);

    }
}
