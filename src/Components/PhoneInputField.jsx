import React, { useState, useEffect } from "react";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";

// Function to get country data with flags
const getCountryData = () => {
  return getCountries()
    .map((country) => ({
      code: getCountryCallingCode(country),
      country: country,
      flag: country
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(127397 + char.charCodeAt())
        ),
      name: en[country],
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

const PhoneInputField = ({ value, onChange, error }) => {
  const [countries] = useState(getCountryData());
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((c) => c.country === "KE") || countries[0]
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".country-select")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredCountries = searchQuery
    ? countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.code.includes(searchQuery)
      )
    : countries;

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery("");
    updatePhoneValue(phoneNumber, country);
  };

  const handlePhoneChange2 = (e) => {
    const newNumber = e.target.value.replace(/\D/g, "");
    setPhoneNumber(newNumber);
    updatePhoneValue(newNumber, selectedCountry);
  };
  
  const handlePhoneChange = (e) => {
    let newNumber = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Ensure max 10 digits
    if (newNumber.length > 10) {
      newNumber = newNumber.slice(0, 10);
    }

    setPhoneNumber(newNumber);
    updatePhoneValue(newNumber, selectedCountry);
  };

  const updatePhoneValue = (number, country) => {
    if (!number) return; // Prevent empty values

    if (number.startsWith("0")) {
      number = number.slice(1);
    }
    const formattedNumber = `+${country.code}${number}`;
    if (onChange) {
      onChange(formattedNumber);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-4">
        <div className="relative w-40 country-select">
          <button
            type="button"
            className="w-full h-[44px] rounded-xl border border-gray-300 bg-white px-3 text-left text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-gray-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">{selectedCountry.flag}</span>
              <span className="text-sm">+{selectedCountry.code}</span>
              <svg
                className={`ml-auto h-4 w-4 text-gray-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-80 rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="Search country or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="max-h-60 overflow-auto">
                {filteredCountries.map((country) => (
                  <button
                    key={country.country}
                    type="button"
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                    onClick={() => handleCountrySelect(country)}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span className="flex-1 truncate">{country.name}</span>
                    <span className="text-gray-500">+{country.code}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          max={10}
          placeholder="Enter phone number"
          className={`flex-1 h-[44px] rounded-xl border ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          } px-4 focus:outline-none focus:ring-1`}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default PhoneInputField;
