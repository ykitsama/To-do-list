let tasks = [];

function addTask() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  tasks.push(task);

  taskInput.value = "";
  displayTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function filterTasks(filter) {
  displayTasks(filter);
}

function displayTasks(filter = "all") {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (filter === "pending" && task.completed) return;
    if (filter === "completed" && !task.completed) return;

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

// Initial render
displayTasks();

