const todoInput = document.getElementById("todoInput");
      const todoList = document.getElementById("todoList");
      const dueDateInput = document.getElementById("dueDate");
      const categoryInput = document.getElementById("category");
      let currentFilter = "all";

      window.onload = function () {
        fetchTodos();
      };

      function fetchTodos() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todoList.innerHTML = "";

        todos.forEach((todo, index) => {
          if (currentFilter === "completed" && !todo.completed) return;
          if (currentFilter === "pending" && todo.completed) return;

          const li = document.createElement("li");
          if (todo.completed) li.classList.add("completed");

          const taskTop = document.createElement("div");
          taskTop.className = "task-top";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = todo.completed;
          checkbox.onchange = () => toggleComplete(index);

          const taskText = document.createElement("span");
          taskText.textContent = todo.text;
          taskText.className = "task-text";
          taskText.ondblclick = () => editTask(taskText, index);

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "🗑";
          deleteBtn.className = "delete-btn";
          deleteBtn.onclick = () => deleteTodo(index);

          taskTop.appendChild(checkbox);
          taskTop.appendChild(taskText);
          taskTop.appendChild(deleteBtn);

          const taskInfo = document.createElement("div");
          taskInfo.className = "task-info";
          taskInfo.textContent = `Due: ${todo.dueDate || "N/A"} | Category: ${
            todo.category || "None"
          }`;

          li.appendChild(taskTop);
          li.appendChild(taskInfo);
          todoList.appendChild(li);
        });
      }

      function addTodo() {
        const task = todoInput.value.trim();
        const dueDate = dueDateInput.value;
        const category = categoryInput.value;

        if (task === "") return;

        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.push({ text: task, completed: false, dueDate, category });
        localStorage.setItem("todos", JSON.stringify(todos));

        todoInput.value = "";
        dueDateInput.value = "";
        categoryInput.value = "";
        fetchTodos();
      }

      function toggleComplete(index) {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos[index].completed = !todos[index].completed;
        localStorage.setItem("todos", JSON.stringify(todos));
        fetchTodos();
      }

      function deleteTodo(index) {
        if (!confirm("Are you sure you want to delete this task?")) return;
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        fetchTodos();
      }

      function editTask(span, index) {
        const input = document.createElement("input");
        input.type = "text";
        input.value = span.textContent;
        input.onblur = () => saveEdit(input, index);
        input.onkeydown = (e) => {
          if (e.key === "Enter") input.blur();
        };
        span.replaceWith(input);
        input.focus();
      }

      function saveEdit(input, index) {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos[index].text = input.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        fetchTodos();
      }

      function setFilter(filter) {
        currentFilter = filter;
        fetchTodos();
      }
    
