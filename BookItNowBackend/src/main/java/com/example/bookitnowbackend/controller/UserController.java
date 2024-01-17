package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import com.example.bookitnowbackend.repository.IUserRepository;
import com.example.bookitnowbackend.service.CompanyAuthenticationService;
import com.example.bookitnowbackend.service.CompanyService;
import com.example.bookitnowbackend.service.UserAuthenticationService;
import com.example.bookitnowbackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserAuthenticationService userAuthenticationService;

    @Autowired
    private ICompanyRepository companyRepository;


    @Autowired
    private UserService userService;

    @Autowired
    private IUserRepository userRepository;

   @GetMapping("/")
    public String HelloUserController()
   {
       return "User access level";
   }

   @GetMapping("/userdata")
    public ResponseEntity<?> GetUserData(@RequestHeader("Authorization") String token)
   {
       String jwtToken = token.substring(7);

     Integer userId = userAuthenticationService.getUserData(jwtToken);

       User user = userService.getUserById(userId);

       return ResponseEntity.status(HttpStatus.OK).body(user);
   }

    @GetMapping("/getAllCompanies")
    public ResponseEntity<?> GetAllCompanies()
    {
        try {
            List<Company> companies = companyRepository.findAll();
            System.out.println(companies);
            return ResponseEntity.status(HttpStatus.OK).body(companies);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting companies");
        }
    }


}