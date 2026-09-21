let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function addTask() {

    const taskInput = document.getElementById("taskInput");
    const subjectInput = document.getElementById("subjectInput");

    const taskName = taskInput.value.trim();
    const subjectName = subjectInput.value.trim();

    if (taskName === "" || subjectName === "") {
        alert("Please enter task and subject.");
        return;
    }

    tasks.push({
        task: taskName,
        subject: subjectName,
        completed: false
    });

    saveTasks();

    taskInput.value = "";
    subjectInput.value = "";

    displayTasks();
}

function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((item, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong class="${item.completed ? "completed" : ""}">
                    ${item.task}
                </strong>
                <br>
                <small>Subject: ${item.subject}</small>
            </div>

            <div>
                <button onclick="completeTask(${index})">
                    ✓
                </button>

                <button class="delete-btn" onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateDashboard();
}

function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();
}

function updateDashboard() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;
}

displayTasks();
