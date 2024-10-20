document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    addButton.addEventListener('click', () => {
        addTask(taskInput.value.trim());
    });

    taskInput.addEventListener('keypress', (event) => {  // Use "event" instead of "e"
        if (event.key === 'Enter') {  // Use "event.key" here
            addTask(taskInput.value.trim());
        }
    });
});

function addTask(taskText, save = true) {
    if (taskText.trim() === "") {
        alert("Please enter a task");
        return;
    }

    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    taskItem.appendChild(removeBtn);

    taskList.appendChild(taskItem);

    document.getElementById('task-input').value = '';

    if (save) {
        saveTaskToLocalStorage(taskText);
    }

    removeBtn.addEventListener('click', () => {
        taskItem.remove();
        removeTaskFromLocalStorage(taskText);
    });
}

function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        addTask(taskText, false);
    });
}
