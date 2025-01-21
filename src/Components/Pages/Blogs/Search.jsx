import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-bold text-blue-500 mb-3">
          Resources and insights
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Tips and insights to help you make informed insurance decisions
        </p>

        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
