import React from "react";
import PensionSection from "../../../assets/PensionSection.png";
import Steps from "../../../assets/Steps.png";


const PensionService = () => {
  return (
    <div className="flex h-[36rem] flex-col lg:flex-row w-full">
      {/* Left */}
      <div className="w-full lg:w-1/2 bg-[#003087] px-4 md:px-12 lg:px-16 py-16 md:py-24"
      style={{
                backgroundImage: `url(${Steps})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
        <div className="max-w-xl ml-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Empowering Your Retirement Journey
          </h2>
          <p className="text-lg md:text-xl text-white mb-8">
            With our pension consolidation service, you can easily combine old
            pension pots into one manageable account. If you're self-employed,
            starting a pension is simple—just make a contribution to begin. For
            those over 55 ready to access their funds, our platform allows for
            easy pension withdrawals.
          </p>
          <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[#003087] transition-colors duration-200 rounded-lg text-lg font-semibold">
            Create a plan
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-gray-100 px-4 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="flex items-center justify-center h-full">
          <img
            src={PensionSection}
            alt="Pension app interface mockup"
            className="w-full max-w-[700px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default PensionService;
