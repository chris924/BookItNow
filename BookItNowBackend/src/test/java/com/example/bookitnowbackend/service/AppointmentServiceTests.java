package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.repository.IAppointmentRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AppointmentServiceTests {

    @Mock
    private IAppointmentRepository appointmentRepository;

    @InjectMocks
    private AppointmentService appointmentService;



    @Test
    public void AppointmentService_CreateAppointment_ReturnAppointment()
    {
        Appointment testAppointment = new Appointment(0, new User(), new Company(), new Timestamp(System.currentTimeMillis()));

        when(appointmentRepository.save(Mockito.any(Appointment.class))).thenReturn(testAppointment);

        Appointment savedAppointment = appointmentService.saveAppointment(testAppointment);

        Assertions.assertNotNull(savedAppointment);
        Assertions.assertEquals(savedAppointment.getId(), testAppointment.getId());
    }

    @Test
    public void AppointmentService_GetAllAppointment_ReturnAppointments()
    {
        Appointment testAppointment = new Appointment(8, new User(), new Company(), new Timestamp(System.currentTimeMillis()));

        List<Appointment> testAppointmentList = new ArrayList<>();

        testAppointmentList.add(testAppointment);

        when(appointmentRepository.findAll()).thenReturn(testAppointmentList);

        List<Appointment> foundAppointments = appointmentService.getAppointments();

        Assertions.assertNotNull(foundAppointments);
        Assertions.assertFalse(testAppointmentList.isEmpty());
    }

    @Test
    public void AppointmentService_DeleteAppointment_DeletesAppointment()
    {

        String deletedAppointment = appointmentService.deleteAppointment(8);

        Assertions.assertNotNull(deletedAppointment);
    }


}
