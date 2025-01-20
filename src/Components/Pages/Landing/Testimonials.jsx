import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import John from "../../../assets/John.png";
import Jane from "../../../assets/John.png";
import Janne from "../../../assets/Janne.png";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      image: John,
      text: "Designed with the user in mind, our intuitive interface simplifies navigation and makes it easy for you to access essential features without any hassle.",
      name: "John Doe",
    },
    {
      id: 2,
      image: Jane,
      text: "Designed with the user in mind, our intuitive interface simplifies navigation and makes it easy for you to access essential features without any hassle.",
      name: "Jane Doe",
    },
    {
      id: 3,
      image: Janne,
      text: "Designed with the user in mind, our intuitive interface simplifies navigation and makes it easy for you to access essential features without any hassle.",
      name: "Jane Doe",
    },
    {
      id: 4,
      image: John,
      text: "Designed with the user in mind, our intuitive interface simplifies navigation and makes it easy for you to access essential features without any hassle.",
      name: "John Smith",
    },
  ];

  // infinite scroll
  const extendedTestimonials = [...testimonials, ...testimonials];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-[1600px] mx-auto overflow-hidden">
        <h2 className="text-5xl font-bold text-center text-gray-800 mb-20">
          What our clients say
          <br />
          about us
        </h2>

        {/* Desktop */}
        <div className="hidden lg:block relative">
          <motion.div
            className="flex gap-6 px-4"
            animate={{
              x: `-${currentIndex * (100 / 4)}%`,
            }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-1/4 bg-white p-12 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 mb-8 rounded-full overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}'s avatar`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-gray-600 text-center mb-8 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <p className="font-bold text-gray-800 text-lg">
                    — {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile/Tablet */}
        <div className="lg:hidden relative px-4">
          <div className="overflow-hidden">
            <div className="flex justify-center items-center relative h-[400px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute w-full"
                >
                  <div className="bg-white p-12 rounded-xl shadow-lg mx-auto max-w-2xl">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 mb-8 rounded-full overflow-hidden shadow-md">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={`${testimonials[currentIndex].name}'s avatar`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-gray-600 text-center mb-8 leading-relaxed">
                        {testimonials[currentIndex].text}
                      </p>
                      <p className="font-bold text-gray-800 text-lg">
                        — {testimonials[currentIndex].name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gray-800 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
