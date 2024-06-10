package com.example.animalshelter.controller;

import com.example.animalshelter.dto.PetDTO;
import com.example.animalshelter.model.Pet;
import com.example.animalshelter.service.PetService;
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

@WebMvcTest(PetController.class)
public class PetControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    PetService petService;

    //---GET ALL PETS---
    //HAPPY PATH
    @Test
    public void testGetAllPets() throws Exception {
        when(petService.getAllPets()).thenReturn(MockConstants.mockPets);
        mockMvc.perform(get("/pets"))
                .andExpect(status().isOk());

        verify(petService, times(1)).getAllPets();
    }


    //---GET PET BY ID---
    //HAPPY PATH
    @Test
    public void testGetPetById() throws Exception {
        when(petService.getPetById(anyInt())).thenReturn(MockConstants.mockPet);
        mockMvc.perform(get("/pets/{id}", 1))
                .andExpect(status().isOk());

        verify(petService, times(1)).getPetById(anyInt());
    }


    //---GET PET BY TYPE---
    //HAPPY PATH
    @Test
    public void testGetPetByType() throws Exception {
        when(petService.getPetByType(anyString())).thenReturn(MockConstants.mockPets);
        mockMvc.perform(get("/pets")
                .param("type", "dog"))
                .andExpect(status().isOk());

        verify(petService, times(1)).getPetByType(anyString());
    }


    //---GET FAVORITE PETS BY USERNAME---
    //HAPPY PATH
    @Test
    public void testGetPetsByUserId() throws Exception {
        when(petService.getPetsByUsername(anyString())).thenReturn(MockConstants.mockPets);
        mockMvc.perform(get("/pets/users/{id}", 1))
                .andExpect(status().isOk());

        verify(petService, times(1)).getPetsByUsername(anyString());
    }


    //---GET PET BY MICROCHIP ID---
    //HAPPY PATH
    @Test
    public void testGetPetByMicrochipId() throws Exception {
        when(petService.getPetByMicrochipId(anyInt())).thenReturn(MockConstants.mockPet);
        mockMvc.perform(get("/pets/microchips/{id}", 1234567))
                .andExpect(status().isOk());

        verify(petService, times(1)).getPetByMicrochipId(anyInt());
    }


    //---CREATE PET---
    //HAPPY PATH
    @Test
    public void testCreatePet() throws Exception {
        when(petService.createPet(any())).thenReturn(MockConstants.mockPet);
        mockMvc.perform(post("/pets")
                .contentType(MediaType.APPLICATION_JSON)
                .content(Mapper.convertToJSON(MockConstants.mockPetDTO)))
                .andExpect(status().isCreated());

        verify(petService, times(1)).createPet(any());
    }


    //---UPDATE PET---
    //HAPPY PATH
    @Test
    public void testUpdatePet() throws Exception {
        Pet mockPetUpdate = MockConstants.mockPet;
        PetDTO mockPetUpdateDTO = MockConstants.mockPetDTO2;
        mockPetUpdate.setName(mockPetUpdateDTO.getName());
        mockPetUpdate.setType(mockPetUpdateDTO.getType());
        mockPetUpdate.setBreed(mockPetUpdateDTO.getBreed());
        mockPetUpdate.setDob(mockPetUpdateDTO.getDob());
        mockPetUpdate.setSex(mockPetUpdateDTO.getSex());
        mockPetUpdate.setWeight(mockPetUpdateDTO.getWeight());

        when(petService.updatePet(anyInt(), any())).thenReturn(MockConstants.mockPet);
        mockMvc.perform(put("/pets/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(Mapper.convertToJSON(MockConstants.mockPetDTO2)))
                .andExpect(status().isOk());

        verify(petService, times(1)).updatePet(anyInt(), any());
    }


    //---DELETE PET---
    //HAPPY PATH
    @Test
    public void testDeletePet() throws Exception {
        mockMvc.perform(delete("/pets/{id}", 1))
                .andExpect(status().isOk());

        verify(petService, times(1)).deletePet(anyInt());
    }



}
