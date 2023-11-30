package com.example.bookitnowbackend.repository;

import com.example.bookitnowbackend.entity.AppService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IServiceRepository extends JpaRepository<AppService, Integer> {

}
