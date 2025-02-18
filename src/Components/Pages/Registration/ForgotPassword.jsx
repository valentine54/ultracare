import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    // Handle password reset logic here (e.g., send reset email)
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your email address and we will send you a password reset link.
        </p>

        <label className="block text-gray-700 mb-2">E-mail</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          Reset Password
        </button>

        <p className="text-center text-gray-500 mt-4">
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
