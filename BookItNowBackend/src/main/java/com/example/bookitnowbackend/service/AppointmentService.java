package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.entity.AppointmentByCompanyIDResponseDTO;
import com.example.bookitnowbackend.entity.AppointmentSaveResponseDTO;
import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.repository.IAppointmentRepository;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private IAppointmentRepository appointmentRepository;

    @Autowired
    private ICompanyRepository companyRepository;

    public Appointment saveAppointment(Appointment appointment)
    {
        try{
            return appointmentRepository.save(appointment);
        }catch (Exception e){
            throw new RuntimeException("Error saving appointment", e);
        }
    }

    public Appointment createAppointment(Integer id, Timestamp timestamp)
    {
        try {
          Company foundCompany =  companyRepository.findById(id).get();

              Appointment newAppointment = new Appointment();
              newAppointment.setCompany(foundCompany);
              newAppointment.setDateAndTime(timestamp);

            return  newAppointment;

        }catch (Exception e){
            throw new RuntimeException("Error creating appointment", e);
        }
    }


    public List<AppointmentByCompanyIDResponseDTO> getAppointmentsByCompanyId(Integer id)
    {
        try {
            Company foundCompany = companyRepository.findById(id).orElseThrow(() ->
                    new RuntimeException("Company not found with ID: " + id));

            List<Appointment> appointments = appointmentRepository.findByCompanyId(foundCompany.getId());
            List<AppointmentByCompanyIDResponseDTO> responseDTOs = appointments.stream()
                    .map(this::mapAppointmentToDTO)
                    .collect(Collectors.toList());

            return responseDTOs;

        }catch (Exception e)
        {
            throw new RuntimeException("Error getting appointments by company id", e);
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
            existingAppointment.setUser(appointment.getUser());
            existingAppointment.setDateAndTime(appointment.getDateAndTime());

            return appointmentRepository.save(existingAppointment);
        }catch (Exception e){

            throw new RuntimeException("Error updating appointment", e);
        }



    }

    private AppointmentByCompanyIDResponseDTO mapAppointmentToDTO(Appointment appointment) {
        AppointmentByCompanyIDResponseDTO dto = new AppointmentByCompanyIDResponseDTO();
        dto.setAppointmentId(appointment.getId());
        dto.setCompanyId(appointment.getCompany().getId());
        dto.setDateAndTime(appointment.getDateAndTime());
        return dto;
    }

}
