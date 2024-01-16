package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.AppService;
import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CompanyServiceTests {

    @Mock
    private ICompanyRepository companyRepository;

    @InjectMocks
    private CompanyService companyService;


    @Test
    public void CompanyService_SaveCompany_ReturnCompany()
    {
        Company testCompany = new Company(0, "test", "test", "test", "test",
                new Timestamp(System.currentTimeMillis()), new AppService(), new HashSet<>());

        when(companyRepository.save(Mockito.any(Company.class))).thenReturn(testCompany);

        Company foundCompany = companyService.saveCompany(testCompany);


        Assertions.assertNotNull(foundCompany);
        Assertions.assertEquals(foundCompany.getCompanyName(), testCompany.getCompanyName());

    }

    @Test
    public void CompanyService_GetCompanyById_ReturnNullIfNotFound()
    {
        Optional<Company> testCompany = Optional.empty();

        when(companyRepository.findById(Mockito.any(Integer.class))).thenReturn(testCompany);

        Company notFoundCompany = companyService.getCompanyById(2);

        Assertions.assertEquals(notFoundCompany, null);

    }

    @Test
    public void CompanyService_GetCompanies_ReturnCompanyList()
    {
        Company testCompany = new Company();
        testCompany.setCompanyName("test");

        List<Company> testCompanies = new ArrayList<>();
        testCompanies.add(testCompany);

        when(companyRepository.findAll()).thenReturn(testCompanies);

        List<Company> foundCompanies = companyService.getCompanies();

        Assertions.assertNotNull(foundCompanies);
        Assertions.assertTrue(foundCompanies.contains(testCompany),
                "testCompany should be present in foundCompanies");

    }
}
