
package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.exceptions.ProjectIdException;
import com.springboot.projectmanagementtool.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

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
} 