package com.example.animalshelter.service;

import com.example.animalshelter.model.User;
import com.example.animalshelter.repository.IApplicationRepository;
import com.example.animalshelter.repository.IPetRepository;
import com.example.animalshelter.utils.MockConstants;

import com.example.animalshelter.repository.IUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;


import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class UserServiceTest {
    @Autowired
    UserService userService;

    @MockBean
    IUserRepository userRepository;

    @MockBean
    IPetRepository petRepository;

    @MockBean
    IApplicationRepository applicationRepository;

    //---GET ALL USERS---
    //HAPPY PATH
    @Test
    public void testGetAllUsers () {
        when(userRepository.findAll()).thenReturn(MockConstants.mockUsers);
        List<User> resultList = userService.getAllUsers();

        assertEquals(2, resultList.size(), "The result list size should be 2");
        assertEquals(MockConstants.mockUsers, resultList, "the result list and mock list should match");

        verify(userRepository, times(1)).findAll();
    }


    //---GET USER BY ID---
    //HAPPY PATH
    @Test
    public void testGetUserById () {
        when(userRepository.findById(anyInt())).thenReturn(Optional.of(MockConstants.mockUser));
        User result = userService.getUserById(1);

        assertEquals(MockConstants.mockUser, result, "The result and mock user should match");

        verify(userRepository, times(1)).findById(1);
    }

    //---GET USER BY USERNAME---
    //HAPPY PATH
    @Test
    public void testGetUserByUsername () {
        when(userRepository.findByUsername(anyString())).thenReturn(MockConstants.mockUser);
        User result = userService.getUserByUsername(MockConstants.mockUser.getUsername());

        assertEquals(MockConstants.mockUser, result, "The result and mock user should match");

    }


    //---CREATE USER---
    //HAPPY PATH
    @Test
    public void testCreateUser () {
        when(userRepository.save(any(User.class))).thenReturn(MockConstants.mockUser);
        when(userRepository.findByUsername(anyString())).thenReturn(null); //mock username is available
        when(userRepository.findByEmail(anyString())).thenReturn(null); //mock email is available
        User result = userService.createUser(MockConstants.mockUser);

        assertEquals(MockConstants.mockUser, result, "The result and mock user should match");

        verify(userRepository, times(1)).findByUsername(anyString());
        verify(userRepository, times(1)).findByEmail(anyString());
        verify(userRepository, times(1)).save(any(User.class));
    }


    //---UPDATE USER---
    //HAPPY PATH
/*    @Test
    public void testUpdateUserByUsername () {
        when(userRepository.findByUsername(MockConstants.mockUser.getUsername())).thenReturn(MockConstants.mockUser);
        when(userRepository.findByUsername(anyString())).thenReturn(null);
        when(userRepository.findByEmail(anyString())).thenReturn(null);
        when(userRepository.save(any(User.class))).thenReturn(MockConstants.mockUser2);

        User result = userService.updateUserByUsername(MockConstants.mockUser.getUsername(), MockConstants.mockUserUpdateDTO);

        assertEquals(MockConstants.mockUser2, result, "The result and mock user should match");

        verify(userRepository, times(1)).findByUsername(anyString());
        verify(userRepository, times(1)).findByEmail(anyString());
        verify(userRepository, times(1)).save(any(User.class));
    }*/


    //---ADD PET TO USER---
    //HAPPY PATH
/*    @Test
    public void testAddPetToUser (){
        when(userRepository.findByUsername(anyString())).thenReturn(MockConstants.mockUser);
        when(petRepository.findById(anyInt())).thenReturn(Optional.of(MockConstants.mockPet));
        when(userRepository.save(any(User.class))).thenReturn(MockConstants.mockUser);
        User result = userService.addPetToUser(MockConstants.mockUser.getUsername(), 1);

        assertEquals(MockConstants.mockUser, result, "The result and mock user should match");

    }*/


    //---DELETE USER---
    //HAPPY PATH
    @Test
    public void testDeleteUser() {
        when(userRepository.findByUsername(anyString())).thenReturn(MockConstants.mockUser);
        userService.deleteUserByUsername(MockConstants.mockUser.getUsername());

        verify(userRepository, times(1)).findByUsername(anyString());
        verify(userRepository, times(1)).delete(any(User.class));
    }


}
