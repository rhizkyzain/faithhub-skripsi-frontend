import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import logo from '../assets/Studio_Sodwe__1_-removebg-preview.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post('https://faithhub-skripsi-backend.vercel.app/api/auth/login', user);

      if (res.status === 200) {
        const { token } = res.data;
        localStorage.setItem("token", token);
        toast.success("Logged in successfully");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("Something went wrong, please try again");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User not found");
        } else if (error.response.status === 401) {
          toast.error("Incorrect password");
        } else {
          toast.error("Something went wrong, please try again");
        }
      } else {
        toast.error("Something went wrong, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans text-gray-700 p-4">
      <Toaster />
      <div className="max-w-md w-full mx-auto shadow-lg p-8 relative mt-12 bg-white rounded-lg border-1 border-gray-500">
        <div className="bg-white w-28 h-28 border-3 border-blue-400 p-1.5 absolute left-0 right-0 mx-auto -top-14 rounded-full overflow-hidden">
          <img src={logo} alt="logo" className="w-full inline-block" />
        </div>
        <form className="mt-12" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-bold text-blue-500 mb-8 text-center">Login</h3>
          <div className="space-y-4">
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full text-sm px-4 py-2 border rounded outline-none shadow-sm 
                            ${email ? 'bg-white' : 'bg-gray-100 focus:bg-transparent'}`}
                required
                placeholder="Enter email"
              />
            </div>
            <div className="mt-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 3.042 1.135 5.821 3 7.938l3-2.647z" />
                </svg>
              )}
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
            <p className="text-sm mt-4 text-center">
              Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
