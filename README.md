# Task Tracker

## Overview
This project is a simple **Task Tracker** application that helps users stay organized by allowing them to add, delete, and mark tasks as complete. It stores tasks in local storage so that tasks persist even when the page is reloaded.

### Features
- Add tasks with a name, description, and due date.
- Mark tasks as complete or incomplete.
- Delete tasks from the list.
- Task data is stored in the browser’s local storage.

### Code Overview
1. **`Task` Class**: This class represents an individual task with attributes like name, description, due date, and completion status.
2. **`TaskManager` Class**: This class handles task management operations such as adding, deleting, and toggling task completion. It also saves and loads tasks from local storage.
3. **`taskManager.js`**: Contains the logic for handling tasks and task list operations.
4. **`script.js`**: Manages the interaction between the UI and `TaskManager`. It listens to form submissions and renders the tasks on the page.

## How to Run
1. Clone the repository or download the project files.
2. Open `index.html` in any modern web browser.
3. Interact with the application to add, delete, and complete tasks.

## Author
The project is authored by Sejal. Feel free to modify and extend this project.

