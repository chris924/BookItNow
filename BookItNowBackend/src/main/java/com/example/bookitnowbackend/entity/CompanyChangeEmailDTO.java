package com.example.bookitnowbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CompanyChangeEmailDTO {
    private Integer companyId;
    private String newEmail;
}
