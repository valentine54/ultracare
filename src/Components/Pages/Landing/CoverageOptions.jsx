import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Zap, Umbrella, Heart, Users } from "lucide-react";

const CoverageOptions = () => {
  const navigate = useNavigate();

  const handleCardClick = (title) => {
    switch (title) {
      case "Personal Accident":
        navigate("/request-quote");
        break;
      case "Individual Pension":
        navigate("/individual-pension");
        break;
      case "Occupational Pension":
        navigate("/occupational-pension");
        break;
      case "Defined Benefit":
        navigate("/defined-benefit");
        break;
      case "Umbrella Retirement":
        navigate("/umbrella-retirement");
        break;
      case "Accidental Death":
        navigate("/accidental-death");
        break;
      case "Disability Insurance":
        navigate("/disability-insurance");
        break;
      case "Family Accident":
        navigate("/family-accident");
        break;
      default:
        console.log("Route not yet implemented");
    }
  };

  const coverageCards = [
    {
      icon: (
        <Shield className="w-12 h-12 group-hover:text-white text-blue-500" />
      ),
      title: "Personal Accident",
      path: "/request-quote",
    },
    {
      icon: <Zap className="w-12 h-12 group-hover:text-white text-blue-500" />,
      title: "Individual Pension",
      path: "/individual-pension",
    },
    {
      icon: <Zap className="w-12 h-12 group-hover:text-white text-blue-500" />,
      title: "Occupational Pension",
      path: "/occupational-pension",
    },
    {
      icon: (
        <Users className="w-12 h-12 group-hover:text-white text-blue-500" />
      ),
      title: "Defined Benefit",
      path: "/defined-benefit",
    },
    {
      icon: (
        <Umbrella className="w-12 h-12 group-hover:text-white text-blue-500" />
      ),
      title: "Umbrella Retirement",
      path: "/umbrella-retirement",
    },
    {
      icon: (
        <Shield className="w-12 h-12 group-hover:text-white text-blue-500" />
      ),
      title: "Accidental Death",
      path: "/accidental-death",
    },
    {
      icon: (
        <Heart className="w-12 h-12 group-hover:text-white text-blue-500" />
      ),
      title: "Disability Insurance",
      path: "/disability-insurance",
    },
    {
      icon: (
        <Users className="w-12 h-12 group-hover:text-white text-blue-500" />
      ),
      title: "Family Accident",
      path: "/family-accident",
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
            onClick={() => handleCardClick(card.title)}
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
