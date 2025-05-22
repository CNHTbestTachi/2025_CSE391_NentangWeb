let tasks = [];
let currentFilter = "all";

window.onload = function () {
  loadTasksFromLocalStorage();
  renderTasks();

  document
    .getElementById("taskInput")
    .addEventListener("keydown", function (e) {
      if (e.key === "Enter") addTask();
    });

  document.getElementById("searchInput").addEventListener("input", function () {
    searchTasks();
  });
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Vui lòng nhập nội dung công việc!");
    return;
  }

  tasks.push({ id: Date.now(), title: taskText, isDone: false });
  saveTasksToLocalStorage();
  renderTasks(currentFilter);
  input.value = "";
}

function renderTasks(filter = "all", keyword = "") {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const filtered = tasks.filter((task) => {
    const matchStatus =
      filter === "done"
        ? task.isDone
        : filter === "active"
        ? !task.isDone
        : true;
    const matchKeyword = task.title
      .toLowerCase()
      .includes(keyword.toLowerCase());

    return matchStatus && matchKeyword;
  });

  filtered.forEach((task) => {
    const li = document.createElement("li");
    if (task.isDone) li.classList.add("done");

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;
    title.onclick = () => toggleTask(task.id);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("i");
    editBtn.className = "fas fa-edit";
    editBtn.onclick = () => editTask(task.id, title);

    const delBtn = document.createElement("i");
    delBtn.className = "fas fa-trash";
    delBtn.onclick = () => deleteTask(task.id);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(title);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) task.isDone = !task.isDone;
    return task;
  });
  saveTasksToLocalStorage();
  renderTasks(currentFilter, document.getElementById("searchInput").value);
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasksToLocalStorage();
  renderTasks(currentFilter, document.getElementById("searchInput").value);
}

function editTask(id, titleElement) {
  const task = tasks.find((t) => t.id === id);
  const input = document.createElement("input");
  input.type = "text";
  input.value = task.title;
  input.className = "editing";

  input.onkeydown = (e) => {
    if (e.key === "Enter") finishEdit();
  };

  input.onblur = finishEdit;
  titleElement.replaceWith(input);
  input.focus();

  function finishEdit() {
    const newTitle = input.value.trim();
    if (newTitle) {
      task.title = newTitle;
      saveTasksToLocalStorage();
      renderTasks(currentFilter, document.getElementById("searchInput").value);
    } else {
      alert("Không được để trống!");
      input.focus();
    }
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const data = localStorage.getItem("todoTasks");
  if (data) tasks = JSON.parse(data);
}

function filterTasks(type) {
  currentFilter = type;
  const keyword = document.getElementById("searchInput").value;
  renderTasks(type, keyword);
}

function searchTasks() {
  const keyword = document.getElementById("searchInput").value;
  renderTasks(currentFilter, keyword);
}

function clearAllTasks() {
  if (confirm("Bạn có chắc chắn muốn xóa tất cả công việc?")) {
    tasks = [];
    saveTasksToLocalStorage();
    renderTasks(currentFilter);
  }
}
