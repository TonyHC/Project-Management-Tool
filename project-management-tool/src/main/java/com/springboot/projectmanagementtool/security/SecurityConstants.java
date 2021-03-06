package com.springboot.projectmanagementtool.security;

public class SecurityConstants {
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET = "SecretKeyToGenerateJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 3600000; // 1 hour in milliseconds
}
