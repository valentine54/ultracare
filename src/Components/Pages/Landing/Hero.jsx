import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronRight, Phone, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import hero1 from "../../../assets/41.jpg";
import hero2 from "../../../assets/43.jpg";
import hero3 from "../../../assets/46.jpg";
import hero4 from "../../../assets/51.jpeg";
import hero5 from "../../../assets/52.jpg";

const slides = [
  {
    image: hero1,
    title: "Exceptional Patient-Centered Care",
    description: "At Bosongo Hospital, we are committed to delivering high-quality healthcare based on international best practices. Our well-trained medical professionals provide compassionate and efficient care for all.",
  },
  {
    image: hero2,
    title: "Advanced Diagnosis & Emergency Care",
    description: "Equipped with modern technology, our hospital ensures timely diagnosis, effective treatment, and urgent medical care following WHO standards—because your health can't wait.",
  },
  {
    image: hero3,
    title: "Your Health, Our Priority",
    description: "We go beyond treatment by offering wellness programs, community health education, and outreach initiatives to enhance the quality of life for our clients.",
  },
  {
    image: hero4,
    title: "Comprehensive Maternal & Child Care",
    description: "Our specialized maternity and pediatric units provide safe, compassionate care for mothers and children, with state-of-the-art facilities and experienced specialists.",
  },
  {
    image: hero5,
    title: "24/7 Emergency Services",
    description: "Our emergency department operates round the clock with a team of skilled professionals ready to handle any medical crisis with speed and expertise.",
  },
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
                className="w-full h-full object-cover md:object-[50%_40%]"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Content Container - Responsive Positioning */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 sm:px-6 md:left-16 md:translate-x-0 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center md:text-left">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-4 sm:mt-6 md:mt-8 text-white text-center md:text-left">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10 justify-center md:justify-start">
                  <button 
                    onClick={() => navigate("/contact")}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white text-blue-500 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Request an Appointment
                  </button>
                  <button 
  onClick={() => (window.location.href = "tel:+254111964576")}
  className="px-3 py-2 sm:px-4 md:px-6 md:py-3 bg-blue-500 text-white rounded-lg font-medium border border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base w-fit"
>
  <Phone size={16} className="flex-shrink-0 sm:w-4 sm:h-4 md:w-5 md:h-5" /> 
  <span className="whitespace-nowrap">Call Now</span>
</button>
                </div>
              </div>

              {/* Navigation Buttons - Responsive Positioning */}
              <button className="prev-slide absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2 border-2 border-white text-white rounded-full p-2 sm:p-3 hover:bg-white hover:text-blue-600 transition-colors z-10">
                <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
              </button>
              <button className="next-slide absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2 border-2 border-white text-white rounded-full p-2 sm:p-3 hover:bg-white hover:text-blue-600 transition-colors z-10">
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