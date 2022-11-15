package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.InvalidResetPasswordException;
import com.springboot.projectmanagementtool.repositories.UserRepository;
import com.springboot.projectmanagementtool.security.SecurityUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@TestPropertySource(
        locations = "classpath:application.properties"
)
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    private static final Long ID = 1L;

    private User user;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private CustomUserDetailsService customUserDetailsService;

    @Mock
    private SecurityUtils securityUtils;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        user = new User();

        user.setId(ID);
        user.setUsername("Tom@gmail.com");
        user.setPassword("password");
        user.setConfirmPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");
    }

    @Test
    void saveUser_RegistersNewUser_WhenUserIsValid() {
        // When
        userService.saveUser(user);

        // Then
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);

        verify(userRepository).save(userArgumentCaptor.capture());

        User capturedUser = userArgumentCaptor.getValue();

        assertThat(capturedUser).isEqualTo(user);
    }

    @Test
    void getUserById_RetrievesValidUser_WhenUserIdExists() {
        // Given
        given(securityUtils.getAuthenticationUsername()).willReturn(user.getUsername());
        given(customUserDetailsService.loadUserById(ID)).willReturn(user);

        // When
        User foundUser = userService.getUserById(ID);

        // Then
        assertThat(foundUser).isEqualTo(user);
    }

    @Test
    void getUserById_ThrowsException_WhenUserIdDoesNotExist() {
        // Given
        given(securityUtils.getAuthenticationUsername()).willReturn(null);
        given(customUserDetailsService.loadUserById(ID)).willReturn(user);

        // When / Then
        assertThatThrownBy(() -> userService.getUserById(ID))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessageContaining("Username is invalid");
    }

    @Test
    void updateUserPassword_UpdatesExistingUserPassword_WhenUserIsValid() {
        // Given
        String updatedPassword = "fslkmsd";

        given(customUserDetailsService.loadUserById(ID)).willReturn(user);
        given(securityUtils.getAuthenticationUsername()).willReturn(user.getUsername());
        given(passwordEncoder.encode(user.getPassword())).willReturn(updatedPassword);

        // When
        userService.updateUserPassword(user);

        // Then
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userArgumentCaptor.capture());
        User capturedUser = userArgumentCaptor.getValue();
        assertThat(capturedUser.getPassword()).isEqualTo(updatedPassword);
    }

    @Test
    void updateUserPassword_ThrowsException_WhenNewPasswordForUserUsedBefore() {
        // Given
        given(customUserDetailsService.loadUserById(ID)).willReturn(user);
        given(securityUtils.getAuthenticationUsername()).willReturn(user.getUsername());
        given(passwordEncoder.matches(anyString(), anyString())).willReturn(true);

        // When / Then
        assertThatThrownBy(() -> userService.updateUserPassword(user))
                .isInstanceOf(InvalidResetPasswordException.class)
                .hasMessageContaining("Password was used previously");
    }
}