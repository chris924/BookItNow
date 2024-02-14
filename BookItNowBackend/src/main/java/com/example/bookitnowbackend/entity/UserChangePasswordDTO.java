package com.example.bookitnowbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserChangePasswordDTO {

    private Integer userId;
    private String newPassword;
}
