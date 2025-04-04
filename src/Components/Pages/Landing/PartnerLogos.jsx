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
    <div className="pt-12 pb-1 bg-gray-50 overflow-hidden">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Trusted Partners
      </h2>

      {/* Continuous Flow for All Screens */}
      <div className="relative h-[100px] md:h-[140px] lg:h-[160px] w-full overflow-hidden">
        <motion.div
          className="flex absolute left-0"
          animate={{
            x: ["0%", "-100%"], // Moves from full width to negative width
          }}
          transition={{
            duration: 30, // Smooth transition over 30s
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {extendedLogos.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 mx-4 md:mx-6 lg:mx-8 flex justify-center items-center"
              style={{ width: "160px" }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-14 md:max-h-16 lg:max-h-20 object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerLogos;