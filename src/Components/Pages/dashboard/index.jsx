import React from "react";
import DashboardLayout from "../../common/layout/DashboardLayout";
import DashboardStatsSection from "../../dashboard/DashboardStatsSection/index";
import PolicyTable from "../../dashboard/tables/PolicyTable";

const Dashboard = () => {
  const policies = [
    {
      name: "Vivian Okwara",
      type: "Personal Accident Policy",
      date: "10 Dec, 2024",
      premium: "ksh. 20,000/M",
    },
    {
      name: "Simon Ojoo",
      type: "Car Insurance",
      date: "10 Dec, 2024",
      premium: "ksh. 20,000/M",
    },
    {
      name: "Emily Wahome",
      type: "Marine Insurance",
      date: "10 Dec, 2024",
      premium: "ksh. 20,000/M",
    },
  ];

  return (
    <DashboardLayout>
      <DashboardStatsSection />
      <div className="px-6 pb-6">
        <PolicyTable policies={policies} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
