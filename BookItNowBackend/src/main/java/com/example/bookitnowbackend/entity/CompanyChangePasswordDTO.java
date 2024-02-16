package com.example.bookitnowbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CompanyChangePasswordDTO {

    private Integer companyId;
    private String newPassword;
}
