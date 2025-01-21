import React from "react";
import { Link } from "react-router-dom";
import { User, Umbrella, HandCoins, Zap } from "lucide-react";

const COptions = () => {
  const options = [
    {
      id: 1,
      title: "Personal Accident",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      icon: <User className="w-8 h-8 text-white" />,
      path: "/personal-accident",
    },
    {
      id: 2,
      title: "Umbrella Retirement",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      icon: <Umbrella className="w-8 h-8 text-white" />,
      path: "/umbrella-retirement",
    },
    {
      id: 3,
      title: "Defined Benefit",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      icon: <HandCoins className="w-8 h-8 text-white" />,
      path: "/defined-benefit",
    },
    {
      id: 4,
      title: "Individual Pension",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      icon: <Zap className="w-8 h-8 text-white" />,
      path: "/individual-pension",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
          Comprehensive Coverage
          <br />
          Options
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover a variety of specialized insurance subcategories, from
          pension plans to personal accident protection, ensuring you find the
          right solutions for your financial security and peace of mind.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {options.map((option) => (
          <Link to={option.path} key={option.id} className="group block">
            <div className="flex items-start gap-6 p-8 rounded-lg bg-gray-50 transition-colors duration-300 hover:bg-blue-900 group-hover:cursor-pointer">
              {/* Icon Container */}
              <div className="flex-shrink-0 w-14 h-14 rounded bg-blue-900 flex items-center justify-center group-hover:bg-blue-800">
                {option.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-white">
                  {option.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-200">
                  {option.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default COptions;
