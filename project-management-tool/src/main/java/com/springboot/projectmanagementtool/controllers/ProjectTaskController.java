package com.springboot.projectmanagementtool.controllers;

import com.springboot.projectmanagementtool.domain.ProjectTask;
import com.springboot.projectmanagementtool.services.MapValidationErrorService;
import com.springboot.projectmanagementtool.services.ProjectTaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/project-tasks")
public class ProjectTaskController {
    private final ProjectTaskService projectTaskService;
    private final MapValidationErrorService mapValidationErrorService;

    public ProjectTaskController(ProjectTaskService projectTaskService, MapValidationErrorService mapValidationErrorService) {
        this.projectTaskService = projectTaskService;
        this.mapValidationErrorService = mapValidationErrorService;
    }

    @PostMapping("/{backlogId}")
    public ResponseEntity<?> addProjectTaskToBacklog(@PathVariable String backlogId,
                                                     @Valid @RequestBody ProjectTask projectTask,
                                                     BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.mapValidationError(result);
        }

        ProjectTask newProjectTask = projectTaskService.addProjectTask(backlogId, projectTask);
        return new ResponseEntity<>(newProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/{backlogId}")
    public ResponseEntity<List<ProjectTask>> getAllProjectTasksFromBacklog(@PathVariable String backlogId) {
        List<ProjectTask> projectTasks = projectTaskService.findAllProjectTasksByIdentifier(backlogId);
        return new ResponseEntity<List<ProjectTask>>(projectTasks, HttpStatus.OK);
    }

    @GetMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<ProjectTask> getProjectTaskFromBacklog(@PathVariable String backlogId,
                                                                 @PathVariable String projectTaskId) {
        ProjectTask projectTask =
                projectTaskService.findProjectTaskByProjectSequence(backlogId, projectTaskId);
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<?> updateProjectTaskFromBacklog(@PathVariable String backlogId,
                                                          @PathVariable String projectTaskId,
                                                          @Valid @RequestBody ProjectTask projectTask,
                                                          BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.mapValidationError(result);
        }

        ProjectTask existingProjectTask =
                projectTaskService.updateProjectTaskByProjectSequence(backlogId, projectTaskId, projectTask);
        return new ResponseEntity<ProjectTask>(existingProjectTask, HttpStatus.OK);
    }

    @DeleteMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<String> deleteProjectTaskFromBacklog(@PathVariable String backlogId,
                                                               @PathVariable String projectTaskId) {
        projectTaskService.deleteProjectTaskByProjectSequence(backlogId, projectTaskId);
        return new ResponseEntity<String>("Project Task ID: " + projectTaskId
                + " associated with project: " + backlogId + " was deleted.", HttpStatus.OK);
    }
}