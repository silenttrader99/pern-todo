import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          To-Doリスト
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          タスクを効率的に管理しましょう
        </p>
        <Link to="/login">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            まず、ログインしましょう
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
