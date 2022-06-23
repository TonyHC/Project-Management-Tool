package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.Backlog;
import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.ProjectNotFoundException;
import com.springboot.projectmanagementtool.repositories.BacklogRepository;
import com.springboot.projectmanagementtool.repositories.ProjectRepository;
import com.springboot.projectmanagementtool.repositories.UserRepository;
import com.springboot.projectmanagementtool.security.SecurityUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {
    private static final String PROJECT_IDENTIFIER = "DASUI";
    private static final String USERNAME = "Tom@gmail.com";

    @Mock
    private BacklogRepository backlogRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private SecurityUtils securityUtils;

    private ProjectService projectService;

    User user;
    Project project;

    @BeforeEach
    void setUp() {
        projectService = new ProjectService(projectRepository, backlogRepository, userRepository, securityUtils);

        user = new User();
        user.setUsername(USERNAME);
        user.setPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");

        project = new Project();
        project.setProjectName("Dashboard UI");
        project.setProjectIdentifier(PROJECT_IDENTIFIER);
        project.setProjectDescription("Create the Dashboard UI using React");
        project.setProjectOwner(USERNAME);
        project.setUser(user);
    }

    @Test
    void saveOrUpdateProject_CreatesNewProject_WhenProjectIsValid() {
        // Given
        given(securityUtils.getAuthenticationUsername()).willReturn(USERNAME);
        given(userRepository.findByUsername(anyString())).willReturn(user);

        // When
        projectService.saveOrUpdateProject(project);

        // Then
        ArgumentCaptor<Project> projectArgumentCaptor = ArgumentCaptor.forClass(Project.class);
        verify(projectRepository).save(projectArgumentCaptor.capture());
        Project capturedProject = projectArgumentCaptor.getValue();
        assertThat(capturedProject).isEqualTo(project);
    }

    @Test
    void saveOrUpdateProject_ThrowsException_WhenProjectNotAssociatedToCorrectUser() {
        // Given
        project.setId(1L);

        given(securityUtils.getAuthenticationUsername()).willReturn("random@gmail.com");
        given(projectRepository.findByProjectIdentifier(PROJECT_IDENTIFIER)).willReturn(project);

        // When / Then
        assertThatThrownBy(() -> projectService.saveOrUpdateProject(project))
                .isInstanceOf(ProjectNotFoundException.class)
                .hasMessageContaining("Project not found in your account");
    }

    @Test
    void saveOrUpdateProject_ThrowsException_WhenProjectDoesNotExist() {
        // Given
        project.setId(1L);

        given(securityUtils.getAuthenticationUsername()).willReturn(USERNAME);
        given(projectRepository.findByProjectIdentifier(PROJECT_IDENTIFIER)).willReturn(null);

        // When / Then
        assertThatThrownBy(() -> projectService.saveOrUpdateProject(project))
                .isInstanceOf(ProjectNotFoundException.class)
                .hasMessageContaining("Cannot update project with id: " + PROJECT_IDENTIFIER
                        + " because project does not exist");
    }

    @Test
    void saveOrUpdateProject_UpdatesExistingProject_WhenProjectIsValid() {
        // Given
        project.setId(1L);

        Backlog backlog = new Backlog();
        backlog.setProject(project);

        given(securityUtils.getAuthenticationUsername()).willReturn(USERNAME);
        given(projectRepository.findByProjectIdentifier(PROJECT_IDENTIFIER)).willReturn(project);
        given(userRepository.findByUsername(USERNAME)).willReturn(user);
        given(backlogRepository.findByProjectIdentifier(PROJECT_IDENTIFIER)).willReturn(backlog);

        // When
        projectService.saveOrUpdateProject(project);

        // Then
        ArgumentCaptor<Project> projectArgumentCaptor = ArgumentCaptor.forClass(Project.class);
        verify(projectRepository).save(projectArgumentCaptor.capture());
        Project capturedProject = projectArgumentCaptor.getValue();
        assertThat(capturedProject).isEqualTo(project);
    }

    @Test
    void findProjectByIdentifier_RetrievesValidProject_WhenProjectIdExists() {
        // Given
        given(projectRepository.findByProjectIdentifier(anyString())).willReturn(project);
        given(securityUtils.getAuthenticationUsername()).willReturn(user.getUsername());

        // When
        Project foundProject = projectService.findProjectByIdentifier(PROJECT_IDENTIFIER);

        // Then
        assertThat(foundProject).isEqualTo(project);
    }

    @Test
    void findProjectByIdentifier_ThrowsException_WhenProjectDoesNotExist() {
        // Given
        given(projectRepository.findByProjectIdentifier(PROJECT_IDENTIFIER)).willReturn(null);

        // When / Then
        assertThatThrownBy(() -> projectService.findProjectByIdentifier(PROJECT_IDENTIFIER))
                .isInstanceOf(ProjectNotFoundException.class)
                .hasMessageContaining("Project with ID: " + PROJECT_IDENTIFIER + " was not found.");
    }

    @Test
    void findProjectByIdentifier_ThrowsException_WhenProjectNotAssociatedToCorrectUser() {
        // Given
        given(projectRepository.findByProjectIdentifier(anyString())).willReturn(project);
        given(securityUtils.getAuthenticationUsername()).willReturn(null);

        // When / Then
        assertThatThrownBy(() -> projectService.findProjectByIdentifier(PROJECT_IDENTIFIER))
                .isInstanceOf(ProjectNotFoundException.class)
                .hasMessageContaining("Project not found in your account");
    }

    @Test
    void findAllProjects_RetrieveListOfProjects_WhenValidUserLogsIn() {
        // Given
        Project anotherProject = new Project();
        anotherProject.setProjectName("User UI");
        anotherProject.setProjectIdentifier("USUI");
        anotherProject.setProjectDescription("Create the User UI using React");
        anotherProject.setProjectOwner(USERNAME);
        project.setUser(user);

        given(projectRepository.findAllByProjectOwner(USERNAME)).willReturn(List.of(project, anotherProject));
        given(securityUtils.getAuthenticationUsername()).willReturn(USERNAME);

        // When
        List<Project> foundProjects = projectService.findAllProjects();

        // Then
        assertThat(foundProjects).hasSize(2).isNotEmpty().doesNotHaveDuplicates();
    }

    @Test
    void deleteProjectByIdentifier_DeletesExistingProject_WhenProjectIdExists() {
        // Given
        given(projectRepository.findByProjectIdentifier(anyString())).willReturn(project);
        given(securityUtils.getAuthenticationUsername()).willReturn(user.getUsername());

        // When
        projectService.deleteProjectByIdentifier(PROJECT_IDENTIFIER);

        // Then
        verify(projectRepository, times(1)).delete(project);
    }
}