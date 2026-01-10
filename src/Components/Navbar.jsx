import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-teal-600 flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 mr-2" />
          <span className="whitespace-nowrap">ULTRACARE HOSPITAL</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-teal-600 transition-colors">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-teal-600 transition-colors">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-teal-600 transition-colors">Services</Link>
          <Link to="/contact" className="text-gray-700 hover:text-teal-600 transition-colors">Contact</Link>
          <Link to="/careers" className="text-gray-700 hover:text-teal-600 transition-colors">Careers</Link>
        </div>

        {/* Appointment Button */}
        <button
          onClick={() => navigate("/contact")}
          className="hidden md:block bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Book Appointment
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden absolute right-4 top-4 z-50 bg-white p-2 rounded-md shadow-md border border-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Sidebar for Mobile */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg p-6 z-50">
          <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
            <X size={30} />
          </button>
          <div className="flex flex-col space-y-4 mt-10">
            <Link to="/" className="text-gray-700 hover:text-teal-600 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-teal-600 transition-colors" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/services" className="text-gray-700 hover:text-teal-600 transition-colors" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/contact" className="text-gray-700 hover:text-teal-600 transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/careers" className="text-gray-700 hover:text-teal-600 transition-colors" onClick={() => setIsOpen(false)}>Careers</Link>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/contact");
            }}
            className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Book Appointment
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
