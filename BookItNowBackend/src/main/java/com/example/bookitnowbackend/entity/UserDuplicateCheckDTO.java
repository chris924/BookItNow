package com.example.bookitnowbackend.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class UserDuplicateCheckDTO {

    @JsonProperty(required = false)
    private String username;

    @JsonProperty(required = false)
    private String email;
}
