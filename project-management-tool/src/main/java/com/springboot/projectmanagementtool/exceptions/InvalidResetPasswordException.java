package com.springboot.projectmanagementtool.exceptions;

public class InvalidResetPasswordException extends RuntimeException {
    public InvalidResetPasswordException(String message) {
        super(message);
    }
}