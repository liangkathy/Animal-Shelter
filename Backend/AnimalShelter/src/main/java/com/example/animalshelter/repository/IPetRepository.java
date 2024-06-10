package com.example.animalshelter.repository;

import com.example.animalshelter.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPetRepository extends JpaRepository<Pet, Integer> {
    List<Pet> findByType(String type);

}
