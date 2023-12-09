package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import com.example.bookitnowbackend.service.CompanyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/company")
@CrossOrigin("*")
public class CompanyController {


    @Autowired
    private CompanyService companyService;

    @GetMapping("/")
    public String helloCompanyController()
    {

        return "Company level access";
    }


    @PostMapping("/addCompany")
    public ResponseEntity<?> addCompany(@Valid @RequestBody Company company, BindingResult bindingResult)
    {
        if(bindingResult.hasErrors())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        }
        try {
            Company savedCompany = companyService.saveCompany(company);
            return ResponseEntity.status(HttpStatus.OK).body(savedCompany);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding company");
        }
    }

    @GetMapping("/getAllCompanies")
    public ResponseEntity<?> getAllCompanies()
    {
        try {
            List<Company> companies = companyService.getCompanies();
            return ResponseEntity.status(HttpStatus.OK).body(companies);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting companies");
        }
    }

    @GetMapping("/getCompanyById/{id}")
    public ResponseEntity<?> getCompanyById(@PathVariable Integer id)
    {
        try {
            Company companyById = companyService.getCompanyById(id);
            return ResponseEntity.status(HttpStatus.OK).body(companyById);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting company by id");
        }
    }

    @PutMapping("/updateCompany")
    public ResponseEntity<?> updateCompany(@Valid @RequestBody Company company, BindingResult bindingResult)
    {
       if(bindingResult.hasErrors())
       {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid request");
       }
       try {
           Company updatedCompany = companyService.updateCompany(company);
           return ResponseEntity.status(HttpStatus.OK).body(updatedCompany);
       }catch (Exception e){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating company");
       }
    }

    @DeleteMapping("/deleteCompany/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable Integer id)
    {
        try {
            String deletedCompany = companyService.deleteCompany(id);
            return ResponseEntity.status(HttpStatus.OK).body(deletedCompany);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting company");
        }



    }




}
