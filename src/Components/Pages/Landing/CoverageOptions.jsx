import React from "react";
import { Shield, Zap, Umbrella, Heart, Users } from "lucide-react";

const CoverageOptions = () => {
  const coverageCards = [
    {
      icon: (
        <Shield className="w-12 h-12 group-hover:text-white text-blue-500" />
      ),
      title: "Personal Accident",
    },
    {
      icon: <Zap className="w-12 h-12 group-hover:text-white text-blue-500" />,
      title: "Individual Pension",
    },
    {
      icon: <Zap className="w-12 h-12 group-hover:text-white text-blue-500" />,
      title: "Occupational Pension",
    },
    {
      icon: (
        <Users className="w-12 h-12 group-hover:text-white text-blue-500" />
      ),
      title: "Defined Benefit",
    },
    {
      icon: (
        <Umbrella className="w-12 h-12 group-hover:text-white text-blue-500" />
      ),
      title: "Umbrella Retirement",
    },
    {
      icon: (
        <Shield className="w-12 h-12 group-hover:text-white text-blue-500" />
      ),
      title: "Accidental Death",
    },
    {
      icon: (
        <Heart className="w-12 h-12 group-hover:text-white text-blue-500" />
      ),
      title: "Disability Insurance",
    },
    {
      icon: (
        <Users className="w-12 h-12 group-hover:text-white text-blue-500" />
      ),
      title: "Family Accident",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Comprehensive Coverage Options
        </h2>
        <p className="text-gray-500 max-w-3xl mx-auto">
          Discover a variety of specialized insurance subcategories, from
          pension plans to personal accident protection, ensuring you find the
          right solutions for your financial security and peace of mind.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {coverageCards.map((card, index) => (
          <button
            key={index}
            className="group bg-gray-50 p-8 rounded-lg text-center transition-all hover:bg-blue-500 cursor-pointer"
          >
            <div className="flex justify-center mb-4">{card.icon}</div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-white">
              {card.title}
            </h3>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CoverageOptions;
