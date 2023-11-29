package com.example.bookitnowbackend.repository;

import com.example.bookitnowbackend.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICompanyRepository extends JpaRepository<Service, Integer> {
}
