import { FC } from "react";

const Pagination: FC<{ page: number; total: number; setPage: (page: number) => void }> = ({
  page,
  total,
  setPage,
}) => (
  <div className="flex justify-between items-center">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className={`px-4 py-2 rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      Previous
    </button>
    <span>
      Page {page} of {total}
    </span>
    <button
      disabled={page === total}
      onClick={() => setPage(page + 1)}
      className="px-4 py-2 rounded"
    >
      Next
    </button>
  </div>
);

export default Pagination;