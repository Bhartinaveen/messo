import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PartnerAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",

    businessType: "",
    panNumber: "",
    businessRegNumber: "",

    storeDisplayName: "",
    storeLogo: null,
    storeBanner: null,
    storeDescription: "",
    pickupAddress: "",
    returnAddress: "",

    accountHolder: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    cancelledCheque: null,

    panCard: null,
    aadhaarCard: null,
    gstCertificate: null,
    addressProof: null,

    gstin: "",
    hsn: "",
    taxSlab: "",

    warehouseAddress: "",
    pincode: "",
    courierPreference: "",
    shippingType: "",

    acceptTerms: false,
    acceptPolicy: false,
    acceptRefundPolicy: false,

    status: "Pending"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "phone") {
  const onlyNums = value.replace(/\D/g, "");
  if (onlyNums.length <= 10) {
    setFormData({ ...formData, [name]: onlyNums });
  }
  return;
}

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Partner Login Logic
      console.log("Partner Login Attempt:", { email: formData.email, password: formData.password });
      
      // Simulate Authentication: In a real app, verify with backend.
      // We set flags in localStorage to satisfy protected route checks in /admin
      localStorage.setItem("isPartnerAuthenticated", "true");
      localStorage.setItem("userRole", "partner");
      localStorage.setItem("partnerEmail", formData.email);

      // Navigate to the Partner Dashboard
      navigate("/admin");
      return;
    }

    // Registration Logic
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (
      !formData.acceptTerms ||
      !formData.acceptPolicy ||
      !formData.acceptRefundPolicy
    ) {
      alert("Please accept all agreements.");
      return;
    }

    console.log("Seller Register:", formData);
    alert("Registration Submitted! Status: Pending Approval");

    // Reset registration-specific fields but keep email/password for immediate login convenience
    setFormData(prev => ({
      ...prev,
      confirmPassword: "",
      acceptTerms: false,
      acceptPolicy: false,
      acceptRefundPolicy: false
    }));

    setIsLogin(true);
    setStep(1);
  };

  const FileUpload = ({ label, name, required = false }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          type="file"
          name={name}
          onChange={handleChange}
          required={required}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex items-center justify-between px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:border-indigo-500 transition-all duration-200">
          <span className="text-gray-600 text-sm truncate">
            {formData[name] ? formData[name].name : "Click to upload file"}
          </span>

          <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-lg">
            Browse
          </span>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden border border-gray-200">

        <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-black/20">
          <img
            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df"
            alt="Shop"
            className="w-full h-full object-cover"
          />
        </div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">
            <p className="text-sm text-gray-500 mb-6">
            Start selling and grow your business with us.
          </p>
            {isLogin ? "Partner Login" : `Register - Step ${step}`}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* LOGIN SECTION */}
            {isLogin && (
              <div className="space-y-4">
                {/* Email */}
                <input
                  type="text"
                  name="email"
                  placeholder="Email or Phone"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Password */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {/* Remember Me + Forgot Password */}
                <div className="flex items-center justify-between text-sm mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-indigo-600 w-4 h-4"
                    />
                    <span className="text-gray-600">Remember Me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => alert("Forgot Password Clicked")}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                  Login
                </button>
              </div>
            )}


            {/* REGISTER STEPS */}

            {!isLogin && step === 1 && (
              <>
                <input 
                  name="name" 
                  placeholder="Full Name" 
                  required 
                  value={formData.name}
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" 
                />
                <input 
                  name="email" 
                  placeholder="Email" 
                  required 
                  value={formData.email}
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" 
                />
               <div className="flex">
                  <span className="flex items-center px-4 bg-gray-100 border border-r-0 rounded-l-lg text-gray-600 text-sm">
                    +91
                  </span>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    required
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Create Password" 
                  required 
                  value={formData.password}
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" 
                />
                <input 
                  type="password" 
                  name="confirmPassword" 
                  placeholder="Confirm Password" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" 
                />
              </>
            )}

            {!isLogin && step === 2 && (
              <>
                <input name="shopName" placeholder="Business / Store Name" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <select name="businessType" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none">
                  <option value="">Business Type</option>
                  <option>Individual</option>
                  <option>Sole Proprietorship</option>
                  <option>Partnership</option>
                  <option>Pvt Ltd</option>
                  <option>LLP</option>
                </select>
                <input name="panNumber" placeholder="PAN Number" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <input name="businessRegNumber" placeholder="Business Registration Number" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
              </>
            )}

            {!isLogin && step === 3 && (
              <>
                <input name="storeDisplayName" placeholder="Store Display Name" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <FileUpload label="Upload Store Logo" name="storeLogo" placeholder="Store Logo" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <FileUpload label="Upload Store Banner" name="storeBanner" placeholder="Store Banner" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <textarea name="storeDescription" placeholder="Store Description" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <input name="pickupAddress" placeholder="Pickup Address" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <input name="returnAddress" placeholder="Return Address" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
              </>
            )}

            {!isLogin && step === 4 && (
              <>
                <input name="accountHolder" placeholder="Account Holder Name" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <input name="bankName" placeholder="Bank Name" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <input name="accountNumber" placeholder="Account Number" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <input name="ifsc" placeholder="IFSC Code" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <FileUpload label="Upload Cancelled Cheque" type="file" name="cancelledCheque" placeholder="Cancelled Cheque" required onChange={handleChange} className="w-full px-4 py-3 border rounded-lg " />
              </>
            )}

            {!isLogin && step === 5 && (
              <>
                <FileUpload label="Upload PAN Card" type="file" name="panCard" placeholder="PAN Card" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <FileUpload label="Upload Aadhaar Card" type="file" name="aadhaarCard" placeholder="Aadhaar Card" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <FileUpload label="Upload GST Certificate" type="file" name="gstCertificate" placeholder="GST Certificate" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <FileUpload label="Upload Address Proof" type="file" name="addressProof" placeholder="Address Proof" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
              </>
            )}

            {!isLogin && step === 6 && (
              <>
                <input name="gstin" placeholder="GSTIN" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <input name="hsn" placeholder="HSN Code" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <input name="taxSlab" placeholder="Tax Slab %" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
              </>
            )}

            {!isLogin && step === 7 && (
              <>
                <input name="warehouseAddress" placeholder="Warehouse Address" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <input name="pincode" placeholder="Pincode" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <input name="courierPreference" placeholder="Courier Preference" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none" />
                <select name="shippingType" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none">
                  <option value="">Shipping Type</option>
                  <option>Self Shipping</option>
                  <option>Platform Shipping</option>
                </select>
              </>
            )}

           {!isLogin && step === 8 && (
            <div className="space-y-5 mt-4">
              
              {/* Accept Terms */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  onChange={handleChange}
                  required
                  className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition">
                  I agree to the <span className="text-blue-600 font-semibold">Terms & Conditions</span>
                </span>
              </label>

              {/* Accept Privacy Policy */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="acceptPolicy"
                  onChange={handleChange}
                  required
                  className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition">
                  I agree to the <span className="text-blue-600 font-semibold">Privacy Policy</span>
                </span>
              </label>

              {/* Accept Refund Policy */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="acceptRefundPolicy"
                  onChange={handleChange}
                  required
                  className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition">
                  I agree to the <span className="text-blue-600 font-semibold">Refund Policy</span>
                </span>
              </label>

            </div>
          )}

            {/* STEP BUTTONS */}
            {!isLogin && (
              <div className="flex justify-between mt-4">
                {step > 1 && (
                  <button type="button" onClick={prevStep} className="px-5 py-2.5 bg-gray-400 text-white rounded-xl shadow hover:shadow-md transition">
                    Previous
                  </button>
                )}

                {step < 8 ? (
                  <button type="button" onClick={nextStep} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl shadow hover:shadow-md transition">
                    Next
                  </button>
                ) : (
                  <button type="submit" className="px-5 py-2.5 bg-green-600 text-white rounded-xl shadow hover:shadow-md transition">
                    Submit
                  </button>
                )}
              </div>
            )}

          </form>

         <div className="text-center mt-6 text-sm">
          {isLogin ? (
            <>
              <span className="text-gray-600">
                Don’t have an account?{" "}
              </span>
              <button
                onClick={() => setIsLogin(false)}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <span className="text-gray-600">
                Already have an account?{" "}
              </span>
              <button
                onClick={() => {
                  setIsLogin(true);
                  setStep(1);
                }}
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