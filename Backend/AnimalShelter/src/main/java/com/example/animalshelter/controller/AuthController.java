package com.example.animalshelter.controller;

import com.example.animalshelter.dto.CommonResponse;
import com.example.animalshelter.model.User;
import com.example.animalshelter.service.AuthService;
import com.example.animalshelter.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    UserService userService;

    @Autowired
    AuthService authService;

    //---LOGIN---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String token = authService.loginAndGenerateToken(loginRequest);
        User user = userService.findUserByUsername(loginRequest.username());
        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(new LoginResponseData(user,token))
                .message("Login successful")
                .status(HttpStatus.OK).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //---SIGNUP---
    //create new user - not admin
    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) throws Exception {
        User createdUser = userService.createUser(user);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(createdUser)
                .message("User created successfully")
                .status(HttpStatus.CREATED)
                .build();
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //create new admin user - secured via SecurityConfig (admin only)
    @PostMapping("/admin/signup")
    public ResponseEntity<?> createAdminUser(@Valid @RequestBody User user) {
        userService.createAdminUser(user);
        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(user)
                .message("User created succesfully")
                .status(HttpStatus.CREATED)
                .build();
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //using record type to save time on boilerplate code
    public record LoginRequest(String username, String password) {
    }

    public record LoginResponseData(User user, String token) {
    }
}
