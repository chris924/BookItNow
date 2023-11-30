package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private IUserRepository userRepository;


    public User saveUser(User user)
    {
       return userRepository.save(user);
    }

    public List<User> getUsers()
    {
        return userRepository.findAll();
    }

    public User getUserById(int id)
    {
        return userRepository.findById(id).orElse(null);
    }

    public String deleteUser(int id)
    {
        userRepository.deleteById(id);
        return "User removed!" + id;
    }

    public User updateUser(User user)
    {
        User existingUser = userRepository.findById(user.getId()).orElse(null);
        if (existingUser == null) {
            throw new AssertionError();
        }
        existingUser.setName(user.getName());
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setCreatedAt(user.getCreatedAt());

        return userRepository.save(existingUser);
    }


}
