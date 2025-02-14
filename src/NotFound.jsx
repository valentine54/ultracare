import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import notFoundImage from "./assets/404.jpg";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-20 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full filter blur-3xl animate-float-delayed"></div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1 text-center lg:text-left"
              >
                <div className="mb-8">
                  <h1 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-6 leading-tight">
                    Oops! Page Not Found
                  </h1>
                  <p className="text-xl text-gray-600">
                    The page you're looking for seems to have wandered off.
                    Let's get you back on track.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Link
                    to="/"
                    className="group inline-flex items-center justify-center px-8 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-200/50 transform hover:-translate-y-0.5"
                  >
                    <svg
                      className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      />
                    </svg>
                    Return Home
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Get Help
                  </Link>
                </motion.div>
              </motion.div>

              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex-1 w-full max-w-lg"
              >
                <div className="relative group">
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative z-20"
                  >
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src={notFoundImage}
                        alt="404 Illustration"
                        className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-blue-600/5 group-hover:opacity-0 transition-opacity duration-500"></div>
                    </div>
                  </motion.div>

                  {/* Subtle decorative elements */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-50/50 to-white/30 rounded-3xl -z-10 transform rotate-1 group-hover:rotate-2 transition-transform duration-500 opacity-80"></div>
                  <div className="absolute -inset-2 bg-gradient-to-l from-blue-50/50 to-white/30 rounded-3xl -z-10 -rotate-1 group-hover:-rotate-2 transition-transform duration-500 opacity-80"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
