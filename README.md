# Project-Management-Tool

Full stack web application using React 18 and Spring Boot 2

- React along with HTML, CSS, JS and Bootstrap 5 are used for the frontend

- Create a REST API using Spring Boot that communicates with MySQL as the backend

- Utilize Spring Security + JWT to secure both the frontend and backend

## How to visit web application hosted by Heroku
- Head to https://user-project-management-tool.herokuapp.com

- Project Management Tool web application is hosted on [Heroku](https://devcenter.heroku.com/) with the [ClearDB MySQL](https://devcenter.heroku.com/articles/cleardb) addon 

## Features

**Non-Registered User**
- Only have access to the Landing, Login or Register page
  - Accessing a url not part of the web app shows a NotFound page 

- All other pages are protected routes
  - User tries to access a private route, the user is redirected back to the Login page   
  
- When registering a new user, the username needs to be unique

<br>**Registered User**

- Cannot access the Login or Register page
  - Attempting to access these pages will redirected user back to the Dashboard page

- A authenticated user can stay logged in for a maximum of 1 hour
  - After 1 hour passes, the auto logout features triggers forcing the user to log off and redirected back to Login page 

- A user can perform CRUD operations associated with a project on Dashboard page
  - In addition, can perform CRUD operations for a task associated with a project on ProjectBoard page

- Optionally, a user can reset their password by accessing the ResetPassword page
  - When resetting your password, a user cannot use their previous password as their new password

- Warning alert message appears for the following situations:
  - No projects exists
  - No project tasks assoicated for a project
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
  - PATCH /project-tasks/{projectTaskId}/{projectTaskSequence}
  - DELETE /project-tasks/{projectTaskId}/{projectTaskSequence}

Users API
  - POST /users/register
  - POST /users/login
  - GET /users/{userId} (private)
  - PATCH /users/reset-password (private)
```