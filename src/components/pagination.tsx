import React from "react";

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number | undefined;
};
const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  return (
    <div className="flex select-none items-center justify-between border-t border-gray-200 py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {page === 1 ? page : (page - 1) * 15}
            </span>{" "}
            to <span className="font-medium">{page * 15}</span> of{" "}
            <span className="font-medium">{totalPages}</span> results
          </p>
        </div>
        <div>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="inline-flex items-center rounded-lg border bg-[#e56449] px-4 py-2 text-sm font-medium text-slate-100 transition-transform hover:opacity-75 active:scale-75 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() => setPage(page + 1)}
            className="ml-3 inline-flex transform items-center rounded-lg border bg-[#e56449] px-4 py-2 text-sm font-medium text-slate-100 transition-transform hover:opacity-75 active:scale-75"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
