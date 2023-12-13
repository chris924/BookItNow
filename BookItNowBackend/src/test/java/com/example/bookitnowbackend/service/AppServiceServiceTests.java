package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.AppService;
import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.repository.IAppointmentRepository;
import com.example.bookitnowbackend.repository.IServiceRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AppServiceServiceTests {


    @Mock
    private IServiceRepository serviceRepository;

    @InjectMocks
    private AppServiceService appServiceService;

    @Test
    public void AppServiceService_UpdateService_ReturnUpdatedService()
    {
        AppService appService = new AppService(3, "test", "test", new Company(), new Timestamp(System.currentTimeMillis()));
        AppService newAppService = new AppService(3, "modifiedtest", "test", new Company(), new Timestamp(System.currentTimeMillis()));

        when(serviceRepository.findById(Mockito.any())).thenReturn(Optional.of(appService));
        when(serviceRepository.save(Mockito.any(AppService.class))).thenReturn(newAppService);

      AppService modifiedAppService =  appServiceService.updateService(appService);

        Assertions.assertEquals(modifiedAppService.getName(), newAppService.getName());
    }


    @Test
    public void AppServiceService_SaveAppService_ReturnAppService()
    {
        AppService appService = new AppService(3, "test", "test", new Company(), new Timestamp(System.currentTimeMillis()));

        when(serviceRepository.save(Mockito.any(AppService.class))).thenReturn(appService);

      AppService savedAppService =  appServiceService.saveService(appService);
    }

    @Test
    public void AppServiceService_GetAppServiceById_ReturnAppService()
    {
        AppService appService = new AppService(3, "test", "test", new Company(), new Timestamp(System.currentTimeMillis()));

        when(serviceRepository.save(Mockito.any(AppService.class))).thenReturn(appService);
        when(serviceRepository.findById(Mockito.any(Integer.class))).thenReturn(Optional.of(appService));

        appServiceService.saveService(appService);

      AppService foundService =  appServiceService.getServiceById(appService.getId());

      Assertions.assertNotNull(foundService);
      Assertions.assertEquals(foundService.getId(), appService.getId());

    }



}
