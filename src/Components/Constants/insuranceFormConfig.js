// src/Components/Constants/insuranceFormConfig.js

export const FORM_STEPS = {
  BASIC_INFO: "basicInfo",
  HEALTH_LIFESTYLE: "healthLifestyle",
  QUOTE: "quote",
  PAYMENT: "payment",
};

export const STEP_CONFIG = [
  {
    id: 1,
    key: FORM_STEPS.BASIC_INFO,
    label: "Basic Information",
    path: "/personal-accident/basic-info",
  },
  {
    id: 2,
    key: FORM_STEPS.HEALTH_LIFESTYLE,
    label: "Health&Lifestyle",
    path: "/personal-accident/health",
  },
  {
    id: 3,
    key: FORM_STEPS.QUOTE,
    label: "Quote",
    path: "/personal-accident/quote",
  },
  {
    id: 4,
    key: FORM_STEPS.PAYMENT,
    label: "Payment",
    path: "/personal-accident/payment",
  },
];

export const INITIAL_FORM_STATE = {
  [FORM_STEPS.BASIC_INFO]: {
    fullName: "",
    dateOfBirth: "",
    id: "",
    occupation: "",
    contactNumber: "",
    gender: "",
    desiredCoverage: "",
    typeOfCoverage: "",
    travelCoverage: "",
    existingCoverage: "",
  },
  [FORM_STEPS.HEALTH_LIFESTYLE]: {},
  [FORM_STEPS.QUOTE]: {},
  [FORM_STEPS.PAYMENT]: {},
};

export const FORM_VALIDATION_RULES = {
  fullName: {
    required: true,
    pattern: /^[a-zA-Z\s]{2,50}$/,
    errorMessage: "Please enter a valid name",
  },
  dateOfBirth: {
    required: true,
    validate: (value) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < 18) return "Must be at least 18 years old";
      if (age > 70) return "Maximum age is 70 years";
      return true;
    },
  },
  // Add other validation rules...
};

export const OCCUPATION_OPTIONS = [
  "Accountant",
  "Architect",
  "Doctor",
  "Engineer",
  "Lawyer",
  "Teacher",
  "Business Owner",
  "Sales Professional",
  "IT Professional",
  "Healthcare Worker",
  "Government Employee",
  "Student",
  "Retired",
  "Other",
];

export const COVERAGE_TYPES = [
  "24-Hour Coverage",
  "Working Hours Only",
  "Off-Work Hours Only",
  "Specified Activities",
];
