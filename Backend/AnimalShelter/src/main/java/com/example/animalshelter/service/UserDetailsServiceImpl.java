package com.example.animalshelter.service;

import com.example.animalshelter.model.User;
import com.example.animalshelter.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//responsible for loading user details from application database
@Service
@RequiredArgsConstructor //adds final fields to constructor params
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    IUserRepository userRepository;

    //check if username exists
    //input: username string, output: User object that implements UserDetails (contains granted authorities)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }

        //able to return User object here instead of UserDetails
        //user class implements UserDetails and roles have been mapped to authorities in model class
        return user;
    }
}
