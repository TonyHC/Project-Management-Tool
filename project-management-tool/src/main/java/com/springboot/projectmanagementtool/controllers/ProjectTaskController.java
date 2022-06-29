package com.springboot.projectmanagementtool.controllers;

import com.springboot.projectmanagementtool.domain.ProjectTask;
import com.springboot.projectmanagementtool.exceptions.ProjectNotFoundResponse;
import com.springboot.projectmanagementtool.exceptions.ProjectTaskNotFoundResponse;
import com.springboot.projectmanagementtool.services.MapValidationErrorService;
import com.springboot.projectmanagementtool.services.ProjectTaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Tag(name = "Project Tasks", description = "Project Tasks API")
@RestController
@RequestMapping("/api/project-tasks")
public class ProjectTaskController {
    private final ProjectTaskService projectTaskService;
    private final MapValidationErrorService mapValidationErrorService;

    public ProjectTaskController(ProjectTaskService projectTaskService, MapValidationErrorService mapValidationErrorService) {
        this.projectTaskService = projectTaskService;
        this.mapValidationErrorService = mapValidationErrorService;
    }

    @Operation(summary = "Create a new task associated with a project", description = "Returns a new project task")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created a new project task",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProjectTask.class))),
            @ApiResponse(responseCode = "404", description = "Project does not exist",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProjectNotFoundResponse.class)))
    })
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

    @Operation(summary = "Get all project tasks associated with a project", description = "Returns list of project tasks")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a list of project tasks",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = ProjectTask.class)))),
            @ApiResponse(responseCode = "404", description = "Project does not exist",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProjectNotFoundResponse.class)))
    })
    @GetMapping("/{backlogId}")
    public ResponseEntity<List<ProjectTask>> getAllProjectTasksFromBacklog(@PathVariable String backlogId) {
        List<ProjectTask> projectTasks = projectTaskService.findAllProjectTasksByIdentifier(backlogId);
        return new ResponseEntity<>(projectTasks, HttpStatus.OK);
    }

    @Operation(summary = "Get a project by projectIdentifier and projectSequence",
            description = "Returns a project task if exists")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a existing project task",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProjectTask.class))),
            @ApiResponse(responseCode = "404", description = "Project / Project Task does not exist",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(oneOf = {
                                    ProjectNotFoundResponse.class,
                                    ProjectTaskNotFoundResponse.class
                            })))
    })
    @GetMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<ProjectTask> getProjectTaskFromBacklog(@PathVariable String backlogId,
                                                                 @PathVariable String projectTaskId) {
        ProjectTask projectTask =
                projectTaskService.findProjectTaskByProjectSequence(backlogId, projectTaskId);
        return new ResponseEntity<>(projectTask, HttpStatus.OK);
    }

    @Operation(summary = "Update an existing project task associated with a project",
            description = "Returns the updated project task")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated an existing project task",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProjectTask.class))),
            @ApiResponse(responseCode = "404", description = "Project / Project Task does not exist",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(oneOf = {
                                    ProjectNotFoundResponse.class,
                                    ProjectTaskNotFoundResponse.class
                            })))
    })
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
        return new ResponseEntity<>(existingProjectTask, HttpStatus.OK);
    }

    @Operation(summary = "Update the order position of existing project tasks associated with a project",
            description = "Returns the updated list of project tasks")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated the existing project tasks order",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = ProjectTask.class)))),
            @ApiResponse(responseCode = "404", description = "Project does not exist",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProjectNotFoundResponse.class)))
    })
    @PatchMapping("/{backlogId}")
    public ResponseEntity<?> updateProjectTasksOrder(@PathVariable String backlogId,
                                                     @Valid @RequestBody List<ProjectTask> projectTasks,
                                                     BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.mapValidationError(result);
        }

        List<ProjectTask> projectTaskList = projectTaskService.updateProjectTasksOrder(backlogId, projectTasks);
        return new ResponseEntity<>(projectTaskList, HttpStatus.OK);
    }

    @Operation(summary = "Delete an existing project task associated with a project",
            description = "Deletes a project task if exists")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully deleted an existing project task",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Project / Project Task does not exist",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(oneOf = {
                                    ProjectNotFoundResponse.class,
                                    ProjectTaskNotFoundResponse.class
                            })))
    })
    @DeleteMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<String> deleteProjectTaskFromBacklog(@PathVariable String backlogId,
                                                               @PathVariable String projectTaskId) {
        projectTaskService.deleteProjectTaskByProjectSequence(backlogId, projectTaskId);
        return new ResponseEntity<>("Project Task ID: " + projectTaskId
                + " associated with project: " + backlogId + " was deleted.", HttpStatus.OK);
    }
}