// Load tasks from localStorage
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTask(task.text, task.completed));
  };
  
  function addTask(taskText = null, isCompleted = false) {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    
    const text = taskText || taskInput.value.trim();
    if (text === "") return;
  
    const li = document.createElement("li");
  
    // Checkbox for marking complete
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;
    checkbox.onchange = () => {
      if (checkbox.checked) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }
      saveTasks();
    };
  
    const span = document.createElement("span");
    span.textContent = text;
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => {
      li.remove();
      saveTasks();
    };
  
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
  
    if (isCompleted) li.classList.add("completed");
  
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
  }
  
  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
      tasks.push({
        text: li.querySelector("span").textContent,
        completed: li.querySelector("input").checked
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  