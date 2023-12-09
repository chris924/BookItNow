package com.example.bookitnowbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserRegistrationDTO {

    private String name;
    private String username;
    private String email;
    private String password;

}
