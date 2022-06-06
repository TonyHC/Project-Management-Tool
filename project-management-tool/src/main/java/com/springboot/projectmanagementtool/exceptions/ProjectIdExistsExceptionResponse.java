package com.springboot.projectmanagementtool.exceptions;

public class ProjectIdExistsExceptionResponse {
    private String projectIdExists;

    public ProjectIdExistsExceptionResponse(String projectIdExists) {
        this.projectIdExists = projectIdExists;
    }

    public String getProjectIdExists() {
        return projectIdExists;
    }

    public void setProjectIdExists(String projectIdExists) {
        this.projectIdExists = projectIdExists;
    }
}