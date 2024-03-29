package com.springboot.projectmanagementtool.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.UsernameAlreadyExistsException;
import com.springboot.projectmanagementtool.payload.LoginRequest;
import com.springboot.projectmanagementtool.repositories.UserRepository;
import com.springboot.projectmanagementtool.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.parameters.P;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
class UserControllerTest {
    private static final String USERNAME = "testusers@mail.com";
    private static final String PASSWORD = "Password";

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Test
    @Transactional
    void registerUser_CreatesNewUser_WhenUserRequestBodyIsValid() throws Exception {
        User user = new User();

        user.setUsername(USERNAME + "ing");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setPassword(PASSWORD);
        user.setConfirmPassword(PASSWORD);

        mockMvc.perform(post(UserController.USER_BASE_URL + "/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username", containsString(user.getUsername())))
                .andExpect(jsonPath("$.firstName", containsString(user.getFirstName())))
                .andExpect(jsonPath("$.lastName", containsString(user.getLastName())));
    }

    @Test
    @Transactional
    void registerUser_FailsToCreateNewUser_WhenUserAlreadyExists() throws Exception {
        User user = new User();

        user.setUsername(USERNAME);
        user.setFirstName("Test");
        user.setLastName("Users");
        user.setPassword(PASSWORD);
        user.setConfirmPassword(PASSWORD);

        mockMvc.perform(post(UserController.USER_BASE_URL + "/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest());

        assertThatThrownBy(() -> userService.saveUser(user))
                .isInstanceOf(UsernameAlreadyExistsException.class)
                .hasMessageContaining("Username already exists.");
    }

    @Test
    void authenticateUser_LogsTheUserIn_WhenLoginRequestIsValid() throws Exception {
        LoginRequest loginRequest = new LoginRequest(USERNAME, PASSWORD);

        mockMvc.perform(post(UserController.USER_BASE_URL + "/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = USERNAME, password = PASSWORD)
    void getUserById_RetrievesExistingUser_WhenUserIdExists() throws Exception {
        mockMvc.perform(get(UserController.USER_BASE_URL + "/" + 1)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", aMapWithSize(9)));
    }

    @Test
    @WithMockUser(username = USERNAME, password = PASSWORD)
    @Transactional
    void resetUserPassword_ResetsExistingUserPassword_WhenUserRequestBodyIsValid() throws Exception {
        User updatedUser = userRepository.findByUsername(USERNAME);

        updatedUser.setPassword("Testing");
        updatedUser.setConfirmPassword(updatedUser.getPassword());

        mockMvc.perform(patch(UserController.USER_BASE_URL + "/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedUser)))
                .andExpect(status().isOk())
                .andReturn();

        assertThat(updatedUser).isEqualTo(userRepository.findByUsername(USERNAME));
    }
}