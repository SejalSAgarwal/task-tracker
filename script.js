// Select DOM elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Handle form submission
taskForm.addEventListener('submit', handleTaskSubmission);

// Handle Task Submission
function handleTaskSubmission(event) {
    event.preventDefault();

    const taskObj = createTaskObject();
    if (taskObj) {
        saveTaskToLocalStorage(taskObj);
        renderTaskOnPage(taskObj);
        taskForm.reset();
    }
}

// Create Task Object
function createTaskObject() {
    const taskName = document.getElementById('task').value;
    const taskDesc = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('due-date').value;

    if (taskName === '' || dueDate === '') {
        alert('Task name and due date are required');
        return null;
    }

    return {
        id: Date.now(),
        taskName: taskName,
        taskDesc: taskDesc,
        dueDate: dueDate,
        completed: false
    };
}

// Save task to local storage
function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Load tasks from local storage and render on page
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => renderTaskOnPage(task));
}

// Render task on the page
function renderTaskOnPage(task) {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
        <div class="task-content">
            <h3>${task.taskName}</h3>
            <p>${task.taskDesc}</p>
            <small>Due: ${task.dueDate}</small>
        </div>
        <div class="task-actions">
            <button class="complete-btn" onclick="toggleTaskCompletion(${task.id})">
                ${task.completed ? 'Unmark' : 'Complete'}
            </button>
            <button class="delete-btn" onclick="removeTask(${task.id})">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
}

// Delete task from local storage and refresh UI
function removeTask(taskId) {
    const updatedTasks = getTasksFromLocalStorage().filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    refreshTaskList();
}

// Toggle task completion status and refresh UI
function toggleTaskCompletion(taskId) {
    const updatedTasks = getTasksFromLocalStorage().map(task => {
        if (task.id === taskId) task.completed = !task.completed;
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    refreshTaskList();
}

// Clear the task list and reload tasks
function refreshTaskList() {
    taskList.innerHTML = '';
    loadTasks();
}
