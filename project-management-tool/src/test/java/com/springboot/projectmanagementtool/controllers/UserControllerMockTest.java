package com.springboot.projectmanagementtool.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.UsernameAlreadyExistsException;
import com.springboot.projectmanagementtool.payload.LoginRequest;
import com.springboot.projectmanagementtool.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
class UserControllerMockTest {
    private User user;
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    UserService userService;

    @BeforeEach
    void setUp() {
        user = new User();

        user.setId(1L);
        user.setUsername("testusers@mail.com");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setPassword("Password");
        user.setConfirmPassword("Password");
    }

    @Test
    @Transactional
    void registerUser_CreatesNewUser_WhenUserRequestBodyIsValid() throws Exception {
        given(userService.saveUser(user)).willReturn(user);

        mockMvc.perform(post(UserController.USER_BASE_URL + "/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName", containsString(user.getFirstName())));
    }

    @Test
    @Transactional
    void registerUser_FailsToCreateNewUser_WhenUserAlreadyExists() throws Exception {
        UsernameAlreadyExistsException usernameAlreadyExistsException =
                new UsernameAlreadyExistsException("Username already exists.");

        given(userService.saveUser(user)).willThrow(usernameAlreadyExistsException);

        mockMvc.perform(post(UserController.USER_BASE_URL + "/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void authenticateUser_LogsTheUserIn_WhenLoginRequestIsValid() throws Exception {
        LoginRequest loginRequest = new LoginRequest(user.getUsername(), user.getPassword());

        mockMvc.perform(post(UserController.USER_BASE_URL + "/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void getUserById_RetrievesExistingUser_WhenUserIdExists() throws Exception {
        given(userService.getUserById(user.getId())).willReturn(user);

        mockMvc.perform(get(UserController.USER_BASE_URL + "/" + user.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", containsString(user.getUsername())));
    }

    @Test
    @WithMockUser
    void resetUserPassword_ResetsExistingUserPassword_WhenUserRequestBodyIsValid() throws Exception {
        given(userService.updateUserPassword(user)).willReturn(user);

        mockMvc.perform(patch(UserController.USER_BASE_URL + "/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk());
    }
}