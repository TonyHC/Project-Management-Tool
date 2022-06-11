package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.UsernameAlreadyExistsException;
import com.springboot.projectmanagementtool.repositories.UserRepository;
import com.springboot.projectmanagementtool.security.AuthenticationFacadeImpl;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;
    private final AuthenticationFacadeImpl authenticationFacade;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       CustomUserDetailsService customUserDetailsService, AuthenticationFacadeImpl authenticationFacade) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailsService = customUserDetailsService;
        this.authenticationFacade = authenticationFacade;
    }

    public User saveUser(User newUser) {
        try {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        } catch (Exception exception) {
            throw new UsernameAlreadyExistsException("Username already exists.");
        }
    }

    public User getUserById(String userId) {
        User user = customUserDetailsService.loadUserById(Long.parseLong(userId));

        if (!user.getUsername().equals(authenticationFacade.getAuthentication().getName())) {
            throw new UsernameNotFoundException("Username is invalid");
        }

        return user;
    }
}