package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.RegistrationDTO;
import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public User registerUser(@RequestBody RegistrationDTO body)
    {
        return authenticationService.registerUser(body.getName(), body.getUsername(), body.getEmail(), body.getPassword());
    }

}
