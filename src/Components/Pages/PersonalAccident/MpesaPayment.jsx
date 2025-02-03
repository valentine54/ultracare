import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../PersonalAccident/Header";
import Stepper from "../PersonalAccident/Stepper";
import { Phone, Shield, ArrowRight, Loader } from "lucide-react";
import { usePersonalAccident } from "../../Context/PersonalAccidentContext";

const MpesaPayment = () => {
  const navigate = useNavigate();
  const { formData: contextData } = usePersonalAccident();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validatePhone = (number) => {
    const phoneRegex =
      /^(?:254|\+254|0)?(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/;
    return phoneRegex.test(number);
  };

  const formatPhoneNumber = (number) => {
    if (!number) return number;
    const cleaned = number.replace(/\D/g, "");
    if (cleaned.length === 0) return cleaned;
    if (cleaned.startsWith("254")) return cleaned;
    if (cleaned.startsWith("0")) return "254" + cleaned.slice(1);
    return "254" + cleaned;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (error) setError("");
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

    try {
      // Daraja API integration will go here
      // const response = await fetch("/api/stkpush", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     phoneNumber: formattedPhone,
      //     amount: contextData.paymentInfo.amount
      //   })
      // });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      setError("Failed to initiate payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header />
        <Stepper currentStep={4} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full">
                <Phone className="h-6 w-6 text-green-500" />
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
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium text-green-800">
                        Secure Payment
                      </h3>
                    </div>
                    <p className="text-sm text-green-700">
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
                        placeholder="e.g. 0712345678"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          error
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:ring-green-200"
                        } focus:border-green-500 focus:ring-2 transition-all duration-200`}
                        disabled={isLoading}
                      />
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-green-500 text-white font-semibold py-3 px-8 rounded-lg
                    hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2
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
                  <button
                    onClick={() => navigate("/personal-accident/payment")}
                    className="text-green-500 hover:text-green-600 font-medium"
                  >
                    Return to payment options
                  </button>
                </motion.div>
              )}

              <div className="border-t mt-8 pt-6">
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Secured by Safaricom M-Pesa</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={() => navigate("/personal-accident/payment")}
          className="mt-8 bg-white text-green-500 font-semibold py-3 px-8 rounded-lg
          border-2 border-green-500 hover:bg-gray-50 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back to Payment Options
        </motion.button>
      </div>
    </div>
  );
};

export default MpesaPayment;
