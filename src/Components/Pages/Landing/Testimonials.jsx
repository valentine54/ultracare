import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import John from "../../../assets/John.png";
// import Jane from "../../../assets/John.png";
// import Janne from "../../../assets/Janne.png";
import { FaHospital, FaHeartbeat, FaTooth, FaBaby, FaBone, FaXRay, FaFlask, FaCapsules, FaAmbulance, FaUserMd, FaStethoscope, FaWheelchair } from "react-icons/fa"; // Import icons

const Testimonials = () => {
  const testimonials = [
  {
    id: 1,
    icon: <FaStethoscope size={50} className="text-teal-600" />,
    name: "Consultant Physician",
    text:
      "Specialist-led diagnosis and management of complex medical conditions, supported by advanced diagnostic services.",
  },
  {
    id: 2,
    icon: <FaBaby size={50} className="text-teal-600" />,
    name: "Consultant Paediatrician",
    text:
      "Comprehensive medical care for infants and children, focusing on growth, development, and acute illnesses.",
  },
  {
    id: 3,
    icon: <FaUserMd size={50} className="text-teal-600" />,
    name: "General & Minimally Invasive Surgery",
    text:
      "Advanced surgical care including laparoscopic procedures delivered by experienced consultant surgeons.",
  },
  {
    id: 4,
    icon: <FaBone size={50} className="text-teal-600" />,
    name: "Orthopaedic Surgery",
    text:
      "Expert management of bone, joint and trauma conditions, including joint replacement surgeries.",
  },
  {
    id: 5,
    icon: <FaHeartbeat size={50} className="text-teal-600" />,
    name: "ECG & Echocardiography",
    text:
      "Comprehensive cardiac assessments using modern ECG and echocardiography technology.",
  },
  {
    id: 6,
    icon: <FaXRay size={50} className="text-teal-600" />,
    name: "Ultrasound & Endoscopy",
    text:
      "Advanced imaging and diagnostic procedures for accurate evaluation of internal organs and conditions.",
  },
  {
    id: 7,
    icon: <FaHospital size={50} className="text-teal-600" />,
    name: "Obstetrics & Gynaecology",
    text:
      "Specialist care for women including antenatal services, deliveries, and gynaecological procedures.",
  },
  {
    id: 8,
    icon: <FaUserMd size={50} className="text-teal-600" />,
    name: "Anaesthesia & Critical Care",
    text:
      "Safe and effective anaesthesia services supporting surgical and critical care procedures.",
  },
  {
    id: 9,
    icon: <FaStethoscope size={50} className="text-teal-600" />,
    name: "Psychiatry",
    text:
      "Confidential and compassionate mental health services for diagnosis and management of psychiatric conditions.",
  },
  {
    id: 10,
    icon: <FaWheelchair size={50} className="text-teal-600" />,
    name: "Physiotherapy & Occupational Therapy",
    text:
      "Rehabilitation services focused on restoring mobility, function and independence.",
  },
  {
    id: 11,
    icon: <FaFlask size={50} className="text-teal-600" />,
    name: "Laboratory Services",
    text:
      "Accurate diagnostic testing supported by a modern, fully equipped medical laboratory.",
  },
  {
    id: 12,
    icon: <FaCapsules size={50} className="text-teal-600" />,
    name: "Pharmacy",
    text:
      "A fully stocked pharmacy providing quality medications and professional pharmaceutical guidance.",
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
        Specialist Services
<br />
and Clinics

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
                  {/* Icon instead of Image */}
                  <div className="mb-8">{testimonial.icon}</div>
                  <p className="text-gray-600 text-center mb-8 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <p className="font-bold text-gray-800 text-lg">
                    {testimonial.name}
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
          <div className="bg-white p-8 rounded-xl shadow-lg mx-auto max-w-2xl">
            <div className="flex flex-col items-center">
              {/* Updated icon container with circular boundary */}
              <div className="w-20 h-20 mb-8 rounded-full bg-blue-50 flex items-center justify-center shadow-md">
                {testimonials[currentIndex].icon}
              </div>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                {testimonials[currentIndex].text}
              </p>
              <p className="font-bold text-gray-800 text-lg">
                {testimonials[currentIndex].name}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>

  <div className="flex justify-center gap-3 mt-8">
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
