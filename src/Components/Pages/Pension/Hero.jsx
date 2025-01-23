import React from "react";
import PensionImg from "../../../assets/pension.jpeg";
import { useNavigate } from "react-router-dom";
import PensionCalculator from '../PensionCalculator/PensionCalculator.jsx'



const Hero = () => {
    const navigate = useNavigate();
  return (
    <div className="relative h-[89vh] min-h-[600px] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${PensionImg})`, // Replace with your actual image path
        }}
      />

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          {/* Text Content */}
          <h1 className="text-5xl font-bold text-white mb-4">
            Your Path to Financial{" "}
            <span className="block">
              <span className="text-blue-500">Freedom</span> in Retirement
            </span>
          </h1>

          <p className="text-lg text-gray-200 mb-8 max-w-xl">
            Unlock the secrets to a fulfilling retirement with our expert <br />
            guidance and tailored solutions. At Insure, we empower you to <br />
            maximize your savings, navigate your options, and achieve the <br />
            financial independence you deserve.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/pension-calculator")}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Calculate Pension
            </button>
            <button className="px-8 py-3 bg-transparent text-white font-medium rounded-lg border-2 border-white hover:bg-white hover:text-gray-900 transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
