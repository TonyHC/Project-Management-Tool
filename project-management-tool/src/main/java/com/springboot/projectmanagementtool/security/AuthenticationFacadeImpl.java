package com.springboot.projectmanagementtool.security;

import org.springframework.security.core.Authentication;

public interface AuthenticationFacadeImpl {
    Authentication getAuthentication();
}
