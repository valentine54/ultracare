import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo1 from "../../../assets/aar.png";
import logo2 from "../../../assets/britam1.png";
import logo3 from "../../../assets/CICLogo.png";
import logo4 from "../../../assets/first assurance logo.png";
import logo5 from "../../../assets/kplc.png";
import logo6 from "../../../assets/sha.jpg";
import logo7 from "../../../assets/trident.png";

const PartnerLogos = () => {
  const partnerLogos = [
    { id: 1, name: "AAR Insurance", logo: logo1 },
    { id: 2, name: "Britam", logo: logo2 },
    { id: 3, name: "CIC Insurance", logo: logo3 },
    { id: 4, name: "First Assurance", logo: logo4 },
    { id: 5, name: "Kenya Power", logo: logo5 },
    { id: 6, name: "SHA", logo: logo6 },
    { id: 7, name: "Trident Insurance", logo: logo7 },
  ];

  // Double the array for seamless looping
  const extendedLogos = [...partnerLogos, ...partnerLogos];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // When we reach the end of the original array, reset to 0 without jump
        return (prevIndex + 1) % partnerLogos.length;
      });
    }, 3000); // Adjust speed here (milliseconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-12 pb-1 bg bg-gray-50 overflow-hidden">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Trusted Partners
      </h2>

      {/* Desktop - Continuous Flow */}
      <div className="hidden lg:block relative h-[160px]">
        <motion.div
          className="flex absolute left-0"
          animate={{
            x: `-${currentIndex * (100 / partnerLogos.length)}%`,
          }}
          transition={{
            duration: 30, // Longer duration for smoother continuous movement
            ease: "linear", // Linear for constant speed
            repeat: Infinity, // Infinite loop
          }}
        >
          {extendedLogos.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-[200px] mx-8 flex justify-center items-center"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-20 max-w-[160px] object-contain" 
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile/Tablet - Static Grid */}
      <div className="lg:hidden px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {partnerLogos.map((partner) => (
            <div 
              key={partner.id} 
              className="flex justify-center items-center h-[120px]"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-16 max-w-full object-contain" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerLogos;