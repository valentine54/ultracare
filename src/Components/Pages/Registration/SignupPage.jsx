import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Icons for password toggle
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
// import { Link } from "react-router-dom"; 

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); // Create a navigate function

  // Function to handle the "Create Account" button click
  const handleCreateAccountClick = () => {
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="flex h-screen">
      {/* Left Section - Signup Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-gray-500 mb-6">
            We are very happy to see you back!
          </p>

          {/* Form */}
          <form className="space-y-4">
            {/* Name Fields */}
            
            <div className="flex space-x-4">
              <div className="w-1/2">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              </div>
              <div className="w-1/2">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              </div>
            </div>
            {/* Email & ID */}
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
              </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div className="w-full">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              ID
              </label>
            <input
              type="text"
              placeholder="ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            {/* Phone */}
            <div className="w-full">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
              </label>
            <input
              type="text"
              placeholder="+254700000000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              // defaultValue="+254700000000"
            />
            </div>
            {/* Password Fields */}
            <div className="w-full">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
              </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="•••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            </div>
            <div className="w-full">
              <label htmlFor="cfm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
              </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="•••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center space-x-2 text-sm">
              {/* <input type="checkbox" id="terms" className="cursor-pointer" /> */}
              <label htmlFor="terms" className="text-gray-500">
                By signing up, you are creating an Insure account, and you agree to our
                <a href="/terms-of-use" className="text-blue-500"> Terms of Use</a> and
                <a href="/privacy-policy" className="text-blue-500"> Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
              onClick={handleCreateAccountClick} // Trigger navigation on click
            >
              Create Account
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-1/2 bg-blue-100 flex justify-center items-center">
        <div className="relative flex flex-col items-center text-center">
          <img
            src="/signup-image.png"
            alt="Signup Illustration"
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;