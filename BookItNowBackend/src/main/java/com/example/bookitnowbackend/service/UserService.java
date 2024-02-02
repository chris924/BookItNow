package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.file.*;
import java.util.UUID;

import java.util.List;
import java.util.Optional;



@Service
public class UserService {

    @Autowired
    private IUserRepository userRepository;

    public User saveUser(User user) {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Error saving user", e);
        }
    }

    public List<User> getUsers() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving users", e);
        }
    }

    public User getUserById(int id) {
        try {
            Optional<User> optionalUser = userRepository.findById(id);
            return optionalUser.orElse(null);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving user by ID", e);
        }
    }

    public User getUserByUsername(String username)
    {
        try {
            Optional<User> optionalUser = userRepository.getUserByUsername(username);
            return optionalUser.orElse(null);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving user by username");
        }
    }

    public void UpdateUserAvatar(Integer id, byte[] avatar) {
        try {
            User optionalUser = userRepository.findById(id).orElse(null);

            if (optionalUser == null) {
                throw new RuntimeException("User not found!");
            }

            Path directoryPath = Paths.get("C:\\Users\\Krisz\\Desktop\\CC\\Pet Project\\BookItNow\\BookItNowBackend\\Avatars");
            String fileName = UUID.randomUUID().toString() + "_avatar.jpg";
            Path filePath = directoryPath.resolve(fileName);

            Files.write(filePath, avatar, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);


            String avatarUrl = "/uploads/avatars/" + fileName;

            optionalUser.setAvatarUrl(avatarUrl);
            userRepository.save(optionalUser);

        } catch (Exception e) {
            throw new RuntimeException("Error updating user avatar", e);
        }
    }


    public String deleteUser(int id) {
        try {
            userRepository.deleteById(id);
            return "User removed!" + id;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user", e);
        }
    }

    public User updateUser(User user) {
        try {
            User existingUser = userRepository.findById(user.getId()).orElse(null);
            if (existingUser == null) {
                throw new IllegalArgumentException("User with ID " + user.getId() + " not found");
            }
            existingUser.setName(user.getName());
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setCreatedAt(user.getCreatedAt());

            return userRepository.save(existingUser);
        } catch (Exception e) {
            throw new RuntimeException("Error updating user", e);
        }
    }
}
