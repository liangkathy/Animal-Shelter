package com.example.animalshelter.controller;

import com.example.animalshelter.dto.CommonResponse;
import com.example.animalshelter.dto.MicrochipDTO;
import com.example.animalshelter.model.Microchip;
import com.example.animalshelter.service.MicrochipService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("microchips")
public class MicrochipController {
    @Autowired
    MicrochipService microchipService;

    //---GET---
    //get all microchips
    //input: none, output: response entity with common response if ok
    @GetMapping
    public ResponseEntity<?> getAllMicrochips() {
        List<Microchip> microchips = microchipService.getAllMicrochips();

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(microchips)
                .message("All microchips retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);

    }

    //get microchip by id
    //input: microchip id integer, output: response entity with common response if ok
    @GetMapping("/{id}")
    public ResponseEntity<?> getMicrochipById(@PathVariable Integer id) {
        Microchip microchip = microchipService.getMicrochipById(id);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(microchip)
                .message("Microchip with id " + id + " retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //get microchip by status
    //input: status string, output: response entity with common response if ok
    @GetMapping(params = "available")
    public ResponseEntity<?> getMicrochipsByStatus(@RequestParam String available) {
        List<Microchip> microchips = microchipService.getMicrochipsByStatus(available);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(microchips)
                .message("Microchips with an availability status of " + available + " retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //---POST---
    //create new microchips (takes list)
    //input: list of MicrchipDTOs, output: response entity with common response if created
    @PostMapping
    public ResponseEntity<?> addMicrochips(@Valid @RequestBody List<MicrochipDTO> microchipDTOS) {
        List<Microchip> microchips = microchipService.createMicrochips(microchipDTOS);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(microchips)
                .message("Microchip(s) created successfully")
                .status(HttpStatus.CREATED)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    //---PUT or PATCH---
    //update microchip by id
    //input: microchip id integer and MicrochipDTO, output: response entity with common response if ok
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMicrochips(@PathVariable Integer id, @Valid @RequestBody MicrochipDTO microchipDTO) {
        Microchip microchip = microchipService.updateMicrochip(id, microchipDTO);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(microchip)
                .message("Microchip with id " + id + " updated successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //---DELETE---
    //delete microchip by id
    //input: microchip id integer, output: response entity with common response if ok
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMicrochip(@PathVariable Integer id) {
        microchipService.deleteMicrochip(id);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .message("Microchip with id " + id + " deleted successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

}
