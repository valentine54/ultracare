import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

import { sendExcesses } from "../../helper/insurances";

export default function AddBenefits() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state)

  // Extract insurances & selected quote from navigation state
  const { insurances = [], quote = {} } = location.state || {};

  // State to store the selected insurance (Find by insurance_id)
  const [selectedInsurance, setSelectedInsurance] = useState(
    insurances.find(
      (insurance) => insurance.insurance_id === quote.insurance_id
    ) || insurances[0]
  );

  // Get selected excess benefits from selectedInsurance
  const selected_excess = selectedInsurance?.selected_excess || [];

  // State to track selected benefits
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const sendData = () => {
    const dataToSend = {
      insurance_id: selectedInsurance?.insurance_id,
      selected_excess_charges: selectedItems, 
      total_premium: selectedInsurance?.total_premium,
    };

    sendExcesses(dataToSend,navigate);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-4xl mx-auto bg-[#F8FAFC] rounded-lg shadow-sm px-4 py-6 mt-8 mb-6">
          <h1 className="text-center text-[#3B82F6] text-2xl sm:text-3xl font-medium">
            Additional Benefits
          </h1>
        </div>
        {/* Insurance Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">
            Select Insurance Company:
          </label>
          <div className="flex items-center gap-4">
            <select
              className="mt-2 w-1/2 p-2 border border-gray-300 rounded-md"
              value={selectedInsurance.insurance_id}
              onChange={(e) =>
                setSelectedInsurance(
                  insurances.find(
                    (insurance) =>
                      insurance.insurance_id === Number(e.target.value)
                  )
                )
              }
            >
              {insurances.map((insurance) => (
                <option
                  key={insurance.insurance_id}
                  value={insurance.insurance_id}
                >
                  {insurance.company_name}
                </option>
              ))}
            </select>

            {/* Display insurance details */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <p className="text-gray-600">
                <span className="font-medium">Cover Type:</span>{" "}
                {selectedInsurance.cover_type}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Total Premium:</span> Ksh.{" "}
                {selectedInsurance.total_premium}
              </p>
            </div>
          </div>
        </div>
        {/* Additional Benefits Table */}
        <h2 className="text-lg font-bold mb-4">Additional Benefits</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Select</th>
              <th className="border border-gray-300 px-4 py-2">
                Limit of Liability
              </th>
              <th className="border border-gray-300 px-4 py-2">Rate</th>
              <th className="border border-gray-300 px-4 py-2">
                Minimum Value
              </th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {selected_excess.length > 0 ? (
              selected_excess.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.limit_of_liability}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.excess_rate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Ksh. {item.min_price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No additional benefits available for{" "}
                  {selectedInsurance.company_name}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        zitakuwa hapa total premium + (excess values)
        <div className="flex justify-between gap-2 text-blue-500 hover:text-blue-600 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm"
          >
            <FaChevronLeft size={15} />
            Back
          </button>
          <button
            onClick={() => {
              alert("go to ayment"), sendData(selectedItems);
            }}
            className="flex items-center gap-2 text-sm"
          >
            Send
            <FaChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
