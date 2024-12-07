import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="text-2xl font-bold mb-4">
          ページが見つかりませんでした。
        </div>
        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            戻る
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
