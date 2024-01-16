package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.*;
import com.example.bookitnowbackend.repository.ICompanyRepository;
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

    @Autowired
    private ICompanyRepository companyRepository;

    @PostMapping("/register")
    public ResponseEntity<?> RegisterCompany(@Valid @RequestBody CompanyRegistrationDTO body, @NotNull BindingResult bindingResult)
    {
        if(bindingResult.hasErrors())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid register request");
        }
        try {
           CompanyRegistrationResponseDTO responseDTO = companyAuthenticationService.registerCompany(body.getCompanyName(), body.getPassword(), body.getEmail(), body.getAppServiceName(), body.getAppServiceDescription(), body.getDescription());

            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);

        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registering company");
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> LoginCompany(@Valid @RequestBody CompanyLoginDTO body, @NotNull BindingResult bindingResult)
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

    @PostMapping("/check-duplicate")
    public ResponseEntity<?> CheckDuplicate(@Valid @RequestBody CompanyDuplicateCheckDTO request, @NotNull BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid check-duplicate request");
        }

        String companyName = request.getCompanyName();
        String email = request.getEmail();

        System.out.println("COMPANY NAME:"+ companyName);
        System.out.println("EMAIL:" + email);

        if (companyRepository.getCompanyByEmail(email).isPresent() && companyRepository.getCompanyByCompanyName(companyName).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new CompanyDuplicateCheckDTO(true, companyName, email));
        } else if (companyRepository.getCompanyByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new CompanyDuplicateCheckDTO(true, null, email));
        } else if (companyRepository.getCompanyByCompanyName(companyName).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new CompanyDuplicateCheckDTO(true, companyName, null));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(new CompanyDuplicateCheckDTO(false));
        }
    }


}
