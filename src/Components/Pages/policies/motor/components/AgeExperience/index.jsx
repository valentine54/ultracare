import React from "react";
import { motion } from "framer-motion";
import { Users, AlertCircle } from "lucide-react";
import { useMotorForm } from "../../context/MotorFormContext";

import { Additionalcharge } from "../../../../../helper/insurances";
import { setMotorPolicy } from "../../../../../store/actions/appAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AgeExperienceStep = ({ handleNext }) => {
  const { formData, updateFormData } = useMotorForm();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateDriverRequirements = (field, value) => {
    updateFormData({
      driverRequirements: {
        ...formData.driverRequirements,
        [field]: value,
      },
    });
  };

  const updateLoading = (field, value) => {
    updateFormData({
      driverRequirements: {
        ...formData.driverRequirements,
        loadings: {
          ...(formData.driverRequirements?.loadings || {}),
          [field]: value,
        },
      },
    });
  };

  const handleSubmit = async () => {
    const data = {
      is_under_21: formData.driverRequirements.is_under_21,
      is_unexperienced: formData.driverRequirements?.is_unexperienced,
    };
    const res = await Additionalcharge(data);
    console.log(res);
    if (res.status === 201) {
      if (userData.loggedIn) {
        dispatch(setMotorPolicy(formData));
        setTimeout(() => {
          navigate("/policies/motor");
        }, [3000]);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Age Requirements */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium">Driver Age SetUp</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Driver Age
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={formData.driverRequirements?.is_under_21 || ""}
                onChange={(e) =>
                  updateDriverRequirements("is_under_21", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 18"
              />
            </div>
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loading Amount for Young Drivers (KSH)
            </label>
            <input
              type="number"
              value={formData.driverRequirements?.loadings?.youngDriver || ""}
              onChange={(e) => updateLoading("youngDriver", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 5000"
            />
          </div> */}
        </div>
      </div>

      {/* Experience Requirements */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium">Experience Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Years of Experience
            </label>
            <input
              type="number"
              value={formData.driverRequirements?.is_unexperienced || ""}
              onChange={(e) =>
                updateDriverRequirements("is_unexperienced", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 2"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loading Amount for Inexperienced Drivers (KSH)
            </label>
            <input
              type="number"
              value={formData.driverRequirements?.loadings?.inexperienced || ""}
              onChange={(e) => updateLoading("inexperienced", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 5000"
            />
          </div> */}
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-medium text-gray-900 mb-4">
          Configuration Summary
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Minimum Age Required :</span>
            <span className="font-medium">
              {formData.driverRequirements?.is_under_21 || "-"} years
            </span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-gray-600">Young Driver :</span>
            <span className="font-medium">
              KSH {formData.driverRequirements?.loadings?.youngDriver || "-"}
            </span>
          </div> */}
          <div className="flex justify-between">
            <span className="text-gray-600">Minimum Experience Required :</span>
            <span className="font-medium">
              {formData.driverRequirements?.is_unexperienced || "-"} years
            </span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-gray-600">Inexperienced Driver :</span>
            <span className="font-medium">
              KSH {formData.driverRequirements?.loadings?.inexperienced || "-"}
            </span>
          </div> */}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
      >
        Continue
      </button>
    </div>
  );
};

export default AgeExperienceStep;
