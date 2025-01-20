import React from "react";
import { ArrowRight } from "lucide-react";
import NewsletterImage from '../../../assets/NewsletterImage.png';
import Steps from '../../../assets/Steps.png';

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Newsletter subscription
  };

  return (
    <section className="w-full min-h-[600px] flex">
      {/* Left with Mockup */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <div className="max-w-[600px] h-auto">
          <img
            src={NewsletterImage}
            alt="Phone Mockup"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Right with Newsletter */}
      <div
        className="w-full lg:w-1/2 bg-[#003087] relative flex items-center justify-center p-8"
        style={{
                  backgroundImage: `url(${Steps})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
      >
        <div className="max-w-md w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Subscribe To Our Newsletter
          </h2>

          <form onSubmit={handleSubmit} className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white p-3 rounded-full transition-colors duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
