package com.springboot.projectmanagementtool.repositories;

import com.springboot.projectmanagementtool.domain.Backlog;
import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.domain.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.Assertions.assertThat;

@TestPropertySource(
        locations = "classpath:application.properties"
)
@DataJpaTest
class BacklogRepositoryTest {
    private static final String PROJECT_IDENTIFIER = "OI1(a";

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @AfterEach
    void tearDown() {
        backlogRepository.deleteAll();
    }

    @Test
    void findByProjectIdentifier_RetrievesBacklog_WhenProjectIdentifierIsValid() {
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

        userRepository.save(user);
        projectRepository.save(project);
        backlogRepository.save(backlog);

        // When
        Backlog foundBacklog = backlogRepository.findByProjectIdentifier(PROJECT_IDENTIFIER);

        // Then
        assertThat(foundBacklog).isEqualTo(backlog);
    }

    @Test
    void findByProjectIdentifier_ReturnsNull_WhenProjectIdentifierIsInvalid() {
        // When
        Backlog foundBacklog = backlogRepository.findByProjectIdentifier(PROJECT_IDENTIFIER);

        // Then
        assertThat(foundBacklog).isNull();
    }
}