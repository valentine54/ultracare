import React, { useState } from "react";
import hero from "../../../assets/appointment1.jpg";

const ContactInfo = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    date: "",
    message: "",
  });

  const allSpecialties = [
    "-- Please Select --",
    "Anaesthesiology",
    "Audiology (Audiometry)",
    "Consultant Paediatrician",
    "Consultant Physician (Internal Medicine)",
    "Diagnostic Imaging (Ultrasound, ECG, ECHO)",
    "Endoscopy",
    "ENT Surgery",
    "General Consultation",
    "General Surgery",
    "Laboratory Services",
    "Minimally Invasive Surgery (Laparoscopy)",
    "Neurodiagnostics (EEG)",
    "Nutrition & Dietetics",
    "Obstetrics & Gynaecology",
    "Occupational Therapy",
    "Orthopaedic Surgery",
    "Pharmacy Services",
    "Physiotherapy",
    "Psychiatry & Mental Health",
  ];

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ UPDATED: Formspree submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("https://formspree.io/f/meeejzok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          Specialty: formData.specialty,
          Date: formData.date,
          Message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSuccessMessage(
        "Appointment request sent successfully! We’ll contact you shortly."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        specialty: "",
        date: "",
        message: "",
      });
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          {/* Left Section */}
          <div className="flex flex-col justify-start">
            <div className="mb-8">
              <h1 className="mt-2 text-4xl font-bold text-gray-900 max-w-md">
                Care That Starts With a Conversation
              </h1>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Schedule your visit with PEJMED Ultracare Specialist Hospital and let our team guide you toward the right care.
            </p>

            <div className="mt-6 h-full">
              <img
                src={hero}
                alt="Customer support illustration"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-0">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label htmlFor="name" className="block text-sm text-gray-600">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-600">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Your Phone Number"
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg"
                  required
                />
              </div>

              <div>
                <label htmlFor="specialty" className="block text-sm text-gray-600">
                  Select Specialty
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg"
                  required
                >
                  {allSpecialties.map((specialty, index) => (
                    <option key={index} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm text-gray-600">
                  Appointment Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-600">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  maxLength={500}
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.message.length}/500 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white px-6 py-3 rounded-lg ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {successMessage && (
                <p className="mt-4 text-green-600 font-semibold text-center">
                  <i>{successMessage}</i>
                </p>
              )}

              {errorMessage && (
                <p className="mt-4 text-red-600 font-semibold text-center">
                  <i>{errorMessage}</i>
                </p>
              )}
            </form>
          </div>
        </div>
        {/* Responsive Map Container */} <div className="mt-8 md:mt-12 mb-2 w-full overflow-hidden rounded-lg shadow-lg"> <div className="aspect-w-16 aspect-h-9 w-full"> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.817776472679!2d36.35423347349351!3d0.02991636439928671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1787630044c19569%3A0x79b7f84de6c2fbb6!2sUltracare%20Specialist%20Hospital!5e0!3m2!1sen!2sus!4v1767988769696!5m2!1sen!2sus" className="w-full h-64 md:h-80 lg:h-96" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ultracare Specialist Hospital" /> </div> </div> </div> </div> ); }; export default ContactInfo;