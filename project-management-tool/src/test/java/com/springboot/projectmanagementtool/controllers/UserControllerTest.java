package com.springboot.projectmanagementtool.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.payload.LoginRequest;
import com.springboot.projectmanagementtool.security.JwtTokenProvider;
import com.springboot.projectmanagementtool.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
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
class UserControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Test
    @Transactional
    void registerUser_CreatesNewUser_WhenUserRequestBodyIsValid() throws Exception {
        User user = new User();
        user.setUsername("testusersf@mail.com");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setPassword("Password");
        user.setConfirmPassword("Password");

        given(userService.saveUser(user)).willReturn(user);

        mockMvc.perform(post(UserController.USER_BASE_URL + "/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName", containsString(user.getFirstName())));
    }

    @Test
    void authenticateUser_LogsTheUserIn_WhenLoginRequestIsValid() throws Exception {
        LoginRequest loginRequest = new LoginRequest("testusers@mail.com", "Password");

        mockMvc.perform(post(UserController.USER_BASE_URL + "/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void getUserById_RetrievesExistingUser_WhenUserIdExists() throws Exception {
        Long id = 1L;

        User user = new User();
        user.setId(id);
        user.setUsername("testusersf@mail.com");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setPassword("Password");
        user.setConfirmPassword("");

        given(userService.getUserById(id)).willReturn(user);

        mockMvc.perform(get(UserController.USER_BASE_URL + "/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", containsString(user.getUsername())));
    }

    @Test
    @WithMockUser
    void resetUserPassword_ResetsExistingUserPassword_WhenUserRequestBodyIsValid() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setUsername("testusersf@mail.com");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setPassword("Password");
        user.setConfirmPassword("Password");

        given(userService.updateUserPassword(user)).willReturn(user);

        mockMvc.perform(patch(UserController.USER_BASE_URL + "/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk());
    }
}