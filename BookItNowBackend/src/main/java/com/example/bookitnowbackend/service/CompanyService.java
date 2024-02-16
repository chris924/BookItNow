package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import com.example.bookitnowbackend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CompanyService {

    @Autowired
    private ICompanyRepository companyRepository;


    private final PasswordEncoder passwordEncoder;

    @Autowired
    public CompanyService(ICompanyRepository companyRepository, PasswordEncoder passwordEncoder) {
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
    }
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

    public void UpdateCompanyAvatar(Integer id, byte[] avatar) {
        try {
            Company optionalCompany = companyRepository.findById(id).orElse(null);

            if (optionalCompany == null) {
                throw new RuntimeException("User not found!");
            }

            Path directoryPath = Paths.get("C:\\Users\\Krisz\\Desktop\\CC\\Pet Project\\BookItNow\\BookItNowBackend\\Avatars");
            String fileName = UUID.randomUUID().toString() + "_avatar.jpg";
            Path filePath = directoryPath.resolve(fileName);

            Files.write(filePath, avatar, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);


            String avatarUrl = "/uploads/avatars/" + fileName;

            optionalCompany.setAvatarUrl(avatarUrl);
            companyRepository.save(optionalCompany);

        } catch (Exception e) {
            throw new RuntimeException("Error updating company avatar", e);
        }
    }



    public void UpdateEmail(String email, Integer id)
    {
        try {
            Company existingCompany = companyRepository.findById(id).orElse(null);
            if (existingCompany == null) {
                throw new IllegalArgumentException("Company with ID " + id + " not found");
            }

            existingCompany.setEmail(email);
            companyRepository.save(existingCompany);

        }catch (Exception e)
        {
            throw new RuntimeException("Error updating email", e);
        }
    }

    public void UpdatePassword(String password, Integer id)
    {
        try {
            Company existingCompany = companyRepository.findById(id).orElse(null);
            if (existingCompany == null) {
                throw new IllegalArgumentException("Company with ID " + id + " not found");
            }

            existingCompany.setPassword(passwordEncoder.encode(password));
            companyRepository.save(existingCompany);

        }catch (Exception e)
        {
            throw new RuntimeException("Error updating password", e);
        }
    }

}
