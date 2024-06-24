import React from "react";
import { useNavigate } from "react-router-dom";

const discussionTopics = [
  "Keimanan",
  "Quran",
  "Hadis",
  "Fiqh",
  "Syariah",
  "Akhlak",
  "Tasawuf",
  "Tafsir",
  "Aqidah",
  "Ibadah",
  "Dakwah",
  "Doa",
  "Ulama",
  "Etika Islam",
  "Pendidikan Islam",
  "Ekonomi Syariah",
  "Haji",
  "Zakat",
  "Wakaf"
];

const Explore = () => {
  const navigate = useNavigate();

  const navigateToContent = (topic) => {
    navigate({
      pathname: "/",
      search: `?tags=${topic}`
    });
  };

  return (
    <div className="w-full md:w-[50%] text-center h-screen mt-8">
      <h1 className="text-xl text-gray-800 dark:text-white">Select A Topic To Explore</h1>
      <div className="grid grid-cols-3 md:grid-cols-4 mt-3 gap-4">
        {discussionTopics.map((topic, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer p-3 rounded-lg shadow-md border border-gray-600 transition-transform transform hover:scale-110 hover:bg-gray-500 bg-white" // Use Tailwind class bg-white for default background
            onClick={() => navigateToContent(topic)}
          >
            <h3 className="text-sm text-black">{topic}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
