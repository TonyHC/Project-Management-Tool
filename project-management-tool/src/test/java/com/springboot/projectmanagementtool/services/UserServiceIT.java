package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.UsernameAlreadyExistsException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
public class UserServiceIT {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private UserService userService;

    @Test
    @Transactional
    void saveUser_ThrowsException_WhenUsernameForNewUserAlreadyExists() {
        // Given
        User user = new User();
        user.setUsername("testusers@mail.com");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setPassword("Password");

        // When / Then
        assertThatThrownBy(() -> userService.saveUser(user))
                .isInstanceOf(UsernameAlreadyExistsException.class)
                .hasMessageContaining("Username already exists.");
    }
}