package com.example.bookitnowbackend.repository;

import com.example.bookitnowbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    Optional<User> getUserByUsername(String username);
}
