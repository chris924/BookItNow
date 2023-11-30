package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.AppService;
import com.example.bookitnowbackend.repository.IServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppServiceService {

    @Autowired
    private IServiceRepository serviceRepository;

    public AppService saveService(AppService appService)
    {
        return serviceRepository.save(appService);
    }

    public List<AppService> getServices()
    {
        return serviceRepository.findAll();
    }

    public AppService getServiceById(int id)
    {
        return serviceRepository.findById(id).orElse(null);
    }

    public String deleteService(int id)
    {
        serviceRepository.deleteById(id);
        return "Company deleted!" + id;
    }

    public AppService updateService(AppService appService)
    {
        AppService existingAppService = serviceRepository.findById(appService.getId()).orElse(null);

        if(existingAppService == null)
        {
            throw new AssertionError();
        }
        // EXISTING SERVICE CAN NOT CHANGE COMPANY? existingService.setCompany()
        existingAppService.setName(appService.getName());
        existingAppService.setDescription(appService.getDescription());
        existingAppService.setCreatedAt(appService.getCreatedAt());
        return serviceRepository.save(existingAppService);
    }


}
