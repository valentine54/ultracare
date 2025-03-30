import React, { useState } from "react";
import { FaImages } from "react-icons/fa"; // Import gallery icon
import hospitalImage from "../../assets/26.jpg"; // Replace with actual image
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";
import img7 from "../../assets/7.jpg";
import img8 from "../../assets/8.jpg";
import img9 from "../../assets/9.jpg";
import img10 from "../../assets/10.jpg";
import img11 from "../../assets/11.jpg";
import img12 from "../../assets/12.jpg";
import img13 from "../../assets/13.jpg";
import img14 from "../../assets/14.jpg";
import img15 from "../../assets/15.jpg";
import img16 from "../../assets/26.jpg";
import img17 from "../../assets/17.jpg";
import img18 from "../../assets/18.jpg";
// import Scrollbar from "./Scrollbar"; // Adjust path if necessary

const AboutPage = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
const galleryImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18];
 
  return (
    <section className="bg-gray-100 py-12 pt-40 px-6">
      {/* About Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
      <h1 className="text-5xl font-extrabold text-gray-800 tracking-wide">
    About Us
  </h1>
  <p className="text-lg text-gray-700 mt-4 leading-relaxed max-w-3xl mx-auto">
    Bosongo Hospital in Kisii County provides high-quality, patient-centered care with a focus on excellence, compassion, and modern medical practices.
    Our services include advanced diagnostics, emergency care, and community wellness programs.
  </p>
  <p className="text-lg text-gray-700 mt-4 leading-relaxed max-w-3xl mx-auto">
    Guided by integrity and teamwork, we ensure accessible and affordable healthcare. With cutting-edge technology and strict ethical standards, 
    we prioritize transparency, professionalism, and innovation to improve patient outcomes.
  </p>
        <img
          src={hospitalImage}
          alt="Hospital"
          className="mt-6 w-full h-80 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 mt-2">
            To provide high-quality, patient-centered healthcare through innovation, dedication, and excellence.
            We are committed to ensuring accessibility to modern medical treatments, advanced diagnostic procedures, and preventive healthcare strategies that promote long-term wellness.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
          <p className="text-gray-600 mt-2">
          Bosongo Hospital envisions a future where healthcare is accessible, comprehensive, and of the highest international standards. We strive to inspire hope and contribute to the well-being of our patients by integrating clinical expertise, innovative medical practices, and continuous education to improve health outcomes.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            "Compassion",
            "Integrity",
            "Quality Policy Statement",
            "Innovation",
            "Teamwork",
            "Patient-Centered Care"
          ].map((value, index) => (
            <div key={index} className="bg-white shadow-lg p-3 rounded-lg ">
              <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
            </div>
          ))}
        </div>
      </div>
      {/* Gallery Button (Aligned Right) */}
<div className="max-w-5xl mx-auto flex justify-center  mt-6">
  <button 
    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    onClick={() => setIsGalleryOpen(true)}
  >
    <FaImages className="text-2xl" />
    <span>View images of our hospital</span>
  </button>
</div>

         {/* Image Gallery Modal */}
         {isGalleryOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full relative max-h-[80vh] overflow-y-auto">
      <button
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600 transition"
        onClick={() => setIsGalleryOpen(false)}
      >
        Close ✕
      </button>
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Gallery Image ${index + 1}`}
            className="w-full h-40 object-cover rounded-lg shadow-md hover:opacity-80 transition"
          />
        ))}
      </div>
    </div>
  </div>
)}


      {/* Contact Information Section */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
  <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Contact Us</h2>
  <p className="text-gray-600 text-center mb-6">
    Reach out to us for appointments, inquiries, or emergency services.
  </p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[
      { title: "Phone", info: "+254 700 123 456" },
      { title: "Email", info: "info@bosongohospital.com" },
      { title: "Address", info: "123 Health Ave, Kisii, Kenya" },
      { title: "Working Hours", info: "24/7 Emergency Services" },
    ].map((contact, index) => (
      <div
        key={index}
        className="bg-gray-50 shadow-md rounded-lg p-6 text-center transition duration-300 hover:shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-800">{contact.title}</h3>
        <p className="text-gray-600">{contact.info}</p>
      </div>
    ))}
  </div>

      </div>
    </section>
    
  );
};

export default AboutPage;
