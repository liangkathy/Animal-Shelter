package com.example.animalshelter.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetDTO {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Type is required")
    private String type;

    @NotBlank(message = "Breed is required")
    private String breed;

    @JsonFormat(pattern = "yyyy-MM-dd") //to deserialize value of LocalDate from string
    @NotNull(message = "Date of birth cannot be null")
    @Past(message = "Date of birth cannot be a future date")
    private LocalDate dob;

    @NotBlank(message = "Sex is required")
    //@Pattern(regexp = "(?:[Mm][Aa][Ll][Ee]|[Ff][Ee][Mm][Aa][Ll][Ee])$", message = "Sex field must be male or female")
    private String sex;

    @NotNull(message = "Weight cannot be null")
    private Integer weight;

    private String imgURL; //not required, will default to blank image if not provided

    private Integer microchipId;

}
