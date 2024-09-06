package com.example.animalshelter.repository;

import com.example.animalshelter.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    //get user by username
    //input: username string, output: User object
    User findByUsername(String username);

    //get user by email
    //input: email string, output: User object
    User findByEmail(String email);
}
