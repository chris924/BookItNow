package com.example.bookitnowbackend.repository;

import com.example.bookitnowbackend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAppointmentRepository extends JpaRepository<Appointment, Integer> {
}
