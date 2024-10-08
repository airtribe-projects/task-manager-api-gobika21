# Task Management API

## Overview

This is a simple Task Management API built with Node.js and Express. It allows users to manage tasks with features such as:

- Add new tasks
- Update existing tasks
- Delete tasks
- Filter tasks by completed status
- Sort tasks by creation at
- Assign priority levels to tasks
- Filter tasks by priority levels

The API provides CRUD (Create, Read, Update, Delete) operations for managing tasks. Each task has the following fields:

- `id`: A unique identifier for the task.
- `title`: A string representing the task's title.
- `description`: A string describing the task.
- `completed`: A boolean indicating whether the task is complete.
- `createdAt`: The date when the task was created.
- `priority`: A string indicating the task's priority.
