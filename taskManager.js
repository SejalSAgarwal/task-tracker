class Task {
    constructor(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.isCompleted = false;
    }

    toggleComplete() {
        this.isCompleted = !this.isCompleted;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(name, description, dueDate) {
        const task = new Task(name, description, dueDate);
        this.tasks.push(task);
        this.renderTasks();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.renderTasks();
    }

    toggleTaskCompletion(index) {
        this.tasks[index].toggleComplete();
        this.renderTasks();
    }

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

// Initialize TaskManager
const taskManager = new TaskManager();

// Event listener for form submission
document.getElementById('task-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const taskName = document.getElementById('task').value;
    const taskDescription = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('due-date').value;

    if (taskName && taskDescription && dueDate) {
        taskManager.addTask(taskName, taskDescription, dueDate);
    }

    this.reset();
});
