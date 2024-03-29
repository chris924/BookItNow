package com.example.bookitnowbackend.repository;

import com.example.bookitnowbackend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IAppointmentRepository extends JpaRepository<Appointment, Integer> {
    List<Appointment> findByCompanyId(Integer companyId);
    List<Appointment> findByUserId(Integer userId);
}
