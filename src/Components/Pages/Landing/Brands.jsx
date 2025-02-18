import React from "react";
import Mastercard from "../../../assets/masterCard.png";
import Mpesa from "../../../assets/Mpesa.png";
import Visa from "../../../assets/Visa.png";
import Paypal from "../../../assets/Paypal.png";

const Brands = () => {
  const brands = [
    { id: 1, logo: Mastercard },
    { id: 2, logo: Mpesa },
    { id: 3, logo: Visa },
    { id: 4, logo: Paypal },
    { id: 5, logo: Mpesa },
  ];

  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="w-full bg-white py-10 overflow-hidden">
      <div className="relative w-full">
        <div className="flex animate-scroll">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex-shrink-0 w-[200px] mx-8 flex items-center justify-center"
            >
              <img
                src={brand.logo}
                alt="Brand logo"
                className="max-w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Brands;
