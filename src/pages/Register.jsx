import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMerchant, setIsMerchant] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { name, email, password, isMerchant };

    try {
      // try backend first
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        await res.json();
        alert('Registered successfully. Please log in.');
        navigate('/login');
        return;
      }

      // fallback to local users storage
      const stored = JSON.parse(localStorage.getItem('users') || '[]');
      if (stored.find(u => u.email === email)) throw new Error('User already exists');

      const newUser = { id: Date.now(), name, email, password, isMerchant };
      stored.push(newUser);
      localStorage.setItem('users', JSON.stringify(stored));

      alert('Registered locally. Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Could not register');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gray-100    flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">
        <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
        <p className="text-gray-600">Join us today</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Full Name"
        className="w-full py-3 px-4 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <div className="flex items-center gap-2 w-full">
          <span className="py-3 px-4 bg-gray-200 border rounded-lg text-gray-700">
            +91
          </span>
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full py-3 px-4 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="w-full py-3 px-4 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Create Password"
        className="w-full py-3 px-4 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input 
        type="confirm password"
        placeholder="Confirm Password"
        className="w-full py-3 px-4 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <label className="flex items-center gap-2 mt-2 text-sm">
          <input type="checkbox" checked={isMerchant} onChange={(e) => setIsMerchant(e.target.checked)} />
          <span>Register as a merchant</span>
        </label>

        <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        >
        {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
        <p className="text-center text-sm text-gray-700">
        Already have an account?{" "}
        <Link
        to="/login"
        className="font-semibold text-indigo-600 hover:text-indigo-800"
        >
        Log in
        </Link>
      </p>
    </div>
  </div>
  );
};


export default Register;