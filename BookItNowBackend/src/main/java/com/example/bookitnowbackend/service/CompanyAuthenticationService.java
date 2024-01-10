package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.*;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import com.example.bookitnowbackend.repository.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class CompanyAuthenticationService {

    @Autowired
    private ICompanyRepository companyRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Qualifier("companyAuthManager")
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public CompanyRegistrationResponseDTO registerCompany(String companyName, String password, String email, String description)
    {
        try{
            System.out.println(companyName);
            System.out.println(password);
            System.out.println(email);
            System.out.println(description);


            String encodedPassword = passwordEncoder.encode(password);
            System.out.println(encodedPassword);
            Role companyRole = roleRepository.findByAuthority("COMPANY").get();
            System.out.println("COMPANY ROLE:" + companyRole);

            Set<Role> authorities = new HashSet<>();
            List<AppService> appServices = new ArrayList<>();

            authorities.add(companyRole);

            Company newCompany = new Company();
            newCompany.setCompanyName(companyName);
            newCompany.setPassword(encodedPassword);
            newCompany.setDescription(description);
            newCompany.setEmail(email);
            newCompany.setServices(appServices);
            newCompany.setAuthorities(authorities);
            newCompany.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            for(Integer x = 0; x < 20; x++)
            {
                System.out.println("COMPANY AUTHENTICATION SERVICE");
            }
            companyRepository.save(newCompany);

            return new CompanyRegistrationResponseDTO(companyName, email);

        }catch (Exception e)
        {
            System.out.println("ERROR: " + e);
            return new CompanyRegistrationResponseDTO("","");
        }

    }

    public CompanyLoginResponseDTO loginCompany(String email, String password)
    {
        try{

            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            String token = tokenService.generateJwt(auth, companyRepository.getCompanyByEmail(email).get().getId());

            return new CompanyLoginResponseDTO(companyRepository.getCompanyByEmail(email).get(), token);

        }catch (AuthenticationException e) {
            return new CompanyLoginResponseDTO();
        }


    }



}
