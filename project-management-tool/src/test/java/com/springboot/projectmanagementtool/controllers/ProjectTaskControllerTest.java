package com.springboot.projectmanagementtool.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.projectmanagementtool.domain.Backlog;
import com.springboot.projectmanagementtool.domain.Project;
import com.springboot.projectmanagementtool.domain.ProjectTask;
import com.springboot.projectmanagementtool.domain.User;
import com.springboot.projectmanagementtool.services.ProjectTaskService;
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
class ProjectTaskControllerTest {
    private static final String PROJECT_IDENTIFIER = "OI1(a";
    private static final String USERNAME = "Tom@gmail.com";

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    ProjectTaskService projectTaskService;

    User user;
    Project project;
    Backlog backlog;
    ProjectTask projectTask;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setUsername(USERNAME);
        user.setPassword("password");
        user.setConfirmPassword("password");
        user.setFirstName("Tom");
        user.setLastName("Paoes");

        project = new Project();
        project.setProjectName("Dashboard UI");
        project.setProjectIdentifier(PROJECT_IDENTIFIER);
        project.setProjectDescription("Create the Dashboard UI using React");
        project.setProjectOwner(USERNAME);
        project.setUser(user);

        backlog = new Backlog();
        backlog.setProjectIdentifier(PROJECT_IDENTIFIER);
        backlog.setProject(project);

        projectTask = new ProjectTask();
        projectTask.setId(1L);
        projectTask.setSummary("Create the Dashboard and associated components");
        projectTask.setProjectIdentifier(PROJECT_IDENTIFIER);
        projectTask.setProjectSequence(PROJECT_IDENTIFIER + "-" + backlog.getProjectTaskSequence());
        projectTask.setBacklog(backlog);
    }

    @Test
    @WithMockUser
    void addProjectTaskToBacklog_CreatesNewProjectTask_WhenProjectTaskRequestBodyIsValid() throws Exception {
        given(projectTaskService.addProjectTask(PROJECT_IDENTIFIER, projectTask)).willReturn(projectTask);

        mockMvc.perform(post("/api/project-tasks/" + PROJECT_IDENTIFIER)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(projectTask)))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser
    void getAllProjectTasksFromBacklog_RetrieveListOfProjectTasks_WhenProjectTasksExist() throws Exception {
        given(projectTaskService.findAllProjectTasksByIdentifier(PROJECT_IDENTIFIER)).willReturn(List.of(projectTask));

        mockMvc.perform(get("/api/project-tasks/" + PROJECT_IDENTIFIER)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    @WithMockUser
    void getProjectTaskFromBacklog_RetrievesProjectTask_WhenProjectTaskExists() throws Exception {
        given(projectTaskService.findProjectTaskByProjectSequence(PROJECT_IDENTIFIER, projectTask.getProjectSequence()))
                .willReturn(projectTask);

        mockMvc.perform(get("/api/project-tasks/" + PROJECT_IDENTIFIER + "/" + projectTask.getProjectSequence())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void updateProjectTaskFromBacklog_UpdatesExistingProjectTask_WhenProjectTaskRequestBodyIsValid() throws Exception {
        given(projectTaskService.updateProjectTaskByProjectSequence(PROJECT_IDENTIFIER,
                projectTask.getProjectSequence(), projectTask)).willReturn(projectTask);

        mockMvc.perform(patch("/api/project-tasks/" + PROJECT_IDENTIFIER + "/" + projectTask.getProjectSequence())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(projectTask)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void deleteProjectTaskFromBacklog_DeletesProjectTask_WhenProjectIdentifierAndProjectSequenceIsValid() throws Exception {
        MvcResult mvcResult = mockMvc.perform(delete("/api/project-tasks/" + PROJECT_IDENTIFIER + "/"
                        + projectTask.getProjectSequence())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        verify(projectTaskService, times(1))
                .deleteProjectTaskByProjectSequence(PROJECT_IDENTIFIER, projectTask.getProjectSequence());

        String responseMessage = mvcResult.getResponse().getContentAsString();
        assertThat(responseMessage).isEqualTo("Project Task ID: " + projectTask.getProjectSequence()
                + " associated with project: " + PROJECT_IDENTIFIER + " was deleted.");
    }
}