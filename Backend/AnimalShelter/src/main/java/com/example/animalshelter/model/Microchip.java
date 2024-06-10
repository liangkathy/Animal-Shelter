package com.example.animalshelter.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Microchip {
    @Id
    @NotNull(message = "Microchip id is required")
    private Integer id; //intentionally not set up with a generated value (should be unique chip)

    @Column(name="registered_with")
    @NotBlank(message = "Company is required")
    private String company;

    private boolean available; //true if available and false if assigned to pet already

    //one-to-one relationship with pet
    @ToString.Exclude //exclude from @Data toString method, causes stackoverflow error
    @JsonIgnore
    @OneToOne(mappedBy = "microchip", cascade = CascadeType.ALL)
    private Pet pet;

}
