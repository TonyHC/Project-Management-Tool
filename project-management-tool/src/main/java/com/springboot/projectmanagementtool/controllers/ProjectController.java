package com.springboot.projectmanagementtool.controllers;

import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.exceptions.ProjectIdExistsResponse;
import com.springboot.projectmanagementtool.exceptions.ProjectNotFoundResponse;
import com.springboot.projectmanagementtool.services.MapValidationErrorService;
import com.springboot.projectmanagementtool.services.ProjectService;
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

@Tag(name = "Projects", description = "Projects API")
@RestController
@RequestMapping(ProjectController.PROJECT_BASE_URL)
public class ProjectController {
    public static final String PROJECT_BASE_URL = "/api/projects";
    private final ProjectService projectService;
    private final MapValidationErrorService mapValidationErrorService;

    public ProjectController(ProjectService projectService, MapValidationErrorService mapValidationErrorService) {
        this.projectService = projectService;
        this.mapValidationErrorService = mapValidationErrorService;
    }

    @Operation(summary = "Create new project or update existing project", description = "Return a new project or updated project")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully created a new project or updated existing project",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Project.class))),
            @ApiResponse(responseCode = "400", description = "Cannot have a project with duplicate projectIdentifier",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ProjectIdExistsResponse.class))),
            @ApiResponse(responseCode = "404", description = "Project not found or exists in your account",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ProjectNotFoundResponse.class)))
    })
    @PostMapping("")
    public ResponseEntity<?> createOrUpdateProject(@Valid @RequestBody Project project, BindingResult result) {
        if (result.hasErrors()) {
            return mapValidationErrorService.mapValidationError(result);
        }

        Project newProject = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    }

    @Operation(summary = "Get project by projectIdentifier", description = "Returns a valid project if exists")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a valid project",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Project.class))),
            @ApiResponse(responseCode = "404", description = "Project not found",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ProjectNotFoundResponse.class)))
    })
    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectByIdentifier(@PathVariable String projectId) {
        Project project = projectService.findProjectByIdentifier(projectId);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @Operation(summary = "Get all projects", description = "Returns a list of projects")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Retrieve a list of projects",
                    content = @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = Project.class))))
    })
    @GetMapping("")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.findAllProjects();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @Operation(summary = "Delete a project by projectIdentifier", description = "Delete a existing project if exists")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully deleted a project", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cannot delete project because project does not exist",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ProjectNotFoundResponse.class)))
    })
    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProjectByIdentifier(@PathVariable String projectId) {
        projectService.deleteProjectByIdentifier(projectId);
        return new ResponseEntity<>("Project with ID: " + projectId + " was deleted", HttpStatus.OK);
    }
}