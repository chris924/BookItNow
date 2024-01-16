package com.example.bookitnowbackend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class CompanyDuplicateCheckDTO {


    @JsonProperty(required = false)
    private Boolean duplicate;

    @JsonProperty(required = false)
    private String companyName;

    @JsonProperty(required = false)
    private String email;




    public CompanyDuplicateCheckDTO(boolean b) {
        this.duplicate = b;
    }
}
