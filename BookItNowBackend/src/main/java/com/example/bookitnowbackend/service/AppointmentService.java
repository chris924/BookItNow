package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.repository.IAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private IAppointmentRepository appointmentRepository;

    public Appointment saveAppointment(Appointment appointment)
    {
        try{
            return appointmentRepository.save(appointment);
        }catch (Exception e){
            throw new RuntimeException("Error saving appointment", e);
        }
    }

    public List<Appointment> getAppointments()
    {
        try{
            return appointmentRepository.findAll();
        }catch (Exception e){
            throw new RuntimeException("Error retrieving appointments", e);
        }


    }

    public Appointment getAppointmentById(int id)
    {
        try{
            Optional<Appointment> optionalAppointment = appointmentRepository.findById(id);
            return optionalAppointment.orElse(null);
        }catch (Exception e)
        {
            throw new RuntimeException("Error retrieving appointment by id", e);
        }

    }

    public String deleteAppointment(int id)
    {
        try{
            appointmentRepository.deleteById(id);
            return "Appointment deleted!" + id;
        }catch (Exception e){

            throw new RuntimeException("Error deleting appointment", e);
        }

    }

    public Appointment updateAppointment(Appointment appointment)
    {

        try{
            Appointment existingAppointment = appointmentRepository.findById(appointment.getId()).orElse(null);
            if(existingAppointment == null)
            {
                throw  new IllegalArgumentException("Appointment with ID " + appointment.getId() + " not found");
            }
            existingAppointment.setAppService(appointment.getAppService());
            existingAppointment.setUser(appointment.getUser());
            existingAppointment.setDateAndTime(appointment.getDateAndTime());

            return appointmentRepository.save(existingAppointment);
        }catch (Exception e){

            throw new RuntimeException("Error updating appointment", e);
        }



    }

}
