package com.example.animalshelter.controller;

import com.example.animalshelter.dto.CommonResponse;
import com.example.animalshelter.dto.PetDTO;
import com.example.animalshelter.model.Pet;
import com.example.animalshelter.service.PetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pets")
public class PetController {
    @Autowired
    PetService petService;

    //---GET---
    //get all pets
    //input: none, output: response entity with common response if ok
    @GetMapping
    public ResponseEntity<?> getAllPets() {
        List<Pet> pets = petService.getAllPets();

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(pets)
                .message("All pets retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);

    }

    //get pet by id
    //input: pet id integer, output: response entity with common response if ok
    @GetMapping("/{id}")
    public ResponseEntity<?> getPetById(@PathVariable Integer id) {
        Pet pet = petService.getPetById(id);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(pet)
                .message("Pet with id " + id + " retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //get pet by type
    //input: pet type string ("dog", "cat", or "other", output: response entity with common response if ok
    @GetMapping(params="type")
    public ResponseEntity<?> getPetsByType(@RequestParam("type") String type) {
        List<Pet> pets = petService.getPetByType(type);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(pets)
                .message("Pets of type " + type + " retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //get pets by username (favorited)
    //input: username, output: response entity with common response if ok
    @GetMapping("/users/{username}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getPetsByUsername(@PathVariable String username) {
        List<Pet> pets = petService.getPetsByUsername(username);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(pets)
                .message("Favorite pets retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //get pet by microchip id
    //input: microchip id integer, output: response entity with common response if ok
    @GetMapping("/microchips/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPetsByMicrochipId(@PathVariable Integer id) {
        Pet pet = petService.getPetByMicrochipId(id);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(pet)
                .message("Pet with microchip id " + id + " retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //get pets without a microchip
    //input: none, output: response entity with common response if ok
    @GetMapping("/microchips/null")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPetsWithoutMicrochip() {
        List<Pet> pets = petService.getMicrochipsWithoutMicrochip();

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(pets)
                .message("Pets without microchip retrieved successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }

    //---POST---
    //create new pet
    //input: PetDTO, output: response entity with common response if created
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addPet(@Valid @RequestBody PetDTO petDTO) {
        Pet pet = petService.createPet(petDTO);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(pet)
                .message("Pet created successfully")
                .status(HttpStatus.CREATED)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //---PUT or PATCH---
    //update pet by id
    //input: pet id integer and PetDTO, output: response entity with common response if ok
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePet(@PathVariable Integer id, @Valid @RequestBody PetDTO petDTO) {
        Pet pet = petService.updatePet(id, petDTO);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .data(pet)
                .message("Pet with id " + id + " updated successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);

    }

    //---DELETE---
    //delete pet by id
    //input: pet id integer, output: response entity with common response if ok
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletePet(@PathVariable Integer id) {
        petService.deletePet(id);

        CommonResponse response = CommonResponse.builder()
                .hasError(false)
                .message("Pet with id " + id + " deleted successfully")
                .status(HttpStatus.OK)
                .build();

        return ResponseEntity.ok(response);
    }


}
