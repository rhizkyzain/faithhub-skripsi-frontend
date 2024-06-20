import React from "react";
import Add from "../icons/Add";
import { useNavigate } from "react-router-dom";



const CreateButton = ({ label, navigateTo }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(navigateTo)}
      className={`flex items-center gap-2 bg-blue-600 rounded-md shadow-sm px-7 py-4 cursor-pointer hover:bg-blue-900 transition-all active:bg-blue-800 `}
    >
      <Add />
      
      <span className="text-white">{label}</span>
    </div>
  );
  
};

export default CreateButton;
