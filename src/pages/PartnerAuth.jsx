import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PartnerAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    shopName: "",
    shopAddress: "",
    gst: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (isLogin) {
      console.log("Partner Login:", formData, "Remember:", rememberMe);
      navigate("/partner-dashboard");
    } else {
      console.log("Partner Register:", formData);
      alert("Registration Successful!");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">

      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">

        {/* LEFT SIDE IMAGE (DESKTOP ONLY) */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df"
            alt="Shop"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-10">

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            {isLogin ? "Partner Login" : "Register as Shopkeeper"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />

                {/* PHONE WITH +91 PREFIX */}
              <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-indigo-400 overflow-hidden">
                
                <span className="px-3 bg-gray-100 text-gray-600 font-medium">
                  +91
                </span>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  maxLength="10"
                  value={formData.phone}
                  onChange={(e) => {
                    // Allow only numbers
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, phone: value });
                  }}
                  className="w-full px-4 py-3 outline-none"
                />
              </div>


                <input
                  type="text"
                  name="shopName"
                  placeholder="Shop Name"
                  required
                  value={formData.shopName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />

                <input
                  type="text"
                  name="shopAddress"
                  placeholder="Shop Address"
                  required
                  value={formData.shopAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />

                <input
                  type="text"
                  name="gst"
                  placeholder="GST Number (Optional)"
                  value={formData.gst}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </>
            )}

           {/* LOGIN MODE → Email OR Phone */}
              {isLogin ? (
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address or Phone Number"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              ) : (
                <>
                  {/* REGISTER MODE → EMAIL */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </>
              )}


            {/* PASSWORD WITH SHOW/HIDE */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={isLogin ? "Password" : "Create Password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none pr-12"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* CONFIRM PASSWORD WITH SHOW/HIDE */}
            {!isLogin && (
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none pr-12"
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            )}

            {isLogin && (
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

                <span className="text-indigo-600 cursor-pointer hover:underline">
                  Forgot Password?
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="text-center mt-6 text-sm">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
