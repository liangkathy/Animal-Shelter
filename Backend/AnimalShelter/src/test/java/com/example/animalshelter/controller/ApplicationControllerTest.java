package com.example.animalshelter.controller;

import com.example.animalshelter.service.ApplicationService;
import com.example.animalshelter.utils.Mapper;
import com.example.animalshelter.utils.MockConstants;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ApplicationController.class)
public class ApplicationControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    ApplicationService applicationService;

    //---GET ALL APPLICATIONS---
    //HAPPY PATH
    @Test
    public void testGetAllApplications() throws Exception {
        when(applicationService.getAllApplications()).thenReturn(MockConstants.mockApplications);
        mockMvc.perform(get("/applications"))
                .andExpect(status().isOk());

        verify(applicationService, times(1)).getAllApplications();
    }


    //---GET APPLICATION BY ID---
    //HAPPY PATH
    @Test
    public void testGetApplicationById() throws Exception {
        when(applicationService.getApplicationById(anyInt())).thenReturn(MockConstants.mockApplication);
        mockMvc.perform(get("/applications/{id}", 1))
                .andExpect(status().isOk());

        verify(applicationService, times(1)).getApplicationById(anyInt());
    }


    //---GET APPLICATIONS BY USER ID---
    //HAPPY PATH
    @Test
    public void testGetApplicationsByUser() throws Exception {
        when(applicationService.getApplicationsByUsername(anyString())).thenReturn(MockConstants.mockApplications);
        mockMvc.perform(get("/applications/users/{username}", MockConstants.mockUser.getUsername()))
                .andExpect(status().isOk());

        verify(applicationService, times(1)).getApplicationsByUsername(anyString());
    }


    //---CREATE APPLICATION---
    //HAPPY PATH
    @Test
    public void testCreateApplication() throws Exception {
        when(applicationService.createApplication(any())).thenReturn(MockConstants.mockApplication);
        mockMvc.perform(post("/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .content(Mapper.convertToJSON(MockConstants.applicationDTO)))
                .andExpect(status().isCreated());

        verify(applicationService, times(1)).createApplication(any());
    }


    //---UPDATE APPLICATION---
    //HAPPY PATH
    @Test
    public void testUpdateApplication() throws Exception {
        when(applicationService.updateApplication(anyInt(), any())).thenReturn(MockConstants.mockApplication);
        mockMvc.perform(put("/applications/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(Mapper.convertToJSON(MockConstants.applicationDTO2)))
                .andExpect(status().isOk());

        verify(applicationService, times(1)).updateApplication(anyInt(), any());
    }

    //---DELETE APPLICATION---
    //HAPPY PATH
    @Test
    public void testDeleteApplication() throws Exception {
        mockMvc.perform(delete("/applications/{id}", 1))
                .andExpect(status().isOk());

        verify(applicationService, times(1)).deleteApplication(anyInt());
    }


    //GET APP BY KEYWORD
    @Test
    public void testGetApplicationByKeyword() throws Exception {
        when(applicationService.findApplicationsByKeyword(anyString())).thenReturn(MockConstants.mockApplications);

        mockMvc.perform(get("/applications")
                .param("keyword", anyString()))
                .andExpect(status().isOk());

        verify(applicationService, times(1)).findApplicationsByKeyword(anyString());
    }



}
