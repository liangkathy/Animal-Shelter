package com.example.animalshelter.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MicrochipDTO {
    @NotNull(message = "Microchip id is required")
    private Integer id;

    @NotBlank(message = "Company is required")
    private String company;

    private Integer petId;
}
