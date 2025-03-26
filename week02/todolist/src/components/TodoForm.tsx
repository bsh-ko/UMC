import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

export function TodoForm() {
  const [inputValue, setInputValue] = useState<string>("");
  const { addTodo } = useTodoContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <form className="todo-container_form" onSubmit={handleSubmit}>
      <input
        className="todo-container_input"
        type="text"
        placeholder="할일을 입력해주세요."
        required
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="todo-container_button">
        추가
      </button>
    </form>
  );
}
