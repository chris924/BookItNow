package com.example.bookitnowbackend.repository;


import com.example.bookitnowbackend.entity.AppService;
import com.example.bookitnowbackend.entity.Appointment;
import com.example.bookitnowbackend.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;

import java.sql.Timestamp;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@TestPropertySource(locations = {"classpath:application-test.properties"}, properties = {"spring.config.name=application-test"})
public class AppointmentRepositoryTests {

    @Autowired
    private IAppointmentRepository appointmentRepository;

    @Autowired
    private IServiceRepository serviceRepository;

    @Autowired
    private IUserRepository userRepository;

    private final User testUser = new User();
    private final AppService testService = new AppService();

    private final Appointment testAppointment = new Appointment(0, testUser, testService, new Timestamp(System.currentTimeMillis()));

    @Test
    public void AppointmentRepository_GetAppointmentById_ReturnAppointment()
    {
        appointmentRepository.save(testAppointment);

        Optional<Appointment> foundAppointment = appointmentRepository.findById(testAppointment.getId());

        Assertions.assertNotNull(foundAppointment);
        Assertions.assertEquals(foundAppointment.get().getId(), testAppointment.getId());
    }

    @Test
    public void AppointmentRepository_DeleteAppointmentById_ReturnOptionalEmpty()
    {
        appointmentRepository.save(testAppointment);

        appointmentRepository.deleteById(testAppointment.getId());

        Optional<Appointment> notFoundAppointment = appointmentRepository.findById(testAppointment.getId());

        Assertions.assertEquals(notFoundAppointment, Optional.empty());
    }

    @Test
    public void AppointmentRepository_ExistsById_ReturnTrue()
    {
        userRepository.save(testUser);
        serviceRepository.save(testService);
        appointmentRepository.save(testAppointment);

      boolean appointmentExists =  appointmentRepository.existsById(testAppointment.getId());

        Assertions.assertTrue(appointmentExists);
    }



}
