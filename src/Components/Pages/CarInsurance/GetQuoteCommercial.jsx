import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const API_KEY = "e4204b2c-3cf9-45e8-8837-db3a37121de5";
const API_URL = "http://127.0.0.1:8000/api/v1.0/";

// Insurance cover types
const coverTypes = [
  {
    value: "Comprehensive",
    label: "Comprehensive Cover",
    description: "Full coverage for your vehicle, third party, fire, and theft",
  },
  {
    value: "Third Party",
    label: "Third Party Only",
    description: "Basic coverage for damage to other vehicles and property",
  },
  {
    value: "Third Party Fire and Theft",
    label: "Third Party, Fire & Theft",
    description: "Coverage for third party damage plus fire and theft protection",
  },
];

const vehicleTypes = [
  { value: "pickup", label: "Pickup (Single Cabin)" },
  { value: "small_truck", label: "Small Truck" },
  { value: "trailer", label: "Trailer" },
  { value: "matatu", label: "Matatu" },
  { value: "bus", label: "Bus" },
  { value: "saloon", label: "Saloon" },
  { value: "prime_mover", label: "Prime Mover" },
  { value: "tanker", label: "Tanker" },
];

const riskClassTypes = [
  { value: "general_cartage", label: "General Cartage" },
  { value: "institutional_vehicle", label: "Institutional Vehicle" },
  { value: "online_taxi", label: "Online Taxi" },
  { value: "own_goods", label: "Own Goods" },
  { value: "other", label: "Other" },
];

const otherRiskTypes = [
  { value: "agricultural", label: "Agricultural & Forestry Vehicles" },
  { value: "ambulance", label: "Ambulance Hearse & Firefighters" },
  { value: "chauffer", label: "Chauffer Driven" },
  { value: "construction", label: "Construction Vehicles" },
  { value: "driving_schools", label: "Driving Schools" },
  { value: "prime_mover", label: "Prime Mover" },
  { value: "tractors", label: "Tractors" },
];

const tonnageOptions = [
  { value: "1-3", label: "1-3 Tonnes" },
  { value: "3-8", label: "3-8 Tonnes" },
  { value: "8-12", label: "8-12 Tonnes" },
  { value: "12-15", label: "12-15 Tonnes" },
  { value: "15-20", label: "15-20 Tonnes" },
  { value: "20-25", label: "20-25 Tonnes" },
  { value: "25-30", label: "25-30 Tonnes" },
  { value: "30+", label: "30+ Tonnes" },
  { value: "8+", label: "8+ Tonnes" },
];

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "48px",
    borderRadius: "0.75rem",
    borderColor: state.isFocused ? "#3B82F6" : "#E5E7EB",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.1)" : "none",
    "&:hover": {
      borderColor: "#3B82F6",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.75rem",
    overflow: "hidden",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #E5E7EB",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3B82F6"
      : state.isFocused
      ? "#EFF6FF"
      : "white",
    color: state.isSelected ? "white" : "#374151",
    cursor: "pointer",
    ":active": {
      backgroundColor: "#3B82F6",
    },
  }),
};

