package com.example.animalshelter.service;

import com.example.animalshelter.dto.PetDTO;
import com.example.animalshelter.model.Microchip;
import com.example.animalshelter.model.Pet;
import com.example.animalshelter.model.User;
import com.example.animalshelter.repository.IMicrochipRepository;
import com.example.animalshelter.repository.IPetRepository;
import com.example.animalshelter.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

import static org.apache.commons.lang3.text.WordUtils.capitalizeFully;

@Service
public class PetService {
    @Autowired
    IPetRepository petRepository;

    @Autowired
    IMicrochipRepository microchipRepository;

    @Autowired
    IUserRepository userRepository;

    //map petDTO to pet
    public Pet mapToPet(PetDTO petDTO) throws HttpClientErrorException {
        Pet pet = new Pet();

        Integer microchipId = petDTO.getMicrochipId();
        if (microchipId != null) {
            Microchip existingMicrochip = microchipRepository.findById(microchipId).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Microchip with id " + microchipId + " not found"));
            pet.setMicrochip(existingMicrochip);
            existingMicrochip.setPet(pet);
            existingMicrochip.setAvailable(false);
        }

        pet.setName(capitalizeFully(petDTO.getName()));
        pet.setType(capitalizeFully(petDTO.getType()));
        pet.setBreed(capitalizeFully(petDTO.getBreed()));
        pet.setDob(petDTO.getDob());
        pet.setSex(capitalizeFully(petDTO.getSex()));
        pet.setWeight(petDTO.getWeight());

        //default image provided when one isn't given
        if (petDTO.getImgURL() == null) {
            pet.setImgURL("./assets/hold-img.png");
        } else {
            pet.setImgURL(petDTO.getImgURL());
        }

        return pet;
    }

    //get all pets
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    //get pet by id
    public Pet getPetById(Integer id) throws HttpClientErrorException {
        return petRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Pet with id " + id + " not found"));
    }

    //get pets by type
    public List<Pet> getPetByType(String type) throws IllegalArgumentException {
        if (!type.isBlank()) {
            return petRepository.findByType(capitalizeFully(type)); //check match in same format (first letter cap)
        } else {
            throw new IllegalArgumentException("Type parameter cannot be a blank or empty string");
        }

    }

    //get pets by username (favorited)
    public List<Pet> getPetsByUsername(String username) throws HttpClientErrorException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "User " + username + " not found");
        }
        return user.getFavoritePets();
    }

    //get pet by microchip id
    public Pet getPetByMicrochipId(Integer id) throws HttpClientErrorException {
        Microchip existingMicrochip = microchipRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Microchip with id " + id + " not found"));

        return existingMicrochip.getPet();
    }

    //create new pet
    public Pet createPet(PetDTO petDTO) throws HttpClientErrorException {
        Pet pet = mapToPet(petDTO);

        return petRepository.save(pet);
    }

    //update pet by id
    public Pet updatePet(Integer id, PetDTO petDTO) throws HttpClientErrorException, IllegalArgumentException {
        Pet existingPet = petRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Pet with id " + id + " not found"));

        Integer microchipId = petDTO.getMicrochipId();
        if (microchipId != null) {
            Microchip existingMicrochip = microchipRepository.findById(microchipId).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Microchip with id " + microchipId + " not found"));

            //if pet already has a microchip and it doesn't match the one provided, then throw exception
            if(existingPet.getMicrochip() != null && !existingPet.getMicrochip().equals(existingMicrochip)) {
                throw new IllegalArgumentException("This pet is already registered with microchip id " + existingPet.getMicrochip().getId());
            } else if (existingPet.getMicrochip() == null) {
                existingPet.setMicrochip(existingMicrochip);
                existingMicrochip.setPet(existingPet);
                existingMicrochip.setAvailable(false);
                microchipRepository.save(existingMicrochip);
            }
        }
        //only microchip can be added, weight and imgURL can be updated (name, type, breed, dob, sex should be constants)
        existingPet.setWeight(petDTO.getWeight());

        //default image provided when one isn't given
        if (petDTO.getImgURL() == null) {
            existingPet.setImgURL("./assets/hold-img.png");
        } else {
            existingPet.setImgURL(petDTO.getImgURL());
        }

        return petRepository.save(existingPet);
    }

    //delete pet by id
    public void deletePet(Integer id) throws HttpClientErrorException {
        Pet pet = petRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Pet with id " + id + " not found"));
        if (pet.getUsers() != null) { //if pet was favorited by any users, remove pet from their list
            pet.getUsers().forEach(user -> user.getFavoritePets().remove(pet));
        }
        petRepository.delete(pet);
    }


}
