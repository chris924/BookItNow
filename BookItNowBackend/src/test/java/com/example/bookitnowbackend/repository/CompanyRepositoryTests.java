package com.example.bookitnowbackend.repository;

import com.example.bookitnowbackend.entity.Company;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@TestPropertySource(locations = {"classpath:application-test.properties"}, properties = {"spring.config.name=application-test"})
public class CompanyRepositoryTests {

    @Autowired
    private ICompanyRepository companyRepository;

    private final Company testCompany = new Company(1, "test", "test", "test",
            "test", new Timestamp(System.currentTimeMillis()), new ArrayList<>(), new HashSet<>());

    @Test
    public void CompanyRepository_GetCompanyByEmail_ReturnCompany()
    {
        companyRepository.save(testCompany);

       Optional<Company> foundCompany = companyRepository.getCompanyByEmail(testCompany.getEmail());

        Assertions.assertNotNull(foundCompany);
        Assertions.assertEquals(foundCompany.get().getEmail(), "test");
    }

    @Test
    public void CompanyRepository_GetCompanyByEmail_ReturnOptionalEmptyIfNotFound()
    {
        companyRepository.save(testCompany);

        Optional<Company> notFoundCompany = companyRepository.getCompanyByEmail("email");

        Assertions.assertEquals(notFoundCompany, Optional.empty());
    }

    @Test
    public void CompanyRepository_GetById_ReturnCompany()
    {
        companyRepository.save(testCompany);

     Optional<Company>  foundCompany = companyRepository.findById(testCompany.getId());

        Assertions.assertNotNull(foundCompany);
        Assertions.assertEquals(foundCompany.get().getCompanyName(), "test");

    }



}
