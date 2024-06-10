package com.example.animalshelter.controller;

import com.example.animalshelter.dto.MicrochipDTO;
import com.example.animalshelter.model.Microchip;
import com.example.animalshelter.service.MicrochipService;
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

@WebMvcTest(MicrochipController.class)
public class MicrochipControllerTesting {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    MicrochipService microchipService;

    //---GET ALL MICROCHIPS---
    //HAPPY PATH
    @Test
    public void getAllMicrochips() throws Exception {
        when(microchipService.getAllMicrochips()).thenReturn(MockConstants.mockMicrochips);
        mockMvc.perform(get("/microchips"))
                .andExpect(status().isOk());

        verify(microchipService, times(1)).getAllMicrochips();
    }


    //---GET MICROCHIP BY ID---
    //HAPPY PATH
    @Test
    public void getMicrochipById() throws Exception {
        when(microchipService.getMicrochipById(anyInt())).thenReturn(MockConstants.mockMicrochip);
        mockMvc.perform(get("/microchips/{id}" ,1))
                .andExpect(status().isOk());

        verify(microchipService, times(1)).getMicrochipById(anyInt());
    }


    //---GET MICROCHIP BY AVAILABILITY---
    //HAPPY PATH
    @Test
    public void getMicrochipByStatus() throws Exception {
        when(microchipService.getMicrochipsByStatus(anyString())).thenReturn(MockConstants.mockMicrochips);
        mockMvc.perform(get("/microchips")
                .param("available", "true"))
                .andExpect(status().isOk());

        verify(microchipService, times(1)).getMicrochipsByStatus(anyString());
    }


    //---CREATE MICROCHIP---
    //HAPPY PATH
    @Test
    public void createMicrochip() throws Exception {
        when(microchipService.createMicrochips(anyList())).thenReturn(MockConstants.mockMicrochips);
        mockMvc.perform(post("/microchips")
                .contentType(MediaType.APPLICATION_JSON)
                .content(Mapper.convertToJSON(MockConstants.microchipDTOs)))
                .andExpect(status().isCreated());

        verify(microchipService, times(1)).createMicrochips(anyList());
    }


    //---UPDATE MICROCHIP---
    //HAPPY PATH
    @Test
    public void updateMicrochip() throws Exception {
        Microchip microchipUpdate = MockConstants.mockMicrochip;
        MicrochipDTO microchipUpdateDTO = MockConstants.mockMicrochipDTO3;
        microchipUpdate.setCompany(microchipUpdateDTO.getCompany());

        when(microchipService.updateMicrochip(anyInt(),any())).thenReturn(MockConstants.mockMicrochip);
        mockMvc.perform(put("/microchips/{id}" ,1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(Mapper.convertToJSON(MockConstants.mockMicrochipDTO3)))
                .andExpect(status().isOk());

        verify(microchipService, times(1)).updateMicrochip(anyInt(),any());
    }


    //---DELETE MICROCHIP---
    //HAPPY PATH
    @Test
    public void deleteMicrochip() throws Exception {
        mockMvc.perform(delete("/microchips/{id}" ,1))
                .andExpect(status().isOk());

        verify(microchipService, times(1)).deleteMicrochip(anyInt());
    }



}
