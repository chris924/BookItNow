package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/addAppointment")
    public Appointment addAppointment(@RequestBody Appointment appointment)
    {
        return appointmentService.saveAppointment(appointment);
    }

    @GetMapping("/getAllAppointments")
    public List<Appointment> getAllAppointments()
    {
        return appointmentService.getAppointments();
    }

    @GetMapping("/getAppointmentById/{id}")
    public Appointment getAppointmentById(@PathVariable Integer id)
    {
        return appointmentService.getAppointmentById(id);
    }

    @PutMapping("/updateAppointment")
    public Appointment updateAppointment(@RequestBody Appointment appointment)
    {
        return appointmentService.updateAppointment(appointment);
    }

    @DeleteMapping("/deleteAppointment/{id}")
    public String deleteAppointment(@PathVariable Integer id)
    {
        return appointmentService.deleteAppointment(id);
    }





}
