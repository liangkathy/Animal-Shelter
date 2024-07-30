package com.example.animalshelter.service;

import com.example.animalshelter.model.Microchip;
import com.example.animalshelter.model.Pet;
import com.example.animalshelter.repository.IMicrochipRepository;
import com.example.animalshelter.repository.IPetRepository;
import com.example.animalshelter.utils.MockConstants;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@ContextConfiguration(classes = MicrochipService.class)
public class MicrochipServiceTesting {
    @Autowired
    MicrochipService microchipService;

    @MockBean
    IMicrochipRepository microchipRepository;

    @MockBean
    IPetRepository petRepository;

    //---GET ALL MICROCHIPS---
    //HAPPY PATH
    @Test
    public void testGetAllMicrochips() {
        when(microchipRepository.findAll()).thenReturn(MockConstants.mockMicrochips);
        List<Microchip> resultList = microchipService.getAllMicrochips();

        assertEquals(2, resultList.size(), "The result list size should be 2");
        assertEquals(MockConstants.mockMicrochips, resultList, "the result list and mock list should match");

        verify(microchipRepository, times(1)).findAll();
    }


    //---GET MICROCHIP BY ID---
    //HAPPY PATH
    @Test
    public void testGetMicrochipById() {
        when(microchipRepository.findById(anyInt())).thenReturn(Optional.of(MockConstants.mockMicrochip));
        Microchip result = microchipService.getMicrochipById(1);

        assertEquals(MockConstants.mockMicrochip, result, "The result and mock microchip should match");

        verify(microchipRepository, times(1)).findById(anyInt());
    }


    //---GET MICROCHIP BY AVAILABILITY---
    //HAPPY PATH
    @Test
    public void testGetMicrochipByStatus() {
        when(microchipRepository.findMicrochipsByAvailable(anyBoolean())).thenReturn(MockConstants.mockMicrochips);
        List<Microchip> resultList = microchipService.getMicrochipsByStatus("true");

        assertEquals(2, resultList.size(), "The result list size should be 2");
        assertEquals(MockConstants.mockMicrochips, resultList, "The result list and mock list should match");

        verify(microchipRepository, times(1)).findMicrochipsByAvailable(anyBoolean());
    }


    //---CREATE MICROCHIP---
    //HAPPY PATH
    @Test
    public void testCreateMicrochip() {
        List<Microchip> emptyList = new ArrayList<>();
        when(microchipRepository.findAll()).thenReturn(emptyList); //no matching microchip ids should be found
        when(microchipRepository.saveAll(anyList())).thenReturn(MockConstants.mockMicrochips);
        List<Microchip> resultList = microchipService.createMicrochips(MockConstants.microchipDTOs);

        assertEquals(MockConstants.mockMicrochips, resultList, "The result list and mock list should match");

        verify(microchipRepository, times(2)).findAll(); //two dtos provided, runs twice
        verify(microchipRepository, times(1)).saveAll(anyList());
    }


    //---UPDATE MICROCHIP---
    //HAPPY PATH
    @Test
    public void testUpdateMicrochip() {
        when(microchipRepository.findById(anyInt())).thenReturn(Optional.of(MockConstants.mockMicrochip));
        when(microchipRepository.save(any(Microchip.class))).thenReturn(MockConstants.mockMicrochip3);
        Microchip result = microchipService.updateMicrochip(1234567, MockConstants.mockMicrochipDTO3);

        assertEquals(MockConstants.mockMicrochip3, result, "The result and mock microchip should match");

        verify(microchipRepository, times(1)).findById(anyInt());
        verify(microchipRepository, times(1)).save(any(Microchip.class));
    }


    //---DELETE MICROCHIP---
    //HAPPY PATH
    @Test
    public void testDeleteMicrochip() {
        when(microchipRepository.findById(anyInt())).thenReturn(Optional.of(MockConstants.mockMicrochip));
        microchipService.deleteMicrochip(1234567);

        verify(microchipRepository, times(1)).findById(anyInt());
        verify(microchipRepository, times(1)).delete(any(Microchip.class));
    }


}
