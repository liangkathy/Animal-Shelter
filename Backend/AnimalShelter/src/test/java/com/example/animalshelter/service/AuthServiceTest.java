package com.example.animalshelter.service;

import com.example.animalshelter.controller.AuthController;
import com.example.animalshelter.utils.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class AuthServiceTest {
    @Autowired
    AuthService authService;

    @MockBean
    AuthenticationManager authenticationManager;

    @MockBean
    JwtUtil jwtUtil;


    //test login and token generation
    @Test
    public void testLoginAndTokenGeneration() {
        // Prepare test data
        AuthController.LoginRequest loginRequest = new AuthController.LoginRequest("admin", "adminadmin");
        Authentication authentication = new UsernamePasswordAuthenticationToken("admin", "adminadmin");
        String token = "generated_token";

        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(jwtUtil.generateToken(authentication)).thenReturn(token);

        String generatedToken = authService.loginAndGenerateToken(loginRequest);

        verify(authenticationManager, times(1)).authenticate(any());
        verify(jwtUtil, times(1)).generateToken(authentication);

        assertEquals(token, generatedToken, "The mock token and result token should match");
    }
}
