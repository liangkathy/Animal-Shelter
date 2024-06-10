package com.example.animalshelter.controller;

import com.example.animalshelter.dto.ApplicationDTO;
import com.example.animalshelter.dto.CommonResponse;
import com.example.animalshelter.model.Application;
import com.example.animalshelter.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {
    @Autowired
    ApplicationService applicationService;

    //---GET---
    //get all applications
    @GetMapping
    public ResponseEntity<?> getAllApplications() {
        List<Application> applications = applicationService.getAllApplications();

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(applications)
                .message("All applications retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //get applications by pet id
    @GetMapping("/{id}")
    public ResponseEntity<?> getApplicationById(@PathVariable Integer id) {
        Application application = applicationService.getApplicationById(id);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(application)
                .message("Application with id " + id + " retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //get applications by user id
    @GetMapping("/users/{username}")
    public ResponseEntity<?> getApplicationsByUsername(@PathVariable String username) {
        List<Application> applications = applicationService.getApplicationsByUsername(username);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(applications)
                .message("Applications for " + username + " retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //---POST---
    //create new application
    @PostMapping
    public ResponseEntity<?> addApplication(@Valid @RequestBody ApplicationDTO applicationDTO) {
        Application application = applicationService.createApplication(applicationDTO);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(application)
                .message("Application created successfully")
                .status(HttpStatus.CREATED)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //---PUT or PATCH---
    //update application by id
    @PutMapping("/{id}")
    public ResponseEntity<?> updateApplication(@PathVariable Integer id, @Valid @RequestBody ApplicationDTO applicationDTO) {
        Application application = applicationService.updateApplication(id, applicationDTO);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(application)
                .message("Application with id " + id + " updated successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //---DELETE---
    //delete application by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteApplication(@PathVariable Integer id) {
        applicationService.deleteApplication(id);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .message("Application with id " + id + " deleted successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //JPQL
    //find applications by keyword
    @GetMapping(params="keyword")
    public ResponseEntity<?> getApplicationsByKeyword(@RequestParam String keyword) {
        List<Application> applications = applicationService.findApplicationsByKeyword(keyword);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(applications)
                .message("Applications with " + keyword + " retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

}
