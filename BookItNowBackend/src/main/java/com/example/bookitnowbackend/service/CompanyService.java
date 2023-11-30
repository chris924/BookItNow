package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    @Autowired
    private ICompanyRepository companyRepository;

    public Company saveCompany(Company company)
    {
        try {
            return companyRepository.save(company);
        }catch (Exception e){

            throw new RuntimeException("Error saving company", e);
        }
    }

    public List<Company> getCompanies()
    {
        try {
            return companyRepository.findAll();
        }catch (Exception e){
            throw new RuntimeException("Error getting companies", e);
        }
    }

    public Company getCompanyById(int id)
    {
        try {
            Optional<Company> optionalCompany = companyRepository.findById(id);
            return optionalCompany.orElse(null);
        }catch (Exception e){
           throw new RuntimeException("Error getting company by id", e);
        }
    }

    public String deleteCompany(int id)
    {
        try {
            companyRepository.deleteById(id);
            return "Company deleted!" + id;
        }catch (Exception e){
            throw new RuntimeException("Error deleting company by id", e);
        }
    }

    public Company updateCompany(Company company)
    {
        try {
            Company existingCompany = companyRepository.findById(company.getId()).orElse(null);
            if (existingCompany == null) {
                throw new IllegalArgumentException("Company with ID " + company.getId() + " not found");
            }
            existingCompany.setCompanyName(company.getCompanyName());
            existingCompany.setDescription(company.getDescription());
            existingCompany.setCreatedAt(company.getCreatedAt());

            return companyRepository.save(existingCompany);
        }catch (Exception e){
            throw new RuntimeException("Error updating company", e);
        }


    }

}
