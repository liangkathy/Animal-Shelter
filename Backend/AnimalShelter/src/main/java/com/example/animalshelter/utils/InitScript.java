package com.example.animalshelter.utils;

import com.example.animalshelter.dto.MicrochipDTO;
import com.example.animalshelter.dto.PetDTO;
import com.example.animalshelter.model.Address;
import com.example.animalshelter.model.User;
import com.example.animalshelter.service.MicrochipService;
import com.example.animalshelter.service.PetService;
import com.example.animalshelter.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Component
public class InitScript {

    @Autowired
    UserService userService;
    @Autowired
    private PetService petService;
    @Autowired
    private MicrochipService microchipService;


    //event listener to initialize objects when application is ready
    //output: User object with admin access, User object without admin access, 8 Pet objects, 10 Microchip objects
    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReadyEvent() {
        log.info("Starting application ready");

        if (userService.userExists("admin")) {
            log.info("Admin user already exists");
            return;
        }

        //create admin user and normal user on application start
        //var = reserved type name, uses type inference to detect data type of variable based on context
        var admin = User.builder()
                .username("admin")
                .password("adminadmin")
                .email("admin@example.com")
                .firstName("Admin")
                .lastName("User")
                .phoneNumber("1234567890")
                .address(Address.builder()
                        .street("Admin Street")
                        .city("Admin City")
                        .state("TX")
                        .zipcode("78701")
                        .build())
                .build();
        userService.createAdminUser(admin); //will set roles and generate id & registration date and encode password

        var user = User.builder()
                .username("user")
                .password("useruser")
                .email("user@example.com")
                .firstName("User")
                .lastName("User")
                .phoneNumber("1234567890")
                .address(Address.builder()
                        .street("User Street")
                        .city("User City")
                        .state("TX")
                        .zipcode("78701")
                        .build())
                .build();
        userService.createUser(user);

        var pet1 = createPet("Rocky", "dog","German Shepherd Mix", LocalDate.of(2024,1,10), "Male", 15);
        petService.createPet(pet1);

        var pet2 = createPet("Smokey", "dog","Lab Mix", LocalDate.of(2023,4,13), "Female", 55);
        petService.createPet(pet2);

        var pet3 = createPet("Luna", "cat","Domestic Shorthair", LocalDate.of(2023,6,20), "Female", 8);
        petService.createPet(pet3);

        var pet4 = createPet("Milo", "cat","Domestic Shorthair", LocalDate.of(2023,12,12), "Male", 8);
        petService.createPet(pet4);

        var pet5 = createPet("Carrot", "other","Rabbit", LocalDate.of(2022,3,5), "Female", 3);
        petService.createPet(pet5);

        var pet6 = createPet("Leaf", "other","Guinea Pig", LocalDate.of(2024,1,5), "Male", 2);
        petService.createPet(pet6);

        var pet7 = createPet("Max", "dog","Golden Retriever", LocalDate.of(2023,2,8), "Male", 40);
        petService.createPet(pet7);

        var pet8 = createPet("Mochi", "cat","Domestic Shorthair", LocalDate.of(2021,6,29), "Male", 13);
        petService.createPet(pet8);


        var microchipSet1 = createMicrochipDTOSet1(123456789, "24PetWatch");
        microchipService.createMicrochips(microchipSet1);

        var microchipsSet2 = createMicrochipDTOSet2(213426743, "PetLink");
        microchipService.createMicrochips(microchipsSet2);

    }


    //to build petDTO
    private PetDTO createPet(String name, String type, String breed, LocalDate dob, String sex, Integer weight) {
        return  PetDTO.builder()
                .name(name)
                .type(type)
                .breed(breed)
                .dob(dob)
                .sex(sex)
                .weight(weight)
                .imgURL(null)
                .microchipId(null)
                .build();
    }

    //to build microchipDTO (set 1 - no pets assigned)
    private List<MicrochipDTO> createMicrochipDTOSet1(Integer id, String company) {
        List<MicrochipDTO> microchipDTOS= new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            MicrochipDTO microchipDTO = new MicrochipDTO();
            microchipDTO.setId(id + i);
            microchipDTO.setCompany(company);
            microchipDTO.setPetId(null);

            microchipDTOS.add(microchipDTO);
        }

        return microchipDTOS;
    }

    //to build microchipDTO (set 1 - no pets assigned)
    private List<MicrochipDTO> createMicrochipDTOSet2(Integer id, String company) {
        List<MicrochipDTO> microchipDTOS= new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            MicrochipDTO microchipDTO = new MicrochipDTO();
            microchipDTO.setId(id - i);
            microchipDTO.setCompany(company);
            microchipDTO.setPetId(1 + i);

            microchipDTOS.add(microchipDTO);
        }

        return microchipDTOS;
    }

}
