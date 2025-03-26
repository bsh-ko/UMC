import React, { createContext, useState, ReactNode } from "react";

// TodoItem 인터페이스 정의
export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

// Context 타입 정의
interface TodoContextType {
  todos: TodoItem[];
  doneTasks: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  completeTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  deleteDoneTask: (id: string) => void;
}

// Context 생성
export const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider 컴포넌트
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [doneTasks, setDoneTasks] = useState<TodoItem[]>([]);

  const addTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const completeTodo = (id: string) => {
    const todoToComplete = todos.find((todo) => todo.id === id);
    if (todoToComplete) {
      setTodos(todos.filter((todo) => todo.id !== id));
      setDoneTasks([...doneTasks, { ...todoToComplete, completed: true }]);
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteDoneTask = (id: string) => {
    setDoneTasks(doneTasks.filter((task) => task.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        doneTasks,
        addTodo,
        toggleTodo,
        completeTodo,
        deleteTodo,
        deleteDoneTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Custom Hook: Context 사용을 쉽게 만드는 훅
export const useTodoContext = () => {
  const context = React.useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
