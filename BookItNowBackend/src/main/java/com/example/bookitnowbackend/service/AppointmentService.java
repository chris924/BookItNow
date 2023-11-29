package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.repository.IAppointmentRepository;

import java.util.List;

public class AppointmentService {

    private IAppointmentRepository appointmentRepository;

    public Appointment saveAppointment(Appointment appointment)
    {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointments()
    {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(int id)
    {
        return appointmentRepository.findById(id).orElse(null);
    }

    public String deleteAppointment(int id)
    {
        appointmentRepository.deleteById(id);
        return "Appointment deleted!" + id;
    }


    public Appointment updateAppointment(Appointment appointment)
    {
        Appointment existingAppointment = appointmentRepository.findById(appointment.getId()).orElse(null);
        if(existingAppointment == null)
        {
            throw  new AssertionError();
        }
        existingAppointment.setService(appointment.getService());
        existingAppointment.setUser(appointment.getUser());
        existingAppointment.setDateAndTime(appointment.getDateAndTime());

       return appointmentRepository.save(existingAppointment);

    }

}
