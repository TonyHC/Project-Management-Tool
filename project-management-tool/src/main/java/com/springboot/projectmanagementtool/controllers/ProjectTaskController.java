package com.springboot.projectmanagementtool.controllers;

import com.springboot.projectmanagementtool.domain.ProjectTask;
import com.springboot.projectmanagementtool.services.MapValidationErrorService;
import com.springboot.projectmanagementtool.services.ProjectTaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/project-tasks")
public class ProjectTaskController {
    private ProjectTaskService projectTaskService;
    private MapValidationErrorService mapValidationErrorService;

    public ProjectTaskController(ProjectTaskService projectTaskService, MapValidationErrorService mapValidationErrorService) {
        this.projectTaskService = projectTaskService;
        this.mapValidationErrorService = mapValidationErrorService;
    }

    @PostMapping("/{backlogId}")
    public ResponseEntity<?> addProjectTaskToBacklog(@PathVariable String backlogId,
                                                     @Valid @RequestBody ProjectTask projectTask, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(result);

        if (errorMap != null) {
            return errorMap;
        }

        ProjectTask newProjectTask = projectTaskService.addProjectTask(backlogId, projectTask);
        return new ResponseEntity<>(newProjectTask, HttpStatus.CREATED);
    }
}