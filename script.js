import TaskManager from './taskManager.js';

const taskManager = new TaskManager();
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// Load tasks on DOM load
document.addEventListener('DOMContentLoaded', renderTasks);

// Add Task Event
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskName = document.getElementById('task').value;
    const taskDesc = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('due-date').value;

    const newTask = new Task(taskName, taskDesc, dueDate);
    taskManager.addTask(newTask);
    renderTasks();
    taskForm.reset();
});

// Render tasks on the page
function renderTasks() {
    taskList.innerHTML = '';
    taskManager.tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <div class="task-content">
                <h3>${task.taskName}</h3>
                <p>${task.taskDesc}</p>
                <small>Due: ${task.dueDate}</small>
            </div>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Unmark' : 'Complete'}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Toggle completion
function toggleComplete(id) {
    taskManager.toggleComplete(id);
    renderTasks();
}

// Delete task
function deleteTask(id) {
    taskManager.deleteTask(id);
    renderTasks();
}
