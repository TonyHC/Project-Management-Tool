package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.Backlog;
import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.ProjectIdExistsException;
import com.springboot.projectmanagementtool.exceptions.ProjectNotFoundException;
import com.springboot.projectmanagementtool.repositories.BacklogRepository;
import com.springboot.projectmanagementtool.repositories.ProjectRepository;
import com.springboot.projectmanagementtool.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private ProjectRepository projectRepository;
    private BacklogRepository backlogRepository;
    private UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, BacklogRepository backlogRepository,
                          UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
        this.userRepository = userRepository;
    }

    public Project saveOrUpdateProject(Project project, String username) {
        String projectIdentifier = project.getProjectIdentifier().toUpperCase();

        try {
            User user = userRepository.findByUsername(username);

            project.setUser(user);
            project.setProjectOwner(username);
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