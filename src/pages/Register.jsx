import axios from "axios";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [religion, setReligion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

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
    }
  };

  return (
    <div className="">
      <Toaster />
      <div
        className="
      dark:bg-[#32353F]
      flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 "
      >
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold dark:text-white">FaithHub</h3>
          </a>
        </div>
        <div
          className="w-[80%] md:w-full bg-white dark:bg-[#1E212A] border rounded-md 
        px-6 py-4 mt-6 overflow-hidden  shadow-md sm:max-w-md"
        >
          <form>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium 
                text-gray-700 dark:text-white"
              >
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className="border border-purple-200 mt-2 w-full h-10 px-3 rounded 
                outline-none 
                   shadow-sm"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                className="border border-purple-200 mt-2 w-full h-10 px-3 rounded 
                outline-none 
                   shadow-sm"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="border border-purple-200 mt-2 w-full h-10 px-3 rounded 
                outline-none 
                   shadow-sm"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                type="password"
                name="password_confirmation"
                className="border border-purple-200 mt-2 w-full h-10 px-3 rounded 
                outline-none 
                   shadow-sm"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="religion"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Religion
              </label>
              <input
                onChange={(e) => setReligion(e.target.value)}
                type="text"
                name="religion"
                className="border border-purple-200 mt-2 w-full h-10 px-3 rounded 
                outline-none 
                shadow-sm"
              />
            </div>
            <div className="flex flex-col items-center justify-center mt-4">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 text-xs font-semibold 
                tracking-widest 
                text-white uppercase transition duration-150 ease-in-out 
                bg-purple-950 border border-transparent rounded-md 
                active:bg-gray-900 false"
              >
                Register
              </button>
              <a
                className="text-sm text-gray-600 underline hover:text-gray-900 pt-1"
                href="/login"
              >
                Already have an account? Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
