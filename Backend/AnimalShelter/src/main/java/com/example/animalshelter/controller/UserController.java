package com.example.animalshelter.controller;

import com.example.animalshelter.dto.CommonResponse;
import com.example.animalshelter.dto.UserUpdateDTO;
import com.example.animalshelter.model.User;
import com.example.animalshelter.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;

    //---GET---
    //get all users
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(users)
                .message("All users retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //get user by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(user)
                .message("User with id " + id + " retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //get user by username
    @GetMapping(params="username")
    public ResponseEntity<?> getUserByUsername(@RequestParam String username) {
        User user = userService.getUserByUsername(username);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(user)
                .message("User retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //---POST---
    //create new user
    @PostMapping
    public ResponseEntity<?> addUser(@Valid @RequestBody User user) {
        User newUser = userService.createUser(user);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(newUser)
                .message("User created successfully")
                .status(HttpStatus.CREATED)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //---PUT or PATCH---
    //update user by username
    @PutMapping("/{username}")
    public ResponseEntity<?> updateUserByUsername(@PathVariable String username, @Valid @RequestBody UserUpdateDTO userUpdateDTO) {
        User user = userService.updateUserByUsername(username, userUpdateDTO);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(user)
                .message("User profile updated successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //add pet to user (favorite)
    @PutMapping("/{username}/pets/{petId}/add")
    public ResponseEntity<?> addPetToUser(@PathVariable String username, @PathVariable Integer petId) {
        User user = userService.addPetToUser(username, petId);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(user)
                .message("Pet with id " + petId + " added to favorites successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{username}/pets/{petId}/delete")
    public ResponseEntity<?> deletePetFromUser(@PathVariable String username, @PathVariable Integer petId) {
        User user = userService.deletePetFromUser(username, petId);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(user)
                .message("Pet with id " + petId + " deleted from favorites successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }



    //---DELETE---
    //delete user by username
    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        userService.deleteUserByUsername(username);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .message("User with username " + username + " deleted successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }


}
