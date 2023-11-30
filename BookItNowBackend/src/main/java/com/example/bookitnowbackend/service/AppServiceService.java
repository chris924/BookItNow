package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.AppService;
import com.example.bookitnowbackend.repository.IServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppServiceService {

    @Autowired
    private IServiceRepository serviceRepository;

    public AppService saveService(AppService appService)
    {
        try {
            return serviceRepository.save(appService);
        }catch (Exception e) {
            throw new RuntimeException("Error saving service", e);
        }
    }
    public List<AppService> getServices()
    {
        try {
            return serviceRepository.findAll();
        }catch (Exception e) {

            throw new RuntimeException("Error getting services", e);
        }

    }

    public AppService getServiceById(int id)
    {
        try {
            Optional<AppService> optionalAppService = serviceRepository.findById(id);
            return optionalAppService.orElse(null);
        }catch (Exception e) {

            throw new RuntimeException("Error retrieving app service by id", e);
        }
    }

    public String deleteService(int id)
    {
        try {
            serviceRepository.deleteById(id);
            return "Company deleted!" + id;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting company by id", e);
        }
    }

    public AppService updateService(AppService appService)
    {

        try{
            AppService existingAppService = serviceRepository.findById(appService.getId()).orElse(null);

            if(existingAppService == null)
            {
                throw  new IllegalArgumentException("App Service with ID " + appService.getId() + " not found");
            }
            // EXISTING SERVICE CAN NOT CHANGE COMPANY? existingService.setCompany()
            existingAppService.setName(appService.getName());
            existingAppService.setDescription(appService.getDescription());
            existingAppService.setCreatedAt(appService.getCreatedAt());
            return serviceRepository.save(existingAppService);
        }catch (Exception e){
            throw new RuntimeException("Error updating appointment", e);
        }

    }


}
