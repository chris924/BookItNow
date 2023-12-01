package com.example.bookitnowbackend.controller;

import com.example.bookitnowbackend.entity.AppService;
import com.example.bookitnowbackend.service.AppServiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
public class AppServiceController {

    @Autowired
    private AppServiceService appServiceService;

    @PostMapping("/addAppService")
    public ResponseEntity<?> addAppService(@Valid @RequestBody AppService appService, BindingResult bindingResult)
    {
        if(bindingResult.hasErrors())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        }

        try {
            AppService savedAppService = appServiceService.saveService(appService);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAppService);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @GetMapping("/getAllAppServices")
    public ResponseEntity<?> getAllAppServices()
    {
        try {
            List<AppService> allAppServices = appServiceService.getServices();
            return ResponseEntity.status(HttpStatus.OK).body(allAppServices);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting app services");
        }
    }

    @GetMapping("/getAppServiceById/{id}")
    public ResponseEntity<?> getAppServiceById(@PathVariable Integer id)
    {
        try {
            AppService appServiceById = appServiceService.getServiceById(id);
            return ResponseEntity.status(HttpStatus.OK).body(appServiceById);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting app service by id");
        }
    }

    @PutMapping("/updateAppService")
    public ResponseEntity<?> updateAppService(@Valid @RequestBody AppService appService, BindingResult bindingResult)
    {
        if(bindingResult.hasErrors())
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        }

        try {
            AppService updatedAppService = appServiceService.updateService(appService);
            return ResponseEntity.status(HttpStatus.OK).body(updatedAppService);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating app service");
        }
    }

    @DeleteMapping("/deleteAppService/{id}")
    public ResponseEntity<?> deleteAppService(@PathVariable Integer id)
    {
        try {
            String deletedAppService = appServiceService.deleteService(id);
            return ResponseEntity.status(HttpStatus.OK).body(deletedAppService);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting app service");
        }
    }
}
