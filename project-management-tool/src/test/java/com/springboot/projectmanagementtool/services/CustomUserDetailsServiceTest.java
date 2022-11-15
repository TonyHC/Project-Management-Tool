package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.UserNotFoundException;
import com.springboot.projectmanagementtool.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.TestPropertySource;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@TestPropertySource(
        locations = "classpath:application.properties"
)
@ExtendWith(MockitoExtension.class)
class CustomUserDetailsServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void loadUserByUsername_RetrievesValidUser_WhenUsernameExists() {
        // Given
        String username = "Tom@gmail.com";

        User user = new User();
        user.setUsername(username);
        user.setPassword("password");
        user.setConfirmPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");

        given(userRepository.findByUsername(username)).willReturn(user);

        // When
        UserDetails foundUser = customUserDetailsService.loadUserByUsername(username);

        // Then
        assertThat(foundUser).isEqualTo(user);
    }

    @Test
    void loadUserByUsername_ThrowsException_WhenUsernameDoesNotExist() {
        // Given
        given(userRepository.findByUsername(anyString())).willReturn(null);

        // When / Then
        assertThatThrownBy(() -> customUserDetailsService.loadUserByUsername(anyString()))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessageContaining("Invalid username");

        verify(userRepository, times(1)).findByUsername(anyString());
    }

    @Test
    void loadUserById_RetrievesValidUser_WhenUserIdExists() {
        // Given
        Long userId = 1L;

        User user = new User();
        user.setId(userId);
        user.setUsername("Tom@gmail.com");
        user.setPassword("password");
        user.setConfirmPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");

        given(userRepository.findById(userId)).willReturn(Optional.of(user));

        // When
        User foundUser = customUserDetailsService.loadUserById(userId);

        // Then
        assertThat(foundUser).isEqualTo(user);
    }

    @Test
    void loadUserById_ThrowsException_WhenUserIdDoesNotExist() {
        // Given
        given(userRepository.findById(1L)).willReturn(Optional.empty());

        // When / Then
        assertThatThrownBy(() -> customUserDetailsService.loadUserById(1L))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessageContaining("User was not found");

        verify(userRepository, times(1)).findById(1L);
    }
}