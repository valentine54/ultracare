// src/Components/Pages/Dashboard/DashboardPayment/MpesaPayment.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Phone, Shield, ArrowRight, Loader } from "lucide-react";
import MpesaLogo from "../../../../assets/Mpesa.png";
import { sendSTK } from "../../../helper/insurances";
import { MdDescription } from "react-icons/md";
const MpesaPayment = ({ onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Get quote data from Redux store
  const motorQuote = JSON.parse(localStorage.getItem("insurance"));
  const { selected_quote, quoteData } = motorQuote;

  const validatePhone = (number) => {
    const phoneRegex = /^(?:254|\+254|0)?(7\d{8})$/;
    return phoneRegex.test(number);
  };

  const formatPhoneNumber = (number) => {
    if (!number) return number;

    const cleaned = number.replace(/\D/g, ""); // Remove non-numeric characters

    if (cleaned.startsWith("254")) return cleaned; // Already in correct format
    if (cleaned.startsWith("0")) return "254" + cleaned.slice(1); // Convert 07XXXXXXXX to 2547XXXXXXXX

    return "254" + cleaned; // If missing country code, add 254
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric input
    setPhoneNumber(value);

    if (error) setError("");
    if (apiError) setApiError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPhone = formatPhoneNumber(phoneNumber);

    if (!validatePhone(formattedPhone)) {
      setError("Please enter a valid Kenyan phone number");
      return;
    }

    setIsLoading(true);
    setError("");
    setApiError(null);

    const data = {
      phone_number: formattedPhone,
      // amount: selected_quote.base_premium,
      description: selected_quote.description,
    };

    await sendSTK(data);
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            ← Back to Payment Options
          </button>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full">
                <img src={MpesaLogo} alt="M-Pesa" className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                M-Pesa Payment
              </h2>
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-md mx-auto">
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium text-blue-800">
                        Secure M-Pesa Payment
                      </h3>
                    </div>
                    <p className="text-sm text-blue-700">
                      You will receive an M-Pesa prompt on your phone to
                      complete the payment
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      M-Pesa Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        maxLength={10}
                        placeholder="e.g. 0712345678"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          error || apiError
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:ring-blue-200"
                        } focus:border-blue-500 focus:ring-2 transition-all duration-200`}
                        disabled={isLoading}
                      />
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}
                    {apiError && (
                      <p className="mt-2 text-sm text-red-600">{apiError}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg
                    hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2
                    ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay with M-Pesa
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Payment Initiated
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Please check your phone for the M-Pesa prompt to complete
                    the payment
                  </p>
                  {onBack && (
                    <button
                      onClick={onBack}
                      className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Return to payment options
                    </button>
                  )}
                </motion.div>
              )}

              <div className="border-t mt-8 pt-6">
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Secured by Safaricom M-Pesa</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MpesaPayment;
