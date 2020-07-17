// UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM Load Event
    document.addEventListener("DOMContentLoaded", getTasks);
    // Add task event
    form.addEventListener("submit", addTask);
    // Remove task event
    taskList.addEventListener("click", removeTask);
    // Clear all tasks
    clearBtn.addEventListener("click", clearTasks);
    // Filter tasks
    filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        // LS stores only str
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement("li");
        // Add Class
        li.className = "collection-item";
        // Create a text node and append to li 
        li.appendChild(document.createTextNode(task));
        // Create new link element and add class
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = '<i class = "fas fa-times"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}


// it's an event handler, that's why it takes event as an argument
function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a task");
    }
    // Create li element
    const li = document.createElement("li");
    // Add Class
    li.className = "collection-item";
    // Create a text node and append to li 
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element and add class
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class = "fas fa-times"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store in Local Storage (and li will not disappear after page reload)
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = "";

    e.preventDefault();
}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        console.log(e.target);
        if (confirm("Do you really want to delete the task?")) {
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        // LS stores only str
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Clear Tasks
function clearTasks() {
    // taskList.innerHTML = "";
    // Faster way to delete all tasks
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear all tasks from Local Storage
    clearTasksFromLocalStorage();
}

// Clear all tasks from Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    console.log(text);
    // quertselector returns node list and that is why we can use foreach loop
    document.querySelectorAll(".collection-item").forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

// Stora Task in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        // LS stores only str
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}