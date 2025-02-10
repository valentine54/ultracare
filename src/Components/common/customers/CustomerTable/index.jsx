import React from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import CustomerTable from "../CustomerTable/index.jsx";
import CustomerTabs from "../CustomerTabs.jsx";
import FilterBar from "../FilterBar.jsx";

const CustomersPage = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <FilterBar />
        <div className="bg-white rounded-lg shadow-sm">
          <CustomerTabs newCount={34} oldCount={146} />
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-6">
              Take a look at the policies to see what is covered
            </p>
            <CustomerTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
