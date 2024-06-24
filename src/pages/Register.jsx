import axios from "axios";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import logo from '../assets/Studio_Sodwe__1_-removebg-preview.png';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [religion, setReligion] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    setLoading(true);

    const user = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      religion,
    };

    try {
      const res = await axios.post('https://faithhub-skripsi-backend.vercel.app/api/auth/signup', user);

      if (res.status === 201) {
        toast.success("User registered successfully");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans text-gray-700 p-4">
      <Toaster />
      <div className="max-w-md w-full mx-auto shadow-lg p-8 relative mt-12 bg-white rounded-lg border-1 border-gray-300">
        <div className="bg-white w-28 h-28 border-3 border-blue-400 p-1.5 absolute left-0 right-0 mx-auto -top-16 rounded-full overflow-hidden">
          <img src={logo} alt="logo" className="w-full inline-block" />
        </div>
        <form>
          <h3 className="mt-4 text-2xl font-bold text-purple-950 dark:text-white mb-8 text-center">Register</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className={`w-full text-sm px-4 py-2 border rounded outline-none shadow-sm 
                  ${name ? 'bg-white' : 'bg-gray-100 focus:bg-transparent'}`}
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={`w-full text-sm px-4 py-2 border rounded outline-none shadow-sm 
                  ${email ? 'bg-white' : 'bg-gray-100 focus:bg-transparent'}`}
                required
                placeholder="Enter email"
              />
            </div>
            <div className="mt-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                name="password"
                className={`w-full text-sm px-4 py-2 border rounded outline-none shadow-sm pr-10 
                  ${password ? 'bg-white' : 'bg-gray-100 focus:bg-transparent'}`}
                required
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-9 right-0 pr-3 flex items-center text-sm leading-5 "
                tabIndex={-1} // Prevents button from being focusable
              >
                {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
              </button>
            </div>
            <div className="mt-4 relative">
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-white">Confirm Password</label>
              <input
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                type={showConfirmPassword ? "text" : "password"} // Toggle input type based on showConfirmPassword state
                name="password_confirmation"
                className={`w-full text-sm px-4 py-2 border rounded outline-none shadow-sm pr-10 
                  ${passwordConfirmation ? 'bg-white' : 'bg-gray-100 focus:bg-transparent'}`}
                required
                placeholder="Enter password confirmation"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-9 right-0 pr-3 flex items-center text-sm leading-5 "
                tabIndex={-1} // Prevents button from being focusable
              >
                {showConfirmPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
              </button>
            </div>
            <div className="mt-4">
              <label htmlFor="religion" className="block text-sm font-medium text-gray-700 dark:text-white">Religion</label>
              <select
                onChange={(e) => setReligion(e.target.value)}
                value={religion}
                name="religion"
                className="border border-purple-200 mt-2 w-full h-10 px-3 rounded outline-none shadow-sm"
              >
                <option value="">Select Religion</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 px-4 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ minWidth: '10rem' }} // Ensure a minimum width
             >
              {loading && (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 3.042 1.135 5.821 3 7.938l3-2.647z" />
                </svg>
              )}
              {loading ? 'Registering...' : 'REGISTER'}
            </button>

          </div>

          <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-400">
            Already have an account? <a href="/login" className="text-blue-500 dark:text-white hover:underline">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
