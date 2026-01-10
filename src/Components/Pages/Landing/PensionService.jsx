import React from "react";
import { Link } from "react-router-dom";
import Steps from "../../../assets/ultra7.jpg"; // Consider replacing with Ultracare-themed background
import hero6 from "../../../assets/ultra6.jpg"; // Right hero image

const PensionService = () => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row w-full">
      
      {/* Left Section */}
      <div
        className="w-full lg:w-1/2 px-4 md:px-12 lg:px-16 py-16 md:py-24 relative flex flex-col justify-center"
        style={{
          backgroundImage: `url(${Steps})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative max-w-xl ml-auto text-white">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Premium <span className="text-teal-300">Ultracare Services</span>
          </h1>

          <div className="space-y-5 mt-6">
            <p className="text-base md:text-lg text-gray-200 font-normal leading-relaxed">
              Discover a wide range of modern healthcare solutions designed for your well-being, comfort, and peace of mind.
            </p>

            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              Our expert team ensures accessible, efficient, and patient-centered care across all specialties.
            </p>

            {/* Button centered horizontally */}
            <div className="flex justify-center mt-12">
              <Link to="/services">
                <button className="px-8 py-3 border border-teal-300 text-teal-300 hover:bg-teal-300 hover:text-black transition-all duration-200 rounded-lg text-base font-semibold">
                  Explore Services
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2">
        <img
          src={hero6}
          alt="Modern healthcare at Ultracare"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
};

export default PensionService;
