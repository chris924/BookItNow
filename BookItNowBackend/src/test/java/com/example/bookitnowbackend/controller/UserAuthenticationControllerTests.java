package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.entity.UserLoginResponseDTO;
import com.example.bookitnowbackend.entity.UserRegistrationResponseDTO;
import com.example.bookitnowbackend.service.UserAuthenticationService;
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

@WebMvcTest(controllers = UserAuthenticationController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class UserAuthenticationControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserAuthenticationService userAuthenticationService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserRegistrationResponseDTO userRegistrationResponseDTO;

    private UserLoginResponseDTO userLoginResponseDTO;

    @BeforeEach
    public void init() {
        userRegistrationResponseDTO = new UserRegistrationResponseDTO("test", "test", "test");
        userLoginResponseDTO = new UserLoginResponseDTO(new User(), "test");
    }

    @Test
    public void UserAuthenticationController_RegisterUser_ReturnOk() throws Exception {
        given(userAuthenticationService.registerUser(
                ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any()
        )).willReturn(userRegistrationResponseDTO);


        ResultActions response = mockMvc.perform(post("/auth/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userRegistrationResponseDTO)));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }


    @Test
    public void UserAuthenticationController_LoginUser_ReturnOK() throws Exception
    {
        given(userAuthenticationService.loginUser(
                ArgumentMatchers.any(), ArgumentMatchers.any()
        )).willReturn(userLoginResponseDTO);


        ResultActions response = mockMvc.perform(post("/auth/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userLoginResponseDTO)));

        response.andExpect(MockMvcResultMatchers.status().isOk());
    }

}
