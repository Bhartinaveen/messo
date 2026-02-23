import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories..."
          className="w-full p-4 pl-14 rounded-full shadow-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};

export default SearchBar;
