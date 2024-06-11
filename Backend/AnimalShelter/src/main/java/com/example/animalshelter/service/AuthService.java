package com.example.animalshelter.service;

import com.example.animalshelter.controller.AuthController;
import com.example.animalshelter.model.User;
import com.example.animalshelter.repository.IUserRepository;
import com.example.animalshelter.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {
    //user authentication
    @Autowired
    IUserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public String loginAndGenerateToken(AuthController.LoginRequest loginRequest) throws AuthenticationException {
        if (loginRequest.username().isBlank() && loginRequest.password().isBlank()) {
            throw new IllegalArgumentException("Username and password are required");
        } else if (loginRequest.username().isBlank() || loginRequest.username().trim().isEmpty()) {
            throw new IllegalArgumentException("Username is required");
        } else if (loginRequest.password().isBlank() || loginRequest.password().trim().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));

        return jwtUtil.generateToken(authentication);
    }

}
