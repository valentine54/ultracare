import React, { useState, useEffect } from "react";
import { Building2 } from "lucide-react";

const PensionCalculator = () => {
  const [formData, setFormData] = useState({
    currentAge: 24,
    desiredRetirementAge: 80,
    currentMonthlyIncome: 2300,
    desiredMonthlyPension: 1400,
    expectedReturn: 25,
    expectedMonthlyPayout: 850,
    currency: "USD",
  });

  const [estimatedPension, setEstimatedPension] = useState(2300800);
  const [isEditing, setIsEditing] = useState(false);

  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "JPY", symbol: "¥" },
  ];

  // Validation 
  const validation = {
    currentAge: {
      min: 18,
      max: 70,
      pattern: /^\d+$/,
    },
    desiredRetirementAge: {
      min: 45,
      max: 100,
      pattern: /^\d+$/,
    },
    currentMonthlyIncome: {
      min: 0,
      max: 1000000,
      pattern: /^\d+$/,
    },
    desiredMonthlyPension: {
      min: 0,
      max: 1000000,
      pattern: /^\d+$/,
    },
    expectedReturn: {
      min: 1,
      max: 100,
      pattern: /^\d+$/,
    },
  };

  const calculatePension = () => {
    const {
      currentAge,
      desiredRetirementAge,
      currentMonthlyIncome,
      expectedReturn,
      desiredMonthlyPension,
    } = formData;

    const yearsToRetirement = desiredRetirementAge - currentAge;
    const monthlyContribution = desiredMonthlyPension;
    const annualReturn = expectedReturn / 100;

    // Compound interest 
    const futureValue =
      monthlyContribution *
      12 *
      ((Math.pow(1 + annualReturn, yearsToRetirement) - 1) / annualReturn);

    setEstimatedPension(Math.round(futureValue));
  };

  useEffect(() => {
    calculatePension();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate Input
    if (validation[name]) {
      const numValue = Number(value);
      if (
        validation[name].pattern.test(value) &&
        numValue >= validation[name].min &&
        numValue <= validation[name].max
      ) {
        setFormData((prev) => ({ ...prev, [name]: numValue }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatCurrency = (amount) => {
    const currency = currencies.find((c) => c.code === formData.currency);
    return `${currency.symbol} ${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-20">
          Pension Plan Calculator
        </h1>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Estimate */}
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-2">Estimated Pension Amount</p>
            <h2 className="text-4xl font-bold text-gray-900">
              {formatCurrency(estimatedPension)}
            </h2>
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-6">
            {/* Current Age */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Current Age:
              </label>
              <input
                type="number"
                name="currentAge"
                value={formData.currentAge}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={validation.currentAge.min}
                max={validation.currentAge.max}
              />
            </div>

            {/* Desired Retirement Age */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Desired Retirement Age:
              </label>
              <input
                type="number"
                name="desiredRetirementAge"
                value={formData.desiredRetirementAge}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={validation.desiredRetirementAge.min}
                max={validation.desiredRetirementAge.max}
              />
            </div>

            {/* Current Monthly Income */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Current Monthly Income:
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="currentMonthlyIncome"
                  value={formData.currentMonthlyIncome}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={validation.currentMonthlyIncome.min}
                  max={validation.currentMonthlyIncome.max}
                />
              </div>
            </div>

            {/* Desired Monthly Pension */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Desired Monthly Pension Contribution:
              </label>
              <input
                type="number"
                name="desiredMonthlyPension"
                value={formData.desiredMonthlyPension}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={validation.desiredMonthlyPension.min}
                max={validation.desiredMonthlyPension.max}
              />
            </div>

            {/* Expected Return */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">
                Expected Annual Return on Investment (ROI):
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="expectedReturn"
                  value={formData.expectedReturn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={validation.expectedReturn.min}
                  max={validation.expectedReturn.max}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Currency:</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} ({currency.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              Edit details
            </button>
            <button
              onClick={calculatePension}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save plan
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg flex items-start space-x-3">
            <Building2 className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
            <div className="text-sm text-gray-600">
              <p>Use the panel above to calculate your retirement</p>
              <p>
                Learn more on how to calculate your age, monthly contribution,
                target retirement income
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PensionCalculator;
