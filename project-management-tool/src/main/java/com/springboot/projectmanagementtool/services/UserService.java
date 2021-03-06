package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.InvalidResetPasswordException;
import com.springboot.projectmanagementtool.exceptions.UsernameAlreadyExistsException;
import com.springboot.projectmanagementtool.repositories.UserRepository;
import com.springboot.projectmanagementtool.security.SecurityUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;
    private final SecurityUtils securityUtils;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       CustomUserDetailsService customUserDetailsService, SecurityUtils securityUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailsService = customUserDetailsService;
        this.securityUtils = securityUtils;
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

    public User getUserById(Long userId) {
        User user = customUserDetailsService.loadUserById(userId);

        if (!user.getUsername().equals(securityUtils.getAuthenticationUsername())) {
            throw new UsernameNotFoundException("Username is invalid");
        }

        return user;
    }

    public User updateUserPassword(User updatedUser) {
        User existingUser = getUserById(updatedUser.getId());

        if (passwordEncoder.matches(updatedUser.getPassword(), existingUser.getPassword())) {
            throw new InvalidResetPasswordException("Password was used previously");
        }

        updatedUser.setPassword(passwordEncoder.encode((updatedUser.getPassword())));
        updatedUser.setConfirmPassword("");

        return userRepository.save(updatedUser);
    }
}