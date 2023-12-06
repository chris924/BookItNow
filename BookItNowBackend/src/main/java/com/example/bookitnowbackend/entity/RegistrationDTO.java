package com.example.bookitnowbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class RegistrationDTO {

    private String name;
    private String username;
    private String email;
    private String password;


    public String getUsername()
    {
        return this.username;
    }

    public String getPassword()
    {
        return this.password;
    }


    public String toString()
    {
        return "Registration info: username:" + this.username + "password: " + this.password;
    }

}
