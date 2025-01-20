import React from "react";
import { FileText, Building2, Headphones } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      title: "Comprehensive Solutions",
      description:
        "Our all-in-one platform allows you to manage pensions, personal accident insurance, and community engagement seamlessly",
    },
    {
      icon: <Building2 className="w-8 h-8 text-blue-500" />,
      title: "User-Friendly Interface",
      description:
        "Designed with the user in mind, our intuitive interface simplifies navigation and makes it easy for you to access essential features without any hassle.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-blue-500" />,
      title: "Dedicated Support",
      description:
        "Our expert support team is available around the clock to assist you with any questions or concerns",
    },
  ];

  return (
    <section className="py-20 px-4">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Manage your future with a <br /> single system
        </h2>
        <p className="text-xl text-gray-500">Why Choose Us?</p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* Icon Container */}
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              {feature.icon}
            </div>

            {/* Content */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
