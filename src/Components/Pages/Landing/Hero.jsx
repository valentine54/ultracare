import React from "react";
import hero from "../../../assets/hero.jpeg";

const Hero = () => {
  return (
    <div className="relative h-[89vh]">
      {" "}
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Family silhouette against mountains"
          className="w-full h-full object-cover mx-auto" 
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      {/* Content Container */}
      <div className="ml-14 relative z-10 max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          {/* Heading */}
          <h1 className="text-7xl font-bold text-gray-800 mb-6">
            <span>Secure </span>
            <span className="text-blue-500">Your Future </span>
            <span>with </span>
            <span>Confidence</span>
          </h1>

          {/* Description */}
          <p className="text-2xl mb-4">
            Discover tailored insurance solutions for pensions <br />
            and personal accidents that protect you and your <br />
            loved ones, ensuring peace of mind for a brighter <br />
            tomorrow.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Get a quote
            </button>
            <button className="px-8 py-3 bg-white text-blue-500 rounded-lg font-medium border border-blue-500 hover:bg-blue-50 transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
