package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

@Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user)
    {
        return userService.saveUser(user);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers()
    {
        return userService.getUsers();
    }

    @GetMapping("/getUserById/{id}")
    public User findUserById(@PathVariable Integer id)
    {
        return userService.getUserById(id);
    }

    @PutMapping("/updateUser")
    public User updateUser(@RequestBody User user)
    {
        return userService.updateUser(user);
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable Integer id)
    {
        return userService.deleteUser(id);
    }


}
