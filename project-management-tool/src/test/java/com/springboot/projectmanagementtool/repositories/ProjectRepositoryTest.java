package com.springboot.projectmanagementtool.repositories;

import com.springboot.projectmanagementtool.domain.Project;
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
class ProjectRepositoryTest {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @AfterEach
    void tearDown() {
        projectRepository.deleteAll();
    }

    @Test
    void findByProjectIdentifier_RetrievesProject_WhenProjectIdentifierIsValid() {
        // Given
        String projectIdentifier = "DASUI";
        String username = "Tom@gmail.com";

        User user = new User();
        user.setUsername(username);
        user.setPassword("password");
        user.setConfirmPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");

        Project project = new Project();
        project.setProjectName("Dashboard UI");
        project.setProjectIdentifier(projectIdentifier);
        project.setProjectDescription("Create the Dashboard UI using React");
        project.setProjectOwner(username);
        project.setUser(user);

        userRepository.save(user);
        projectRepository.save(project);

        // When
        Project existingProject = projectRepository.findByProjectIdentifier(projectIdentifier);

        // Then
        assertThat(existingProject).isEqualTo(project);
    }

    @Test
    void findByProjectIdentifier_ReturnsNull_WhenProjectIdentifierIsInvalid() {
        // Given
        String projectIdentifier = "DASUI";

        // When
        Project existingProject = projectRepository.findByProjectIdentifier(projectIdentifier);

        // Then
        assertThat(existingProject).isNull();
    }

    @Test
    void findAllByProjectOwner_RetrieveListOfProjects_WhenUsernameIsValid() {
        // Given
        String projectOwner = "TOM";

        User user = new User();
        user.setUsername("Tom@gmail.com");
        user.setPassword("password");
        user.setConfirmPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");

        Project project = new Project();
        project.setProjectName("Dashboard UI");
        project.setProjectIdentifier("DASUI");
        project.setProjectDescription("Create the Dashboard UI using React");
        project.setProjectOwner(projectOwner);
        project.setUser(user);

        Project project1 = new Project();
        project1.setProjectName("User UI");
        project1.setProjectIdentifier("USUI");
        project1.setProjectDescription("Create the User UI using React");
        project1.setProjectOwner(projectOwner);
        project1.setUser(user);

        userRepository.save(user);
        projectRepository.save(project);
        projectRepository.save(project1);

        // When
        List<Project> existingProjects = projectRepository.findAllByProjectOwner(projectOwner);

        // Then
        assertThat(existingProjects).hasSize(2).isNotEmpty().doesNotHaveDuplicates();
    }

    @Test
    void findAllByProjectOwner_RetrieveEmptyListOfProjects_WhenUsernameIsInvalid() {
        // Given
        String projectOwner = "TOM";

        // When
        List<Project> existingProjects = projectRepository.findAllByProjectOwner(projectOwner);

        // Then
        assertThat(existingProjects).hasSize(0);
    }
}