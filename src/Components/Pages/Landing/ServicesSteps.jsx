import React from "react";
import StepsImage from "../../../assets/StepsImage.png";
import Steps from "../../../assets/Steps.png";

const ServicesSteps = () => {
  const steps = [
    "Use USSD Code *189#",
    "Complete Application Form",
    "Gather Required Documents",
    "Submit Application",
    "Await Processing",
    "Receive Pension Offer",
    "Choose Payment Method",
    "Start Receiving Payments",
  ];

  return (
    <section className="w-full h-[35rem] flex">
      {/* Left */}
      <div className="flex-1 bg-gray-100 relative p-8 flex items-center justify-center">
        <img
          src={StepsImage}
          alt="Mobile phones showing USSD interface"
          className="max-w-2xl w-full"
        />
      </div>

      {/* Right */}
      <div
        className="flex-1 text-white p-16 flex flex-col justify-center"
        style={{
          backgroundImage: `url(${Steps})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Content Container */}
        <div className="max-w-xl">
          {/* Title */}
          <h2 className="text-4xl font-bold mb-8">Steps to Get our Services</h2>

          {/* Steps */}
          <ol className="space-y-4 mb-12">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="font-bold">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          {/* CTA */}
          <button className="px-8 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-blue-900 transition-colors">
            Create a plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSteps;
