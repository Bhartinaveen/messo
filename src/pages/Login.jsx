import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    let data;
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // persist via auth context (which also writes to localStorage)
      login({ user: data.user, token: data.token });

      // ADMIN vs USER REDIRECT
      if (data.user.isAdmin) {
        navigate('/admin');
      } else if (data.user.isMerchant) {
        navigate('/merchant/dashboard');
      } else {
        navigate('/profile');
      }
      return;
    } catch (err) {
      // fallback: check local users
      const stored = JSON.parse(localStorage.getItem('users') || '[]');
      const user = stored.find((s) => s.email === email && s.password === password);
      if (!user) {
        throw err;
      }

      // login locally
      login({ user: { id: user.id, name: user.name, email: user.email, isMerchant: !!user.isMerchant }, token: 'local-token' });
      if (user.isMerchant) {
        navigate('/merchant/dashboard');
      } else {
        navigate('/profile');
      }
      return;
    }
  } catch (err) {
    console.error(err);
    alert(err.message || "Login failed");
  } finally {
    setLoading(false);
  }
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Log in to continue</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 left-3 text-xl">📧</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 left-3 text-xl">🔒</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold 
              bg-gradient-to-r from-indigo-600 to-blue-500 hover:opacity-90"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-indigo-600">
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
