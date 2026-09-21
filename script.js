let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];
let subjects = JSON.parse(localStorage.getItem("studySubjects")) || [];

// --------------------
// TASKS
// --------------------

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
                <button onclick="completeTask(${index})">✓</button>
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

// --------------------
// SUBJECTS
// --------------------

function saveSubjects() {
    localStorage.setItem(
        "studySubjects",
        JSON.stringify(subjects)
    );
}

function addSubject() {
    const subjectInput = document.getElementById("subjectName");

    const subjectName = subjectInput.value.trim();

    if (subjectName === "") {
        alert("Please enter a subject.");
        return;
    }

    if (subjects.includes(subjectName)) {
        alert("This subject is already added.");
        return;
    }

    subjects.push(subjectName);

    saveSubjects();

    subjectInput.value = "";

    displaySubjects();
}

function displaySubjects() {
    const subjectList = document.getElementById("subjectList");

    subjectList.innerHTML = "";

    subjects.forEach((subject, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <span>📚 ${subject}</span>
            <button onclick="deleteSubject(${index})">
                Delete
            </button>
        `;

        subjectList.appendChild(div);
    });
}

function deleteSubject(index) {
    subjects.splice(index, 1);

    saveSubjects();

    displaySubjects();
}

// --------------------
// LOAD DATA
// --------------------

displayTasks();
displaySubjects();
