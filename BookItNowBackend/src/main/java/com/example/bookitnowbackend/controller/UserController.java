package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

   @GetMapping("/")
    public String HelloUserController()
   {
       return "User access level";
   }


}