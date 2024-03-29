package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.*;
import com.example.bookitnowbackend.repository.IAppointmentRepository;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import com.example.bookitnowbackend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private IAppointmentRepository appointmentRepository;

    @Autowired
    private ICompanyRepository companyRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private UserService userService;


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

    public Appointment updateAppointment(Integer appointmentId, Integer userId)
    {

        try{

            Appointment existingAppointment = appointmentRepository.findById(appointmentId).orElse(null);
            User existingUser = userRepository.findById(userId).orElse(null);

            assert existingUser != null;
            List<Appointment> userAppointments = existingUser.getAppointments();
            userAppointments.add(existingAppointment);

            if(existingAppointment == null || existingUser == null)
            {
                throw  new IllegalArgumentException("Appointment or User not found");
            }
            existingAppointment.setUser(existingUser);
            existingUser.setAppointments(userAppointments);
            userRepository.save(existingUser);
            return appointmentRepository.save(existingAppointment);
        }catch (Exception e){

            throw new RuntimeException("Error updating appointment", e);
        }

    }

    public void deleteUserFromAppointment(Integer appointmentId)
    {

        try{
            Appointment existingAppointment = appointmentRepository.findById(appointmentId).orElse(null);

            if(existingAppointment == null)
            {
                throw  new IllegalArgumentException("Appointment not found");
            }

            User existingUser = existingAppointment.getUser();
            if (existingUser != null) {
                existingUser.getAppointments().remove(existingAppointment);
                userRepository.save(existingUser);
            }


            existingAppointment.setUser(null);


            appointmentRepository.save(existingAppointment);


        }catch (Exception e)
        {
            throw new RuntimeException("Error deleting user from appointment", e);
        }
    }



    private AppointmentByCompanyIDResponseDTO mapAppointmentToDTO(Appointment appointment) {
        AppointmentByCompanyIDResponseDTO dto = new AppointmentByCompanyIDResponseDTO();
        dto.setAppointmentId(appointment.getId());
        if(appointment.getUser() != null)
        {
            dto.setUserId(appointment.getUser().getUserId());
            dto.setUserName(appointment.getUser().getName());
            dto.setUserEmail(appointment.getUser().getEmail());
        }
        dto.setCompanyId(appointment.getCompany().getId());
        dto.setDateAndTime(appointment.getDateAndTime());
        return dto;
    }

}
