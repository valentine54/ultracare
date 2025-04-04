import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import hero from "../../../assets/12.jpg"; // Ensure high-resolution image
import hero1 from "../../../assets/15.jpg"; // Ensure high-resolution image
import hero2 from "../../../assets/47.jpg"; // Ensure high-resolution image

const WhyChooseUs = () => {
  const features = [
    {
      title: "Our Services",
      description:
        "We offer expert medical care across multiple specialties, ensuring quality treatment under one roof.",
      bgImage: `url(${hero})`,
      buttonText: "Explore Services",
      link: "/services",
    },
    {
      title: "Get in Touch",
      description:
        "Have questions? Our team is here to help. Reach out for appointments or inquiries.",
      bgImage: `url(${hero1})`,
      buttonText: "Contact Us",
      link: "/contact",
    },
    {
      title: "Why Choose Us?",
      description:
        "We combine innovation, expertise, and compassionate care to give you the best healthcare experience.",
      bgImage: `url(${hero2})`,
      buttonText: "Learn More",
      link: "/about",
    },
  ];

  return (
    <section className="py-20 px-4  bg-gray-150">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Empowering Your Future, <br />  One Step at a Time
        </h2>
        {/* <p className="text-xl text-gray-500">Why Choose Us?</p> */}
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative h-80 overflow-hidden rounded-2xl shadow-xl"
          >
            {/* Background Image with Blur Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center filter  transition-all duration-500  group-hover:scale-105"
              style={{ backgroundImage: feature.bgImage , objectFit: "cover" }}
            >
              {/* Dark overlay (lighter on hover) */}
              {/* <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/20"></div> */}
            </div>

            {/* Glass Effect Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
              {/* Button at the top with Link */}
              <Link to={feature.link}>
                <button className="absolute top-6 left-1/2 transform -translate-x-1/2 border-2 border-white text-white px-6 py-2 rounded-full text-lg font-medium bg-transparent hover:bg-white hover:text-black transition">
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
