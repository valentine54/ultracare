import React from "react";

const UserDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-5 shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-600">Insure</h2>
        <nav className="mt-5">
          <ul>
            <li className="p-3 bg-blue-100 rounded-lg text-blue-600 font-medium">Dashboard</li>
            <li className="p-3 hover:bg-gray-200 rounded-lg">Policy</li>
            <li className="p-3 hover:bg-gray-200 rounded-lg">Payments</li>
            <li className="p-3 hover:bg-gray-200 rounded-lg">Settings</li>
            <li className="p-3 hover:bg-gray-200 rounded-lg">Notifications</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search here..."
            className="p-2 border rounded-md w-1/3"
          />
          <div className="flex items-center space-x-3">
            <span className="font-medium">Sara Cynthia</span>
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="rounded-full w-10 h-10"
            />
          </div>
        </div>

        {/* Car Insurance Progress */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Car Insurance In Progress</h3>
          <div className="flex items-center mt-2">
            <img
              src={FirstAssurance}
              alt="First Assurance"
              className="mr-4"
            />
            <div className="flex-1">
              <div className="w-full bg-gray-200 h-2 rounded-md">
                <div className="bg-blue-600 h-2 w-1/2 rounded-md"></div>
              </div>
              <p className="mt-2 text-gray-600">54% Complete</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-4">Upload Documents</button>
          </div>
        </div>

        {/* Insurance Summary & Cover Statistics */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Insurance Summary */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Insurance Summary</h3>
            <p className="mt-2"><strong>Coverage:</strong> Personal Accident</p>
            <p><strong>Premium Schedule:</strong> Monthly</p>
            <p><strong>Premium Amount:</strong> Ksh. 50,000</p>
            <p><strong>Status:</strong> <span className="text-green-600">Active</span></p>
            <p><strong>Due Date:</strong> 13 March, 2025</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">View More Details</button>
          </div>

          {/* Cover Statistics */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Cover Statistics</h3>
            <p className="text-gray-600 text-sm">Tracking changes in average policy size over time</p>
            <div className="mt-4 bg-gray-200 h-32 flex items-end p-2">
              <div className="w-1/4 bg-blue-500 h-8"></div>
              <div className="w-1/4 bg-blue-500 h-12 mx-2"></div>
              <div className="w-1/4 bg-blue-500 h-16"></div>
              <div className="w-1/4 bg-blue-500 h-6 mx-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
