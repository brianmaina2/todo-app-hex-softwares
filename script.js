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
    if (isCompleted) li.classList.add("completed");
  
    const span = document.createElement("span");
    span.textContent = text;
    span.onclick = () => {
      li.classList.toggle("completed");
      saveTasks();
    };
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => {
      li.remove();
      saveTasks();
    };
  
    li.appendChild(span);
    li.appendChild(deleteBtn);
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
        completed: li.classList.contains("completed")
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  