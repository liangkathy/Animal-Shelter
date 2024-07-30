package com.example.animalshelter.service;

import com.example.animalshelter.model.Pet;
import com.example.animalshelter.repository.IMicrochipRepository;
import com.example.animalshelter.repository.IUserRepository;
import com.example.animalshelter.utils.MockConstants;

import com.example.animalshelter.repository.IPetRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@ContextConfiguration(classes = PetService.class)
public class PetServiceTest {
    @Autowired
    PetService petService;

    @MockBean
    IPetRepository petRepository;

    @MockBean
    IMicrochipRepository microchipRepository;

    @MockBean
    IUserRepository userRepository;

    //---GET ALL PETS---
    //HAPPY PATH
    @Test
    public void testGetAllPets() {
        when(petRepository.findAll()).thenReturn(MockConstants.mockPets);
        List<Pet> resultList = petService.getAllPets();

        assertEquals(2, resultList.size(), "The result list size should be 2");
        assertEquals(MockConstants.mockPets, resultList, "the result list and mock list should match");

        verify(petRepository, times(1)).findAll();
    }


    //---GET PET BY ID---
    //HAPPY PATH
    @Test
    public void testGetPetById() {
        when(petRepository.findById(anyInt())).thenReturn(Optional.of(MockConstants.mockPet));
        Pet pet = petService.getPetById(1);

        assertEquals(MockConstants.mockPet, pet, "The result and mock pet should match");

        verify(petRepository, times(1)).findById(anyInt());
    }


    //---GET PET BY TYPE---
    //HAPPY PATH
    @Test
    public void testGetPetByType() {
        when(petRepository.findByType(anyString())).thenReturn(MockConstants.mockPets);
        List<Pet> resultList = petService.getPetByType(MockConstants.mockPet.getType());

        assertEquals(2, resultList.size(), "The result list size should be 2");
        assertEquals(MockConstants.mockPets, resultList, "the result list and mock list should match");

        verify(petRepository, times(1)).findByType(anyString());
    }


    //---GET FAVORITE PETS BY USERNAME---
    //HAPPY PATH
    @Test
    public void testGetPetsByUserId() {
        when(userRepository.findByUsername(anyString())).thenReturn(MockConstants.mockUser2);
        List<Pet> resultList = petService.getPetsByUsername("user");

        assertEquals(2, resultList.size(), "The result list size should be 2");
        assertEquals(MockConstants.mockPets, resultList, "the result list and mock list should match");
    }

    //---GET PET BY MICROCHIP ID---
    //HAPPY PATH
    @Test
    public void testGetPetByMicrochipId() {
        when(microchipRepository.findById(anyInt())).thenReturn(Optional.of(MockConstants.mockMicrochip4));
        Pet result = petService.getPetByMicrochipId(1);

        assertEquals(MockConstants.mockPet, result, "The result and mock pet should match");

        verify(microchipRepository, times(1)).findById(anyInt());
    }


    //---CREATE PET---
    //HAPPY PATH
    @Test
    public void testCreatePet() {
        when(petRepository.save(any(Pet.class))).thenReturn(MockConstants.mockPet);
        Pet result = petService.createPet(MockConstants.mockPetDTO);

        assertEquals(MockConstants.mockPet, result, "The result and mock pet should match");

        verify(petRepository, times(1)).save(any(Pet.class));
    }


    //---UPDATE PET---
    //HAPPY PATH
    @Test
    public void testUpdatePet() {
        when(petRepository.findById(anyInt())).thenReturn(Optional.of(MockConstants.mockPet));
        when(petRepository.save(any(Pet.class))).thenReturn(MockConstants.mockPet);
        Pet result = petService.updatePet(1,MockConstants.mockPetDTO);

        assertEquals(MockConstants.mockPet, result, "The result and mock pet should match");

        verify(petRepository, times(1)).findById(anyInt());
        verify(petRepository, times(1)).save(any(Pet.class));
    }

    //---DELETE PET---
    //HAPPY PATH
    @Test
    public void testDeletePet() {
        when(petRepository.findById(anyInt())).thenReturn(Optional.of(MockConstants.mockPet));
        petService.deletePet(1);

        verify(petRepository, times(1)).findById(anyInt());
        verify(petRepository, times(1)).delete(any(Pet.class));
    }

}
