import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { DoneList } from "./components/DoneList";

function App() {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container_header">BREN TODO</h1>
        <TodoForm />
        <div className="render-container">
          <TodoList />
          <DoneList />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
