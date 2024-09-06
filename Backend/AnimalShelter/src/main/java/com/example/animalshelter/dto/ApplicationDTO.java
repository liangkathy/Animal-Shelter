package com.example.animalshelter.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDTO {
    @NotBlank(message = "Response 1 is required")
    private String response1;

    @NotBlank(message = "Response 2 is required")
    private String response2;

    @NotBlank(message = "Response 3 is required")
    private String response3;

    private List<Integer> petIds;

    @NotNull(message = "User is required")
    private String username;
}
