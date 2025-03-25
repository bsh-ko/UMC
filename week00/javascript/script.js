document.addEventListener("DOMContentLoaded", () => {
  const inputTask = document.getElementById("inputTask");
  const todoList = document.getElementById("todo");
  const doneList = document.getElementById("done");

  inputTask.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  function addTask() {
    const taskText = inputTask.value.trim();
    if (taskText === "") return;

    const li = createListItem(taskText, "완료", () => moveTask(li, taskText, doneList));
    todoList.appendChild(li);
    inputTask.value = "";
  }

  function moveTask(taskItem, taskText, targetList) {
    taskItem.remove();
    const newLi = createListItem(taskText, "삭제", () => newLi.remove());
    targetList.appendChild(newLi);
  }

  function createListItem(text, buttonText, onClick) {
    const li = document.createElement("li");
    li.textContent = text;

    const button = document.createElement("button");
    button.textContent = buttonText;
    button.className = "btn";
    button.onclick = onClick;

    li.appendChild(button);
    return li;
  }
});
