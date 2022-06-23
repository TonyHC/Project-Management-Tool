package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.UsernameAlreadyExistsException;
import com.springboot.projectmanagementtool.repositories.UserRepository;
import com.springboot.projectmanagementtool.security.SecurityUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
public class UserServiceIT {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    CustomUserDetailsService customUserDetailsService;
    SecurityUtils securityUtils;
    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(userRepository, passwordEncoder, customUserDetailsService, securityUtils);
    }

    @Test
    void saveUser_ThrowsException_WhenUsernameForNewUserAlreadyExists() {
        // Given
        User user = new User();
        user.setUsername("testuser@mail.com");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setPassword("Password");

        // When / Then
        assertThatThrownBy(() -> userService.saveUser(user))
                .isInstanceOf(UsernameAlreadyExistsException.class)
                .hasMessageContaining("Username already exists.");
    }
}