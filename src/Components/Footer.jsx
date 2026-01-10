import React from "react";
import { Phone, Clock, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo3.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">

      {/* Main Footer */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start">

          {/* Logo & Brand */}
          
<div className="flex flex-col items-center md:items-start space-y-4">
  <img
    src={logo}
    alt="Ultracare Specialist Hospital"
    className="h-24 w-auto object-contain"
  />

  <div className="text-center md:text-left md:ml-7">
    <h2 className="text-lg font-bold text-teal-700">ULTRACARE</h2>
    <p className="text-teal-600 font-medium">Specialist Hospital</p>
    <p className="text-gray-500 text-sm mt-2 max-w-xs">
      Hearts that Care
    </p>
  </div>
</div>


                    {/* Map */}
<div className="flex flex-col md:w-[95%] md:-translate-x-6 lg:w-[92%] lg:-translate-x-10">
  <h3 className="text-base font-semibold text-gray-800 mb-4 text-center">
    Find Us
  </h3>

  <div className="overflow-hidden rounded-xl border border-gray-200">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.817776472679!2d36.35423347349351!3d0.02991636439928671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1787630044c19569%3A0x79b7f84de6c2fbb6!2sUltracare%20Specialist%20Hospital!5e0!3m2!1sen!2sus!4v1767988769696!5m2!1sen!2sus"
      className="w-full h-56 md:h-60"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Ultracare Specialist Hospital Location"
    />
  </div>
</div>


{/* Links + Contact */}
<div className="flex flex-col gap-10 md:ml-3">

  {/* Quick Links */}
<div className="text-center md:text-left md:ml-7">
  <h3 className="text-base font-semibold text-gray-800 mb-4 md:ml-5">
    Quick Links
  </h3>

  <nav className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 text-sm">
    <div className="flex flex-col space-y-3 mr-6">
      <Link to="/" className="text-teal-600 hover:text-teal-700">
        Home
      </Link>
      <Link to="/about" className="text-teal-600 hover:text-teal-700">
        About
      </Link>
      <Link to="/services" className="text-teal-600 hover:text-teal-700">
        Services
      </Link>
    </div>
    
    <div className="flex flex-col space-y-3">
      <Link to="/careers" className="text-teal-600 hover:text-teal-700">
        Careers
      </Link>
      <Link to="/contact" className="text-teal-600 hover:text-teal-700">
        Contact Us
      </Link>
      
    </div>
  </nav>
</div>
  {/* Contact Info */}
  <div className="text-center md:text-left">
    <h3 className="text-base font-semibold text-gray-800 mb-4">
      Contact
    </h3>

    <div className="space-y-3 text-sm text-teal-600">
      <div className="flex items-start gap-2 justify-center md:justify-start">
        <MapPin size={16} />
        <span>Ultracare Specialist Hospital, Nyahururu</span>
      </div>
      <div className="flex items-center gap-2 justify-center md:justify-start">
        <Phone size={16} />
        <span>0702-761-696</span>
      </div>
      <div className="flex items-center gap-2 justify-center md:justify-start">
        <Mail size={16} />
        <a href="mailto:ultracarespecialisthospital@gmail.com">
          ultracarespecialisthospital@gmail.com
        </a>
      </div>
      <div className="flex items-center gap-2 justify-center md:justify-start">
        <Clock size={16} />
        <span>Mon–Sun: 24 Hours</span>
      </div>
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
