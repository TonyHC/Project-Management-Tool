package com.springboot.projectmanagementtool.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserNotFoundResponse {
    private String userNotFound;
}