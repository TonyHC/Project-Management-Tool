package com.springboot.projectmanagementtool.services;

import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.exceptions.ProjectIdExistsException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
public class ProjectServiceIT {
    @Autowired
    private ProjectService projectService;

    @Test
    @WithMockUser
    void saveOrUpdateProject_ThrowsException_WhenCreatingProjectWithExistingProjectIdentifier() {
        // Given
        String projectIdentifier = "UIDES";
        String username = "testuser@mail.com";

        User user = new User();
        user.setUsername(username);
        user.setFirstName("Test");
        user.setLastName("User");
        user.setPassword("Password");

        Project project = new Project();
        project.setProjectName("Dashboard UI");
        project.setProjectIdentifier(projectIdentifier);
        project.setProjectDescription("Create the Dashboard UI using React");
        project.setProjectOwner(username);
        project.setUser(user);

        // When / Then
        assertThatThrownBy(() -> projectService.saveOrUpdateProject(project))
                .isInstanceOf(ProjectIdExistsException.class)
                .hasMessageContaining("Project ID: " + projectIdentifier + " already exists.");
    }
}
