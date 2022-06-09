package com.springboot.projectmanagementtool.security;

import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityConstants {
    public static final String SIGN_UP_URLS = "/api/users/**";
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET = "SecretKeyToGenerateJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String AUTHENTICATED_USERNAME = SecurityContextHolder.getContext().getAuthentication().getName();
    public static final long EXPIRATION_TIME = 30_000; // 30 seconds
}
