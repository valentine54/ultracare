import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LogoShowcase = () => {
  const allLogos = [
    { id: 1, name: "Logoipsum 1" },
    { id: 2, name: "Logoipsum 2" },
    { id: 3, name: "Logoipsum 3" },
    { id: 4, name: "Logoipsum 4" },
    { id: 5, name: "Logoipsum 5" },
    { id: 6, name: "Logoipsum 6" },
    { id: 7, name: "Logoipsum 7" },
    { id: 8, name: "Logoipsum 8" },
  ];

  // Logos show
  const logosToShow = 5;
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) =>
      prev + logosToShow >= allLogos.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setStartIndex((prev) =>
      prev === 0 ? allLogos.length - logosToShow : prev - 1
    );
  };

  const visibleLogos = allLogos.slice(startIndex, startIndex + logosToShow);

  // InfiniteScroll
  if (visibleLogos.length < logosToShow) {
    visibleLogos.push(...allLogos.slice(0, logosToShow - visibleLogos.length));
  }

  return (
    <section className="w-full bg-[#F8F8FF] py-12">
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          {/* Left */}
          <button
            onClick={prevSlide}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors"
            aria-label="Previous logos"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Logo */}
          <div className="flex items-center justify-between space-x-12 md:space-x-16 lg:space-x-20 px-4">
            {visibleLogos.map((logo) => (
              <div
                key={`${logo.id}-${startIndex}`}
                className="flex items-center justify-center transition-all duration-300 ease-in-out"
              >
                <div className="w-32 h-8 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-800 rounded-sm"></div>
                    <span className="text-gray-800 font-medium">Logoipsum</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <button
            onClick={nextSlide}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors"
            aria-label="Next logos"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogoShowcase;
