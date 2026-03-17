import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API yaha connect hoga
    console.log("Reset password for:", email);

    setMessage("Reset link sent to your email.");
  };

  return (
    <div className="max-w-md mx-auto">

      <h2 className="text-xl font-semibold mb-4">
        Forgot Password
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Enter your registered email to receive a password reset link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Send Reset Link
        </button>

      </form>

      {message && (
        <p className="text-green-600 mt-4 text-sm">
          {message}
        </p>
      )}

    </div>
  );
};

export default ForgotPassword;