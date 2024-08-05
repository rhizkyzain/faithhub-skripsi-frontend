import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const CreateAudio = ({ onClose, onSuccess }) => {
  const [audioTitle, setAudioTitle] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!audioTitle || !tags || !file) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append('audioTitle', audioTitle);
    formData.append('tags', tags);
    formData.append('audio', file);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        'https://faithhub-skripsi-backend.vercel.app/api/question/uploadAudio',
        formData,
        config
      );

      if (response.status === 201) {
        toast.success('Audio uploaded successfully.');
        onSuccess(); // Refresh audio list
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
      toast.error('Failed to upload audio. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Toaster />
        <h2 className="text-2xl font-semibold mb-4">Upload New Audio</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Audio Title</label>
            <input
              type="text"
              value={audioTitle}
              onChange={(e) => setAudioTitle(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAudio;
