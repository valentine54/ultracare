import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import BlogSection from "../../Landing/BlogSection";
import ServicesSteps from "../../Landing/ServicesSteps";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount = 3379, email = "saracynthia5@gmail.com" } =
    location.state || {};

  // Confetti effect
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const confettiInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(confettiInterval);
        return;
      }

      confetti({
        particleCount: 3,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: randomInRange(0.1, 0.9),
        },
        colors: ["#FFD700", "#FFA500", "#87CEEB", "#90EE90"],
        disableForReducedMotion: true,
      });
    }, 50);

    return () => clearInterval(confettiInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full">
        <motion.div
          className="bg-white rounded-xl shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dotted divide-gray-200">
            {/* Left */}
            <div className="p-8 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-4"
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Payment Success
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Your payment for personal accident cover has been successfully
                done
              </p>
              <button
                onClick={() => {
                  /* Invoice detail logic */
                }}
                className="text-blue-500 hover:text-blue-600 text-sm font-medium"
              >
                See Detail
              </button>
            </div>

            {/* Right */}
            <div className="p-8 flex flex-col items-center text-center">
              <p className="text-gray-600 text-sm mb-4">
                Your payment for personal accident cover has been successfully
                done
              </p>
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Total Payment</p>
                <h3 className="text-2xl font-bold text-[#1a237e]">
                  ${amount.toLocaleString()}
                </h3>
              </div>
              <button
                onClick={() => navigate("/quote-list")}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-2 text-sm font-medium transition-colors mb-6"
              >
                Explore Other Plan
              </button>
              <p className="text-sm text-gray-600">
                We have shared a copy of the cover to your email{" "}
                <span className="text-blue-500">{email}</span>
              </p>
            </div>
          </div>
          <ServicesSteps />
          <BlogSection />
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
