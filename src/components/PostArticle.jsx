import React, { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import JoditEditor from "jodit-react";

const CreateArticle = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [newDescription, setNewDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, tags } = e.target;
    const body = {
      articleTitle: title.value,
      description: newDescription,
      tags: tags.value.split(","),
    };
    
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.post(
        `https://faithhub-skripsi-backend.vercel.app/api/article/createArticle`,
        body,
        config
      );
      if (res.status === 201) {
        toast.success("Article added successfully", { duration: 2000 });
        setTimeout(() => {
          navigate("/article");
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting article:", error);
      toast.error("Failed to add article. Please try again later.");
    }
  };

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter your article content here...",
      buttons: [
        "bold",
        "italic",
        "ul",
        "ol",
        "link",
        "underline",
        "font",
        "align",
        "fontsize",
        "redo",
        "undo",
        "image",
      ],
    }),
    []
  );

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="h-full md:w-[50%]">
      <Toaster />
      <div className="md:mx-12 flex flex-col items-center gap-4 mb-12 border-2 border-gray-300 p-4 pb-6 rounded-md bg-white-300 dark:bg-[#1E212A] mt-12 shadow-md">
        <h1 className="text-2xl font-bold text-center text-blue-600">Create an Article</h1>
        <form onSubmit={handleSubmit} className="form w-full">
          <div className="title">
            <label className="text-gray-800 text-start dark:text-white">Article Title</label>
            <input
              name="title"
              className="mt-2 w-full h-10 px-3 rounded outline-none border-2 border-gray-300 shadow-sm"
              type="text"
            />
          </div>
          <div className="content mt-3">
            <label className="text-gray-800 text-start dark:text-white">Article Content</label>
            <div style={{ width: "100%" }}>
              <JoditEditor
                value={newDescription}
                config={editorConfig}
                onChange={(content) => setNewDescription(content)}
              />
            </div>
          </div>
          <div className="tags mt-3">
            <label className="text-gray-800 text-start dark:text-white">Tags</label>
            <input
              name="tags"
              placeholder="Enter tags separated by comma"
              className="mt-2 w-full h-10 px-3 rounded outline-none border-2 border-gray-300 shadow-sm"
              type="text"
            />
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              className="w-[150px] text-center flex justify-center items-center gap-2 bg-purple-700 rounded-md shadow-sm px-4 py-2 cursor-pointer hover:bg-blue-900 transition-all active:bg-blue-800"
            >
              <span className="text-white">Create Article</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-[150px] text-center flex justify-center items-center gap-2 bg-gray-600 rounded-md shadow-sm px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all active:bg-gray-800"
            >
              <span className="text-white">Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
