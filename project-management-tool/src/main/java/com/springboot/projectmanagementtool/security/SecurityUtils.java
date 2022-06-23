package com.springboot.projectmanagementtool.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {
    public  String getAuthenticationUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}