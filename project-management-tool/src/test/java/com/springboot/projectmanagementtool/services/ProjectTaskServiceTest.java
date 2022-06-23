package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.Backlog;
import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.domain.ProjectTask;
import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.ProjectTaskNotFoundException;
import com.springboot.projectmanagementtool.repositories.ProjectTaskRepository;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ProjectTaskServiceTest {
    private static final String PROJECT_IDENTIFIER = "OI1(a";

    @Mock
    private ProjectTaskRepository projectTaskRepository;

    @Mock
    private ProjectService projectService;

    private ProjectTaskService projectTaskService;

    private Project project;
    private Backlog backlog;
    private ProjectTask projectTask;

    @BeforeEach
    void setUp() {
        projectTaskService = new ProjectTaskService(projectTaskRepository, projectService);

        User user = new User();
        user.setUsername("Tom@gmail.com");
        user.setPassword("password");
        user.setConfirmPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");

        project = new Project();
        project.setProjectName("Dashboard UI");
        project.setProjectIdentifier(PROJECT_IDENTIFIER);
        project.setProjectDescription("Create the Dashboard UI using React");
        project.setProjectOwner("TOM");
        project.setUser(user);

        backlog = new Backlog();
        backlog.setProjectIdentifier(PROJECT_IDENTIFIER);
        backlog.setProjectTaskSequence(0);
        backlog.setProject(project);
        project.setBacklog(backlog);

        projectTask = new ProjectTask();
        projectTask.setSummary("Create the Dashboard and associated components");
        projectTask.setProjectIdentifier(PROJECT_IDENTIFIER);
        projectTask.setProjectSequence(PROJECT_IDENTIFIER + "-" + backlog.getProjectTaskSequence());
        projectTask.setBacklog(backlog);
    }

    @Test
    void addProjectTask_CreatesNewProjectTask_WhenProjectTaskIsValid() {
        // Given
        given(projectService.findProjectByIdentifier(PROJECT_IDENTIFIER)).willReturn(project);

        // When
        projectTaskService.addProjectTask(PROJECT_IDENTIFIER, projectTask);

        // Then
        ArgumentCaptor<ProjectTask> projectTaskArgumentCaptor = ArgumentCaptor.forClass(ProjectTask.class);
        verify(projectTaskRepository).save(projectTaskArgumentCaptor.capture());
        ProjectTask capturedProjectTask = projectTaskArgumentCaptor.getValue();

        SoftAssertions newProjectTask = new SoftAssertions();
        newProjectTask.assertThat(capturedProjectTask.getPriority()).isEqualTo(3);
        newProjectTask.assertThat(capturedProjectTask.getStatus()).isEqualToIgnoringCase("TO_DO");
        newProjectTask.assertAll();
    }

    @Test
    void findAllProjectTasksByIdentifier_RetrieveListOfProjectTasks_WhenProjectTasksExistForProject() {
        // Given
        given(projectService.findProjectByIdentifier(PROJECT_IDENTIFIER)).willReturn(project);
        given(projectTaskRepository.findAllByProjectIdentifierOrderByPriority(PROJECT_IDENTIFIER))
                .willReturn(List.of(projectTask));

        // When
        List<ProjectTask> foundProjectTasks = projectTaskService.findAllProjectTasksByIdentifier(PROJECT_IDENTIFIER);

        // Then
        assertThat(foundProjectTasks).hasSize(1).isNotEmpty().doesNotHaveDuplicates();
    }

    @Test
    void findProjectTaskByProjectSequence_RetrievesProjectTask_WhenProjectTaskExistsForProject() {
        // Given
        given(projectService.findProjectByIdentifier(PROJECT_IDENTIFIER)).willReturn(project);
        given(projectTaskRepository.findByProjectSequence(projectTask.getProjectSequence())).willReturn(projectTask);

        // When
        ProjectTask foundProjectTask =
                projectTaskService.findProjectTaskByProjectSequence(PROJECT_IDENTIFIER, projectTask.getProjectSequence());

        // Then
        assertThat(foundProjectTask).isEqualTo(projectTask).isInstanceOf(ProjectTask.class);
    }

    @Test
    void findProjectTaskByProjectSequence_ThrowsException_WhenProjectTaskDoesNotExist() {
        // Given
        String projectSequence = PROJECT_IDENTIFIER + "-" + backlog.getProjectTaskSequence();

        given(projectService.findProjectByIdentifier(PROJECT_IDENTIFIER)).willReturn(project);
        given(projectTaskRepository.findByProjectSequence(projectTask.getProjectSequence())).willReturn(null);

        // When / Then
        assertThatThrownBy(() -> projectTaskService.findProjectTaskByProjectSequence(PROJECT_IDENTIFIER, projectSequence))
                .isInstanceOf(ProjectTaskNotFoundException.class)
                .hasMessageContaining("Project Task with id: " + projectSequence + " was not found.");
    }

    @Test
    void findProjectTaskByProjectSequence_ThrowsException_WhenProjectIdentifierForProjectTaskDoesNotMatch1stParam() {
        // Given
        String projectIdentifier = "OI1(a";

        User user = new User();
        user.setUsername("Tom@gmail.com");
        user.setPassword("password");
        user.setConfirmPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");

        Project project = new Project();
        project.setProjectName("Dashboard UI");
        project.setProjectIdentifier(projectIdentifier);
        project.setProjectDescription("Create the Dashboard UI using React");
        project.setProjectOwner("TOM");
        project.setUser(user);

        Backlog backlog = new Backlog();
        backlog.setProjectIdentifier(projectIdentifier);
        backlog.setProject(project);

        String projectSequence = projectIdentifier + "-" + backlog.getProjectTaskSequence();

        ProjectTask projectTask = new ProjectTask();
        projectTask.setSummary("Create the Dashboard and associated components");
        projectTask.setProjectIdentifier("INVAL");
        projectTask.setProjectSequence(projectSequence);
        projectTask.setBacklog(backlog);

        given(projectService.findProjectByIdentifier(projectIdentifier)).willReturn(project);
        given(projectTaskRepository.findByProjectSequence(projectTask.getProjectSequence())).willReturn(projectTask);

        // When / Then
        assertThatThrownBy(() -> projectTaskService.findProjectTaskByProjectSequence(projectIdentifier, projectSequence))
                .isInstanceOf(ProjectTaskNotFoundException.class)
                .hasMessageContaining("Project Task with id: " + projectSequence +
                        " does not exist on project: " + projectIdentifier);
    }

    @Test
    void updateProjectTaskByProjectSequence_UpdatesExistingProjectTask_WhenProjectTaskExists() {
        // Given
        given(projectService.findProjectByIdentifier(PROJECT_IDENTIFIER)).willReturn(project);
        given(projectTaskRepository.findByProjectSequence(projectTask.getProjectSequence())).willReturn(projectTask);

        // When
        projectTaskService.updateProjectTaskByProjectSequence(PROJECT_IDENTIFIER, projectTask.getProjectSequence(), projectTask);

        // Then
        ArgumentCaptor<ProjectTask> projectTaskArgumentCaptor = ArgumentCaptor.forClass(ProjectTask.class);
        verify(projectTaskRepository).save(projectTaskArgumentCaptor.capture());
        ProjectTask capturedProjectTask = projectTaskArgumentCaptor.getValue();
        assertThat(capturedProjectTask).isEqualTo(projectTask);
    }

    @Test
    void deleteProjectTaskByProjectSequence_DeletesExistingProjectTask_WhenProjectTaskExists() {
        // Given
        given(projectService.findProjectByIdentifier(PROJECT_IDENTIFIER)).willReturn(project);
        given(projectTaskRepository.findByProjectSequence(projectTask.getProjectSequence())).willReturn(projectTask);

        // When
        projectTaskService.deleteProjectTaskByProjectSequence(PROJECT_IDENTIFIER, projectTask.getProjectSequence());

        // Then
        verify(projectTaskRepository, times(1)).delete(projectTask);
    }
}