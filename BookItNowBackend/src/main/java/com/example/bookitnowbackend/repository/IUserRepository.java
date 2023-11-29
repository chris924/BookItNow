package com.example.bookitnowbackend.repository;

import com.example.bookitnowbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User, Integer> {
}
