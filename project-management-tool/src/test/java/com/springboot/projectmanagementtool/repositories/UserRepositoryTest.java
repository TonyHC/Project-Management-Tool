package com.springboot.projectmanagementtool.repositories;

import com.springboot.projectmanagementtool.domain.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.Assertions.assertThat;

@TestPropertySource(
        locations = "classpath:application.properties"
)
@DataJpaTest
class UserRepositoryTest {
    private static final String USERNAME = "tom@gmail.com";

    @Autowired
    private UserRepository userRepository;

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    void findByUsername_RetrievesValidUser_WhenUsernameExists() {
        // Given
        User user = new User();
        user.setUsername(USERNAME);
        user.setPassword("password");
        user.setConfirmPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");

        userRepository.save(user);

        // When
        User foundUser = userRepository.findByUsername(USERNAME);

        // Then
        assertThat(foundUser).isEqualTo(user);
    }

    @Test
    void findByUsername_ReturnsNull_WhenUsernameDoesNotExist() {
        // When
        User foundUser = userRepository.findByUsername(USERNAME);

        // Then
        assertThat(foundUser).isNull();
    }
}