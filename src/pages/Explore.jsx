import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const Explore = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Replace with your actual backend URL and token logic
  const fetchTags = async () => {
    try {
      const token = localStorage.getItem('token'); // or however you store your token
      const response = await axios.get('https://faithhub-skripsi-backend.vercel.app/api/question/getAllTags', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const navigateToContent = (tag) => {
    navigate({
      pathname: "/",
      search: `?tags=${tag}`
    });
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div className="w-full md:w-[50%] text-center h-screen mt-8">
      <h1 className="text-xl text-gray-800 dark:text-white">Select A Topic To Explore</h1>
      <div className="grid grid-cols-3 md:grid-cols-4 mt-3 gap-4">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center cursor-pointer p-3 rounded-lg shadow-md border border-gray-600 transition-transform transform hover:scale-110 hover:bg-gray-500 bg-white" // Use Tailwind class bg-white for default background
              onClick={() => navigateToContent(tag)}
            >
              <h3 className="text-sm text-black">{tag}</h3>
            </div>
          ))
        ) : (
          <div>No tags available</div>
        )}
      </div>
    </div>
  );
};

export default Explore;
