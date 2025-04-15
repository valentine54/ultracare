import React, { useState } from "react";
import hero from "../../../assets/40.jpg";

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
    "Interventional Cardiology",
    "Anaesthesia & Critical Care Medicine",
    "Anaesthesia & Pain Management",
    "Adult Cardiology",
    "Chest/Pulmonology",
    "Dermatology",
    "Diabetology/Endocrinology",
    "Infectious Diseases",
    "Medical Oncology",
    "Adult Neurology",
    "Palliative Care",
    "Physician/Internal Medicine",
    "Physician/Gastroenterology/Hepatology/Endoscopist",
    "Physician/Nephrology",
    "Psychiatry & Mental Health",
    "Radiation Oncology",
    "Adult Rheumatology",
    "Radiology & Ultrasonography",
    "Cardiothoracic Surgery",
    "ENT Surgery/ENT, Head and Neck Surgery",
    "ENT, Head and Neck Surgery",
    "General & Breast Surgery",
    "General Surgery",
    "General Surgery & Urology",
    "Neurosurgery",
    "Ophthalmology",
    "Oral & Maxillofacial Surgery",
    "Orthopaedic & Spine Surgery",
    "Orthopaedic Surgery",
    "Paediatric Surgery",
    "Plastic Surgery",
    "Urologist",
    "Emergency Medicine Physician",
    "Family Medicine Physician",
    "Internal Medicine",
    "Internal medicine and palliative care",
    "Nephrology",
    "Paediatrics Neonatology",
    "General surgery and Hepatobiliary surgery",
    "Vascular and Endovascular Surgery",
    "Anaesthesia and critical care",
    "Chest/pulmonology/critical care",
    "Critical care",
    "Obstetrics/Gynaecology/laparoscopic surgery",
    "Obstetrics/Gynaecology/Gyn-oncology",
    "Paediatrics & Child Health/Paediatrics Haemato-oncology",
    "Paediatrics & Child Health/Paediatrics Allergy/Paediatrics Pulmonology",
    "Paediatrics & Child Health/Paediatrics Adolescent/Paediatric Rheumatology",
    "Paediatrics & Child Health/Paediatrics Developmental clinic",
    "Paediatrics & Child Health/Paediatrics Neurology",
    "Pain Management",
    "Paediatrics Allergy",
    "Paediatrics Adolescent",
    "Paediatric Rheumatology",
    "Paediatrics Developmental",
    "Paediatrics Gastroenterology",
    "Obstetrics/Gynaecology/fertility",
    "Obstetrics/Gynaecology",
    "Obstetrics/Gynaecology/foetal medicine",
    "Obstetrics/Gynaecology/Urogynaecology",
    "Paediatrics & Child Health",
    "Paediatrics & Child Health/Paediatrics Cardiology",
    "Paediatrics & Child Health/Paediatrics Critical Care",
    "Paediatrics & Child Health/Paediatrics Endocrinology",
    "Paediatrics & Child Health/Paediatrics Gastroenterology",
    "Paediatrics Haemato-oncology",
    "Paediatrics & Child Health/Paediatrics Neonatology",
    "Paediatrics Nephrology",
    "Paediatrics Neurology",
    "Pathology",
    "Pathology/Microbiology",
    "Nuclear Medicine",
    "Physicist",
    "Radiology",
  ];

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch('http://127.0.0.1:8000/api/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit appointment');
      }

      const data = await response.json();
      setSuccessMessage(data.message || "Appointment successfully booked! You will receive further details about the doctor's availability and office location soon.");

      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        specialty: "",
        date: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting appointment:", error);
      setErrorMessage(error.message || "Failed to book appointment. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="flex flex-col justify-start">
            <div className="mb-8">
              <h1 className="mt-2 text-4xl font-bold text-gray-900 max-w-md">
                Book An Appointment Today!
              </h1>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Fill out the form below, and our team will get back to you promptly.
            </p>
            <br />
            <p className="text-gray-700 leading-relaxed">
              Your health is our priority. Whether you need to schedule a consultation, inquire about our medical services, or require urgent assistance, we are here to help.
            </p>

            <img
              src={hero}
              alt="Customer support illustration"
              className="mt-6 rounded-lg shadow-lg w-full max-w-md object-cover"
            />
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
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm placeholder-gray-400"
                  required
                >
                  {allSpecialties.map((specialty, index) => (
                    <option key={index} value={specialty} className="placeholder-gray-400">
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
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                  placeholder="E.g., I have a dietary restriction (gluten-free) and want to discuss meal plan options."
                  rows={4}
                  maxLength={500}
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.message.length}/500 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
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

        {/* Responsive Map Container */}
        <div className="mt-8 md:mt-12 mb-2 w-full overflow-hidden rounded-lg shadow-lg">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.550187277588!2d34.75203497496488!3d-0.6642608993292571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182b3bbe718061cf%3A0x644f6a26efe0ae5b!2sBosongo%20Hospital%2C%20Kisii!5e0!3m2!1sen!2ske!4v1743065353405!5m2!1sen!2ske"
              className="w-full h-64 md:h-80 lg:h-96"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bosongo Hospital"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;