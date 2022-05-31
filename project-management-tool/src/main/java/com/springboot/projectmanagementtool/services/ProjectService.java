
package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    private ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project saveOrUpdateProject(Project project) {
        return projectRepository.save(project);
    }
} 