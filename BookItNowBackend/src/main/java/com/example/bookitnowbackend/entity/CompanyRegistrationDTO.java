package com.example.bookitnowbackend.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CompanyRegistrationDTO {

    private String companyName;

    private String email;

    private String password;

    private String  description;

}
