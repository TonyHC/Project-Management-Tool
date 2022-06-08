package com.springboot.projectmanagementtool.controllers;

import com.springboot.projectmanagementtool.domain.ProjectTask;
import com.springboot.projectmanagementtool.services.MapValidationErrorService;
import com.springboot.projectmanagementtool.services.ProjectTaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

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
    public ResponseEntity<?> addProjectTaskToBacklog(@PathVariable String backlogId, Principal principal,
                                                     @Valid @RequestBody ProjectTask projectTask, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(result);

        if (errorMap != null) {
            return errorMap;
        }

        ProjectTask newProjectTask = projectTaskService.addProjectTask(backlogId, projectTask, principal.getName());
        return new ResponseEntity<>(newProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/{backlogId}")
    public ResponseEntity<List<ProjectTask>> getAllProjectTasksFromBacklog(@PathVariable String backlogId,
                                                                           Principal principal) {
        List<ProjectTask> projectTasks = projectTaskService.findAllProjectTasksByIdentifier(backlogId, principal.getName());
        return new ResponseEntity<List<ProjectTask>>(projectTasks, HttpStatus.OK);
    }

    @GetMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<ProjectTask> getProjectTaskFromBacklog(@PathVariable String backlogId,
                                                                 @PathVariable String projectTaskId,
                                                                 Principal principal) {
        ProjectTask projectTask = projectTaskService.findProjectTaskByProjectSequence(backlogId, projectTaskId, principal.getName());
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<?> updateProjectTaskFromBacklog(@PathVariable String backlogId,
                                                          @PathVariable String projectTaskId,
                                                          Principal principal,
                                                          @Valid @RequestBody ProjectTask projectTask,
                                                          BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(result);

        if (errorMap != null) {
            return errorMap;
        }

        ProjectTask existingProjectTask =
                projectTaskService.updateProjectTaskByProjectSequence(backlogId, projectTaskId, projectTask, principal.getName());
        return new ResponseEntity<ProjectTask>(existingProjectTask, HttpStatus.OK);
    }

    @DeleteMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<String> deleteProjectTaskFromBacklog(@PathVariable String backlogId,
                                                               @PathVariable String projectTaskId,
                                                               Principal principal) {
        projectTaskService.deleteProjectTaskByProjectSequence(backlogId, projectTaskId, principal.getName());
        return new ResponseEntity<String>("Project Task ID: " + projectTaskId
                + " associated with project: " + backlogId + " was deleted.", HttpStatus.OK);
    }
}