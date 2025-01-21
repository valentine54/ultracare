import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";
import logo from "../assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Helper function to determine if a link is active
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
                <Link
                  to="/insurance"
                  className={
                    isActive("/insurance")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }
                >
                  Insurance
                </Link>
                <Link
                  to="/pension"
                  className={
                    isActive("/pension")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }
                >
                  Pension
                </Link>
                <Link
                  to="/money"
                  className={
                    isActive("/money")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }
                >
                  Money
                </Link>
                <Link
                  to="/utility"
                  className={
                    isActive("/utility")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }
                >
                  Utility
                </Link>
                <Link
                  to="/blogs"
                  className={
                    isActive("/blogs")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }
                >
                  Blog
                </Link>
                <Link
                  to="/contact"
                  className={
                    isActive("/contact")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
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

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden z-50">
              <div className="flex flex-col p-4">
                <Link
                  to="/insurance"
                  className={
                    isActive("/insurance")
                      ? "py-2 text-blue-600 font-medium"
                      : "py-2 text-gray-600"
                  }
                >
                  Insurance
                </Link>
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
