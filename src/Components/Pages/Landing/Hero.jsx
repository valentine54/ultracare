import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronRight, Phone, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import hero1 from "../../../assets/ultra18.jpeg";
import hero2 from "../../../assets/ultra24.jpeg";
import hero3 from "../../../assets/ultra19.jpeg";
import hero4 from "../../../assets/ultra20.jpeg";
// import hero5 from "../../../assets/ultra5.jpg";

const slides = [
  {
    image: hero1,
    title: "Specialist Care You Can Trust",
    description:
      "Ultracare Specialist Hospital is a level 4 facility in Nyahururu, offering consultant-led care across internal medicine, surgery, pediatrics, obstetrics & gynecology, psychiatry, ENT and more.",
  },
  {
    image: hero2,
    title: "Advanced Diagnostics & Modern Medicine",
    description:
      "We provide cutting-edge diagnostic services including endoscopy, ECG, EEG, echocardiography and laboratory services—ensuring accurate diagnosis and timely treatment.",
  },
  {
    image: hero3,
    title: "Excellence in Surgical & Orthopedic Care",
    description:
      "Our specialists perform advanced procedures including minimally invasive laparoscopic surgery and complex orthopedic surgeries such as joint replacements using modern techniques.",
  },
  {
    image: hero4,
    title: "Comprehensive Inpatient & Maternity Care",
    description:
      "With a 50-bed capacity, VIP rooms, a modern maternity unit, newborn unit (NBU), and 24-hour inpatient care, we prioritize comfort, safety, and clinical excellence.",
  },
  // {
  //   image: hero5,
  //   title: "Patient-Centred. Ethical. Compassionate.",
  //   description:
  //     "Guided by integrity, collaboration and compassion, Ultracare is committed to delivering high-quality, patient-centred healthcare to communities across Laikipia and beyond.",
  // },
];


const HeroSlider = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-[80vh] sm:h-[90vh] lg:h-[100vh] xl:h-[110vh] w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".next-slide",
          prevEl: ".prev-slide",
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt="Slide background"
                className="w-full h-full object-cover md:object-[20%_10%] "
              />
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Content Container - Responsive Positioning */}
              <div className="absolute top-[58%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 sm:px-6 md:left-16 md:translate-x-0 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center md:text-left">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-4 sm:mt-6 md:mt-8 text-white text-center md:text-left">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10 justify-center md:justify-start">
                  <button 
                    onClick={() => navigate("/contact")}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white text-teal-600 rounded-lg font-medium hover:bg-teal-700 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Request an Appointment
                  </button>
                  <button 
  onClick={() => (window.location.href = "tel:+254702761696")}
  className="px-3 py-2 sm:px-4 md:px-6 md:py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium border border-teal-500 hover:bg-teal-50 hover:text-teal-600 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base w-fit"
>
  <Phone size={16} className="flex-shrink-0 sm:w-4 sm:h-4 md:w-5 md:h-5" /> 
  <span className="whitespace-nowrap">Call Now</span>
</button>
                </div>
              </div>

              {/* Navigation Buttons - Responsive Positioning */}
              <button className="prev-slide absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2 border-2 border-white text-white rounded-full p-2 sm:p-3 hover:bg-white hover:text-teal-600 transition-colors z-10">
                <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
              </button>
              <button className="next-slide absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2 border-2 border-white text-white rounded-full p-2 sm:p-3 hover:bg-white hover:text-teal-600 transition-colors z-10">
                <ChevronRight size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;