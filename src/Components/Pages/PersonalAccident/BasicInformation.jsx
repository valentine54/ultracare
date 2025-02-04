import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../PersonalAccident/Header";
import Stepper from "../PersonalAccident/Stepper";
import { ChevronDown } from "lucide-react";
import { usePersonalAccident } from "../../Context/PersonalAccidentContext";
import PhoneInputField from "../../PhoneInputField";

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

  // Form Data - Single State
  const [form, setForm] = useState(() => ({
    fullName: formData.basicInfo?.fullName || "",
    dateOfBirth: formData.basicInfo?.dateOfBirth || "",
    id: formData.basicInfo?.id || "",
    occupation: formData.basicInfo?.occupation || "",
    customOccupation: formData.basicInfo?.customOccupation || "",
    contactNumber: formData.basicInfo?.contactNumber || "",
    gender: formData.basicInfo?.gender || "",
    customGender: formData.basicInfo?.customGender || "",
    desiredCoverage: formData.basicInfo?.desiredCoverage || "",
    typeOfCoverage: formData.basicInfo?.typeOfCoverage || "",
    customCoverage: formData.basicInfo?.customCoverage || "",
    travelCoverage: formData.basicInfo?.travelCoverage || "",
    existingCoverage: formData.basicInfo?.existingCoverage || "",
  }));

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setForm((prev) => ({
      ...prev,
      contactNumber: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    if (!form.fullName) newErrors.fullName = "Required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Required";
    if (!form.id) newErrors.id = "Required";
    if (!form.occupation) newErrors.occupation = "Required";
    if (!form.contactNumber) {
      newErrors.contactNumber = "Required";
    } else if (form.contactNumber.length < 10) {
      newErrors.contactNumber = "Please enter a valid phone number";
    }
    if (!form.gender) newErrors.gender = "Required";
    if (!form.desiredCoverage) newErrors.desiredCoverage = "Required";
    if (!form.typeOfCoverage) newErrors.typeOfCoverage = "Required";
    if (!form.travelCoverage) newErrors.travelCoverage = "Required";
    if (!form.existingCoverage) newErrors.existingCoverage = "Required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      updateFormData("basicInfo", form);
      navigate("/personal-accident/health-lifestyle");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <Stepper currentStep={1} />

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {/* Full Name */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Date of Birth - Modern Style */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  name="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  } appearance-none bg-white cursor-pointer hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors`}
                  style={{
                    colorScheme: "light",
                  }}
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            {/* ID */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                ID <span className="text-red-500">*</span>
              </label>
              <input
                name="id"
                type="text"
                value={form.id}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.id ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your ID number"
              />
              {errors.id && (
                <p className="mt-1 text-sm text-red-500">{errors.id}</p>
              )}
            </div>

            {/* Occupation */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Occupation <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.occupation ? "border-red-500" : "border-gray-300"
                  } appearance-none`}
                >
                  <option value="">Select occupation</option>
                  {occupations.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {form.occupation === "Other" && (
                <input
                  name="customOccupation"
                  type="text"
                  value={form.customOccupation}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              )}
              {errors.occupation && (
                <p className="mt-1 text-sm text-red-500">{errors.occupation}</p>
              )}
            </div>

            {/* Contact Number with PhoneInputField */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <PhoneInputField
                value={form.contactNumber}
                onChange={handlePhoneChange}
                error={errors.contactNumber}
              />
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                {["Male", "Female", "Other"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={form.gender === option}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
              {form.gender === "Other" && (
                <input
                  name="customGender"
                  type="text"
                  value={form.customGender}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              )}
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
              )}
            </div>

            {/* Desired Coverage Amount */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Desired Coverage Amount <span className="text-red-500">*</span>
              </label>
              <input
                name="desiredCoverage"
                type="text"
                value={form.desiredCoverage}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.desiredCoverage ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter desired coverage amount"
              />
              {errors.desiredCoverage && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.desiredCoverage}
                </p>
              )}
            </div>

            {/* Type of Coverage */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Type of Coverage <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="typeOfCoverage"
                  value={form.typeOfCoverage}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.typeOfCoverage ? "border-red-500" : "border-gray-300"
                  } appearance-none`}
                >
                  <option value="">Select coverage type</option>
                  {coverageTypes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {form.typeOfCoverage === "Other" && (
                <input
                  name="customCoverage"
                  type="text"
                  value={form.customCoverage}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              )}
              {errors.typeOfCoverage && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.typeOfCoverage}
                </p>
              )}
            </div>

            {/* Travel Coverage */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Do you require coverage for travel-related accidents?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="travelCoverage"
                      value={option}
                      checked={form.travelCoverage === option}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
              {errors.travelCoverage && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.travelCoverage}
                </p>
              )}
            </div>

            {/* Existing Coverage */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Are you currently covered by any other personal accident
                insurance? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="existingCoverage"
                      value={option}
                      checked={form.existingCoverage === option}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
              {errors.existingCoverage && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.existingCoverage}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="w-48 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicInformation;