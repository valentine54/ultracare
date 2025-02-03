import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../PersonalAccident/Header";
import Stepper from "../PersonalAccident/Stepper";
import { ChevronDown } from "lucide-react";
import { usePersonalAccident } from "../../Context/PersonalAccidentContext";

const occupations = [
  "Software Engineer",
  "Doctor",
  "Teacher",
  "Business Owner",
  "Accountant",
  "Lawyer",
  "Sales Professional",
  "Construction Worker",
  "Chef",
  "Artist",
  "Other",
];

const coverageTypes = [
  "Individual Coverage",
  "Family Coverage",
  "Business Travel Coverage",
  "Sports Coverage",
  "International Coverage",
  "Other",
];

const BasicInformation = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = usePersonalAccident();

  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    id: "",
    occupation: "",
    customOccupation: "",
    contactNumber: "",
    gender: "",
    customGender: "",
    desiredCoverage: "",
    typeOfCoverage: "",
    customCoverage: "",
    travelCoverage: "",
    existingCoverage: "",
  });

  const [errors, setErrors] = useState({});

  // Load saved data
  useEffect(() => {
    if (formData.basicInfo && Object.keys(formData.basicInfo).length > 0) {
      setForm(formData.basicInfo);
    }
  }, [formData.basicInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!form.id) newErrors.id = "ID is required";
    if (!form.occupation) newErrors.occupation = "Occupation is required";
    if (!form.contactNumber)
      newErrors.contactNumber = "Contact number is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.desiredCoverage)
      newErrors.desiredCoverage = "Coverage amount is required";
    if (!form.typeOfCoverage)
      newErrors.typeOfCoverage = "Type of coverage is required";
    if (!form.travelCoverage)
      newErrors.travelCoverage = "Travel coverage selection is required";
    if (!form.existingCoverage)
      newErrors.existingCoverage = "Existing coverage selection is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      updateFormData("basicInfo", form);
      navigate("/personal-accident/health-lifestyle");
    }
  };

  const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
  }) => (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  const SelectField = ({ label, name, options, required = false }) => (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={form[name]}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors[name] ? "border-red-500" : "border-gray-300"
          } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none`}
        >
          <option value="">Please select...</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {form[name] === "Other" && (
        <input
          type="text"
          name={`custom${name.charAt(0).toUpperCase() + name.slice(1)}`}
          value={
            form[`custom${name.charAt(0).toUpperCase() + name.slice(1)}`] || ""
          }
          onChange={handleChange}
          placeholder="Please specify"
          className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
          focus:ring-2 focus:ring-blue-200"
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  const RadioGroup = ({ label, name, options, required = false }) => (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-6">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option}
              checked={form[name] === option}
              onChange={handleChange}
              className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
      {form[name] === "Other" && (
        <input
          type="text"
          name={`custom${name.charAt(0).toUpperCase() + name.slice(1)}`}
          value={
            form[`custom${name.charAt(0).toUpperCase() + name.slice(1)}`] || ""
          }
          onChange={handleChange}
          placeholder="Please specify"
          className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
          focus:ring-2 focus:ring-blue-200"
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <Stepper currentStep={1} />

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <InputField
              label="Full Name"
              name="fullName"
              placeholder="First, second, last"
              required
            />

            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              required
            />

            <InputField label="ID" name="id" placeholder="34562345" required />

            <SelectField
              label="Occupation"
              name="occupation"
              options={occupations}
              required
            />

            <InputField
              label="Contact Number"
              name="contactNumber"
              placeholder="+254783056"
              required
            />

            <RadioGroup
              label="Gender"
              name="gender"
              options={["Male", "Female", "Other"]}
              required
            />

            <InputField
              label="Desired Coverage Amount"
              name="desiredCoverage"
              placeholder="50,000"
              required
            />

            <SelectField
              label="Type of Coverage"
              name="typeOfCoverage"
              options={coverageTypes}
              required
            />

            <RadioGroup
              label="Do you require coverage for travel-related accidents?"
              name="travelCoverage"
              options={["Yes", "No"]}
              required
            />

            <RadioGroup
              label="Are you currently covered by any other personal accident insurance?"
              name="existingCoverage"
              options={["Yes", "No"]}
              required
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              className="w-48 bg-blue-500 hover:bg-blue-600 text-white font-semibold 
              py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