const GetQuoteCommercial = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const [showOtherRiskClass, setShowOtherRiskClass] = useState(false);
  const [showTonnage, setShowTonnage] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      idNumber: "",
      coverType: "",
      vehicleValue: "",
      vehicleRegistration: "",
      coverStartDate: new Date().toISOString().split("T")[0],
      vehicleType: "",
      riskClass: "",
      otherRiskClass: "",
      tonnage: "",
      numberOfPassengers: "",
      hasBeenValued: "yes",
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      idNumber: Yup.string().required("ID number is required"),
      coverType: Yup.string().required("Cover type is required"),
      vehicleValue: Yup.number()
        .required("Vehicle value is required")
        .positive("Must be a positive value"),
      vehicleRegistration: Yup.string().required(
        "Vehicle registration is required"
      ),
      coverStartDate: Yup.date()
        .required("Start date is required")
        .min(new Date(), "Date cannot be in the past"),
      vehicleType: Yup.string().required("Vehicle type is required"),
      riskClass: Yup.string().required("Risk class is required"),
      otherRiskClass: Yup.string().when("riskClass", {
        is: "other",
        then: () => Yup.string().required("Other risk class is required"),
        otherwise: () => Yup.string(),
      }),
      tonnage: Yup.string().when("vehicleType", {
        is: (type) =>
          !["trailer", "bus", "matatu", "prime_mover", "tanker"].includes(type),
        then: () => Yup.string().required("Tonnage is required"),
        otherwise: () => Yup.string(),
      }),
      numberOfPassengers: Yup.number().when("vehicleType", {
        is: (type) => ["matatu", "bus", "saloon"].includes(type),
        then: () =>
          Yup.number()
            .required("Number of passengers is required")
            .positive("Must be a positive number")
            .integer("Must be a whole number"),
        otherwise: () => Yup.number(),
      }),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const [first_name, ...lastNameParts] = values.fullName.split(" ");
        const last_name = lastNameParts.join(" ");

        const formattedValues = {
          ...location?.state,
          first_name: first_name || "",
          last_name: last_name || "",
          email: values.email,
          id_no: values.idNumber,
          vehicle_type: values.vehicleType,
          vehicle_registration_number: values.vehicleRegistration,
          cover_type: values.coverType,
          vehicle_value: Number(values.vehicleValue),
          cover_start_date: values.coverStartDate,
          evaluated: values.hasBeenValued === "yes",
          risk_class:
            values.riskClass === "other"
              ? values.otherRiskClass
              : values.riskClass,
          tonnage: values.tonnage,
          number_of_passengers: values.numberOfPassengers,
        };

        const response = await axios.post(
          `${API_URL}applicant/motor_session/`,
          formattedValues,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
          }
        );

        if (response.status === 201) {
          const response_data = await axios.get(
            `${API_URL}motorinsurance/filter/`,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
              },
            }
          );

          if (response_data.status === 200) {
            navigate("/quote-list", {
              state: {
                server_response: response_data?.data,
                quoteData: formattedValues,
              },
            });
          }
        }
      } catch (error) {
        console.error("Submission error:", error.response);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Handle vehicle conditional fields
  useEffect(() => {
    const type = formik.values.vehicleType;
    setShowTonnage(
      !["trailer", "bus", "matatu", "prime_mover", "tanker"].includes(type)
    );
    setShowPassengers(["matatu", "bus", "saloon"].includes(type));
  }, [formik.values.vehicleType]);

  // Handle risk class - other
  useEffect(() => {
    setShowOtherRiskClass(formik.values.riskClass === "other");
  }, [formik.values.riskClass]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-center text-3xl font-semibold text-blue-500 mb-8">
          Get Your Commercial Vehicle Insurance Quote
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={formik.handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-900 pb-2 border-b">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    {...formik.getFieldProps("fullName")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...formik.getFieldProps("email")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID Number
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    {...formik.getFieldProps("idNumber")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your ID number"
                  />
                  {formik.touched.idNumber && formik.errors.idNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.idNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Vehicle Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-900 pb-2 border-b">
                Vehicle Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Type
                  </label>
                  <Select
                    options={coverTypes}
                    styles={customSelectStyles}
                    placeholder="Select cover type"
                    onChange={(option) =>
                      formik.setFieldValue("coverType", option.value)
                    }
                    formatOptionLabel={({ label, description }) => (
                      <div>
                        <div className="font-medium">{label}</div>
                        <div className="text-xs text-gray-500">
                          {description}
                        </div>
                      </div>
                    )}
                  />
                  {formik.touched.coverType && formik.errors.coverType && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.coverType}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type
                  </label>
                  <Select
                    options={vehicleTypes}
                    styles={customSelectStyles}
                    placeholder="Select vehicle type"
                    onChange={(option) => {
                      formik.setFieldValue("vehicleType", option.value);
                      // Reset related fields
                      formik.setFieldValue("tonnage", "");
                      formik.setFieldValue("numberOfPassengers", "");
                    }}
                  />
                  {formik.touched.vehicleType && formik.errors.vehicleType && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.vehicleType}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Risk Class
                  </label>
                  <Select
                    options={riskClassTypes}
                    styles={customSelectStyles}
                    placeholder="Select risk class"
                    onChange={(option) => {
                      formik.setFieldValue("riskClass", option.value);
                      if (option.value !== "other") {
                        formik.setFieldValue("otherRiskClass", "");
                      }
                    }}
                  />
                  {formik.touched.riskClass && formik.errors.riskClass && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.riskClass}
                    </p>
                  )}
                </div>

                {showOtherRiskClass && (
                  <div className="animate-fadeIn">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Other Risk Class Type
                    </label>
                    <Select
                      options={otherRiskTypes}
                      styles={customSelectStyles}
                      placeholder="Select other risk class type"
                      onChange={(option) =>
                        formik.setFieldValue("otherRiskClass", option.value)
                      }
                    />
                    {formik.touched.otherRiskClass &&
                      formik.errors.otherRiskClass && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.otherRiskClass}
                        </p>
                      )}
                  </div>
                )}

                {showTonnage && (
                  <div className="animate-fadeIn">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tonnage
                    </label>
                    <Select
                      options={tonnageOptions}
                      styles={customSelectStyles}
                      placeholder="Select tonnage"
                      onChange={(option) =>
                        formik.setFieldValue("tonnage", option.value)
                      }
                    />
                    {formik.touched.tonnage && formik.errors.tonnage && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.tonnage}
                      </p>
                    )}
                  </div>
                )}

                {showPassengers && (
                  <div className="animate-fadeIn">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Passengers
                    </label>
                    <input
                      type="number"
                      name="numberOfPassengers"
                      {...formik.getFieldProps("numberOfPassengers")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter number of passengers"
                    />
                    {formik.touched.numberOfPassengers &&
                      formik.errors.numberOfPassengers && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.numberOfPassengers}
                        </p>
                      )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Registration
                  </label>
                  <input
                    type="text"
                    name="vehicleRegistration"
                    {...formik.getFieldProps("vehicleRegistration")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter vehicle registration"
                  />
                  {formik.touched.vehicleRegistration &&
                    formik.errors.vehicleRegistration && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.vehicleRegistration}
                      </p>
                    )}
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-900 pb-2 border-b">
                Additional Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Value (KES)
                  </label>
                  <input
                    type="number"
                    name="vehicleValue"
                    {...formik.getFieldProps("vehicleValue")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter vehicle value"
                  />
                  {formik.touched.vehicleValue &&
                    formik.errors.vehicleValue && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.vehicleValue}
                      </p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Start Date
                  </label>
                  <input
                    type="date"
                    name="coverStartDate"
                    {...formik.getFieldProps("coverStartDate")}
                    min={format(new Date(), "yyyy-MM-dd")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {formik.touched.coverStartDate &&
                    formik.errors.coverStartDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.coverStartDate}
                      </p>
                    )}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate("/car-insurance")}
                  className="px-8 py-3 bg-white border-2 border-blue-400 text-blue-500 rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center space-x-2 font-medium"
                >
                  <svg
                    className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span>Back</span>
                </button>
                {/* <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    console.log("Saving draft...");
                  }}
                  className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-600 rounded-xl hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Save Draft
                </button> */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formik.isValid}
                  className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow-md"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Processing...</span>
                    </span>
                  ) : (
                    "Get Quote"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default GetQuoteCommercial;