package com.springboot.projectmanagementtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class CustomResponseExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(ProjectIdExistsException.class)
    public ResponseEntity<Object> handleProjectIdException(Exception exception, WebRequest webRequest) {
        ProjectIdExistsException exceptionResponse = new ProjectIdExistsException(exception.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProjectNotFoundException.class)
    public ResponseEntity<Object> handleProjectNotFoundException(Exception exception, WebRequest webRequest) {
        ProjectNotFoundExceptionResponse exceptionResponse = new ProjectNotFoundExceptionResponse(exception.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ProjectTaskNotFoundException.class)
    public ResponseEntity<Object> handleProjectTaskNotFoundException(Exception exception, WebRequest webRequest) {
        ProjectTaskNotFoundExceptionResponse exceptionResponse = new ProjectTaskNotFoundExceptionResponse(exception.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }
}