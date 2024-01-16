package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.*;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import com.example.bookitnowbackend.service.CompanyAuthenticationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(controllers = CompanyAuthenticationController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class CompanyAuthenticationControllerTests {


    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompanyAuthenticationService companyAuthenticationService;

    @MockBean
    private ICompanyRepository companyRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private CompanyRegistrationResponseDTO companyRegistrationResponseDTO;

    private CompanyLoginResponseDTO companyLoginResponseDTO;

    @BeforeEach
    public void init() {
        companyRegistrationResponseDTO = new CompanyRegistrationResponseDTO("test", "test");
        companyLoginResponseDTO = new CompanyLoginResponseDTO("test", "test");
    }

    @Test
    public void CompanyAuthenticationController_RegisterCompany_ReturnOk() throws Exception {
        given(companyAuthenticationService.registerCompany(
                ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any()
        )).willReturn(companyRegistrationResponseDTO);


        ResultActions response = mockMvc.perform(post("/auth/company/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(companyRegistrationResponseDTO)));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void CompanyAuthenticationController_LoginCompany_ReturnOk() throws Exception
    {
        given(companyAuthenticationService.loginCompany(
                ArgumentMatchers.any(), ArgumentMatchers.any()
        )).willReturn(companyLoginResponseDTO);


        ResultActions response = mockMvc.perform(post("/auth/company/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(companyLoginResponseDTO)));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }




}
