package com.springboot.projectmanagementtool.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class JwtLoginSuccessResponse {
    private String token;
    private boolean success;
}