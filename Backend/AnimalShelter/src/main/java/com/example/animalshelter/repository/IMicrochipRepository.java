package com.example.animalshelter.repository;

import com.example.animalshelter.model.Microchip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IMicrochipRepository extends JpaRepository<Microchip, Integer> {
    List<Microchip> findMicrochipsByAvailable(boolean available);
}
