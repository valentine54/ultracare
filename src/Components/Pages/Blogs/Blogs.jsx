import React, { useState } from "react";
import Search from "./Search";
import Listing from "./Listing";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <main className="bg-white">
      <Search onSearch={handleSearch} />
      <Listing searchTerm={searchTerm} />
    </main>
  );
};

export default Blogs;
