import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useInsuranceForm } from "../../Context/InsuranceFormContext";
import PersonalAccidentHeader from "../../PersonalAccidentHeader";
import ProgressStepper from "../../ProgressStepper";
import {
  FORM_STEPS,
  OCCUPATION_OPTIONS,
  COVERAGE_TYPES,
} from "../../Constants/insuranceFormConfig";

const occupations = [
  'Accountant', 'Architect', 'Doctor', 'Engineer', 'Lawyer',
  'Teacher', 'Business Owner', 'Sales Professional', 'IT Professional',
  'Healthcare Worker', 'Government Employee', 'Student', 'Retired', 'Other'
];

const coverageTypes = [
  '24-Hour Coverage',
  'Working Hours Only',
  'Off-Work Hours Only',
  'Specified Activities'
];

const BasicInformationForm = () => {
  const navigate = useNavigate();
  const { updateStepData, setStepCompleted, getStepData } = useInsuranceForm();
  
  const [formData, setFormData] = useState(getStepData(FORM_STEPS.BASIC_INFO) || {
    fullName: '',
    dateOfBirth: '',
    id: '',
    occupation: '',
    contactNumber: '',
    gender: '',
    desiredCoverage: '',
    typeOfCoverage: '',
    travelCoverage: '',
    existingCoverage: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    let fieldError = '';
    switch (name) {
      case 'fullName':
        if (!value.trim()) fieldError = 'Full name is required';
        else if (!/^[a-zA-Z\s]{2,50}$/.test(value.trim())) 
          fieldError = 'Please enter a valid name';
        break;
      case 'dateOfBirth':
        if (!value) fieldError = 'Date of birth is required';
        else {
          const age = new Date().getFullYear() - new Date(value).getFullYear();
          if (age < 18) fieldError = 'Must be at least 18 years old';
          if (age > 70) fieldError = 'Maximum age is 70 years';
        }
        break;
      case 'id':
        if (!value.trim()) fieldError = 'ID is required';
        else if (!/^\d{8,12}$/.test(value.trim())) 
          fieldError = 'Please enter a valid ID number';
        break;
      case 'contactNumber':
        if (!value.trim()) fieldError = 'Contact number is required';
        else if (!/^\+?\d{10,15}$/.test(value.trim())) 
          fieldError = 'Please enter a valid contact number';
        break;
      case 'desiredCoverage':
        if (!value) fieldError = 'Coverage amount is required';
        else if (isNaN(value) || value < 10000 || value > 1000000) 
          fieldError = 'Amount must be between 10,000 and 1,000,000';
        break;
      case 'existingCoverage':
        if (!value) fieldError = 'Please select whether you have existing coverage';
        break;
      case 'travelCoverage':
        if (!value) fieldError = 'Please select whether you need travel coverage';
        break;
      case 'typeOfCoverage':
        if (!value) fieldError = 'Please select coverage type';
        break;
      case 'gender':
        if (!value) fieldError = 'Please select gender';
        break;
      case 'occupation':
        if (!value) fieldError = 'Please select your occupation';
        break;
      default:
        if (!value) fieldError = `${name.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
    }
    return fieldError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);

    const allFields = Object.keys(formData);
    const touchedFields = {};
    allFields.forEach(field => touchedFields[field] = true);
    setTouched(touchedFields);

    const formErrors = {};
    allFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) formErrors[field] = error;
    });
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      updateStepData(FORM_STEPS.BASIC_INFO, formData);
      setStepCompleted(FORM_STEPS.BASIC_INFO);
      navigate('/personal-accident/health');
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonalAccidentHeader />
      <ProgressStepper currentStep={1} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="fullName" className={labelClasses}>
                Full Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="First, middle, last"
                className={`${inputClasses} ${errors.fullName ? 'border-red-500' : ''}`}
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.fullName && <p className={errorClasses}>{errors.fullName}</p>}
            </motion.div>

            {/* Date of Birth */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="dateOfBirth" className={labelClasses}>
                Date of Birth: <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className={`${inputClasses} ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                value={formData.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.dateOfBirth && <p className={errorClasses}>{errors.dateOfBirth}</p>}
            </motion.div>

            {/* ID */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="id" className={labelClasses}>
                ID: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="id"
                name="id"
                placeholder="Enter your ID number"
                className={`${inputClasses} ${errors.id ? 'border-red-500' : ''}`}
                value={formData.id}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.id && <p className={errorClasses}>{errors.id}</p>}
            </motion.div>

            {/* Occupation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="occupation" className={labelClasses}>
                Occupation: <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="occupation"
                  name="occupation"
                  className={`${inputClasses} appearance-none ${errors.occupation ? 'border-red-500' : ''}`}
                  value={formData.occupation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Please select...</option>
                  {occupations.map(occupation => (
                    <option key={occupation} value={occupation}>{occupation}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.occupation && <p className={errorClasses}>{errors.occupation}</p>}
            </motion.div>

            {/* Contact Number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="contactNumber" className={labelClasses}>
                Contact Number: <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                placeholder="+1234567890"
                className={`${inputClasses} ${errors.contactNumber ? 'border-red-500' : ''}`}
                value={formData.contactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.contactNumber && <p className={errorClasses}>{errors.contactNumber}</p>}
            </motion.div>

            {/* Gender */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <label className={labelClasses}>
                Gender: <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-6">
                {['Male', 'Female', 'Other'].map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className={errorClasses}>{errors.gender}</p>}
            </motion.div>

            {/* Desired Coverage Amount */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="desiredCoverage" className={labelClasses}>
                Desired Coverage Amount: <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="desiredCoverage"
                name="desiredCoverage"
                placeholder="Enter amount"
                min="10000"
                max="1000000"
                className={`${inputClasses} ${errors.desiredCoverage ? 'border-red-500' : ''}`}
                value={formData.desiredCoverage}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.desiredCoverage && <p className={errorClasses}>{errors.desiredCoverage}</p>}
            </motion.div>

            {/* Type of Coverage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <label htmlFor="typeOfCoverage" className={labelClasses}>
                Type of Coverage: <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="typeOfCoverage"
                  name="typeOfCoverage"
                  className={`${inputClasses} appearance-none ${errors.typeOfCoverage ? 'border-red-500' : ''}`}
                  value={formData.typeOfCoverage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Please select...</option>
                  {coverageTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.typeOfCoverage && <p className={errorClasses}>{errors.typeOfCoverage}</p>}
            </motion.div>
          </div>

          {/* Travel Coverage Question */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="space-y-2"
          >
            <label className={labelClasses}>
              Do you require coverage for travel-related accidents? <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-6">
              {['Yes', 'No'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="travelCoverage"
                    value={option}
                    checked={formData.travelCoverage === option}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors.travelCoverage && <p className={errorClasses}>{errors.travelCoverage}</p>}
          </motion.div>

          {/* Existing Coverage Question */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="space-y-2"
          >
            <label className={labelClasses}>
              Are you currently covered by any other personal accident insurance? <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-6">
              {['Yes', 'No'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="existingCoverage"
                    value={option}
                    checked={formData.existingCoverage === option}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors.existingCoverage && <p className={errorClasses}>{errors.existingCoverage}</p>}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex justify-center pt-6"
          >
            <button
              type="submit"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium
                hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200
                transform transition-all duration-200 hover:scale-105 active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => console.log('Button clicked', formData)}
            >
              Save & continue
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default BasicInformationForm;