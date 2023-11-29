package com.example.bookitnowbackend.repository;

import com.example.bookitnowbackend.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICompanyRepository extends JpaRepository<Company, Integer> {
}
