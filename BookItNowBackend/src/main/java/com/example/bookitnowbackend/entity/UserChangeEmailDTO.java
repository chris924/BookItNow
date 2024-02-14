package com.example.bookitnowbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserChangeEmailDTO {

    private Integer userId;
    private String newEmail;
}
