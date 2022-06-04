package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.Backlog;
import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.domain.ProjectTask;
import com.springboot.projectmanagementtool.exceptions.ProjectNotFoundException;
import com.springboot.projectmanagementtool.exceptions.ProjectTaskNotFoundException;
import com.springboot.projectmanagementtool.repositories.BacklogRepository;
import com.springboot.projectmanagementtool.repositories.ProjectRepository;
import com.springboot.projectmanagementtool.repositories.ProjectTaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ProjectTaskService {
    private BacklogRepository backlogRepository;
    private ProjectRepository projectRepository;
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTaskService(BacklogRepository backlogRepository, ProjectRepository projectRepository,
                              ProjectTaskRepository projectTaskRepository) {
        this.backlogRepository = backlogRepository;
        this.projectRepository = projectRepository;
        this.projectTaskRepository = projectTaskRepository;
    }

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        try {
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

            projectTask.setBacklog(backlog);

            Integer backlogSequence = backlog.getProjectTaskSequence();
            backlogSequence++;
            backlog.setProjectTaskSequence(backlogSequence);

            projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            if (projectTask.getPriority() == null) {
                projectTask.setPriority(1);
            }

            if (Objects.equals(projectTask.getStatus(), "") || projectTask.getStatus() == null) {
                projectTask.setStatus("TO_DO");
            }

            return projectTaskRepository.save(projectTask);
        } catch (Exception exception) {
            throw new ProjectNotFoundException("Project not found.");
        }
    }

    public List<ProjectTask> findAllProjectTasksByIdentifier(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier);

        if (project == null) {
            throw new ProjectNotFoundException("Product with id: " + projectIdentifier + " was not found.");
        }

        return projectTaskRepository.findAllByProjectIdentifierOrderByPriority(projectIdentifier);
    }

    public ProjectTask findProjectTaskByProjectSequence(String projectIdentifier, String projectSequence) {
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectSequence);

        return projectTask;
    }
}