package com.springboot.projectmanagementtool.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.services.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
class ProjectControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProjectService projectService;

    private Project project;

    @BeforeEach
    void setUp() {
        String username = "Tom@gmail.com";

        User user = new User();
        user.setUsername(username);
        user.setPassword("password");
        user.setConfirmPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");

        project = new Project();
        project.setId(1L);
        project.setProjectName("Dashboard UI");
        project.setProjectIdentifier("DASUI");
        project.setProjectDescription("Create the Dashboard UI using React");
        project.setProjectOwner(username);
        project.setUser(user);
    }

    @Test
    @WithMockUser
    void createOrUpdateProject_CreatesNewProjectOrUpdatesExistingProject_WhenProjectRequestBodyIsValid() throws Exception {
        given(projectService.saveOrUpdateProject(project)).willReturn(project);

        mockMvc.perform(post(ProjectController.PROJECT_BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(project)))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser
    void getProjectByIdentifier_RetrievesProject_WhenProjectIdentifierIsValid() throws Exception {
        given(projectService.findProjectByIdentifier(project.getProjectIdentifier())).willReturn(project);

        mockMvc.perform(get(ProjectController.PROJECT_BASE_URL + "/" + project.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void getAllProjects_RetrieveListOfProjects_WhenProjectsExistForAssociatedUser() throws Exception {
        given(projectService.findAllProjects()).willReturn(List.of(project, project));

        mockMvc.perform(get(ProjectController.PROJECT_BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    @WithMockUser
    void deleteProjectByIdentifier_DeletesExistingProject_WhenProjectIdentifierIsValid() throws Exception {
        MvcResult mvcResult = mockMvc.perform(delete(ProjectController.PROJECT_BASE_URL + "/"
                        + project.getProjectIdentifier())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        verify(projectService, times(1)).deleteProjectByIdentifier(project.getProjectIdentifier());

        String responseMessage = mvcResult.getResponse().getContentAsString();
        assertThat(responseMessage).isEqualTo("Project with ID: " + project.getProjectIdentifier() + " was deleted");
    }
}