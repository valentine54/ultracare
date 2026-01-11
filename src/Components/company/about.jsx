import React, { useState } from "react";
import { FaImages } from "react-icons/fa";
import hospitalImage from "../../assets/26.jpg"; // Replace with actual hospital image
import img1 from "../../assets/ultra11.jpeg";
import img2 from "../../assets/ultra12.jpeg";
import img3 from "../../assets/ultra13.jpeg";
import img4 from "../../assets/ultra14.jpeg";
import img5 from "../../assets/ultra15.jpeg";
import img6 from "../../assets/ultra16.jpeg";
import img7 from "../../assets/ultra17.jpeg";
import img8 from "../../assets/ultra18.jpeg";
import img9 from "../../assets/ultra19.jpeg";
import img10 from "../../assets/ultra20.jpeg";
import img11 from "../../assets/ultra21.jpeg";
import img12 from "../../assets/ultra22.jpeg";
import img13 from "../../assets/ultra23.jpeg";
import img14 from "../../assets/ultra24.jpeg";
import img15 from "../../assets/ultra25.jpeg";
import img16 from "../../assets/ultra26.jpeg";
import img17 from "../../assets/ultra27.jpeg";
import img18 from "../../assets/ultra28.jpeg";
// import img20 from "../../assets/ultra8.jpg";
// import img21 from "../../assets/ultra9.jpg";
// import img22 from "../../assets/ultra10.jpg";
// import img23 from "../../assets/ultra11.jpg";
// import img24 from "../../assets/ultra1.jpg";
// import img25 from "../../assets/ultra2.jpg";
// import img26 from "../../assets/ultra3.jpg";
// import img27 from "../../assets/ultra5.jpg";

const AboutPage = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
    img11, img12, img13, img14, img15, img16, img17, img18,
   // img20, img21, img22, img23, img24, img25, img26, img27
  ];

  const openImageModal = (img) => setSelectedImage(img);
  const closeImageModal = () => setSelectedImage(null);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">

      {/* About Section */}
      <div className="max-w-6xl mx-auto text-center mb-16 mt-32">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight mb-6">
          About Us
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4">
          PEJMED Ultracare Specialist Hospital Limited is a privately owned medical facility in Nyahururu town, Laikipia County. 
          Registered and regulated as a level 4 Hospital, established in 2023, we are home to consultant specialists across multiple fields.
        </p>
        {/* <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          We offer specialized services in internal medicine, paediatrics, surgery, orthopaedics, obstetrics & gynecology, anaesthesia & critical care, psychiatry, ENT, and more. 
          Our hospital features 50 beds including VIP rooms, a well-equipped laboratory, pharmacy, advanced diagnostic services, and fully functional inpatient & outpatient departments.
        </p> */}
        <img 
          src={hospitalImage} 
          alt="Hospital" 
          className="mt-8 w-full h-96 object-cover rounded-3xl shadow-2xl border-4 border-gray-100"
        />
      </div>

      {/* Gallery Button */}
      <div className="flex justify-center mb-12">
        <button
          onClick={() => setIsGalleryOpen(true)}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-3 rounded-full shadow-lg flex items-center space-x-3 font-semibold text-lg hover:scale-105 transition-transform duration-300"
        >
          <FaImages className="text-2xl" />
          <span>View Hospital Gallery</span>
        </button>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-5xl mx-auto mb-12 space-y-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To provide comprehensive specialized healthcare services to our patients through specialists dedicated to delivering high-quality, compassionate care.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Vision</h2>
          <p className="text-gray-600">
            To be the leading centre for specialized healthcare in the region, known for our commitment to excellence, innovation, and patient-centered care.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "Patient-centred Care",
            "Excellence",
            "Collaboration",
            "Compassion",
            "Integrity",
            "Innovation"
          ].map((value, idx) => (
            <div key={idx} className="bg-white shadow-lg p-6 rounded-2xl hover:shadow-2xl transition duration-300">
              <h3 className="text-lg font-semibold text-gray-800">{value}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Goals Section - Modern Timeline Style */}
{/* Goals Section - Modern Timeline Style */}
<div className="max-w-6xl mx-auto mb-16">
  <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Goals</h2>

  <div className="relative">
    {/* Vertical line */}
    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>

    {[
      "Provide compassionate specialized healthcare",
      "Build a caring workforce",
      "Safeguard patient safety",
      "Anticipate and respond to community needs",
      "Advocate and promote preventive healthcare"
    ].map((goal, idx) => (
      <div
        key={idx}
        className={`flex flex-col md:flex-row items-center mb-10 md:mb-20 ${
          idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Circle with number */}
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-teal-500 text-white font-bold text-lg z-10">
          {idx + 1}
        </div>

        {/* Card */}
        <div
  className="bg-white shadow-lg rounded-2xl p-6
  md:basis-5/12 md:max-w-[45%] md:shrink-0
  mt-4 md:mt-0 md:mx-6
  hover:shadow-2xl transition duration-300"
>

          <p className="text-gray-700 font-medium">{goal}</p>
        </div>
      </div>
    ))}
  </div>
</div>




      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center z-10 shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800">Gallery</h2>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                onClick={() => setIsGalleryOpen(false)}
              >
                Close ✕
              </button>
            </div>
            {/* Images */}
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`Gallery ${idx+1}`} 
                  className="w-full h-40 object-cover rounded-xl shadow-lg hover:scale-105 cursor-pointer transition-transform"
                  onClick={() => openImageModal(img)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full-size Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" onClick={closeImageModal}>
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img src={selectedImage} alt="Enlarged view" className="max-w-full max-h-[85vh] object-contain rounded-2xl" />
            <button
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
              onClick={closeImageModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Phone", info: "0702-761-696" },
            { title: "Email", info: "ultracarespecialisthospital@gmail.com" },
            { title: "Address", info: <>
            Nyahururu town, Laikipia County <br />
            Along Koinange Rd, near Njaus
          </> },
            { title: "Working Hours", info: "24/7 Emergency Services" }
          ].map((contact, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{contact.title}</h3>
              <p className="text-gray-600 mt-2">{contact.info}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default AboutPage;
