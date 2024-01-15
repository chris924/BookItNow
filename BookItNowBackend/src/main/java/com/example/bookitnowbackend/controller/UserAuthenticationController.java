package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.*;
import com.example.bookitnowbackend.repository.IUserRepository;
import com.example.bookitnowbackend.service.UserAuthenticationService;
import jakarta.validation.Valid;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/auth/user")
@CrossOrigin("*")
public class UserAuthenticationController {

    @Autowired
    private UserAuthenticationService userAuthenticationService;

    @Autowired
    private IUserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> RegisterUser(@Valid @RequestBody UserRegistrationDTO body, @NotNull BindingResult bindingResult)
    {
        if(bindingResult.hasErrors())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid register request");
        }
        try {
            userAuthenticationService.registerUser(body.getName(), body.getUsername(), body.getEmail(), body.getPassword());

            return ResponseEntity.status(HttpStatus.OK).body(new UserRegistrationResponseDTO(body.getName(), body.getUsername(), body.getEmail()));

        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registering user");
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> LoginUser(@Valid @RequestBody UserLoginDTO body, @NotNull BindingResult bindingResult)
    {
        if(bindingResult.hasErrors())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid login request");
        }

        try {

          UserLoginResponseDTO userLoginResponseDTO =  userAuthenticationService.loginUser(body.getEmail(), body.getPassword());


            if(userLoginResponseDTO.getEmail() == null || Objects.equals(userLoginResponseDTO.getJwt(), ""))
            {
                return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad Credentials");
            }
            else {
                return ResponseEntity.status(HttpStatus.OK).body(userLoginResponseDTO);
            }

        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during login user");
        }

    }

    @PostMapping("/check-duplicate")
    public ResponseEntity<?> CheckDuplicate(@Valid @RequestBody UserDuplicateCheckDTO request, @NotNull BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid check-duplicate request");
        }

        String username = request.getUsername();
        String email = request.getEmail();

        System.out.println("USERNAME:" + username);
        System.out.println("EMAIL:" + email);

        if (userRepository.getUserByEmail(email).isPresent() && userRepository.getUserByUsername(username).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new UserDuplicateCheckDTO(true, username, email));
        } else if (userRepository.getUserByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new UserDuplicateCheckDTO(true, null, email));
        } else if (userRepository.getUserByUsername(username).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new UserDuplicateCheckDTO(true, username, null));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(new UserDuplicateCheckDTO(false));
        }
    }


}
