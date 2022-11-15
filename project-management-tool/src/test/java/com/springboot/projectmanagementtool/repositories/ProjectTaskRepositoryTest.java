package com.springboot.projectmanagementtool.repositories;

import com.springboot.projectmanagementtool.domain.Backlog;
import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.domain.ProjectTask;
import com.springboot.projectmanagementtool.domain.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@TestPropertySource(
        locations = "classpath:application.properties"
)
@DataJpaTest
class ProjectTaskRepositoryTest {
    private static final String PROJECT_IDENTIFIER = "OI1(a";

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private UserRepository userRepository;

    @AfterEach
    void tearDown() {
        projectTaskRepository.deleteAll();
    }

    @Test
    void findAllByProjectIdentifierOrderByPriority_RetrieveListOfSortedProjectTasks_WhenProjectIdentifierIsValid() {
        // Given
        User user = new User();
        user.setUsername("Tom@gmail.com");
        user.setPassword("password");
        user.setConfirmPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");

        Project project = new Project();
        project.setProjectName("Dashboard UI");
        project.setProjectIdentifier(PROJECT_IDENTIFIER);
        project.setProjectDescription("Create the Dashboard UI using React");
        project.setProjectOwner("TOM");
        project.setUser(user);

        Backlog backlog = new Backlog();
        backlog.setProjectIdentifier(PROJECT_IDENTIFIER);
        backlog.setProject(project);

        ProjectTask projectTask = new ProjectTask();
        projectTask.setSummary("Create the Dashboard and associated components");
        projectTask.setProjectIdentifier(PROJECT_IDENTIFIER);
        projectTask.setProjectSequence(PROJECT_IDENTIFIER + "-" + backlog.getProjectTaskSequence());
        projectTask.setBacklog(backlog);

        userRepository.save(user);
        projectRepository.save(project);
        backlogRepository.save(backlog);
        projectTaskRepository.save(projectTask);

        // When
        List<ProjectTask> foundProjectTasks = projectTaskRepository.findAllByProjectIdentifierOrderByPosition(PROJECT_IDENTIFIER);

        // Then
        assertThat(foundProjectTasks).hasSize(1).isNotEmpty();
    }

    @Test
    void findAllByProjectIdentifierOrderByPosition_RetrieveEmptyListOfProjectTasks_WhenProjectIdentifierIsInvalid() {
        // When
        List<ProjectTask> foundProjectTasks = projectTaskRepository.findAllByProjectIdentifierOrderByPosition(PROJECT_IDENTIFIER);

        // Then
        assertThat(foundProjectTasks).isEmpty();
    }

    @Test
    void findByProjectSequence_RetrievesProjectTask_WhenProjectSequenceIsValid() {
        // Given
        User user = new User();
        user.setUsername("Tom@gmail.com");
        user.setPassword("password");
        user.setConfirmPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");

        Project project = new Project();
        project.setProjectName("Dashboard UI");
        project.setProjectIdentifier(PROJECT_IDENTIFIER);
        project.setProjectDescription("Create the Dashboard UI using React");
        project.setProjectOwner("TOM");
        project.setUser(user);

        Backlog backlog = new Backlog();
        backlog.setProjectIdentifier(PROJECT_IDENTIFIER);
        backlog.setProject(project);

        String projectSequence = PROJECT_IDENTIFIER + "-" + backlog.getProjectTaskSequence();

        ProjectTask projectTask = new ProjectTask();
        projectTask.setSummary("Create the Dashboard and associated components");
        projectTask.setProjectIdentifier(PROJECT_IDENTIFIER);
        projectTask.setProjectSequence(projectSequence);
        projectTask.setBacklog(backlog);

        userRepository.save(user);
        projectRepository.save(project);
        backlogRepository.save(backlog);
        projectTaskRepository.save(projectTask);

        // When
        ProjectTask foundProjectTask = projectTaskRepository.findByProjectSequence(projectSequence);

        // Then
        assertThat(foundProjectTask).isEqualTo(projectTask);
    }

    @Test
    void findByProjectSequence_ReturnsNull_WhenProjectSequenceIsInvalid() {
        // Given
        Backlog backlog = new Backlog();
        backlog.setProjectIdentifier(PROJECT_IDENTIFIER);

        String projectSequence = PROJECT_IDENTIFIER + "-" + backlog.getProjectTaskSequence();

        // When
        ProjectTask foundProjectTask = projectTaskRepository.findByProjectSequence(projectSequence);

        // Then
        assertThat(foundProjectTask).isNull();
    }
}