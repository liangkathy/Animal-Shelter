package com.example.animalshelter.controller;
import com.example.animalshelter.model.Pet;
import com.example.animalshelter.model.User;
import com.example.animalshelter.service.UserService;
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

@WebMvcTest(UserController.class)
public class UserControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    UserService userService;

    //---GET ALL USERS---
    //HAPPY PATH
    @Test
    public void testGetAllUsers() throws Exception {
        when(userService.getAllUsers()).thenReturn(MockConstants.mockUsers);
        mockMvc.perform(get("/users"))
                .andExpect(status().isOk());

        verify(userService, times(1)).getAllUsers();
    }


    //---GET USER BY ID---
    //HAPPY PATH
    @Test
    public void testGetUserById() throws Exception {
        when(userService.getUserById(anyInt())).thenReturn(MockConstants.mockUser);
        mockMvc.perform(get("/users/{id}", 1))
                .andExpect(status().isOk());

        verify(userService, times(1)).getUserById(anyInt());
    }


    //---CREATE USER---
    //HAPPY PATH
/*    @Test
    public void testCreateUser() throws Exception {
        when(userService.createUser(any())).thenReturn(MockConstants.mockUser);
        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(Mapper.convertToJSON(MockConstants.mockUser)))
                .andExpect(status().isCreated());

        verify(userService, times(1)).createUser(any());
    }*/


    //---UPDATE USER---
    //HAPPY PATH
/*    @Test
    public void testUpdateUser() throws Exception {
        User userUpdate = MockConstants.mockUser;
        User userUpdate2 = MockConstants.mockUser2;

        userUpdate.setId(userUpdate2.getId()); //changing just for testing
        userUpdate.setFirstName(userUpdate2.getFirstName());
        userUpdate.setLastName(userUpdate2.getLastName());
        userUpdate.setEmail(userUpdate2.getEmail());
        userUpdate.setPassword(userUpdate2.getPassword());
        userUpdate.setPhoneNumber(userUpdate2.getPhoneNumber());
        userUpdate.setUsername(userUpdate2.getUsername());

        when(userService.updateUser(anyInt(), any())).thenReturn(MockConstants.mockUser);
        mockMvc.perform(put("/users/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(Mapper.convertToJSON(MockConstants.mockUser2)))
                .andExpect(status().isOk())
                .andExpect(content().json(Mapper.convertToJSON(MockConstants.mockUser2)));

        verify(userService, times(1)).updateUser(anyInt(), any());
    }*/


    //---ADD PET TO USER---
    //HAPPY PATH
/*    @Test
    public void testAddPetToUser() throws Exception {
        User userUpdate = MockConstants.mockUser;
        Pet petUpdate = MockConstants.mockPet3;
        userUpdate.getFavoritePets().add(petUpdate);

        when(userService.addPetToUser(anyString(), anyInt())).thenReturn(MockConstants.mockUser);
        mockMvc.perform(put("/users/{username}/pets/{petId}", MockConstants.mockUser.getUsername(),1))
                .andExpect(status().isOk());

        verify(userService, times(1)).addPetToUser(anyString(), anyInt());
    }*/


    //---DELETE USER---
    //HAPPY PATH
    @Test
    public void testDeleteUser() throws Exception {
        mockMvc.perform(delete("/users/{username}", "username"))
                .andExpect(status().isOk());

        verify(userService, times(1)).deleteUserByUsername(anyString());
    }

}
