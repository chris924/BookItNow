package com.example.bookitnowbackend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class AppointmentSaveDTO {

    private Integer companyId;

    private Timestamp dateAndTime;

}
