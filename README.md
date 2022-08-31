# Project-Management-Tool

Full stack web application using React 17 and Spring Boot 2

- React with HTML, CSS, JS, and Bootstrap 5 used for the frontend

- Create a REST API using Spring Boot that communicates with MySQL as the backend

- Utilize Spring Security + JWT to secure both the frontend and backend

- Implement drag and drop functionality for lists using [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd) and [react-usestateref](https://www.npmjs.com/package/react-usestateref) packages

## How to run this web application and its required services on Docker

**Prerequisites**
- Clone or download this project through your preferred method

- Make sure you have Docker or Docker Desktop installed for your machine

- Open your preferred terminal and change to the directory containing the docker-compose.yml
  - Enter the following Docker command `docker compose up -d` to create the required containers
  - Wait for the containers to be built and finish running

<br>**Docker containers are up and running**
- Visit [Project Management Tool](http://localhost:8080) to access the web application

- Head to [phpMyAdmin](http://localhost:8081) to access the GUI for MySQL and log in with the following credentials:
  - `Username: root`
  - `Password: password`

## How to visit the web application hosted by Heroku
- Head to https://user-project-management-tool.herokuapp.com

- Project Management Tool is hosted on [Heroku](https://devcenter.heroku.com/) with the [ClearDB MySQL](https://devcenter.heroku.com/articles/cleardb) addon 

## Features

**Non-Registered User**
- Only have access to the Landing, Login, or Register page
  - Accessing a URL not part of the web app shows a NotFound page 

- All other pages are protected routes
  - When a user tries to access a private page; the web application redirects the user back to the Login page
  
- When registering a new user, the username needs to be unique

<br>**Registered User**

- Restricted access to the Login or Register page
  - Attempting to access these pages will redirect the user back to the Dashboard page

- An authenticated user can stay logged in for a maximum of 1 hour
  - After 1 hour passes, the auto-logout feature triggers, forcing the user to log off and redirect back to the Login page

- A user can perform CRUD operations associated with a project on the Dashboard page
  - A user can also perform CRUD operations for a task associated with a project on the ProjectBoard page

- Drag and drop a project task on the ProjectBoard page for the following cases where each list is  <br> filtered by status and sorted by position in ascending order:
  - Reordering within the same list 
  - Moving to another list 

- Optionally, a user can reset their password by accessing the ResetPassword page
  - When resetting your password, a user cannot use their previous password as their new password

- Warning alert message appears for the following situations:
  - No projects exist
  - No project tasks associated with a project
  - Attempting to access a project that doesn't exist 

- An error alert message appears if a user attempts to access a project belonging to another user

## How to login to the web application

- Either use an existing account or create a new account through the registration page

- A dummy account for testing with projects and project tasks already created: 
  - `Username: user@gmail.com`
  - `Password: password`

## REST APIs
```
Projects API (all endpoints are private)
  - GET /projects
  - GET /projects/{projectId}
  - POST /projects
  - DELETE /projects/{projectId}
  
Project Tasks API (all endpoints are private)
  - GET /project-tasks
  - GET /project-tasks/{projectTaskId}/{projectTaskSequence}
  - POST /project-tasks/{projectTaskId}
  - PATCH /project-tasks/{projectTaskId}
  - PATCH /project-tasks/{projectTaskId}/{projectTaskSequence}
  - DELETE /project-tasks/{projectTaskId}/{projectTaskSequence}

Users API
  - POST /users/register
  - POST /users/login
  - GET /users/{userId} (private)
  - PATCH /users/reset-password (private)
```