package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.*;
import com.example.bookitnowbackend.service.CompanyAuthenticationService;
import com.example.bookitnowbackend.service.UserAuthenticationService;
import jakarta.validation.Valid;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth/company")
@CrossOrigin("*")
public class CompanyAuthenticationController {

    @Autowired
    private CompanyAuthenticationService companyAuthenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerCompany(@Valid @RequestBody CompanyRegistrationDTO body, @NotNull BindingResult bindingResult)
    {
        if(bindingResult.hasErrors())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid register request");
        }
        try {
           CompanyRegistrationResponseDTO responseDTO = companyAuthenticationService.registerCompany(body.getCompanyName(), body.getPassword(), body.getEmail(), body.getDescription());

            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);

        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registering company");
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCompany(@Valid @RequestBody CompanyLoginDTO body, @NotNull BindingResult bindingResult)
    {
        if(bindingResult.hasErrors())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid login request");
        }

        try {
            CompanyLoginResponseDTO companyLoginResponseDTO =  companyAuthenticationService.loginCompany(body.getEmail(), body.getPassword());
            return ResponseEntity.status(HttpStatus.OK).body(companyLoginResponseDTO);
        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during login company");
        }



    }


}
