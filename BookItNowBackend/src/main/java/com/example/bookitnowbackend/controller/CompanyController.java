package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CompanyController {


    @Autowired
    private CompanyService companyService;

    @PostMapping("/addUser")
    public Company addCompany(@RequestBody Company company)
    {
        return companyService.saveCompany(company);
    }

    @GetMapping("/getAllCompanies")
    public List<Company> getAllCompanies()
    {
        return companyService.getCompanies();
    }

    @GetMapping("/getUserById/{id}")
    public Company getCompanyById(@PathVariable Integer id)
    {
        return companyService.getCompanyById(id);
    }

    @PutMapping("/updateUser")
    public Company updateCompany(@RequestBody Company company)
    {
        return companyService.updateCompany(company);
    }

    @DeleteMapping("/deleteCompany/{id}")
    public String deleteCompany(@PathVariable Integer id)
    {
        return companyService.deleteCompany(id);
    }




}
