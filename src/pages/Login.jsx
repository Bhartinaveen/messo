import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let data;
      try {
        if (!BASE_URL) {
          throw new Error("API URL is not defined. Please check your .env file and ensure VITE_API_BASE_URL is set.");
        }

        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        // Safely check if response is JSON before parsing
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`Server error: Received non-JSON response (${res.status}). Ensure your backend is running at ${BASE_URL}`);
        }

        data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Login failed");
        }

        login({ user: data.user, token: data.token });

        // Remember Me
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        if (data.user.isAdmin) {
          navigate("/admin");
        } else if (data.user.isMerchant) {
          navigate("/merchant/dashboard");
        } else {
          navigate("/profile");
        }
        return;
      } catch (err) {
        const stored = JSON.parse(localStorage.getItem("users") || "[]");
        const user = stored.find(
          (s) => s.email === email && s.password === password
        );

        if (!user) throw err;

        login({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            isMerchant: !!user.isMerchant,
          },
          token: "local-token",
        });

        navigate(user.isMerchant ? "/merchant/dashboard" : "/profile");
        return;
      }
    } catch (err) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Backend OAuth connect karna hoga
    alert("Google Login integration required (OAuth setup needed)");
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen font-sans"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508779018996-1957a94ca61e?auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      <div className="min-h-screen flex items-center justify-center p-4 bg-black/40">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl p-8 space-y-6">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Log in to continue</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Email */}
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 left-3 text-xl">
                📧
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 left-3 text-xl">
                🔒
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className="w-full pl-10 pr-12 py-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="accent-indigo-600"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold 
              bg-gradient-to-r from-indigo-600 to-blue-500 hover:opacity-90"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white border rounded-lg hover:bg-gray-100 transition"
            >
              <FcGoogle size={22} />
              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

          </form>

          {/* Register */}
          <div className="text-center">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600"
              >
                Create one
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
