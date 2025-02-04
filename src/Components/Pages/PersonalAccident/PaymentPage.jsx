import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../PersonalAccident/Header";
import Stepper from "../PersonalAccident/Stepper";
import { CreditCard, Building2, Lock, ArrowRight } from "lucide-react";
import { usePersonalAccident } from "../../Context/PersonalAccidentContext";
import MpesaLogo from "../../../assets/Mpesa.png"
import PaypalLogo from "../../../assets/Paypal.png";
import MastercardLogo from "../../../assets/Mastercard.png";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState("yearly");
  const [selectedMethod, setSelectedMethod] = useState("");

  const rates = {
    yearly: 3379,
    monthly: 320,
  };

  const calculateTotal = () => {
    if (paymentType === "yearly") {
      return {
        premium: 2500,
        tax: 1779,
        total: rates.yearly,
      };
    }
    return {
      premium: 250,
      tax: 70,
      total: rates.monthly,
    };
  };

  const totals = calculateTotal();

  const PaymentOption = ({ name, logo, description, isSelected, onClick }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-300
        ${
          isSelected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
        }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-lg ${
            isSelected ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          {logo}
        </div>
        <div>
          <h3
            className={`font-medium text-lg ${
              isSelected ? "text-blue-600" : "text-gray-900"
            }`}
          >
            {name}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header />
        <Stepper currentStep={4} />

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <h2 className="text-xl font-semibold text-white">
                  Choose one of the payment options
                </h2>
              </div>

              <div className="p-6">
                <div className="flex gap-4 mb-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPaymentType("yearly")}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all duration-300
                      ${
                        paymentType === "yearly"
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-200 text-gray-700"
                      }`}
                  >
                    $3,379/Year
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPaymentType("monthly")}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all duration-300
                      ${
                        paymentType === "monthly"
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-200 text-gray-700"
                      }`}
                  >
                    $320/Month
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <PaymentOption
                    name="M-Pesa"
                    logo={
                      <img
                        src={MpesaLogo}
                        alt="M-Pesa"
                        className="h-8 w-8"
                      />
                    }
                    description="Pay using M-Pesa mobile money"
                    isSelected={selectedMethod === "mpesa"}
                    onClick={() => setSelectedMethod("mpesa")}
                  />

                  <PaymentOption
                    name="PayPal"
                    logo={
                      <img
                        src={PaypalLogo}
                        alt="PayPal"
                        className="h-8 w-8"
                      />
                    }
                    description="Pay using your PayPal account"
                    isSelected={selectedMethod === "paypal"}
                    onClick={() => setSelectedMethod("paypal")}
                  />

                  <PaymentOption
                    name="Credit Card"
                    logo={<CreditCard className="h-8 w-8 text-blue-600" />}
                    description="Pay with VISA, MasterCard or Maestro"
                    isSelected={selectedMethod === "card"}
                    onClick={() => setSelectedMethod("card")}
                  />

                  <PaymentOption
                    name="Internet Banking"
                    logo={<Building2 className="h-8 w-8 text-blue-600" />}
                    description="Pay directly through your bank"
                    isSelected={selectedMethod === "bank"}
                    onClick={() => setSelectedMethod("bank")}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Total price
                </h3>
              </div>

              <div className="p-6">
                <div className="text-4xl font-bold text-blue-900 mb-6">
                  $ {totals.total.toLocaleString()}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Premium</span>
                    <span className="font-medium">
                      $ {totals.premium.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance tax</span>
                    <span className="font-medium">
                      $ {totals.tax.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center gap-2 justify-center text-gray-600 mb-4">
                    <Lock className="h-4 w-4" />
                    <span className="text-sm">
                      Your payment is 100% safe and secure
                    </span>
                  </div>
                  <p className="text-xs text-center text-gray-500">
                    We use encryption to protect your data and only work with
                    verified payment gateways. Your trust is a priority for us.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-between mt-8">
          <motion.button
            onClick={() => navigate("/personal-accident/quote")}
            className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-lg
            border-2 border-blue-500 hover:bg-gray-50 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back
          </motion.button>

          {selectedMethod && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg
              hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              onClick={() => {
                if (selectedMethod === "mpesa") {
                  navigate("/personal-accident/mpesa-payment");
                }
                // Handle other payment methods
              }}
            >
              Make Payment <ArrowRight className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
