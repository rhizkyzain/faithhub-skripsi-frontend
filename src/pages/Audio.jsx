import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { FaPlay, FaPause } from 'react-icons/fa';
import Loading from "../components/Loading";

const Audio = () => {
  const [audioList, setAudioList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: "Bearer " + token } };
        const response = await axios.get('https://faithhub-skripsi-backend.vercel.app/api/question/getAudioContent', config);
        setAudioList(response.data);
      } catch (error) {
        console.error('Error fetching audio:', error);
        setError('Error fetching audio');
      } finally {
        setLoading(false);
      }
    };

    fetchAudio();
  }, []);

  useEffect(() => {
    if (selectedAudio && isPlaying) {
      audioRef.current.play();
    } else if (selectedAudio && !isPlaying) {
      audioRef.current.pause();
    }
  }, [selectedAudio, isPlaying]);

  const handlePlayPause = (audioUrl) => {
    if (selectedAudio === audioUrl) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedAudio(audioUrl);
      setIsPlaying(true);
    }
  };

  if (loading) {
    return <Loading />
  }
  if (error) return <div>{error}</div>;

  return (
    <div className="md:w-[60%] flex flex-col items-center gap-y-5 md:gap-1 my-8">
      <Toaster />
      {audioList.length === 0 ? (
        <div className="w-full flex justify-center p-4 text-gray-500 dark:text-gray-300">No audio available</div>
      ) : (
        audioList.map((audio, index) => (
          <div key={index} className="w-full md:w-[80%] mx-4 flex flex-col items-start p-2 rounded-md bg-black-100 dark:bg-slate-400">
            <div className="w-full bg-white dark:bg-[#1E212A] p-2 md:p-3 rounded-lg shadow-md flex items-center justify-between border-2 hover:bg-gray-200 transition-all hover:scale-105">
              <div className="flex flex-col">
                <h1 className="text-md md:text-lg dark:text-white">{audio.audioDetail.audioTitle}</h1>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-300">Duration: {audio.audioDetail.duration}</div>
              </div>
              <button 
                onClick={() => handlePlayPause(audio.audioDetail.url)} 
                className="w-10 h-10 bg-gray-200 text-black rounded-full hover:bg-gray-400 flex items-center justify-center"
                >
                {selectedAudio === audio.audioDetail.url && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
            </div>
          </div>
        ))
      )}
      {selectedAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E212A] p-4 shadow-lg flex items-center justify-between">
          <audio
            ref={audioRef}
            src={selectedAudio}
            className="w-full"
            controls
            onEnded={() => setIsPlaying(false)}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default Audio;
