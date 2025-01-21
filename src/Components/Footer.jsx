import React from "react";
import { Phone, Clock } from "lucide-react";
import Logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={Logo}
                alt="Insure Logo"
                className="h-8 w-auto" // This maintains aspect ratio
              />
            </div>
            <button className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Get a Quotation
            </button>
          </div>
          
        </div>

        {/* Links Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg mb-4">LINKS</h3>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:text-blue-200 transition-colors">
              About us
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Expert Team
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Pricing Package
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              FAQs
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Blog / News
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Contact us
            </a>
          </nav>
        </div>

        {/* Our Services Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg mb-4">OUR SERVICES</h3>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:text-blue-200 transition-colors">
              Quality Assurance Consulting
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Regulatory Affairs Consulting
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Finance Affairs Consulting
            </a>
          </nav>
        </div>

        {/* Social Network Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg mb-4">SOCIAL NETWORK</h3>
          {/* Social Icons */}
          <div className="flex space-x-4 mb-6">
            <a
              href="#"
              className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
            >
              <div className="h-4 w-4 bg-blue-900 rounded-full"></div>
            </a>
            <a
              href="#"
              className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
            >
              <div className="h-4 w-4 bg-blue-900 rounded-full"></div>
            </a>
            <a
              href="#"
              className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
            >
              <div className="h-4 w-4 bg-blue-900 rounded-full"></div>
            </a>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="font-medium">GET IN TOUCH</h4>
            <a
              href="mailto:info@insure.com"
              className="block hover:text-blue-200"
            >
              info@insure.com
            </a>
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>844-433-7646</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>Mon-Fri, 24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
