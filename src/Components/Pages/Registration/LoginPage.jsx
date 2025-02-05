import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold">Hey,</h1>
          <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-gray-500 mb-6">We are very happy to see you back!</p>

          <label className="block mb-2 text-gray-700">E-mail</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mb-2 text-gray-700">Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="•••••••••"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-2">Must contain 8 characters.</p>

          <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4 hover:bg-blue-600">
            Login
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center border p-3 rounded-lg hover:bg-gray-100">
            <FaGoogle className="mr-2" /> Continue with Google
          </button>

          <p className="text-gray-500 mt-4">
            Don't have an account? <a href="#" className="text-blue-500">Sign Up here!</a>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-blue-100 flex justify-center items-center">
        <div className="relative flex flex-col items-center text-center">
          <img
            src="/login.png"
            alt="Illustration"
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
}
