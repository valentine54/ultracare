import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronRight, Phone, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; //
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
    <div className="relative h-[150vh]  w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".next-slide",
          prevEl: ".prev-slide",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full pt-5">
            <img
  src={slide.image}
  alt="Slide background"
  className= "w-full h-full object-[50%_40%] object-cover "
    //
    // slide.image === hero4 ? "object-contain" : "object-cover object-[50%_40%]"
  // }`}
/>

              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-[45%] left-16 pt-20  transform -translate-y-1/2 text-white max-w-2xl">
                <h1 className="text-6xl font-bold">{slide.title}</h1>
                <p className="text-xl mt-10">{slide.description}</p>
                <div className="flex gap-4 mt-12">
                  <button 
                  onClick={() => navigate("/contact")}
                  className="px-6 py-3 bg-white text-blue-500 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors">
                    Request an Appointment
                  </button>
                  <button 
                  onClick={() => (window.location.href = "tel:+254111964576")}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium border border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
  <Phone size={20} className="flex-shrink-0" /> 
  <span>Call Now</span>
</button>

                </div>
              </div>

              {/* Navigation Buttons - Positioned Absolutely */}
              <button className="prev-slide absolute top-[90%] left-4 -translate-y-1/2 border-2 border-white text-white rounded-full p-3 hover:bg-white hover:text-blue-600 transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button className="next-slide absolute top-[90%] right-4 -translate-y-1/2 border-2 border-white text-white rounded-full p-3 hover:bg-white hover:text-blue-600 transition-colors">
                <ChevronRight size={18} />
              </button>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
