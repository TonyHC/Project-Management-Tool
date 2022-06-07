package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.Backlog;
import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.exceptions.ProjectIdExistsException;
import com.springboot.projectmanagementtool.exceptions.ProjectNotFoundException;
import com.springboot.projectmanagementtool.repositories.BacklogRepository;
import com.springboot.projectmanagementtool.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private ProjectRepository projectRepository;
    private BacklogRepository backlogRepository;

    public ProjectService(ProjectRepository projectRepository, BacklogRepository backlogRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
    }

    public Project saveOrUpdateProject(Project project) {
        String projectIdentifier = project.getProjectIdentifier().toUpperCase();

        try {
            project.setProjectIdentifier(projectIdentifier);

            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(projectIdentifier);
            } else {
                project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
            }

            return projectRepository.save(project);
        } catch (Exception exception) {
            throw new ProjectIdExistsException("Project ID: " + projectIdentifier + " already exists.");
        }
    }

    public Project findProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null) {
            throw new ProjectNotFoundException("Project with ID: " + projectId + " was not found.");
        }

        return project;
    }

    public List<Project> findAllProjects() {
        return projectRepository.findAllBy();
    }

    public void deleteProjectByIdentifier(String projectId) {
        Project project = findProjectByIdentifier(projectId.toUpperCase());
        projectRepository.delete(project);
    }
} 