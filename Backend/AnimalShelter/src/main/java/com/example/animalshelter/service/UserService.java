package com.example.animalshelter.service;

import com.example.animalshelter.controller.AuthController;
import com.example.animalshelter.dto.UserUpdateDTO;
import com.example.animalshelter.enums.Role;
import com.example.animalshelter.model.Pet;
import com.example.animalshelter.model.User;
import com.example.animalshelter.repository.IApplicationRepository;
import com.example.animalshelter.repository.IPetRepository;
import com.example.animalshelter.repository.IUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    @Autowired
    IUserRepository userRepository;

    @Autowired
    IPetRepository petRepository;

    @Autowired
    IApplicationRepository applicationRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    //get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //get user by id
    public User getUserById(Integer id) throws HttpClientErrorException {
        return userRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "User with id " + id + " not found"));
    }

    //get user by username
    public User getUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }

        return user;
    }

    //create new user
    public User createUser(User user) throws DuplicateKeyException {
        List<Role> roles = new ArrayList<>();
        roles.add(Role.USER);

        return validateUsernameAndEmail(user, roles);
    }

    //create new admin user - secured end point
    public User createAdminUser(User user) throws DuplicateKeyException {
        List<Role> roles = new ArrayList<>();
        roles.add(Role.USER);
        roles.add(Role.ADMIN);

        return validateUsernameAndEmail(user, roles);
    }

    //used for account creation = checks that username and email are unique
    private User validateUsernameAndEmail(User user, List<Role> roles) throws DuplicateKeyException {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new DuplicateKeyException("Username " + user.getUsername() + " already taken");
        } else if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new DuplicateKeyException("Email " + user.getEmail() + " already used");
        }

        user.setRoles(roles);
        user.setPassword(encodePassword(user.getPassword()));
        return userRepository.save(user);
    }

    //encode password
    private String encodePassword(String password){
        return passwordEncoder.encode(password); //encoded password String
    }

    //update user by username
    public User updateUserByUsername (String username, UserUpdateDTO userUpdateDTO) throws UsernameNotFoundException, IllegalArgumentException, DuplicateKeyException{
        User existingUser = getUserByUsername(username);
        if (existingUser == null) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }

        if (!passwordEncoder.matches(userUpdateDTO.getOldPassword(), existingUser.getPassword())) {
            throw new IllegalArgumentException("The password does not match the old password");
        }

        //if username or email exists already (and is not the current user)
        User matchingUsername = userRepository.findByUsername(userUpdateDTO.getUsername());
        User matchingEmail = userRepository.findByEmail(userUpdateDTO.getEmail());

        if (matchingUsername != null && matchingUsername != existingUser) {
            throw new DuplicateKeyException("Username " + userUpdateDTO.getUsername() + " is already taken");
        } else if (matchingEmail != null && matchingEmail != existingUser) {
            throw new DuplicateKeyException("Email " + userUpdateDTO.getEmail() + " already used");
        } else {
            existingUser.setUsername(userUpdateDTO.getUsername());
            existingUser.setEmail(userUpdateDTO.getEmail());
        }

        //new password input may be empty
        if (userUpdateDTO.getNewPassword() != null) {
            existingUser.setPassword(encodePassword(userUpdateDTO.getNewPassword()));
        }

        existingUser.setFirstName(userUpdateDTO.getFirstName());
        existingUser.setLastName(userUpdateDTO.getLastName());
        existingUser.setPhoneNumber(userUpdateDTO.getPhoneNumber());

        existingUser.setAddress(userUpdateDTO.getAddress());

        return userRepository.save(existingUser);
    }

    //add pet to user (favorites)
    public User addPetToUser(String username, Integer petId) throws HttpClientErrorException, UsernameNotFoundException, IllegalArgumentException {
        User user = userRepository.findByUsername(username);
        Pet pet = petRepository.findById(petId).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Pet with id " + petId + " not found"));

        if (user == null) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }

        List<Pet> favoritePets = user.getFavoritePets();
        if (!favoritePets.contains(pet)) {
            favoritePets.add(pet);
            user.setFavoritePets(favoritePets);
            pet.getUsers().add(user);
        } else {
            throw new IllegalArgumentException("Pet already added to favorites");
        }
        return userRepository.save(user);
    }

    //delete pet from user
    public User deletePetFromUser(String username, Integer petId) throws HttpClientErrorException, UsernameNotFoundException, IllegalArgumentException {
        User user = userRepository.findByUsername(username);
        Pet pet = petRepository.findById(petId).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Pet with id " + petId + " not found"));

        if (user == null) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }

        List<Pet> favoritePets = user.getFavoritePets();
        if (favoritePets.contains(pet)) {
            favoritePets.remove(pet);
            user.setFavoritePets(favoritePets);
            pet.getUsers().remove(user);
        } else {
            throw new IllegalArgumentException("Pet does not exist as a favorite and cannot be removed");
        }
        return userRepository.save(user);
    }

    //delete user by id
    public void deleteUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }
        userRepository.delete(user);
    }

    //USED BY AUTH CONTROLLER
    //find user by username
    public User findUserByUsername(String username) throws AuthenticationException {
        User existingUser = userRepository.findByUsername(username);

        if (existingUser == null) {
            throw new UsernameNotFoundException("Username not found");
        }

        return existingUser;
    }

    //initialization of users via InitScript
    //find user exists
    public boolean userExists(String username) {
        return userRepository.findByUsername(username) != null;
    }

}
