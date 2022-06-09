package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.Backlog;
import com.springboot.projectmanagementtool.domain.ProjectTask;
import com.springboot.projectmanagementtool.exceptions.ProjectTaskNotFoundException;
import com.springboot.projectmanagementtool.repositories.ProjectTaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ProjectTaskService {
    private final ProjectTaskRepository projectTaskRepository;
    private final ProjectService projectService;

    public ProjectTaskService(ProjectTaskRepository projectTaskRepository, ProjectService projectService) {
        this.projectTaskRepository = projectTaskRepository;
        this.projectService = projectService;
    }

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {
        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
        projectTask.setBacklog(backlog);

        Integer backlogSequence = backlog.getProjectTaskSequence();
        backlogSequence++;
        backlog.setProjectTaskSequence(backlogSequence);

        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        if (projectTask.getPriority() == null || projectTask.getPriority() == 0 ) {
            projectTask.setPriority(3);
        }

        if (Objects.equals(projectTask.getStatus(), "") || projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
    }

    public List<ProjectTask> findAllProjectTasksByIdentifier(String projectIdentifier, String username) {
        projectService.findProjectByIdentifier(projectIdentifier, username);
        return projectTaskRepository.findAllByProjectIdentifierOrderByPriority(projectIdentifier);
    }

    public ProjectTask findProjectTaskByProjectSequence(String projectIdentifier, String projectSequence, String username) {
        projectService.findProjectByIdentifier(projectIdentifier, username);

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectSequence);

        if (projectTask == null) {
            throw new ProjectTaskNotFoundException("Project Task with id: " + projectSequence + " was not found.");
        }

        if (!projectTask.getProjectIdentifier().equals(projectIdentifier)) {
            throw new ProjectTaskNotFoundException("Project Task with id: " + projectSequence +
                    " does not exist on project: " + projectIdentifier);
        }

        return projectTask;
    }

    public ProjectTask updateProjectTaskByProjectSequence(String projectIdentifier, String projectSequence,
                                                          ProjectTask projectTask, String username) {
        findProjectTaskByProjectSequence(projectIdentifier, projectSequence, username);
        return projectTaskRepository.save(projectTask);
    }

    public void deleteProjectTaskByProjectSequence(String projectIdentifier, String projectSequence, String username) {
        ProjectTask projectTask = findProjectTaskByProjectSequence(projectIdentifier, projectSequence, username);
        projectTaskRepository.delete(projectTask);
    }
}