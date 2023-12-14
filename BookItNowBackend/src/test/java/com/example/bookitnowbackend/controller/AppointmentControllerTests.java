package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.AppService;
import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.service.AppointmentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.BDDMockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Timestamp;
import java.util.Collections;


@WebMvcTest(controllers = AppointmentController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class AppointmentControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AppointmentService appointmentService;

    @Autowired
    private ObjectMapper objectMapper;

    private Appointment appointment;

    @BeforeEach
    public void init() {
        appointment = new Appointment(0, new User(), new AppService(), new Timestamp(System.currentTimeMillis()));
    }

    @Test
    public void AppointmentController_AddAppointment_ReturnOk() throws Exception {
        BDDMockito.given(appointmentService.saveAppointment(ArgumentMatchers.any())).willReturn(appointment);

        ResultActions response = mockMvc.perform(MockMvcRequestBuilders.post("/addAppointment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(appointment)));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void AppointmentController_GetAllAppointments_ReturnOk() throws Exception {
        BDDMockito.given(appointmentService.getAppointments()).willReturn(Collections.singletonList(appointment));

        ResultActions response = mockMvc.perform(MockMvcRequestBuilders.get("/getAllAppointments")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void AppointmentController_GetAppointmentById_ReturnOk() throws Exception {
        BDDMockito.given(appointmentService.getAppointmentById(ArgumentMatchers.anyInt())).willReturn(appointment);

        ResultActions response = mockMvc.perform(MockMvcRequestBuilders.get("/getAppointmentById/1")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }


}
