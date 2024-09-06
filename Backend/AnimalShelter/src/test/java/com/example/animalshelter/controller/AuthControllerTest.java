package com.example.animalshelter.controller;

import com.example.animalshelter.model.User;
import com.example.animalshelter.service.AuthService;
import com.example.animalshelter.service.UserService;
import com.example.animalshelter.utils.InternalConstants;
import com.example.animalshelter.utils.Mapper;
import com.example.animalshelter.utils.MockConstants;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    AuthService authService;

    @MockBean
    UserService userService;

    //mock data
    AuthController.LoginRequest loginRequest = new AuthController.LoginRequest("admin", "admin");

    //LOGIN
/*    @Test
    public void testLogin() throws Exception {
        when(authService.loginAndGenerateToken(loginRequest)).thenReturn(InternalConstants.adminJWT);
        when(userService.findUserByUsername(anyString())).thenReturn(MockConstants.mockUser);

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(String.valueOf(loginRequest)))
                .andExpect(status().isOk());

        verify(authService, times(1)).loginAndGenerateToken(loginRequest);
    }*/

    //SIGN UP USER
/*    @Test
    public void testSignUpUser() throws Exception {
        when(userService.createUser(any(User.class))).thenReturn(MockConstants.mockUser);

        mockMvc.perform(post("/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(Mapper.convertToJSON(MockConstants.mockUser)))
                .andExpect(status().isCreated());

        verify(userService, times(1)).createUser(any(User.class));
    }*/

    //SIGN UP ADMIN
/*    @Test
    @WithMockUser(username = "user", password = "mockpw", roles = {"USER", "ADMIN"})
    public void testSignUpAdmin() throws Exception {
        when(userService.createUser(any(User.class))).thenReturn(MockConstants.mockUser);

        mockMvc.perform(post("/admin/signup")
//                .with(user("admin").roles("USER", "ADMIN")).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(Mapper.convertToJSON(MockConstants.mockUser)))
                .andExpect(status().isCreated());

        verify(userService, times(1)).createUser(any(User.class));
    }*/

    //VERIFY ADMIN
/*    @Test
    public void testVerifyAdmin() throws Exception {
        mockMvc.perform(get("/authorization")
                .header("Authorization", "Bearer " + InternalConstants.adminJWT))
                .andExpect(status().isOk());

    }*/
}
