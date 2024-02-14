package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.*;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import com.example.bookitnowbackend.repository.IUserRepository;
import com.example.bookitnowbackend.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private AvatarService avatarService;

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

    @PostMapping("/updateUserAvatar/{userId}")
    public ResponseEntity<?> UpdateUserAvatar(
            @RequestParam("avatar") MultipartFile avatar,
            @PathVariable Integer userId) {

        try {
            avatarService.UpdateAvatar(userId, avatar.getBytes(), "user");
            return ResponseEntity.status(HttpStatus.OK).body("Avatar updated successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating avatar");
        }
    }


    @PostMapping("/changeUserEmail")
    public ResponseEntity<?> ChangeUserEmail(@RequestBody UserChangeEmailDTO userChangeEmailDTO)
    {
        try {
            userService.UpdateEmail(userChangeEmailDTO.getNewEmail(), userChangeEmailDTO.getUserId());
            return ResponseEntity.status(HttpStatus.OK).body("Email changed successfully");

        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating email");
        }
    }

    @PostMapping("/changeUserPassword")
    public ResponseEntity<?> ChangeUserPassword(@RequestBody UserChangePasswordDTO userChangePasswordDTO)
    {
        try {
                userService.UpdatePassword(userChangePasswordDTO.getNewPassword(), userChangePasswordDTO.getUserId());
            return ResponseEntity.status(HttpStatus.OK).body("Password changed successfully");

        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating password");
        }
    }


}