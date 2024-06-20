import axios from "axios";
import React, { useState } from "react";

const Arrowup = ({ id }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async (e) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    const body = { type: "up" };

    e.preventDefault();
    try {
      const res = await axios.post(
        `https://faithhub-skripsi-backend.vercel.app/api/question/vote/${id}`,
        body,
        config
      );
      console.log(res);
      if (res.status === 200) {
        setIsClicked(true); // Update state to indicate it's clicked
        alert("Upvoted successfully");
      } else {
        alert("You have already upvoted");
      }
    } catch (err) {
      console.log(err);
      alert("You have already upvoted");
    }
  };

  const iconColor = isClicked ? "text-blue-800" : "dark:text-white"; // Change color based on state

  return (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-4 h-4 md:w-5 md:h-5 cursor-pointer ${iconColor}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </svg>
  );
};

export default Arrowup;
