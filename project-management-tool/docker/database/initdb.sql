CREATE DATABASE IF NOT EXISTS `project_management_tool`;

CREATE USER 'root'@'%' IDENTIFIED BY 'password';
GRANT ALL ON *.* TO 'root'@'%';