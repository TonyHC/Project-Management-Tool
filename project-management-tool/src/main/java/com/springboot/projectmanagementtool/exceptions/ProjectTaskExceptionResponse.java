package com.springboot.projectmanagementtool.exceptions;

public class ProjectTaskExceptionResponse {
    private String exceptionResponse;

    public ProjectTaskExceptionResponse(String exceptionResponse) {
        this.exceptionResponse = exceptionResponse;
    }

    public String getExceptionResponse() {
        return exceptionResponse;
    }

    public void setExceptionResponse(String exceptionResponse) {
        this.exceptionResponse = exceptionResponse;
    }
}
