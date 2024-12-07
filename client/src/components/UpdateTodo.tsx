import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  content: string;
  deadline: string;
}

const UpdateTodo = ({ onClose, todo }: { onClose: () => void; todo: Todo }) => {
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);
  const [deadline, setDeadline] = useState(todo.deadline);
  console.log(todo.deadline);

  const handleUpdate = async (todo: Todo) => {
    try {
      await fetch(`http://localhost:5000/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, deadline }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    if (title !== "" && content !== "" && deadline !== "") {
      handleUpdate(todo);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">更新</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">内容:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">期限:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Todoを更新
          </button>
          <button
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTodo;
