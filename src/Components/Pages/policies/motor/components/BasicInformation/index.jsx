import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Building2, FileText, X } from "lucide-react";
import { useMotorForm } from "../../context/MotorFormContext";
import {UploadMotorInsurance} from '../../../../../helper/insurances'
const BasicInformationStep = ({ setValidateStep }) => {
  const { formData, updateFormData } = useMotorForm();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      updateFormData({ companyLogo: file });
    }
  };

  const handleRemoveLogo = () => {
    setPreviewUrl(null);
    updateFormData({ companyLogo: null });
  };
  const handleSubmit = () => {
    if (validate()) {
      handleNext(); // Proceed to the next step
    }
  };


  useEffect(() => {
    setValidateStep(() => validate);
  }, [setValidateStep, formData]);


const validate = async () => {
  let newErrors = {};

  // Check for missing fields
  if (!formData.title) {
    newErrors.title = "Policy title is required.";
  }
  if (!formData.description) {
    newErrors.description = "Policy description is required.";
  }
  if (!formData.company_name) {
    newErrors.company_name = "Company name is required.";
  }

  // Update state with errors
  setErrors(newErrors);

  // Stop execution if there are validation errors
  if (Object.keys(newErrors).length > 0) {
    return false;
  }

  // Prepare form data for submission
  const formData2 = {
    title: formData.title,
    description: formData.description,
    company_name: formData.company_name,
  };

  try {
    await UploadMotorInsurance(formData2);
    console.log("Data successfully sent to the backend!");
    return true;
  } catch (error) {
    console.error("Error sending data:", error);
    return false;
  }
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-4 space-y-4"
    >
      <div className="grid gap-4">
        {/* Company Information Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Company Information
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Company Name Input */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Insurance Company Name
              </label>
              <input
                type="text"
                value={formData.company_name || ""}
                onChange={(e) =>
                  updateFormData({ company_name: e.target.value })
                }
                className={`w-full p-2 border ${
                  errors.company_name ? "border-red-500" : "border-gray-200"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="Enter insurance company name"
              />
              {errors.company_name && (
                <p className="text-red-500 text-sm">{errors.company_name}</p>
              )}
            </div>

            {/* Logo Upload */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Company Logo
              </label>
              <div className="relative h-[90px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                {previewUrl ? (
                  <div className="relative w-full h-full p-2 flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt="Company logo preview"
                      className="max-h-full object-contain"
                    />
                    <button
                      onClick={handleRemoveLogo}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-2">
                    <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                    <div className="flex flex-col gap-0.5">
                      <label className="cursor-pointer">
                        <span className="text-sm font-medium text-blue-500 hover:text-blue-600">
                          Upload a file
                        </span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                      </label>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Policy Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Policy Information
            </h3>
          </div>

          <div className="grid gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Policy Title
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) => updateFormData({ title: e.target.value })}
                className={`w-full p-2 border ${
                  errors.title ? "border-red-500" : "border-gray-200"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="Enter policy title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Policy Description
              </label>
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  updateFormData({ description: e.target.value })
                }
                rows={3}
                className={`w-full p-2 border ${
                  errors.description ? "border-red-500" : "border-gray-200"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="Enter policy description"
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h4 className="text-base font-semibold text-gray-800 mb-3">
            Information Summary
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Company Name</span>
              <span className="font-medium text-gray-900">
                {formData.company_name || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Logo</span>
              <span className="font-medium text-gray-900">
                {formData.companyLogo ? "Uploaded" : "Not uploaded"}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Policy Title</span>
              <span className="font-medium text-gray-900">
                {formData.title || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Description</span>
              <span className="font-medium text-gray-900">
                {formData.description || "Not provided"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BasicInformationStep;
