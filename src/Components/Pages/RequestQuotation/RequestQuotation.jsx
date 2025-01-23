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

  const formOptions = {
    occupation: [
      "Professional",
      "Manager",
      "Technical",
      "Sales",
      "Administrative",
      "Skilled Worker",
      "Manual Labor",
      "Other",
    ],
    ageGroup: ["18-25", "26-35", "36-45", "46-55", "56-65", "65+"],
    coverageType: ["Basic", "Standard", "Premium", "Custom"],
    medicalConditions: ["None", "Minor", "Chronic", "Multiple"],
    selfEmployed: ["Yes", "No"],
    highRiskActivities: ["None", "Occasional", "Regular", "Professional"],
    sumInsured: [
      "£10,000",
      "£25,000",
      "£50,000",
      "£100,000",
      "£250,000",
      "£500,000",
    ],
    travelFrequency: [
      "Rarely",
      "Occasionally",
      "Frequently",
      "Very Frequently",
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form
    const isFormValid = Object.values(formData).every((value) => value !== "");

    if (!isFormValid) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Simulate API call
      // In reality, this would be your actual API endpoint
      const quotes = [
        {
          provider: "Insurance Co A",
          price: "£45/month",
          coverage: "Standard",
        },
        { provider: "Insurance Co B", price: "£52/month", coverage: "Premium" },
        { provider: "Insurance Co C", price: "£38/month", coverage: "Basic" },
      ];

      // Navigate to comparison page with quotes
      navigate("/compare-quotes", { state: { quotes } });
    } catch (error) {
      console.error("Error fetching quotes:", error);
      alert("Error fetching quotes. Please try again.");
    }
  };

  // ... rest of the component remains the same as before
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
            {Object.entries(formOptions).map(([field, options]) => (
              <div key={field} className="flex flex-col">
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {field.split(/(?=[A-Z])/).join(" ")}
                </label>
                <select
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Please select...</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
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
