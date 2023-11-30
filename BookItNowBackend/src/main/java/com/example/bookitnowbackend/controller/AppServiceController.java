package com.example.bookitnowbackend.controller;


import com.example.bookitnowbackend.entity.AppService;
import com.example.bookitnowbackend.service.AppServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppServiceController {

    @Autowired
    private AppServiceService appServiceService;

    @PostMapping("/addAppService")
    public AppService addAppService(@RequestBody AppService appService)
    {
        return  appServiceService.saveService(appService);
    }

    @GetMapping("/getAllAppServices")
    public List<AppService> getAllAppServices()
    {
        return appServiceService.getServices();
    }

    @GetMapping("/getAppServiceById/{id}")
    public AppService getAppServiceById(@PathVariable Integer id)
    {
        return appServiceService.getServiceById(id);
    }

    @PutMapping("/updateAppService")
    public AppService updateAppService(@RequestBody AppService appService)
    {
        return appServiceService.updateService(appService);
    }

    @DeleteMapping("/deleteAppService/{id}")
    public String deleteAppService(@PathVariable Integer id)
    {
        return appServiceService.deleteService(id);
    }



}
