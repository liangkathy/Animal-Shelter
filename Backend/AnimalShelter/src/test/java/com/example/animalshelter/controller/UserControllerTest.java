package com.example.animalshelter.controller;
import com.example.animalshelter.dto.UserUpdateDTO;
import com.example.animalshelter.model.Pet;
import com.example.animalshelter.model.User;
import com.example.animalshelter.service.UserService;
import com.example.animalshelter.utils.InternalConstants;
import com.example.animalshelter.utils.Mapper;
import com.example.animalshelter.utils.MockConstants;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
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
        mockMvc.perform(get("/users")
                .with(user("admin").roles("USER", "ADMIN")))
                .andExpect(status().isOk());

        verify(userService, times(1)).getAllUsers();
    }


    //---GET USER BY ID---
    //HAPPY PATH
    @Test
    public void testGetUserById() throws Exception {
        when(userService.getUserById(anyInt())).thenReturn(MockConstants.mockUser);
        mockMvc.perform(get("/users/{id}", 1)
                .with(user("admin").roles("USER", "ADMIN")))
                .andExpect(status().isOk());

        verify(userService, times(1)).getUserById(anyInt());
    }

    //---GET USER BY USERNAME---
    @Test
    public void testGetUserByUsername() throws Exception {
        when(userService.getUserByUsername(anyString())).thenReturn(MockConstants.mockUser);
        mockMvc.perform(get("/users?username={username}", MockConstants.mockUser.getUsername())
                .with(user("admin").roles("USER", "ADMIN")))
                .andExpect(status().isOk());

        verify(userService, times(1)).getUserByUsername(anyString());
    }


//End point not used, uses AuthController to create user
    //---CREATE USER---
    //HAPPY PATH
//    @Test
//    public void testCreateUser() throws Exception {
//        when(userService.createUser(any())).thenReturn(MockConstants.mockUser);
//        mockMvc.perform(post("/users")
//                .with(user("admin").roles("USER", "ADMIN")).with(csrf())
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(Mapper.convertToJSON(MockConstants.mockUser)))
//                .andExpect(status().isCreated());
//
//        verify(userService, times(1)).createUser(any());
//    }


    //---UPDATE USER---
    //HAPPY PATH
    @Test
    public void testUpdateUserByUsername() throws Exception {
        User userUpdate = MockConstants.mockUser;
        UserUpdateDTO userDTO = MockConstants.mockUserUpdateDTO;

        userUpdate.setFirstName(userDTO.getFirstName());
        userUpdate.setLastName(userDTO.getLastName());
        userUpdate.setEmail(userDTO.getEmail());
        userUpdate.setPassword(userDTO.getNewPassword());
        userUpdate.setPhoneNumber(userDTO.getPhoneNumber());
        userUpdate.setUsername(userDTO.getUsername());

        when(userService.updateUserByUsername(anyString(), any())).thenReturn(MockConstants.mockUser);
        mockMvc.perform(put("/users/{username}", MockConstants.mockUser.getUsername())
                .with(user("admin").roles("USER", "ADMIN")).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(Mapper.convertToJSON(MockConstants.mockUserUpdateDTO)))
                .andExpect(status().isOk());

        verify(userService, times(1)).updateUserByUsername(anyString(), any());

    }

    //---ADD PET TO USER---
    //HAPPY PATH
    @Test
    public void testAddPetToUser() throws Exception {
        User userUpdate = MockConstants.mockUser;
        Pet petUpdate = MockConstants.mockPet3;
        userUpdate.getFavoritePets().add(petUpdate);

        when(userService.addPetToUser(anyString(), anyInt())).thenReturn(MockConstants.mockUser);
        mockMvc.perform(put("/users/{username}/pets/{petId}/add", MockConstants.mockUser.getUsername(),1)
                .with(user("admin").roles("USER", "ADMIN")).with(csrf()))
                .andExpect(status().isOk());

        verify(userService, times(1)).addPetToUser(anyString(), anyInt());
    }

    //---DELETE PET FROM USER---
    //HAPPY PATH
    @Test
    public void testDeletePetFromUser() throws Exception {
        User userUpdate = MockConstants.mockUser;
        Pet petUpdate = MockConstants.mockPet3;
        userUpdate.getFavoritePets().add(petUpdate);

        when(userService.deletePetFromUser(anyString(), anyInt())).thenReturn(MockConstants.mockUser);
        mockMvc.perform(put("/users/{username}/pets/{petId}/delete", MockConstants.mockUser.getUsername(),petUpdate.getId())
                .with(user("admin").roles("USER", "ADMIN")).with(csrf()))
                .andExpect(status().isOk());

        verify(userService, times(1)).deletePetFromUser(anyString(), anyInt());
    }


    //---DELETE USER---
    //HAPPY PATH
    @Test
    public void testDeleteUser() throws Exception {
        mockMvc.perform(delete("/users/{username}", "username")
                .with(user("admin").roles("USER", "ADMIN")).with(csrf()))
                .andExpect(status().isOk());

        verify(userService, times(1)).deleteUserByUsername(anyString());
    }

}
