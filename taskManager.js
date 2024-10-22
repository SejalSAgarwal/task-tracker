/**
 * Task class to represent individual tasks.
 */
class Task {
    constructor(taskName, taskDesc, dueDate, completed = false) {
        this.id = Date.now();
        this.taskName = taskName;
        this.taskDesc = taskDesc;
        this.dueDate = dueDate;
        this.completed = completed;
    }
}

/**
 * TaskManager class for managing task operations.
 */
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
    }

    // Load tasks from localStorage
    loadTasks() {
        return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Add a new task
    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
    }

    // Delete a task
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    // Toggle task completion
    toggleComplete(id) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) task.completed = !task.completed;
            return task;
        });
        this.saveTasks();
    }
}

export default TaskManager;
