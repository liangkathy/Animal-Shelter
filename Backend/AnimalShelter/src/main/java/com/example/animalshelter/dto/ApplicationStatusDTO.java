package com.example.animalshelter.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationStatusDTO {
    //New, Contacting, Accepted, Rejected
    private String status;
}
