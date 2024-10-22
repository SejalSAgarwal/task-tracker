// Select DOM elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Handle form submission
taskForm.addEventListener('submit', addTask);

// Add Task Function
function addTask(e) {
    e.preventDefault();

    // Get task details
    const taskName = document.getElementById('task').value;
    const taskDesc = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('due-date').value;

    // Create task object
    const taskObj = {
        id: Date.now(),
        taskName: taskName,
        taskDesc: taskDesc,
        dueDate: dueDate,
        completed: false
    };

    // Save task to local storage
    saveTask(taskObj);

    // Render task on the page
    renderTask(taskObj);

    // Clear form fields
    taskForm.reset();
}

// Save task to local storage
function saveTask(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

// Load tasks from local storage
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => renderTask(task));
}

// Render task on the page
function renderTask(task) {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = 
        <div class="task-content">
            <h3>${task.taskName}</h3>
            <p>${task.taskDesc}</p>
            <small>Due: ${task.dueDate}</small>
        </div>
        <div class="task-actions">
            <button class="complete-btn" onclick="toggleComplete(${task.id})">${task.completed ? 'Unmark' : 'Complete'}</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
    ;
    taskList.appendChild(li);
}

// Delete task from local storage
function deleteTask(id) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    reloadTaskList();
}

// Toggle task completion
function toggleComplete(id) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    reloadTaskList();
}

// Reload task list to reflect changes
function reloadTaskList() {
    taskList.innerHTML = '';
    loadTasks();
}
