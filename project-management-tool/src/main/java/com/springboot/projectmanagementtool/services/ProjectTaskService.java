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

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier).getBacklog();
        projectTask.setBacklog(backlog);

        Integer backlogSequence = backlog.getProjectTaskSequence();
        backlogSequence++;
        backlog.setProjectTaskSequence(backlogSequence);

        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);
        projectTask.setPosition(backlog.getProjectTaskSequence());

        if (projectTask.getPriority() == null || projectTask.getPriority() == 0 ) {
            projectTask.setPriority(3);
        }

        if (Objects.equals(projectTask.getStatus(), "") || projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
    }

    public List<ProjectTask> findAllProjectTasksByIdentifier(String projectIdentifier) {
        projectService.findProjectByIdentifier(projectIdentifier);
        return projectTaskRepository.findAllByProjectIdentifierOrderByPosition(projectIdentifier);
    }

    public ProjectTask findProjectTaskByProjectSequence(String projectIdentifier, String projectSequence) {
        projectService.findProjectByIdentifier(projectIdentifier);

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
                                                          ProjectTask projectTask) {
        findProjectTaskByProjectSequence(projectIdentifier, projectSequence);
        return projectTaskRepository.save(projectTask);
    }

    public List<ProjectTask> updateProjectTasksOrder(String projectIdentifier, List<ProjectTask> projectTasks) {
        projectService.findProjectByIdentifier(projectIdentifier);
        return (List<ProjectTask>) projectTaskRepository.saveAll(projectTasks);
    }

    public void deleteProjectTaskByProjectSequence(String projectIdentifier, String projectSequence) {
        ProjectTask projectTask = findProjectTaskByProjectSequence(projectIdentifier, projectSequence);
        projectTaskRepository.delete(projectTask);
    }
}