import React,{useState} from "react";
import { useProgress } from "./ProgressContext";
import PaymentPage from "./DashboardPayment/PaymentPage";
import MpesaPayment from "./DashboardPayment/MpesaPayment";

const PaymentsSection = () => {
  const { progress } = useProgress();
  const [paymentStep, setPaymentStep] = useState("list"); 

  if (progress > 100) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
          <h3 className="text-yellow-800 font-medium">Documents Required</h3>
          <p className="text-yellow-700 mt-1">
            Please complete document uploads before proceeding to payment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {paymentStep === "list" && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Required</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Car Insurance Premium</p>
                <p className="text-2xl font-bold">KES 25,000</p>
                <p className="text-sm text-gray-500">Due by March 20, 2024</p>
              </div>
              <button
                onClick={() => setPaymentStep("payment")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      {paymentStep === "payment" && (
        <PaymentPage
          onBack={() => setPaymentStep("list")}
          onMpesaSelect={() => setPaymentStep("mpesa")}
        />
      )}

      {paymentStep === "mpesa" && (
        <MpesaPayment onBack={() => setPaymentStep("payment")} />
      )}
    </div>
  );
};

export default PaymentsSection;
