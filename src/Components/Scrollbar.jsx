import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { TiArrowUp } from "react-icons/ti";

const Scrollbar = () => {
  return (
    <div className="fixed bottom-10 right-5 flex flex-col items-center space-y-4 z-50">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+254702761696"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition duration-300 hover:bg-[#1ebe57]"
      >
        <FaWhatsapp className="text-xl" />
      </a>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-teal-600 text-white w-14 h-10 flex items-center justify-center rounded-full shadow-lg transition duration-300 hover:bg-teal-600"
      >
        <TiArrowUp className="text-xl" />
      </button>
    </div>
  );
};

export default Scrollbar;
