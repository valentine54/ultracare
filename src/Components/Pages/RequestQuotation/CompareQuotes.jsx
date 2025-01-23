import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestQuotation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    occupation: "",
    ageGroup: "",
    coverageType: "",
    medicalConditions: "",
    preferredCoverage: "",
    selfEmployed: "",
    highRiskActivities: "",
    sumInsured: "",
    travelFrequency: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call - fetch quotes
      const response = await fetch("/api/quotes/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const quotes = await response.json();
        // To comparison page with the quotes data
        navigate("/compare-quotes", { state: { quotes } });
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      // Error Handling
    }
  };

  const formFields = [
    { name: "occupation", label: "Tell us about your occupation" },
    { name: "ageGroup", label: "What is your age group?" },
    { name: "coverageType", label: "What type of coverage do you prefer?" },
    {
      name: "medicalConditions",
      label: "Do you have any pre-existing medical conditions?",
    },
    {
      name: "preferredCoverage",
      label: "What type of coverage do you prefer?",
    },
    { name: "selfEmployed", label: "Are you self-employed?" },
    {
      name: "highRiskActivities",
      label: "Do you participate in any high-risk activities?",
    },
    { name: "sumInsured", label: "What is your preferred sum insured?" },
    {
      name: "travelFrequency",
      label: "How often do you travel for work or leisure?",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Personal Accident Insurance Questions
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map((field) => (
              <div key={field.name} className="flex flex-col">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {field.label}
                </label>
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Please select...</option>
                  {/* Options */}
                </select>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200"
            >
              Compare quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestQuotation;
