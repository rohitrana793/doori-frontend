import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const PageHeader = ({
  title,
  handleSearch,
  setShowForm,
  showCreateButton,
  showSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, handleSearch]);

  return (
    <div className="mx-6 flex flex-col gap-2 rounded-md border border-gray-100 bg-white px-3 py-2 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-base font-semibold tracking-tight text-secondary md:text-lg">
          {title}
        </h2>

        <div className="mt-0.5 h-0.5 w-6 rounded-full bg-secondary" />
      </div>

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center md:w-auto">
        {showSearch && (
          <div className="relative w-full sm:w-56">
            <Search
              size={14}
              strokeWidth={2}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              placeholder={`Search ${title}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-7 w-full rounded-md border border-gray-200 bg-gray-50 pl-7 pr-2.5 text-xs text-gray-700 outline-none transition-all placeholder:text-xs placeholder:text-gray-400 focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/10"
            />
          </div>
        )}

        {showCreateButton && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="h-7 w-full cursor-pointer rounded-md bg-secondary px-3 text-xs font-medium text-white shadow-sm transition-all hover:bg-submit-hover-button hover:shadow-md active:scale-[0.98] sm:w-auto"
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
