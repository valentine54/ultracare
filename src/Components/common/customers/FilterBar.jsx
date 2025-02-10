import React from "react";
import { Plus, Filter } from "lucide-react";

const FilterBar = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Customers Insurance Details
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Take a look at the policies to see what is covered
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors">
          <Plus size={20} />
          <span>Add New Customer</span>
        </button>
        <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
