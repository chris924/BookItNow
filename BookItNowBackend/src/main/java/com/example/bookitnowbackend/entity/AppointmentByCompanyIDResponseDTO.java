package com.example.bookitnowbackend.entity;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AppointmentByCompanyIDResponseDTO {

    private Integer appointmentId;

    @Nullable
    private Integer userId;

    private Integer companyId;

    private Timestamp dateAndTime;
}
