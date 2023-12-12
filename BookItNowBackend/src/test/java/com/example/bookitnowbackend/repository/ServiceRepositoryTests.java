package com.example.bookitnowbackend.repository;

import com.example.bookitnowbackend.entity.AppService;
import com.example.bookitnowbackend.entity.Company;
import org.h2.expression.Variable;
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
public class ServiceRepositoryTests {

    @Autowired
    private IServiceRepository serviceRepository;

    @Autowired
    private ICompanyRepository companyRepository;

    private final Company testCompany = new Company();
    private final AppService testService = new AppService(1, "test", "test", testCompany, new Timestamp(System.currentTimeMillis()));

    @Test
    public void ServiceRepository_DeleteServiceById_DeleteService()
    {

        serviceRepository.save(testService);

        serviceRepository.deleteById(1);

        Assertions.assertEquals(serviceRepository.findById(1), Optional.empty());
    }

    @Test
    public void ServiceRepository_GetServiceById_ReturnService()
    {


        serviceRepository.save(testService);


        Optional<AppService> foundService = serviceRepository.findById(testService.getId());

        Assertions.assertNotNull(foundService);
        Assertions.assertEquals(foundService.get().getName(), "test");
    }

    @Test
    public void ServiceRepository_Count_ReturnServiceCount()
    {
        companyRepository.save(testCompany);
       serviceRepository.save(testService);


        long serviceCount = serviceRepository.count();

        Assertions.assertEquals(serviceCount, 1);

    }



}
