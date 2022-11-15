CREATE SCHEMA project_management_tool;
USE project_management_tool;

CREATE USER 'root'@'%' IDENTIFIED BY 'password';
GRANT ALL ON *.* TO 'root'@'%';

CREATE TABLE IF NOT EXISTS user_account (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR (25) NOT NULL,
    last_name VARCHAR (25) NOT NULL,
    password CHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) AUTO_INCREMENT=1  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS project (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(50) NOT NULL,
    project_identifier VARCHAR(5) NOT NULL UNIQUE,
    project_description VARCHAR(100) NOT NULL,
    project_owner VARCHAR(25) NOT NULL,
    start_date DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL,
    user_account_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_account_id) REFERENCES user_account (id)
) AUTO_INCREMENT=1  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS backlog (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    project_task_sequence INT UNSIGNED DEFAULT 0,
    project_identifier VARCHAR(5) NOT NULL,
    project_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project (id)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS project_task (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    project_sequence VARCHAR(10) NOT NULL,
    project_identifier VARCHAR(5) NOT NULL,
    summary VARCHAR(100) NOT NULL,
    acceptance_criteria VARCHAR(100) DEFAULT NULL,
    status VARCHAR(20) NOT NULL,
    priority TINYINT UNSIGNED DEFAULT 0,
    position INT UNSIGNED NOT NULL,
    due_date DATE DEFAULT NULL,
    backlog_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (backlog_id) REFERENCES backlog (id)
) AUTO_INCREMENT=1  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO user_account (created_at, first_name, last_name, password, updated_at, username)
    VALUES (NOW(), 'Test', 'Users', '$2a$10$5KWyFO2xX1V8tr6rgEcXqutAgVlRMp6g4iNznfmuYIyRAYVTplTVG', NULL, 'testusers@mail.com');