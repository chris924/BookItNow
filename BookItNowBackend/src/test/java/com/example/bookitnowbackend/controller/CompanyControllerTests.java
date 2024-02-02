package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.service.CompanyAuthenticationService;
import com.example.bookitnowbackend.service.CompanyService;
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
import java.util.HashSet;

@WebMvcTest(controllers = CompanyController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class CompanyControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompanyService companyService;


    @MockBean
    private CompanyAuthenticationService companyAuthenticationService;

    @Autowired
    private ObjectMapper objectMapper;

    private Company company;

    @BeforeEach
    public void init() {
        company = new Company(0, "test", "test", "test", "test", new Timestamp(System.currentTimeMillis()), "test", "test",  "test", new HashSet<>());
    }

    @Test
    public void CompanyController_AddCompany_ReturnOk() throws Exception {
        BDDMockito.given(companyService.saveCompany(ArgumentMatchers.any())).willReturn(company);

        ResultActions response = mockMvc.perform(MockMvcRequestBuilders.post("/company/addCompany")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(company)));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void CompanyController_GetAllCompanies_ReturnOk() throws Exception {
        BDDMockito.given(companyService.getCompanies()).willReturn(Collections.singletonList(company));

        ResultActions response = mockMvc.perform(MockMvcRequestBuilders.get("/company/getAllCompanies")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void CompanyController_GetCompanyById_ReturnOk() throws Exception {
        BDDMockito.given(companyService.getCompanyById(ArgumentMatchers.anyInt())).willReturn(company);

        ResultActions response = mockMvc.perform(MockMvcRequestBuilders.get("/company/getCompanyById/1")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }


}