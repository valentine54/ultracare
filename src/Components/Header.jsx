import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X, Menu } from "lucide-react";
import logo from "../assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const insuranceCategories = {
    VEHICLE: [
      { title: "Van insurance", path: "/car-insurance" }, // Updated path
      { title: "Motorbike insurance", path: "/vehicle/motorbike" },
      { title: "Caravan insurance", path: "/vehicle/caravan" },
      { title: "Bicycle insurance", path: "/vehicle/bicycle" },
      { title: "Moped & scooter insurance", path: "/vehicle/moped" },
      { title: "Fleet insurance", path: "/vehicle/fleet" },
    ],
    "LIFE & HEALTH": [
      { title: "Life insurance", path: "/life/insurance" },
      { title: "Health insurance", path: "/life/health" },
      {
        title: "Life & critical illness cover",
        path: "/life/critical-illness",
      },
      { title: "Over 50s life insurance", path: "/life/over-50s" },
      { title: "Family health insurance", path: "/life/family-health" },
    ],
    "INCOME PROTECTION": [
      { title: "Income protection insurance", path: "/income/protection" },
      {
        title: "Accident, sickness & unemployment",
        path: "/income/accident-sickness",
      },
      { title: "Redundancy insurance", path: "/income/redundancy" },
      { title: "Unemployment insurance", path: "/income/unemployment" },
      { title: "Mortgage protection insurance", path: "/income/mortgage" },
    ],
    PET: [
      { title: "Pet insurance", path: "/pet/insurance" },
      { title: "Dog insurance", path: "/pet/dog" },
      { title: "Cat insurance", path: "/pet/cat" },
      { title: "Lifetime pet insurance", path: "/pet/lifetime" },
      { title: "Time limited pet insurance", path: "/pet/time-limited" },
    ],
    "TOOLS & GUIDES": [
      { title: "Northern Ireland van insurance", path: "/guides/ni-van" },
      { title: "Life insurance calculator", path: "/guides/life-calculator" },
      { title: "Types of life insurance", path: "/guides/life-types" },
      { title: "How much does pet insurance cost?", path: "/guides/pet-cost" },
      { title: "Pet insurance guides", path: "/guides/pet" },
    ],
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsInsuranceOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full flex border-b border-gray-200">
      <div className="w-64 border-r border-gray-200">
        <Link to="/" className="p-4 h-full flex items-center">
          <img src={logo} alt="Insure Logo" className="h-12" />
        </Link>
      </div>

      <div className="flex-1">
        {/* Top bar */}
        <div className="hidden md:flex items-center border-b border-gray-200">
          <div className="font-bold flex items-center divide-x divide-gray-200">
            <a
              href="mailto:info@company.com"
              className="font-bold px-6 py-2 text-gray-600 text-sm hover:text-blue-600"
            >
              ✉️ info@company.com
            </a>
            <a
              href="tel:011-112-8596"
              className="px-6 py-2 text-gray-600 text-sm hover:text-blue-600"
            >
              📞 011-112-8596
            </a>
            <span className="px-6 py-2 text-gray-600 text-sm">
              🕒 Mon-Sun 24 hours
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="relative flex items-stretch">
          <div className="flex-1 py-4 flex justify-between items-center">
            {/* Desktop Menu */}
            <div className="hidden md:flex flex-1">
              <div className="font-bold flex justify-between w-full space-x-8 px-12">
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setIsInsuranceOpen(!isInsuranceOpen)}
                    className={`flex items-center space-x-1 ${
                      isActive("/insurance")
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <span>Insurance</span>
                  </button>

                  {isInsuranceOpen && (
                    <div className="absolute left-0 mt-2 w-screen max-w-6xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <div className="grid grid-cols-5 gap-8 p-8">
                        {Object.entries(insuranceCategories).map(
                          ([category, items]) => (
                            <div key={category}>
                              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                                {category}
                              </h3>
                              <ul className="space-y-3">
                                {items.map((item) => (
                                  <li key={item.title}>
                                    <Link
                                      to={item.path}
                                      className="text-gray-600 hover:text-blue-600 block text-sm"
                                      onClick={() => setIsInsuranceOpen(false)}
                                    >
                                      {item.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Rest of the navigation links */}
                <Link
                  to="/pension"
                  className={
                    isActive("/pension")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-blue-600"
                  }
                >
                  Pension
                </Link>
                <Link
                  to="/money"
                  className={
                    isActive("/money")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-blue-600"
                  }
                >
                  Money
                </Link>
                <Link
                  to="/utility"
                  className={
                    isActive("/utility")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-blue-600"
                  }
                >
                  Utility
                </Link>
                <Link
                  to="/blogs"
                  className={
                    isActive("/blogs")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-blue-600"
                  }
                >
                  Blog
                </Link>
                <Link
                  to="/contact"
                  className={
                    isActive("/contact")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-blue-600"
                  }
                >
                  Contact us
                </Link>
              </div>
            </div>

            {/* Sign In Button + Mobile Menu Button */}
            <div className="font-bold flex items-center">
              <Link
                to="/signin"
                className="hidden md:block bg-blue-600 text-white px-7 py-2 rounded-lg hover:bg-blue-700 mx-6"
              >
                Sign In
              </Link>
              <button
                className="md:hidden p-4 hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu with Insurance Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden z-50">
              <div className="flex flex-col p-4">
                <button
                  onClick={() => setIsInsuranceOpen(!isInsuranceOpen)}
                  className={`flex items-center justify-between py-2 ${
                    isActive("/insurance")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  <span>Insurance</span>
                </button>

                {isInsuranceOpen && (
                  <div className="pl-4 pb-2">
                    {Object.entries(insuranceCategories).map(
                      ([category, items]) => (
                        <div key={category} className="mb-4">
                          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                            {category}
                          </h3>
                          <ul className="space-y-2">
                            {items.map((item) => (
                              <li key={item.title}>
                                <Link
                                  to={item.path}
                                  className="text-gray-600 hover:text-blue-600 block text-sm py-1"
                                  onClick={() => {
                                    setIsInsuranceOpen(false);
                                    setIsOpen(false);
                                  }}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* Rest of mobile menu items */}
                <Link
                  to="/pension"
                  className={
                    isActive("/pension")
                      ? "py-2 text-blue-600 font-medium"
                      : "py-2 text-gray-600"
                  }
                >
                  Pension
                </Link>
                <Link
                  to="/money"
                  className={
                    isActive("/money")
                      ? "py-2 text-blue-600 font-medium"
                      : "py-2 text-gray-600"
                  }
                >
                  Money
                </Link>
                <Link
                  to="/utility"
                  className={
                    isActive("/utility")
                      ? "py-2 text-blue-600 font-medium"
                      : "py-2 text-gray-600"
                  }
                >
                  Utility
                </Link>
                <Link
                  to="/blogs"
                  className={
                    isActive("/blogs")
                      ? "py-2 text-blue-600 font-medium"
                      : "py-2 text-gray-600"
                  }
                >
                  Blog / News
                </Link>
                <Link
                  to="/contact"
                  className={
                    isActive("/contact")
                      ? "py-2 text-blue-600 font-medium"
                      : "py-2 text-gray-600"
                  }
                >
                  Contact us
                </Link>
                <div className="h-px bg-gray-200 my-2"></div>
                <Link
                  to="/signin"
                  className="bg-blue-600 text-white text-center py-2 rounded-lg"
                >
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
