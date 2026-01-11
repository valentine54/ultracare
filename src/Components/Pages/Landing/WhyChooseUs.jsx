import React from "react";
import { Link } from "react-router-dom";
import hero from "../../../assets/ultra23.jpeg";
import hero1 from "../../../assets/ultra28.jpeg";
import hero2 from "../../../assets/ultra14.jpeg";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Advanced Care",
      description:
        "Delivering world-class medical expertise across multiple specialties under one roof, designed for your health and comfort.",
      bgImage: `url(${hero})`,
      buttonText: "Discover Services",
      link: "/services",
    },
    {
      title: "Connect With Us",
      description:
        "Our friendly team is ready to assist with appointments, inquiries, and personalized care guidance.",
      bgImage: `url(${hero1})`,
      buttonText: "Contact Now",
      link: "/contact",
    },
    {
      title: "Why Ultracare?",
      description:
        "We blend innovation, compassionate care, and cutting-edge technology to create the ultimate healthcare experience.",
      bgImage: `url(${hero2})`,
      buttonText: "Learn More",
      link: "/about",
    },
  ];

  return (
    <section className="py-2 px-4 bg-teal-50">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-teal-800 mb-4">
          Empowering Your Health, <br /> One Step at a Time
        </h2>
        <p className="text-lg text-teal-700">Experience Ultracare difference</p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative h-80 overflow-hidden rounded-2xl shadow-xl"
          >
            {/* Background Image with Scale Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: feature.bgImage }}
            ></div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              
              {/* Button */}
              <Link to={feature.link}>
                <button className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white hover:bg-teal-700 hover:text-white text-teal-500 px-3 py-2 rounded-full text-lg font-medium transition">
                  {feature.buttonText}
                </button>
              </Link>

              {/* Content */}
              <h3 className="text-2xl font-semibold text-white mt-16 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-200 text-center">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
