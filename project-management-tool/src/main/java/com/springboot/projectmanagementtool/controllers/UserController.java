package com.springboot.projectmanagementtool.controllers;

import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.services.MapValidationErrorService;
import com.springboot.projectmanagementtool.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final MapValidationErrorService mapValidationErrorService;
    private final UserService userService;

    public UserController(MapValidationErrorService mapValidationErrorService, UserService userService) {
        this.mapValidationErrorService = mapValidationErrorService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(result);

        if (errorMap != null) {
            return errorMap;
        }

        User newUser = userService.saveUser(user);
        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }
}