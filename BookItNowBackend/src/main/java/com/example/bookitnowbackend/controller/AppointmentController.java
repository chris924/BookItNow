package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.entity.AppointmentByCompanyIDResponseDTO;
import com.example.bookitnowbackend.entity.AppointmentSaveDTO;
import com.example.bookitnowbackend.entity.AppointmentSaveResponseDTO;
import com.example.bookitnowbackend.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Validated
@RestController
@RequestMapping("/company")
@CrossOrigin("*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/addAppointment")
    public ResponseEntity<?> AddAppointment(@Valid @RequestBody AppointmentSaveDTO appointment, BindingResult bindingResult)
    {
        if(bindingResult.hasErrors())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        }

        try {
            Appointment createdAppointment = appointmentService.createAppointment(appointment.getCompanyId(), appointment.getDateAndTime());
            Appointment savedAppointment = appointmentService.saveAppointment(createdAppointment);
            AppointmentSaveResponseDTO appointmentSaveResponseDTO = new AppointmentSaveResponseDTO(savedAppointment.getId(), savedAppointment.getDateAndTime());
            return ResponseEntity.status(HttpStatus.OK).body(appointmentSaveResponseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding appointment");
        }

    }

    @GetMapping("/getAppointmentsByCompanyId/{id}")
    public ResponseEntity<?> getAppointmentsByCompanyId(@PathVariable Integer id)
    {

        try{
            List<AppointmentByCompanyIDResponseDTO> appointmentsByCompany = appointmentService.getAppointmentsByCompanyId(id);

            return ResponseEntity.status(HttpStatus.OK).body(appointmentsByCompany);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting appointments by company id");
        }
    }


    @GetMapping("/getAllAppointments")
    public ResponseEntity<?> GetAllAppointments()
    {
        try {
            List<Appointment> allAppointments = appointmentService.getAppointments();
            return ResponseEntity.status(HttpStatus.OK).body(allAppointments);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting appointments");
        }

    }

    @GetMapping("/getAppointmentById/{id}")
    public ResponseEntity<?> GetAppointmentById(@PathVariable Integer id)
    {
        try {
            Appointment appointmentById = appointmentService.getAppointmentById(id);
            return  ResponseEntity.status(HttpStatus.OK).body(appointmentById);
        }catch (Exception e){

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting appointment by id");
        }

    }

    @PutMapping("/updateAppointment")
    public ResponseEntity<?> UpdateAppointment(@Valid @RequestBody Appointment appointment, BindingResult bindingResult)
    {
        if(bindingResult.hasErrors())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        }
        try {
            Appointment updatedAppointment = appointmentService.updateAppointment(appointment);
            return ResponseEntity.status(HttpStatus.OK).body(updatedAppointment);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating appointment");
        }
    }

    @DeleteMapping("/deleteAppointment/{id}")
    public ResponseEntity<?> DeleteAppointment(@PathVariable Integer id)
    {
        try {
            String deletedAppointment = appointmentService.deleteAppointment(id);
            return ResponseEntity.status(HttpStatus.OK).body(deletedAppointment);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting appointment");
        }
    }


}
