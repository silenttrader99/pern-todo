import { useState } from "react";
import Pagination from "../components/Pagination";
import Dashboard from "./Dashboard";

const AppLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="m-0 h-screen overflow-hidden">
      <Dashboard />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AppLayout;
