import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { vehicleMakes } from "../../Constants/VehicleData";


// Insurance cover types with comprehensive descriptions
const coverTypes = [
  {
    value: "comprehensive",
    label: "Comprehensive Cover",
    description: "Full coverage for your vehicle, third party, fire, and theft",
  },
  {
    value: "thirdParty",
    label: "Third Party Only",
    description: "Basic coverage for damage to other vehicles and property",
  },
  {
    value: "thirdPartyFireTheft",
    label: "Third Party, Fire & Theft",
    description:
      "Coverage for third party damage plus fire and theft protection",
  },
  {
    value: "personalAccident",
    label: "Personal Accident Cover",
    description:
      "Additional coverage for personal injuries and medical expenses",
  },
];

// Standard vehicle classifications
const vehicleTypes = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV / Crossover" },
  { value: "hatchback", label: "Hatchback" },
  { value: "wagon", label: "Station Wagon" },
  { value: "coupe", label: "Coupe" },
  { value: "convertible", label: "Convertible" },
  { value: "pickup", label: "Pickup Truck" },
  { value: "van", label: "Van" },
  { value: "minivan", label: "Minivan" },
  { value: "motorcycle", label: "Motorcycle" },
];

// Enhanced select component styling
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

const GetQuote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMake, setSelectedMake] = useState(null);
  const [models, setModels] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation and submission handling
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submission initiated");
    setIsSubmitting(true);

    try {
      // Validate all form fields
      const errors = await formik.validateForm();

      if (Object.keys(errors).length === 0) {
        console.log("Validation passed, proceeding with submission");

        const formattedValues = {
          ...formik.values,
          vehicleValue: Number(formik.values.vehicleValue),
          quoteRequestDate: new Date().toISOString(),
          referenceNumber: `QT-${Date.now().toString().slice(-6)}`,
        };

        // Navigate to quote list with formatted values
        navigate("/quote-list", {
          state: formattedValues,
          replace: true,
        });
      } else {
        console.log("Validation failed:", errors);
        // Touch all fields to display validation errors
        Object.keys(formik.values).forEach((key) => {
          formik.setFieldTouched(key, true);
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      idNumber: "",
      coverType: "",
      vehicleValue: "",
      vehicleRegistration: "",
      coverStartDate: format(new Date(), "yyyy-MM-dd"),
      vehicleType: "",
      vehicleMake: "",
      vehicleModel: "",
      hasBeenValued: "yes",
    },
    validationSchema: Yup.object({
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
      vehicleMake: Yup.string().required("Vehicle make is required"),
      vehicleModel: Yup.string().required("Vehicle model is required"),
    }),
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        vehicleValue: Number(values.vehicleValue),
        quoteRequestDate: new Date().toISOString(),
        referenceNumber: `QT-${Date.now().toString().slice(-6)}`,
      };

      navigate("/quote-list", {
        state: formattedValues,
      });
    },
  });

  // Form state preservation warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (formik.dirty && !formik.isSubmitting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formik.dirty, formik.isSubmitting]);

  // Debug logging for form state changes
  useEffect(() => {
    console.log("Form values updated:", formik.values);
  }, [formik.values]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-center text-3xl font-semibold text-blue-500 mb-8">
          Get Your Car Insurance Quote
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type
                  </label>
                  <Select
                    options={vehicleTypes}
                    styles={customSelectStyles}
                    placeholder="Select vehicle type"
                    onChange={(option) =>
                      formik.setFieldValue("vehicleType", option.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Make
                  </label>
                  <Select
                    options={vehicleMakes}
                    styles={customSelectStyles}
                    placeholder="Select vehicle make"
                    onChange={(option) => {
                      setSelectedMake(option);
                      setModels(option.models);
                      formik.setFieldValue("vehicleMake", option.value);
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Model
                  </label>
                  <Select
                    options={models}
                    styles={customSelectStyles}
                    placeholder="Select vehicle model"
                    isDisabled={!selectedMake}
                    onChange={(option) =>
                      formik.setFieldValue("vehicleModel", option.value)
                    }
                  />
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
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default GetQuote;
