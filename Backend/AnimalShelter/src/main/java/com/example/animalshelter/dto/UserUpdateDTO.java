package com.example.animalshelter.dto;

import com.example.animalshelter.model.Address;
import jakarta.persistence.Embedded;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDTO {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Email must be formatted as an email address")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\d{10}$", message = "Phone number should be 10 digits")
    private String phoneNumber;

    @NotBlank(message = "Username cannot be null or blank")
    @Size(min = 3, max = 50, message = "Username must be between 3 to 50 characters long")
    private String username;

    @NotBlank(message = "Old password is required")
    private String oldPassword;

    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String newPassword;

    @Embedded
    @Valid
    private Address address;
}
