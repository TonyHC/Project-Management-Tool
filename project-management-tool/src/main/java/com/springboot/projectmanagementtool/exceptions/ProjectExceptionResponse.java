package com.springboot.projectmanagementtool.exceptions;

public class ProjectExceptionResponse {
    private String exceptionResponse;

    public ProjectExceptionResponse(String exceptionResponse) {
        this.exceptionResponse = exceptionResponse;
    }

    public String getExceptionResponse() {
        return exceptionResponse;
    }

    public void setExceptionResponse(String exceptionResponse) {
        this.exceptionResponse = exceptionResponse;
    }
}