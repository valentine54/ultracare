import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import Article1 from "../../../assets/Article1.png";
import Article2 from "../../../assets/Article2.png";
import Article3 from "../../../assets/Article3.png";
import Article4 from "../../../assets/Article4.png";
import Article5 from "../../../assets/Article5.png";
import Article6 from "../../../assets/Article6.png";
import Article7 from "../../../assets/Article7.png";
import Article8 from "../../../assets/Article8.png";
import Article9 from "../../../assets/Article9.png";

const Listing = ({ searchTerm = "" }) => {
  const blogPosts = [
    {
      id: 1,
      category: "Insurance",
      title: "Pet Insurance: Is It Worth It?",
      description:
        "Evaluate the benefits of pet insurance and how it can help you manage veterinary costs service and advice.",
      image: Article4,
      link: "/blogs/pet-insurance",
    },
    {
      id: 2,
      category: "Pension",
      title: "Benefits of Pension",
      description:
        "Discover how health insurance can safeguard your finances and ensure access to necessary medical care.",
      image: Article2,
      link: "/blogs/pension-benefits",
    },
    {
      id: 3,
      category: "Insurance",
      title: "Right Insurance Agent",
      description:
        "Separate fact from fiction as we debunk common misconceptions about various types of insurance",
      image: Article6,
      link: "/blogs/right-insurance-agent",
    },
    // Duplicate posts with different IDs to match the image layout
    {
      id: 4,
      category: "Insurance",
      title: "Pet Insurance: Is It Worth It?",
      description:
        "Evaluate the benefits of pet insurance and how it can help you manage veterinary costs service and advice.",
      image: Article3,
      link: "/blogs/pet-insurance-2",
    },
    {
      id: 5,
      category: "Pension",
      title: "Benefits of Pension",
      description:
        "Discover how health insurance can safeguard your finances and ensure access to necessary medical care.",
      image: Article7,
      link: "/blogs/pension-benefits-2",
    },
    {
      id: 6,
      category: "Insurance",
      title: "Right Insurance Agent",
      description:
        "Separate fact from fiction as we debunk common misconceptions about various types of insurance",
      image: Article9,
      link: "/blogs/right-insurance-agent-2",
    },
    {
      id: 7,
      category: "Insurance",
      title: "Pet Insurance: Is It Worth It?",
      description:
        "Evaluate the benefits of pet insurance and how it can help you manage veterinary costs service and advice.",
      image: Article8,
      link: "/blogs/pet-insurance-3",
    },
    {
      id: 8,
      category: "Pension",
      title: "Benefits of Pension",
      description:
        "Discover how health insurance can safeguard your finances and ensure access to necessary medical care.",
      image: Article3,
      link: "/blogs/pension-benefits-3",
    },
    {
      id: 9,
      category: "Insurance",
      title: "Right Insurance Agent",
      description:
        "Separate fact from fiction as we debunk common misconceptions about various types of insurance",
      image: Article1,
      link: "/blogs/right-insurance-agent-3",
    },
  ];

  // Filter posts based on search term
  const filteredPosts = blogPosts.filter((post) => {
    const searchString = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchString) ||
      post.description.toLowerCase().includes(searchString) ||
      post.category.toLowerCase().includes(searchString)
    );
  });

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              to={post.link}
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-600 text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 text-blue-600 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Listing;
