import { useTodoContext } from "../context/TodoContext";

export function TodoList() {
  const { todos, toggleTodo, completeTodo } = useTodoContext();

  const getButtonStyle = (isDone: boolean) => ({
    backgroundColor: isDone ? "#dc3545" : "#28a745",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "3px",
    cursor: "pointer",
  });

  return (
    <div className="render-container_section">
      <h2 className="render-container_title">할 일</h2>
      <ul className="render-contaier_list">
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <li key={todo.id} className="render-container_item">
              <span className="render-container_item-text" onClick={() => toggleTodo(todo.id)}>
                {todo.text}
              </span>
              <button
                className="render-container_item-button"
                onClick={() => completeTodo(todo.id)}
                style={getButtonStyle(false)}
              >
                완료
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
