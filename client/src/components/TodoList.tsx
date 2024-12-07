import { useEffect, useState } from "react";
import TodoListItems from "./TodoListItems";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      const todos = data.rows;
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Todoリスト</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {todos.map((todo: any) => (
          <TodoListItems todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
