package com.example.animalshelter.service;

import com.example.animalshelter.model.User;
import com.example.animalshelter.repository.IUserRepository;
import com.example.animalshelter.utils.MockConstants;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@SpringBootTest
public class UserDetailsServiceImplTest {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @MockBean
    IUserRepository userRepository;


    @Test
    public void loadUserByUsername() {
        when(userRepository.findByUsername(anyString())).thenReturn(MockConstants.mockUser);

        UserDetails user = userDetailsService.loadUserByUsername(MockConstants.mockUser.getUsername());

        assertEquals(MockConstants.mockUser, user, "The mock user and result user should match");
    }
}
