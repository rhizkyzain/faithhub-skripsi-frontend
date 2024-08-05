import React, { useState } from "react";
import Search from "../icons/Search";
import { useNavigate } from "react-router-dom";
import Hamburger from "../icons/Hamburger";
import Cancel from "../icons/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../context/sidebarSlice";
import Logout from "../icons/Logout";
import Dark from "../icons/Dark";
import Light from "../icons/Light";
import logo from '../assets/Studio_Sodwe__1_-removebg-preview.png';
// import axios from 'axios';

const Navbar = () => {
  const open = useSelector((state) => state.sidebar.open);
  const dark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Navigate to the search results page with the search query
      navigate(`/searchResults?query=${encodeURIComponent(searchQuery)}`);
    } catch (err) {
      console.error("Error searching questions:", err);
    }
  };

  return (
    <div
      className="fixed bg-white dark:bg-[#1E212A]
     top-0 left-0 right-0 z-10 h-14 shadow-md flex items-center justify-between
     px-4 md:px-20"
    >
      <div className="text-sm md:text-base font-bold text-purple-500 cursor-pointer flex items-center gap-4">
        <div
          onClick={() => dispatch(toggle())}
          className="transition-transform ease-linear duration-700 cursor-pointer"
        >
          {!open ? <Hamburger /> : <Cancel />}
          <img src={logo} alt="Logo" className="h-20" />
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex-grow mx-4 flex justify-center">
        <div className="relative w-100 "> {/* Set a fixed width for the search box */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-[#1E212A] dark:text-white"
            placeholder="Search questions..."
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Search />
          </button>
        </div>
      </form>

      <div className="flex items-center gap-3">
        {dark ? <Light /> : <Dark />}
        <Logout />
        <div className="hidden md:flex items-center gap-5">
          <div
            className="cursor-pointer text-sm md:text-base dark:text-white"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
