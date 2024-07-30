package com.example.animalshelter.service;

import com.example.animalshelter.controller.ApplicationController;
import com.example.animalshelter.model.Application;
import com.example.animalshelter.repository.IApplicationRepository;
import com.example.animalshelter.repository.IPetRepository;
import com.example.animalshelter.repository.IUserRepository;
import com.example.animalshelter.utils.MockConstants;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@ContextConfiguration(classes = ApplicationService.class)
public class ApplicationServiceTest {
    @Autowired
    ApplicationService applicationService;

    @MockBean
    IApplicationRepository applicationRepository;

    @MockBean
    IUserRepository userRepository;

    @MockBean
    IPetRepository petRepository;


    //---GET ALL APPLICATIONS---
    //HAPPY PATH
    @Test
    public void testGetAllApplications() {
        when(applicationRepository.findAll()).thenReturn(MockConstants.mockApplications);
        List<Application> resultList = applicationService.getAllApplications();

        assertEquals(2, resultList.size(), "The result list size should be 2");
        assertEquals(MockConstants.mockApplications, resultList, "the result list and mock list should match");

        verify(applicationRepository, times(1)).findAll();
    }


    //---GET APPLICATION BY ID---
    //HAPPY PATH
    @Test
    public void testGetApplicationById() {
        when(applicationRepository.findById(anyInt())).thenReturn(Optional.of(MockConstants.mockApplication));
        Application result = applicationService.getApplicationById(1);

        assertEquals(MockConstants.mockApplication, result, "The result and mock application should match");

        verify(applicationRepository, times(1)).findById(anyInt());
    }


    //---GET APPLICATIONS BY USER ID---
    //HAPPY PATH
    @Test
    public void testGetApplicationByUserId() {
        when(userRepository.findByUsername(anyString())).thenReturn(MockConstants.mockUser);
        List<Application> resultList = applicationService.getApplicationsByUsername(MockConstants.mockUser.getUsername());

        assertEquals(0, resultList.size(), "The result list size should be 0"); //mockUser currently has no apps

        verify(userRepository, times(1)).findByUsername(anyString());
    }


    //---CREATE APPLICATION---
    //HAPPY PATH
    @Test
    public void testCreateApplication() {
        when(userRepository.findByUsername(anyString())).thenReturn(MockConstants.mockUser);
        when(applicationRepository.save(any(Application.class))).thenReturn(MockConstants.mockApplication);

        Application result = applicationService.createApplication(MockConstants.applicationDTO);

        assertEquals(MockConstants.mockApplication, result, "The result and mock application should match");

        verify(applicationRepository, times(1)).save(any(Application.class));
    }


    //---UPDATE APPLICATION---
    //HAPPY PATH
    @Test
    public void testUpdateApplication() {
        when(userRepository.findByUsername(anyString())).thenReturn(MockConstants.mockUser);
        when(applicationRepository.findById(anyInt())).thenReturn(Optional.of(MockConstants.mockApplication));
        when(applicationRepository.save(any(Application.class))).thenReturn(MockConstants.mockApplication2);
        Application result = applicationService.updateApplication(1,MockConstants.applicationDTO2);

        assertEquals(MockConstants.mockApplication2, result, "The result and mock application should match");

        verify(applicationRepository, times(1)).save(any(Application.class));
    }

    //---DELETE APPLICATION---
    //HAPPY PATH
    @Test
    public void testDeleteApplication() {
        when(applicationRepository.findById(anyInt())).thenReturn(Optional.of(MockConstants.mockApplication));
        applicationService.deleteApplication(1);

        verify(applicationRepository, times(1)).findById(anyInt());
        verify(applicationRepository, times(1)).delete(any(Application.class));
    }

    //GET APP BY KEYWORD
    @Test
    public void getApplicationByKeyword() {
        when(applicationRepository.findApplicationsByKeyword(anyString())).thenReturn(MockConstants.mockApplications);
        List<Application> resultList = applicationService.findApplicationsByKeyword("lorem");

        assertEquals(2, resultList.size(), "The result list size should be 2");
        assertEquals(MockConstants.mockApplications, resultList, "the result list and mock list should match");

        verify(applicationRepository, times(1)).findApplicationsByKeyword(anyString());
    }



}
