const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-2">
      <button
        onClick={handlePrevious}
        className={`px-4 py-2 bg-blue-500 text-white rounded ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600"
        }`}
        disabled={currentPage === 1}
      >
        前へ
      </button>
      <span className="text-gray-700">
        ページ {currentPage} / {totalPages}
      </span>
      <button
        onClick={handleNext}
        className={`px-4 py-2 bg-blue-500 text-white rounded ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600"
        }`}
        disabled={currentPage === totalPages}
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination;
