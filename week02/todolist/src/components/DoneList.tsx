import { useTodoContext } from "../context/TodoContext";

export function DoneList() {
  const { doneTasks, deleteDoneTask } = useTodoContext();

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
      <h2 className="render-container_title">완료</h2>
      <ul className="render-contaier_list">
        {doneTasks.map((todo) => (
          <li key={todo.id} className="render-container_item">
            <span className="render-container_item-text">{todo.text}</span>
            <button
              className="render-container_item-button"
              onClick={() => deleteDoneTask(todo.id)}
              style={getButtonStyle(true)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
