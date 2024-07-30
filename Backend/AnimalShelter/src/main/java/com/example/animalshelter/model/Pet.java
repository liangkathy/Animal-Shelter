package com.example.animalshelter.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_pet")
    @SequenceGenerator(name = "seq_pet", allocationSize = 1)
    private Integer id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Type is required")
    private String type;

    @NotBlank(message = "Breed is required")
    private String breed;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "Date of birth cannot be null")
    //@Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}", message = "Date format should follow: yyyy-MM-dd")
    private LocalDate dob;
    //calculate age from dob and current date to month or year (done in front end to get updated value on renders)

    @NotBlank(message = "Sex is required")
    private String sex;

    @NotNull(message = "Weight cannot be null")
    private Integer weight;

    private String imgURL;

    //potential idea = pet status (adopted, adoptable, medical care, etc)
    //private String status;

    //one-to-one relationship with microchip
    @OneToOne(cascade = CascadeType.ALL) //delete pet > delete microchip from db
    @JoinColumn(name = "microchip_id", unique = true) //microchip not required at creation, can be added later
    private Microchip microchip;

    //many-to-many relationship with user
    @JsonIgnore
    @ManyToMany(mappedBy = "favoritePets", cascade = {CascadeType.MERGE, CascadeType.PERSIST}) //when pet updated, update field in user
    private List<User> users = new ArrayList<>();

    //many-to-many relationship with application
    @ToString.Exclude
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name="PetApplication",
            joinColumns = @JoinColumn(name = "pet_id"),
            inverseJoinColumns = @JoinColumn(name = "application_id")
    )
    private List<Application> applications;
}
