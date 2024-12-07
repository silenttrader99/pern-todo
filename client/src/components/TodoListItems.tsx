import { useState } from "react";
import UpdateTodo from "./UpdateTodo";

const TodoListItems = ({ todo }: { todo: any }) => {
  const { id, title, content, deadline, completed } = todo;
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo: any) => todo.id !== id));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async () => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    window.location.reload();
  };

  return (
    <li
      className={`${
        completed ? "bg-gray-100" : "bg-white"
      }  p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {title}
          </h3>
          <p className="mt-1 text-gray-600 line-clamp-2">{content}</p>
          <p className="mt-1 text-sm text-gray-500">期限: {deadline}</p>
        </div>
        <div className="flex justify-end space-x-2 mt-4 pt-2 border-t">
          <button
            className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-md"
            onClick={handleComplete}
          >
            完了
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
          >
            更新
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
          >
            削除
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <UpdateTodo onClose={() => setIsModalOpen(false)} todo={todo} />
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoListItems;
