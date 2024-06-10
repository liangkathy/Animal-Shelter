package com.example.animalshelter.service;

import com.example.animalshelter.dto.MicrochipDTO;
import com.example.animalshelter.model.Microchip;
import com.example.animalshelter.model.Pet;
import com.example.animalshelter.repository.IMicrochipRepository;
import com.example.animalshelter.repository.IPetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MicrochipService {
    @Autowired
    IMicrochipRepository microchipRepository;

    @Autowired
    IPetRepository petRepository;

    //map microchip dto to microchip
    public List<Microchip> mapToMicrochip(List<MicrochipDTO> microchipDTOs) throws HttpClientErrorException {
        List<Microchip> microchips = new ArrayList<>();
        for (MicrochipDTO microchipDTO : microchipDTOs) {
            Microchip microchip = new Microchip();
            microchip.setId(microchipDTO.getId());
            microchip.setCompany(microchipDTO.getCompany());

            if(microchipDTO.getPetId() != null){ //if pet id is given, the chip is not available
                microchip.setAvailable(false);
                Integer petId = microchipDTO.getPetId();
                Pet existingPet = petRepository.findById(petId).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Pet with id " + petId + " not found"));
                microchip.setPet(existingPet);
                existingPet.setMicrochip(microchip);
            } else {
                microchip.setAvailable(true); //no pet id given means the chip is available
            }
            microchips.add(microchip); //add microchip to list
        }
        return microchips;
    }

    //get all microchips
    public List<Microchip> getAllMicrochips() {
        return microchipRepository.findAll();
    }

    //get microchip by id
    public Microchip getMicrochipById(Integer id) throws HttpClientErrorException {
        return microchipRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Microchip with id " + id + " not found"));
    }

    //get microchip by status
    public List<Microchip> getMicrochipsByStatus(String available) throws IllegalArgumentException {

        if (!available.isBlank() && (available.equalsIgnoreCase("true") || available.equalsIgnoreCase("false"))) {
            boolean availableBoolean = Boolean.parseBoolean(available); //parse to boolean value
            return microchipRepository.findMicrochipsByAvailable(availableBoolean);
        } else {
            throw new IllegalArgumentException("Request parameter for available must be true or false");
        }
    }

    //create new microchips (takes list)
    public List<Microchip> createMicrochips(List<MicrochipDTO> microchipDTOs) throws DuplicateKeyException, HttpClientErrorException {
        List<Integer> microchipIds = new ArrayList<>();
        for (MicrochipDTO microchipDTO : microchipDTOs) {
            Integer microchipId = microchipDTO.getId();

            if (!microchipIds.contains(microchipId)) { //ensure list provided does not contain duplicate ids
                microchipIds.add(microchipId);
            } else {
                throw new DuplicateKeyException("List contains duplicate microchip id " + microchipId + " and cannot be added");
            }
            //check existing db for duplicate id
            Optional<Microchip> existingMicrochip = microchipRepository.findAll().stream().filter(microchip -> microchip.getId().equals(microchipId)).findFirst();

            if (existingMicrochip.isPresent()) { //if microchip id match found
                throw new DuplicateKeyException("Microchip with id " + microchipId + " already exists");
            }
        }   //if no match found, continue method
        List<Microchip> microchips = mapToMicrochip(microchipDTOs);

        return microchipRepository.saveAll(microchips);
    }

    //update microchip by id
    public Microchip updateMicrochip(Integer id, MicrochipDTO microchipDTO) throws HttpClientErrorException, IllegalArgumentException {
        Microchip existingMicrochip = microchipRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Microchip with id " + id + " not found"));

        //check if given id differs from original (chip id cannot be changed)
        Integer microchipId = microchipDTO.getId();
        if (!microchipId.equals(id)) {
            throw new IllegalArgumentException("Microchip id cannot be changed");
        }

        Integer petId = microchipDTO.getPetId();
        //check if chip already assigned to a pet and user tries to set id to null (cannot be changed)
        if(!existingMicrochip.isAvailable() && (petId == null || !petId.equals(existingMicrochip.getPet().getId()))) {
            throw new IllegalArgumentException("Microchip with id " + microchipDTO.getId() + " is already registered to pet " + existingMicrochip.getPet().getName() + " and pet assignment cannot be changed");
        }
        //if chip is available and pet id was provided
        if(existingMicrochip.isAvailable() && petId != null) {
            Pet existingPet = petRepository.findById(petId).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Pet with id " + petId + " not found")); //check that pet id exists
            if (existingPet.getMicrochip() == null) { //if existing pet does not have a chip yet, then details can be assigned
                existingMicrochip.setPet(existingPet);
                existingPet.setMicrochip(existingMicrochip);
                existingMicrochip.setAvailable(false);
            } else { //if existing pet has a chip already
                throw new IllegalArgumentException("Pet with id " + petId + " already registered with microchip id " + existingPet.getMicrochip().getId());
            }
        }

        existingMicrochip.setCompany(microchipDTO.getCompany());

        return microchipRepository.save(existingMicrochip);
    }



    //delete microchip by id
    public void deleteMicrochip(Integer id) throws HttpClientErrorException {
        Microchip microchip = microchipRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Microchip with id " + id + " not found"));
        microchipRepository.delete(microchip);
    }


}
