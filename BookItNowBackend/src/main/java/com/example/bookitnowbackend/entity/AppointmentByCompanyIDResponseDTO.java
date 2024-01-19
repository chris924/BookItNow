package com.example.bookitnowbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AppointmentByCompanyIDResponseDTO {

    private Integer appointmentId;

    private Integer companyId;

    private Timestamp dateAndTime;
}
