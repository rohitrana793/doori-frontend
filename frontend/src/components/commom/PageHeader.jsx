import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const PageHeader = ({ title, handleSearch, setShowForm }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchValue);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, handleSearch]);

  return (
    <div className="mx-6 flex flex-col gap-5 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-secondary md:text-xl">
          {title}
        </h2>
        <div className="mt-1 h-0.5 w-8 rounded-full bg-secondary" />
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            strokeWidth={2}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            placeholder={`Search ${title}`}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none transition-all placeholder:text-sm placeholder:text-gray-400 focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/10"
          />
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="h-9 w-full rounded-lg bg-secondary px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-submit-hover-button hover:shadow-md active:scale-[0.98] cursor-pointer sm:w-auto"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
