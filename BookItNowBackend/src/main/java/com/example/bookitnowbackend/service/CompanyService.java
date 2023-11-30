package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private ICompanyRepository companyRepository;

    public Company saveCompany(Company company)
    {
        return companyRepository.save(company);
    }

    public List<Company> getCompanies()
    {
        return companyRepository.findAll();
    }

    public Company getCompanyById(int id)
    {
        return companyRepository.findById(id).orElse(null);
    }

    public String deleteCompany(int id)
    {
        companyRepository.deleteById(id);
        return "Company deleted!" + id;
    }

    public Company updateCompany(Company company)
    {
        Company existingCompany = companyRepository.findById(company.getId()).orElse(null);
        if (existingCompany == null) {
            throw new AssertionError();
        }
        existingCompany.setCompanyName(company.getCompanyName());
        existingCompany.setDescription(company.getDescription());
        existingCompany.setCreatedAt(company.getCreatedAt());

        return companyRepository.save(existingCompany);
    }

}
