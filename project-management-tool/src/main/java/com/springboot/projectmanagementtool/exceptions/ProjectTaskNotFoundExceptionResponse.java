package com.springboot.projectmanagementtool.exceptions;

public class ProjectTaskNotFoundExceptionResponse {
    private String projectTaskNotFound;

    public ProjectTaskNotFoundExceptionResponse(String projectTaskNotFound) {
        this.projectTaskNotFound = projectTaskNotFound;
    }

    public String getProjectTaskNotFound() {
        return projectTaskNotFound;
    }

    public void setProjectTaskNotFound(String projectTaskNotFound) {
        this.projectTaskNotFound = projectTaskNotFound;
    }
}