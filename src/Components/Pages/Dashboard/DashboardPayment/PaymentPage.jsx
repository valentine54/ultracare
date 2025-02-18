import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CreditCard, Building2, Lock, ArrowRight } from "lucide-react";
import MpesaLogo from "../../../../assets/Mpesa.png";
import PaypalLogo from "../../../../assets/Paypal.png";
import MastercardLogo from "../../../../assets/masterCard.png";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState("full");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [error, setError] = useState("");

  // Get quote data from Redux store or use default values
  const motorQuote = useSelector((state) => state.app?.motorQuote) || {
    selected_quote: {
      base_premium: 25000,
      company_name: "First Assurance",
    },
    quoteData: {
      first_name: "Sara",
      last_name: "Cynthia",
      vehicle_registration_number: "KBA 123A",
    },
  };

  useEffect(() => { 
    if (!motorQuote) {
      navigate("/car-insurance");
    }
    
  },[])
  const calculateTotal = () => {
    const { selected_quote } = motorQuote;
    const premium = selected_quote?.base_premium || 25000;
    const tax = premium * 0.16; 
    const total = premium + tax;

    return {
      premium: parseFloat(premium.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
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
          {typeof logo === "string" ? (
            <img src={logo} alt={name} className="h-8 w-8 object-contain" />
          ) : (
            logo
          )}
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

  const handlePaymentSelect = (method) => {
    setSelectedMethod(method);
    setError("");
  };

  const handleProceedToPayment = () => {
    if (!selectedMethod) {
      setError("Please select a payment method");
      return;
    }

    if (selectedMethod === "mpesa") {
      navigate("/user-dashboard/payments/mpesa", {
        state: {
          amount: totals.total,
          ...motorQuote,
        },
      });
    } else {
      // other payment methods
      alert("This payment method is coming soon");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Choose Payment Method</h2>

      <div className="grid md:grid-cols-3 gap-8">
        <motion.div
          className="md:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <h2 className="text-xl font-semibold text-white">
                Choose Payment Option
              </h2>
            </div>

            <div className="p-6">
              <div className="flex gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentType("full")}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all duration-300
                    ${
                      paymentType === "full"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 text-gray-700"
                    }`}
                >
                  Full Payment
                </motion.button>
              </div>

              <div className="space-y-4">
                <PaymentOption
                  name="M-Pesa"
                  logo={MpesaLogo}
                  description="Pay using M-Pesa mobile money"
                  isSelected={selectedMethod === "mpesa"}
                  onClick={() => handlePaymentSelect("mpesa")}
                />

                <PaymentOption
                  name="PayPal"
                  logo={PaypalLogo}
                  description="Pay with PayPal"
                  isSelected={selectedMethod === "paypal"}
                  onClick={() => handlePaymentSelect("paypal")}
                />

                <PaymentOption
                  name="Credit Card"
                  logo={MastercardLogo}
                  description="Pay with VISA, MasterCard or Maestro"
                  isSelected={selectedMethod === "card"}
                  onClick={() => handlePaymentSelect("card")}
                />

                <PaymentOption
                  name="Internet Banking"
                  logo={<Building2 className="h-8 w-8 text-blue-600" />}
                  description="Pay directly through your bank"
                  isSelected={selectedMethod === "bank"}
                  onClick={() => handlePaymentSelect("bank")}
                />
              </div>

              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-6">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Payment Summary
              </h3>
            </div>

            <div className="p-6">
              <div className="text-4xl font-bold text-blue-900 mb-6">
                KES {totals.total.toLocaleString()}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Premium</span>
                  <span className="font-medium">
                    KES {totals.premium.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (16%)</span>
                  <span className="font-medium">
                    KES {totals.tax.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center gap-2 justify-center text-gray-600 mb-4">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm">Secure payment process</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          onClick={() => navigate("/user-dashboard/payments")}
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
            onClick={handleProceedToPayment}
          >
            Proceed to Payment <ArrowRight className="h-5 w-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
