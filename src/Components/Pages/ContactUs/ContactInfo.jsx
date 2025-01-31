import React, { useState } from "react";
import { Phone, Mail } from "lucide-react";

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="flex flex-col justify-start">
            <div className="mb-12">
              <span className="text-sm font-medium uppercase tracking-wider text-gray-500">
                GET IN TOUCH
              </span>
              <h1 className="mt-2 text-4xl font-bold text-gray-900 max-w-md">
                Get Protected Now: Act with Insure Insurance
              </h1>
            </div>

            <div className="space-y-6">
              <div className="relative pb-4 mb-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  Contact Info
                </h2>
                <div className="absolute bottom-0 left-0 w-96 h-px bg-gray-200"></div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-800 rounded-lg">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Phone Number</span>
                  <a
                    href="tel:(254) 555-0123"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    (254) 555-0123
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-800 rounded-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Email Address</span>
                  <a
                    href="mailto:info@email.com"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    info@email.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
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
                <label
                  htmlFor="message"
                  className="block text-sm text-gray-600"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter Your Message"
                  rows={4}
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
