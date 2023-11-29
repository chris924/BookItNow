package com.example.bookitnowbackend.repository;

import com.example.bookitnowbackend.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IServiceRepository extends JpaRepository<Service, Integer> {

}
