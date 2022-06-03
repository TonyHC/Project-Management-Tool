package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.Backlog;
import com.springboot.projectmanagementtool.domain.ProjectTask;
import com.springboot.projectmanagementtool.repositories.BacklogRepository;
import com.springboot.projectmanagementtool.repositories.ProjectTaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ProjectTaskService {
    private BacklogRepository backlogRepository;
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTaskService(BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
    }

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

        projectTask.setBacklog(backlog);

        Integer backlogSequence = backlog.getProjectTaskSequence();
        backlogSequence++;
        backlog.setProjectTaskSequence(backlogSequence);

        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        if (projectTask.getPriority() == null) {
            projectTask.setPriority(0);
        }

        if (Objects.equals(projectTask.getStatus(), "") || projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
    }

    public List<ProjectTask> findProjectTasksByIdentifier (String projectIdentifier) {
        return projectTaskRepository.findAllByProjectIdentifierOrderByPriority(projectIdentifier);
    }
}