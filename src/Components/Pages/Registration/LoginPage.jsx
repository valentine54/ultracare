import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link,useLocation,useNavigate } from "react-router-dom";
import Toast from "../../Toast/Toast"; // Import Toast component
import { Login } from "../../helper/insurances"
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handles form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(), // Trim input to avoid accidental spaces
    }));
  };

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };
  const url = location.pathname.includes("/login/org")
    ? "organisation"
    : "applicant";

  // Simulate API call for login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      showToast("All fields are required.", "error");
      return;
    }

    // if (password.length < 8) {
    //   showToast("Password must be at least 8 characters.", "error");
    //   return;
    // }

    setLoading(true);

    await Login(formData,showToast,setLoading,url,dispatch,navigate)
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
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
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-bold">Hey,</h1>
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-gray-500 mb-6">
              We are very happy to see you back!
            </p>

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <label className="block mb-2 text-gray-700">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Password Input */}
              <label className="block mb-2 text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="•••••••••"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <IoEyeOutline size={20} />
                  ) : (
                    <IoEyeOffOutline size={20} />
                  )}
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Must contain 8 characters.
              </p>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4 hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* OR Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Google Login Button */}
            <button className="w-full flex items-center justify-center border p-3 rounded-lg hover:bg-gray-100">
              <FaGoogle className="mr-2" /> Continue with Google
            </button>

            {/* Signup Link */}
            <p className="text-gray-500 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Sign Up here!
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section (Illustration) */}
        <div className="hidden md:flex w-1/2 bg-blue-100 justify-center items-center">
          <div className="relative flex flex-col items-center text-center">
            <img src="/login.png" alt="Illustration" className="max-w-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
