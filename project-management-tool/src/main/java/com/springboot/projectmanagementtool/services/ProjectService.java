
package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.exceptions.ProjectIdException;
import com.springboot.projectmanagementtool.exceptions.ProjectNotFoundException;
import com.springboot.projectmanagementtool.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        } catch (Exception exception) {
            throw new ProjectIdException("Project ID: " + project.getProjectIdentifier().toUpperCase() + " already exists.");
        }
    }

    public Project findProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null) {
            throw new ProjectNotFoundException("Project not found.");
        }

        return project;
    }

    public List<Project> findAllProjects() {
        return projectRepository.findAllBy();
    }

    public void deleteProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null) {
            throw new ProjectNotFoundException("Cannot delete Project with ID: " + projectId);
        }

        projectRepository.delete(project);
    }
} 