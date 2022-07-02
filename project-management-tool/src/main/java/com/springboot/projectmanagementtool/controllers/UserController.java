package com.springboot.projectmanagementtool.controllers;

import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.InvalidLoginResponse;
import com.springboot.projectmanagementtool.exceptions.InvalidResetPasswordResponse;
import com.springboot.projectmanagementtool.exceptions.UsernameAlreadyExistsResponse;
import com.springboot.projectmanagementtool.payload.JwtLoginSuccessResponse;
import com.springboot.projectmanagementtool.payload.LoginRequest;
import com.springboot.projectmanagementtool.security.JwtTokenProvider;
import com.springboot.projectmanagementtool.services.MapValidationErrorService;
import com.springboot.projectmanagementtool.services.UserService;
import com.springboot.projectmanagementtool.validator.UserValidator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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

@Tag(name = "Users", description = "Users API")
@RestController
@RequestMapping(UserController.USER_BASE_URL)
public class UserController {
    public static final String USER_BASE_URL = "/api/users";
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

    @Operation(summary = "Register a new user", description = "Returns the newly created user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully registered a new user",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "400", description = "Registration failed because username needs to be unique",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = UsernameAlreadyExistsResponse.class)))
    })
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        userValidator.validate(user, result);

        if (result.hasErrors()) {
            return mapValidationErrorService.mapValidationError(result);
        }

        User newUser = userService.saveUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @Operation(summary = "Authenticate a user upon login request",
            description = "Returns a JWT if authentication was successfully")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User logged in successfully",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = JwtLoginSuccessResponse.class))),
            @ApiResponse(responseCode = "401", description = "User attempt to login failed",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = InvalidLoginResponse.class)))
    })
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

    @Operation(summary = "Retrieve user information by id", description = "Returns a valid user if exists")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a valid user",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "401", description = "User does not exist or has invalid authentication",
                    content = @Content)
    })
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        User foundUser = userService.getUserById(Long.parseLong(userId));
        return new ResponseEntity<>(foundUser, HttpStatus.OK);
    }

    @Operation(summary = "Reset a user's password", description = "Returns a updated user with new password")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully reset the user's password",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "400", description = "Cannot use the previous password as the new password",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = InvalidResetPasswordResponse.class))),
            @ApiResponse(responseCode = "401", description = "Failed to reset user's password because user has invalid" +
                    "authentication or does not exit", content = @Content)
    })
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