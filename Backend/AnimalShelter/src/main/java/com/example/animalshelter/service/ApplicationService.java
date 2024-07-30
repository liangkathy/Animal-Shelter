package com.example.animalshelter.service;

import com.example.animalshelter.dto.ApplicationDTO;
import com.example.animalshelter.model.Application;
import com.example.animalshelter.model.Pet;
import com.example.animalshelter.model.User;
import com.example.animalshelter.repository.IApplicationRepository;
import com.example.animalshelter.repository.IPetRepository;
import com.example.animalshelter.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;

@Service
public class ApplicationService {
    @Autowired
    IApplicationRepository applicationRepository;

    @Autowired
    IUserRepository userRepository;

    @Autowired
    IPetRepository petRepository;

    //mapping applicationDTO to application
    public Application mapToApplication(ApplicationDTO applicationDTO, User existingUser) throws IllegalArgumentException, HttpClientErrorException {
        Application application = new Application();
        application.setResponse1(applicationDTO.getResponse1());
        application.setResponse2(applicationDTO.getResponse2());
        application.setResponse3(applicationDTO.getResponse3());
        application.setUser(existingUser);

        if(applicationDTO.getPetIds() != null) { //if pet ids are given
            List<Integer> existingPetIds = checkApplicationPets(existingUser);
            List<Integer> petIds = applicationDTO.getPetIds();
            List<Pet> pets = new ArrayList<>();
            validatePets(application, pets, petIds, existingPetIds); //ensure pet has not been applied to before & exists
        }
        return application;
    }

    //check pets of existing application for user
    public List<Integer> checkApplicationPets(User existingUser){
        List<Application> userApps = existingUser.getApplications();

        //get pet ids for comparison to ensure user isn't applying to the same pet twice
        List<Integer> petIds = new ArrayList<>();
        for (Application app : userApps) {
            app.getPets().forEach(pet -> {
                Integer petId = pet.getId();
                petIds.add(petId);
            });
        }
        return petIds;
    }

    private void validatePets(Application existingApplication, List<Pet> pets, List<Integer> petIds, List<Integer> existingPetIds) throws IllegalArgumentException, HttpClientErrorException {
        for (Integer petId : petIds) {
            if(existingPetIds.contains(petId)) { //check if user has already applied for this pet
                Pet pet = petRepository.findById(petId).orElse(null); //if application history includes pet then it exists
                throw new IllegalArgumentException("Application for " + pet.getName() + " already submitted");
            }
            Pet existingPet = petRepository.findById(petId).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Pet with id " + petId + " not found")); //ensure pet with id exists
            pets.add(existingPet);
        }
        existingApplication.setPets(pets);
    }

    //get all applications
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    //get applications by pet id
    public Application getApplicationById(Integer id) throws HttpClientErrorException {
        return applicationRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Application with id " + id + " not found"));
    }

    //get applications by user id
    public List<Application> getApplicationsByUsername(String username) throws UsernameNotFoundException {
        User existingUser = userRepository.findByUsername(username);
        if(existingUser == null) {
            throw new UsernameNotFoundException("User " + username + " not found");
        }
        return applicationRepository.getApplicationsByUser(existingUser);
    }

    //create new application
    public Application createApplication(ApplicationDTO applicationDTO) throws UsernameNotFoundException, HttpClientErrorException {
        String username = applicationDTO.getUsername();
        User existingUser = userRepository.findByUsername(username);

        if(existingUser == null) {
            throw new UsernameNotFoundException("User with name " + username + " not found");
        }

        Application application = mapToApplication(applicationDTO, existingUser); //map dto to application to save

        if (application.getPets() != null) { //if the application specified interest in specific pets
            List<Pet> pets = application.getPets();
            for (Pet pet : pets) { //then loop through the pets
                pet.getApplications().add(application); //and add this application to the pet
                //petRepository.save(pet); //manual save (can remove if cascading is added)
            }
        }
        Application savedApplication = applicationRepository.save(application); //need to save application first before it can be saved to pet in following loop

        //TODO also sends microservice notification with petIds, userId, and application Id
        return savedApplication;
    }

    //update application by id
    public Application updateApplication(Integer id, ApplicationDTO applicationDTO) throws IllegalArgumentException, HttpClientErrorException {
        Application existingApplication = applicationRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Application with id " + id + " not found"));

        String username = applicationDTO.getUsername();
        if (!existingApplication.getUser().getUsername().equals(username)) { //cannot edit the user who applied
            throw new IllegalArgumentException("User cannot be changed on an existing application");
        }

        User existingUser = userRepository.findByUsername(username); //user should have been validated when app was first created - will not be null here

        if(existingUser == null) {
            throw new UsernameNotFoundException("User with name " + username + " not found");
        }

        if (applicationDTO.getPetIds() != null) {
            List<Pet> pets = new ArrayList<>();
            List<Integer> petIds = applicationDTO.getPetIds();
            List<Integer> existingPetIds = checkApplicationPets(existingUser);
            validatePets(existingApplication, pets, petIds, existingPetIds); //ensure pet has not been applied to before & exists
        }
        //user id should be the same - will not be updated
        existingApplication.setResponse1(applicationDTO.getResponse1());
        existingApplication.setResponse2(applicationDTO.getResponse2());
        existingApplication.setResponse3(applicationDTO.getResponse3());

        return applicationRepository.save(existingApplication);
    }

    //delete application by id
    public void deleteApplication(Integer id) throws HttpClientErrorException {
        Application application = applicationRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Application with id " + id + " not found"));
        if (application.getPets() != null) { //remove application from pet
            application.getPets().forEach(pet -> pet.getApplications().remove(application));
        }

        applicationRepository.delete(application);
    }


    //find applications by keyword (JPQL)
    public List<Application> findApplicationsByKeyword(String keyword) {
        if(!keyword.isBlank()) {
            List<Application> applications = applicationRepository.findApplicationsByKeyword(keyword);
            return applications;
        } else {
            throw new IllegalArgumentException("Keyword cannot be blank");
        }
    }

}
