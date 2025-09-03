let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("task");
  const categoryInput = document.getElementById("category");
  const deadlineInput = document.getElementById("deadline");

  const taskText = taskInput.value.trim();
  const category = categoryInput.value.trim();
  const deadline = deadlineInput.value;

  if (taskText === "") return;

  const task = {
    text: taskText,
    category: category || "General",
    deadline: deadline || "No deadline",
    completed: false
  };

  tasks.push(task);
  saveTasks();

  taskInput.value = "";
  categoryInput.value = "";
  deadlineInput.value = "";
  displayTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
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
      <small>📂 ${task.category} | ⏰ ${task.deadline}</small>
      <button onclick="deleteTask(${index})">❌ Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Initial render
displayTasks();
