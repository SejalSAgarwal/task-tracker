/**
 * Task Class: Represents a single task.
 * @param {string} name - The name of the task.
 * @param {string} description - A brief description of the task.
 * @param {string} dueDate - The due date for the task.
 */
class Task {
    constructor(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.isCompleted = false;
    }

    /**
     * Toggles the completion status of the task.
     */
    toggleComplete() {
        this.isCompleted = !this.isCompleted;
    }
}

/**
 * TaskManager Class: Manages the list of tasks and their operations.
 */
class TaskManager {
    constructor() {
        this.tasks = [];
    }

    /**
     * Adds a new task to the task list.
     * @param {string} name - Task name.
     * @param {string} description - Task description.
     * @param {string} dueDate - Task due date.
     */
    addTask(name, description, dueDate) {
        const task = new Task(name, description, dueDate);
        this.tasks.push(task);
        this.renderTasks();
    }

    /**
     * Removes a task from the list by index.
     * @param {number} index - Index of the task to remove.
     */
    removeTask(index) {
        this.tasks.splice(index, 1);
        this.renderTasks();
    }

    /**
     * Toggles the completion status of a task by index.
     * @param {number} index - Index of the task to toggle.
     */
    toggleTaskCompletion(index) {
        this.tasks[index].toggleComplete();
        this.renderTasks();
    }

    /**
     * Renders the list of tasks to the DOM.
     */
    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.isCompleted ? 'completed' : '';

            const taskContent = `
                <div class="task-content">
                    <h3>${task.name}</h3>
                    <p>${task.description}</p>
                    <small>Due: ${task.dueDate}</small>
                </div>
                <div class="task-actions">
                    <button class="complete-btn" onclick="taskManager.toggleTaskCompletion(${index})">
                        ${task.isCompleted ? 'Undo' : 'Complete'}
                    </button>
                    <button class="delete-btn" onclick="taskManager.removeTask(${index})">Delete</button>
                </div>
            `;

            taskItem.innerHTML = taskContent;
            taskList.appendChild(taskItem);
        });
    }
}
