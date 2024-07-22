import axios from "axios";
import React, { useState } from "react";

const Arrowdown = ({ id, voteType }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    const body = { type: "down" };
    const route = voteType === "question"
      ? `https://faithhub-skripsi-backend.vercel.app/api/question/vote/${id}`
      : `https://faithhub-skripsi-backend.vercel.app/api/article/vote/${id}`;
      
      
  
    e.preventDefault();

  
    e.preventDefault();
    try {
      const res = await axios.post(route, body, config);
      if (res.status === 200) {
        setIsClicked(true);
        alert("Downvoted successfully");
      } else {
        alert("You have already downvoted");
      }
    } catch (err) {
      console.log(err);
      alert("You have already downvoted");
    }
  };
  return (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4 md:w-5 md:h-5 cursor-pointer dark:text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
      />
    </svg>
  );
};

export default Arrowdown;
