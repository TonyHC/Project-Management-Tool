package com.springboot.projectmanagementtool.controllers;

import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.payload.JwtLoginSuccessResponse;
import com.springboot.projectmanagementtool.payload.LoginRequest;
import com.springboot.projectmanagementtool.security.JwtTokenProvider;
import com.springboot.projectmanagementtool.services.MapValidationErrorService;
import com.springboot.projectmanagementtool.services.UserService;
import com.springboot.projectmanagementtool.validator.UserValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.springboot.projectmanagementtool.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final MapValidationErrorService mapValidationErrorService;
    private final UserService userService;
    private final UserValidator userValidator;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public UserController(MapValidationErrorService mapValidationErrorService, UserService userService,
                          UserValidator userValidator, JwtTokenProvider jwtTokenProvider,
                          AuthenticationManager authenticationManager) {
        this.mapValidationErrorService = mapValidationErrorService;
        this.userService = userService;
        this.userValidator = userValidator;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        userValidator.validate(user, result);

        if (result.hasErrors()) {
            return mapValidationErrorService.mapValidationError(result);
        }

        User newUser = userService.saveUser(user);
        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.mapValidationError(result);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);

        return new ResponseEntity<>(new JwtLoginSuccessResponse(jwt, true), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        User foundUser = userService.getUserById(Long.parseLong(userId));
        return new ResponseEntity<>(foundUser, HttpStatus.OK);
    }

    @PatchMapping("/reset-password")
    public ResponseEntity<?> resetUserPassword(@Valid @RequestBody User user, BindingResult result) {
        userValidator.validate(user, result);

        if (result.hasErrors()) {
            return mapValidationErrorService.mapValidationError(result);
        }

        User updatedUser = userService.updateUserPassword(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
}