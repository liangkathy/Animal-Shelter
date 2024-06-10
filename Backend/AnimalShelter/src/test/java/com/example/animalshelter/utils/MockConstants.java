package com.example.animalshelter.utils;

import com.example.animalshelter.dto.ApplicationDTO;
import com.example.animalshelter.dto.MicrochipDTO;
import com.example.animalshelter.dto.PetDTO;
import com.example.animalshelter.dto.UserUpdateDTO;
import com.example.animalshelter.enums.Role;
import com.example.animalshelter.model.*;
import org.springframework.stereotype.Component;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class MockConstants {

    //ADDITIONAL NEEDED
    public static User mockUser3 = createMockUser(3, "Kathy", "Liang", "kathy@example.com",
            "2140001111", "Username", "Password111");

    public static List<User> addUsersToPet(User user) {
        List<User> extraUsers = new ArrayList<>();
        extraUsers.add(mockUser3);

        return extraUsers;
    }
    //PET CLASS MOCKS
    public static Pet mockPet = new Pet(1, "Rocky", "Dog", "German Shepherd Mix",
            LocalDate.of(2024,01,10), "Male", 15, null, null, null, null);
    public static Pet mockPet2 = new Pet(2, "Luna", "Cat", "Domestic Shorthair",
            LocalDate.of(2023,06,12), "Female", 8, null, null, null, null);
    public static Pet mockPet3 = new Pet(3, "Mochi", "Cat", "Domestic Mediumhair",
            LocalDate.of(2021,06,29), "Male", 11, null, null,
           addUsersToPet(mockUser3) , null);

    public static List<Pet> mockPets = Arrays.asList(mockPet, mockPet2);

    //PET DTO MOCKS
    public static PetDTO mockPetDTO = new PetDTO("Rocky", "Dog", "German Shepherd Mix",
            LocalDate.of(2024,01,10), "Male", 15, null, null);
    public static PetDTO mockPetDTO2 = new PetDTO("Luna", "Cat", "Domestic Shorthair",
            LocalDate.of(2023,06,12), "Female", 8, null, null);

    //USER CLASS MOCKS
    private static User createMockUser(Integer id, String firstName, String lastName, String email, String phoneNumber, String username, String password) {
        User user = new User();
        user.setId(id);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setUsername(username);
        user.setPassword(password);
        user.setRegistrationDate(LocalDate.now());
        user.setAddress(new Address("123 1st Street", "Austin", "Texas", "78701"));

        List<Pet> pets = new ArrayList<>();
        pets.add(mockPet);
        pets.add(mockPet2);
        user.setFavoritePets(pets);

        List<Role> roles = new ArrayList<>();
        roles.add(Role.USER);
        roles.add(Role.ADMIN);

        user.setRoles(roles);

        List<Application> applications = new ArrayList<>();
        user.setApplications(applications);

        return user;
    }

    public static User mockUser = createMockUser(1, "John", "Doe", "john@example.com",
            "5120001111", "user123", "Password123");
    public static User mockUser2 = createMockUser(2, "Jane", "Doe", "jane@example.com",
            "5121110000", "user321", "Password321");

    public static List<User> mockUsers = Arrays.asList(mockUser, mockUser2);

    //APPLICATION CLASS MOCKS
    public static Application createMockApp(Integer id) {
        Application application = new Application();
        application.setId(id);
        application.setResponse1("Lorem ipsum dolor sit amet, consectetuer adipiscing elit.");
        application.setResponse2("Lorem ipsum dolor sit amet, consectetuer adipiscing elit.");
        application.setResponse3("Lorem ipsum dolor sit amet, consectetuer adipiscing elit.");

        application.setUser(mockUser);
        application.setPets(null);

        return application;
    }

    public static Application mockApplication = createMockApp(1);
    public static Application mockApplication2 = createMockApp(2);

    public static List<Application> mockApplications = Arrays.asList(mockApplication, mockApplication2);

    //APPLICATION DTO MOCKS
    public static ApplicationDTO createMockAppDTO() {
        ApplicationDTO applicationDTO = new ApplicationDTO();

        applicationDTO.setResponse1("Lorem ipsum dolor sit amet, consectetuer adipiscing elit.");
        applicationDTO.setResponse2("Lorem ipsum dolor sit amet, consectetuer adipiscing elit.");
        applicationDTO.setResponse3("Lorem ipsum dolor sit amet, consectetuer adipiscing elit.");

        applicationDTO.setUsername(mockUser.getUsername());
        applicationDTO.setPetIds(null);

        return applicationDTO;
    }

    public static ApplicationDTO applicationDTO = createMockAppDTO();
    public static ApplicationDTO applicationDTO2 = createMockAppDTO();

    //MICROCHIP CLASS MOCKS
    public static Microchip mockMicrochip = new Microchip(1234567, "24PetWatch", true, null);
    public static Microchip mockMicrochip2 = new Microchip(1234568, "24PetWatch", true, null);
    public static Microchip mockMicrochip3 = new Microchip(1234567, "NewCompany", true, null);
    public static Microchip mockMicrochip4 = new Microchip(1234567, "NewCompany", false, mockPet);

    public static List<Microchip> mockMicrochips = Arrays.asList(mockMicrochip, mockMicrochip2);

    //MICROCHIP DTO MOCKS
    public static List<MicrochipDTO> createMockMicrochipDTOs() {
        List<MicrochipDTO> microchipDTOs = new ArrayList<>();
        for (int i = 1; i < 3; i++) {
            MicrochipDTO microchipDTO = new MicrochipDTO();
            microchipDTO.setId(i + 1234566);
            microchipDTO.setCompany("24PetWatch");
            microchipDTO.setPetId(null);

            microchipDTOs.add(microchipDTO);
        }

        return microchipDTOs;
    }

    public static List<MicrochipDTO> microchipDTOs = createMockMicrochipDTOs();

    public static MicrochipDTO mockMicrochipDTO3 = new MicrochipDTO(1234567, "NewCompany", null);

    //USER UPDATE DTO
    private static UserUpdateDTO createMockUserUpdateDTO(String firstName, String lastName, String email, String phoneNumber, String username, String oldPassword, String newPassword) {
        UserUpdateDTO user = new UserUpdateDTO();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setUsername(username);
        user.setOldPassword(oldPassword);
        user.setNewPassword(newPassword);
        user.setAddress(new Address("123 1st Street", "Austin", "Texas", "78701"));


        return user;
    }

    public static UserUpdateDTO mockUserUpdateDTO = createMockUserUpdateDTO("Jane", "Doe", "jane@example.com",
            "5121110000", "user321", "Password321", "Password123");
}
