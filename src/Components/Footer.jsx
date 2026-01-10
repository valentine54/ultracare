import React from "react";
import { Phone, Clock, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo3.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">

      {/* Main Footer */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Logo & Brand */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src={logo}
              alt="Ultracare Specialist Hospital"
              className="h-24 w-auto object-contain"
            />

            <div className="text-center md:text-left">
              <h2 className="text-lg font-bold text-teal-700">
                ULTRACARE
              </h2>
              <p className="text-teal-600 font-medium">
                Specialist Hospital
              </p>
              <p className="text-gray-500 text-sm mt-2 max-w-xs">
                Hearts that Care
              </p>
            </div>
          </div>

          {/* Quick Links */}
<div className="flex flex-col items-start ml-6">
  <h3 className="text-base font-semibold text-gray-800 mb-4">
    Quick Links
  </h3>

  <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
    <Link to="/" className="text-teal-600 hover:text-teal-600 transition">
      Home
    </Link>
    <Link to="/contact" className="text-teal-600 hover:text-teal-600 transition">
      Contact Us
    </Link>

    <Link to="/about" className="text-teal-600 hover:text-teal-600 transition">
      About
    </Link>
    <Link to="/careers" className="text-teal-600 hover:text-teal-600 transition">
      Careers
    </Link>

    <Link to="/services" className="text-teal-600 hover:text-teal-600 transition">
      Services
    </Link>
  </nav>
</div>


          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-teal-600">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-teal-800" />
                <span>Ultracare Specialist Hospital, Nyahururu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-teal-800" />
                <span>0702-761-696</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-teal-800" />
                <a
                  href="mailto:ultracarespecialisthospital@gmail.com"
                  className="hover:text-teal-600 transition"
                >
                  ultracarespecialisthospital@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-teal-800" />
                <span>Mon–Sun: 24 Hours</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-100">
        © {new Date().getFullYear()} Insur. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
