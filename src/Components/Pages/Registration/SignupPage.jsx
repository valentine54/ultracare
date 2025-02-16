import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Toast from "../../Toast/Toast";
import { Signup } from "../../helper/insurances";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id_no: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handles form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(), // Trim input to avoid unnecessary spaces
    }));
  };

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure required fields are filled
    const {
      firstName,
      lastName,
      email,
      id_no,
      phone_number,
      password,
      confirmPassword,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !id_no ||
      !phone_number ||
      !password ||
      !confirmPassword
    ) {
      showToast("All fields are required.", "error");
      return;
    }

    // Validation: Passwords match
    if (password !== confirmPassword) {
      showToast("Passwords do not match. Please try again.", "error");
      return;
    }

    // Disable submission during API call
    setLoading(true);

    const userData = {
      firstName,
      lastName,
      email,
      password,
      id_no,
      phone_number,
    };

    await Signup(userData, showToast, setLoading);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* Toast Notification */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}

      <div className="rounded-2xl overflow-hidden p-4 w-full flex flex-col md:flex-row">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h1>
            <p className="text-gray-600 mb-8">
              We are very happy to see you here!
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID
                </label>
                <input
                  type="text"
                  name="id_no"
                  value={formData.id_no}
                  onChange={handleChange}
                  placeholder="ID"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="+254700000000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="•••••••••"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="•••••••••"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
              {/* Signup Link */}
              <p className="text-gray-500 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  Login here!
                </Link>
              </p>

              {/* Return to Login (for Signup Page) */}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
            {/* Google Login Button */}
            <button
              onClick={() => showToast("google comming soon", "info")}
              className="w-full flex items-center justify-center border p-3 rounded-lg my-4 hover:bg-gray-100"
            >
              <FaGoogle className="mr-2" /> Continue with Google
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-blue-100 p-8 hidden md:flex items-center justify-center">
          <img
            src="/signup-image.png"
            alt="Signup Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
