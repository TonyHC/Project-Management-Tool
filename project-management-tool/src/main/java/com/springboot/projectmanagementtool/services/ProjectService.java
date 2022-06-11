package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.Backlog;
import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.ProjectIdExistsException;
import com.springboot.projectmanagementtool.exceptions.ProjectNotFoundException;
import com.springboot.projectmanagementtool.repositories.BacklogRepository;
import com.springboot.projectmanagementtool.repositories.ProjectRepository;
import com.springboot.projectmanagementtool.repositories.UserRepository;
import com.springboot.projectmanagementtool.security.AuthenticationFacadeImpl;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final BacklogRepository backlogRepository;
    private final UserRepository userRepository;
    private final AuthenticationFacadeImpl authenticationFacade;

    public ProjectService(ProjectRepository projectRepository, BacklogRepository backlogRepository,
                          UserRepository userRepository, AuthenticationFacadeImpl authenticationFacade) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
        this.userRepository = userRepository;
        this.authenticationFacade = authenticationFacade;
    }

    public Project saveOrUpdateProject(Project project) {
        String authenticatedUsername = authenticationFacade.getAuthentication().getName();
        String projectIdentifier = project.getProjectIdentifier().toUpperCase();

        if (project.getId() != null) {
            Project existingProject = projectRepository.findByProjectIdentifier(projectIdentifier);

            if (existingProject != null && !existingProject.getProjectOwner().equals(authenticatedUsername)) {
                throw new ProjectNotFoundException("Project not found in your account");
            } else if (existingProject == null) {
                throw new ProjectNotFoundException("Cannot update project with id: " + projectIdentifier
                        + " because project does not exist");
            }
        }

        try {
            User user = userRepository.findByUsername(authenticatedUsername);

            project.setUser(user);
            project.setProjectOwner(authenticatedUsername);
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

        if(!project.getProjectOwner().equals(authenticationFacade.getAuthentication().getName())) {
            throw new ProjectNotFoundException("Project not found in your account");
        }

        return project;
    }

    public List<Project> findAllProjects() {
        return projectRepository.findAllByProjectOwner(authenticationFacade.getAuthentication().getName());
    }

    public void deleteProjectByIdentifier(String projectId) {
        Project project = findProjectByIdentifier(projectId.toUpperCase());
        projectRepository.delete(project);
    }
} 