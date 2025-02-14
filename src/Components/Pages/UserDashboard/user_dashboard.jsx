import React from 'react';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search here..."
              className="px-4 py-2 border rounded-lg"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Insure
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-6 mb-8">
          <button className="text-gray-700 hover:text-blue-500">Databoard</button>
          <button className="text-gray-700 hover:text-blue-500">Policy</button>
          <button className="text-gray-700 hover:text-blue-500">Payments</button>
          <button className="text-gray-700 hover:text-blue-500">Settings</button>
          <button className="text-gray-700 hover:text-blue-500">Notifications</button>
        </div>

        {/* Car Insurance Progress */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Car Insurance In progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '54%' }}></div>
          </div>
          <p className="text-gray-600 mb-4">54% Complete</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Upload your Logbook and relevant documents
          </button>
        </div>

        {/* Insurance Summary */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Insurance Summary</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Coverage: Personal Accident</p>
              <p className="text-gray-600">Premium Schedule: Monthly</p>
              <p className="text-gray-600">Premium Amount: Ksh. 50,000</p>
              <p className="text-gray-600">Status: Active</p>
              <p className="text-gray-600">Due Date: 13 March, 2025</p>
            </div>
            <button className="text-blue-500 hover:underline">View More Details</button>
          </div>
        </div>

        {/* Cover Statistics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cover Statistics</h2>
          <p className="text-gray-600 mb-4">Average Policy Size vs. Time</p>
          <div className="bg-gray-200 p-4 rounded-lg">
            <p className="text-gray-600">Tracking changes in average policy size over time</p>
            {/* Placeholder for chart */}
            <div className="mt-4 h-48 bg-gray-300 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;