package com.example.animalshelter.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_app")
    @SequenceGenerator(name = "seq_app", allocationSize = 1)
    private Integer id;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    @CreationTimestamp
    @Column(name="submitted_at")
    private LocalDateTime timestamp;

    //maybe add update timestamp?
    @NotBlank(message = "Response 1 is required")
    private String response1;

    @NotBlank(message = "Response 2 is required")
    private String response2;

    @NotBlank(message = "Response 3 is required")
    private String response3;

    //potential idea - application status (reviewed, rejected, accepted)
    //private String status;

    //many-to-many relationship with pet
    @ManyToMany(mappedBy = "applications", cascade = {CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
    private List<Pet> pets = new ArrayList<>();

    //many-to-one relationship with user
    @ManyToOne
    @JoinColumn(name="user_id", nullable=false) //application requires an associated user
    private User user;
}
