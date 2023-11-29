package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.Service;
import com.example.bookitnowbackend.repository.IServiceRepository;

import java.util.List;

public class ServiceService {

    private IServiceRepository serviceRepository;

    public Service saveService(Service service)
    {
        return serviceRepository.save(service);
    }

    public List<Service> getServices()
    {
        return serviceRepository.findAll();
    }

    public Service getServiceById(int id)
    {
        return serviceRepository.findById(id).orElse(null);
    }

    public String deleteService(int id)
    {
        serviceRepository.deleteById(id);
        return "Company deleted!" + id;
    }

    public Service updateService(Service service)
    {
        Service existingService = serviceRepository.findById(service.getId()).orElse(null);

        if(existingService == null)
        {
            throw new AssertionError();
        }
        // EXISTING SERVICE CAN NOT CHANGE COMPANY? existingService.setCompany()
        existingService.setName(service.getName());
        existingService.setDescription(service.getDescription());
        existingService.setCreatedAt(service.getCreatedAt());
        return serviceRepository.save(existingService);
    }


}
