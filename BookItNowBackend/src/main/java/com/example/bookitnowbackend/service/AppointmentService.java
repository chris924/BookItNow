package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.repository.IAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
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
        existingAppointment.setAppService(appointment.getAppService());
        existingAppointment.setUser(appointment.getUser());
        existingAppointment.setDateAndTime(appointment.getDateAndTime());

       return appointmentRepository.save(existingAppointment);

    }

}
