package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.*;
import com.example.bookitnowbackend.service.AuthenticationService;
import jakarta.validation.Valid;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationDTO body, @NotNull BindingResult bindingResult)
    {
        if(bindingResult.hasErrors())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid register request");
        }
        try {
            authenticationService.registerUser(body.getName(), body.getUsername(), body.getEmail(), body.getPassword());

            return ResponseEntity.status(HttpStatus.OK).body(new RegistrationResponseDTO(body.getName(), body.getUsername(), body.getEmail()));

        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registering user");
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginDTO body, @NotNull BindingResult bindingResult)
    {
        if(bindingResult.hasErrors())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid login request");
        }

        try {
          LoginResponseDTO loginResponseDTO =  authenticationService.loginUser(body.getUsername(), body.getPassword());
            return ResponseEntity.status(HttpStatus.OK).body(loginResponseDTO);
        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during login user");
        }



    }

}
