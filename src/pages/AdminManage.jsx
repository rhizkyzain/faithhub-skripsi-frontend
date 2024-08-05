import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from "../components/Loading";
import CreateAudio from '../components/CreateAudio';

const Manage = () => {
  const [questions, setQuestions] = useState([]);
  const [articles, setArticles] = useState([]);
  const [audio, setAudio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateAudio, setShowCreateAudio] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const questionsRes = await axios.get('https://faithhub-skripsi-backend.vercel.app/api/question/fetchAll', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(questionsRes.data);

        const articlesRes = await axios.get('https://faithhub-skripsi-backend.vercel.app/api/article/get/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticles(articlesRes.data);

        const audioRes = await axios.get('https://faithhub-skripsi-backend.vercel.app/api/question/getAudioContent', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAudio(audioRes.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (type, id) => {
    const token = localStorage.getItem('token');
    let url = '';
    switch (type) {
      case 'question':
        url = `https://faithhub-skripsi-backend.vercel.app/api/question/delete/${id}`;
        break;
      case 'article':
        url = `https://faithhub-skripsi-backend.vercel.app/api/article/deleteArticle/${id}`;
        break;
      case 'audio':
        url = `https://faithhub-skripsi-backend.vercel.app/api/question/deleteAudio/${id}`;
        break;
      default:
        return;
    }

    try {
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update local state based on type
      switch (type) {
        case 'question':
          setQuestions(questions.filter((q) => q.doubtDetails.questionId !== id));
          break;
        case 'article':
          setArticles(articles.filter((a) => a.articleDetails.articleId !== id));
          break;
        case 'audio':
          setAudio(audio.filter((a) => a.audioDetail.audioId !== id));
          break;
        default:
          break;
      }
    } catch (err) {
      console.error('Failed to delete content:', err);
      setError('Failed to delete content. Please try again.');
    }
  };

  const handleCreateAudio = () => {
    setShowCreateAudio(true);
  };

  const handleCloseCreateAudio = () => {
    setShowCreateAudio(false);
  };

  const refreshAudioList = async () => {
    const token = localStorage.getItem('token');
    try {
      const audioRes = await axios.get('https://faithhub-skripsi-backend.vercel.app/api/question/getAudioContent', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAudio(audioRes.data);
    } catch (err) {
      console.error('Failed to refresh audio list:', err);
      setError('Failed to refresh audio list. Please try again.');
    }
  };

  const handleAudioUploadSuccess = () => {
    refreshAudioList();
    handleCloseCreateAudio();
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white border-2 rounded-xl min-h-screen mt-10">
      <h1 className="text-3xl font-bold mb-6">Manage Content</h1>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
          {/* Questions Container */}
          <div className="bg-white border-2 rounded-lg p-6 relative max-w-full">
            <h2 className="text-xl font-semibold sticky top-16 bg-gray-100 py-2 px-4 border-b z-10">Questions</h2>
            <div className="h-[50vh] overflow-y-auto mt-2">
              {questions.length > 0 ? (
                questions.map((question) => (
                  <div key={question.doubtDetails.questionId} className="mb-4 p-4 border-b border-gray-300 flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{question.doubtDetails.questionTitle}</h3>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this question?')) {
                          handleDelete('question', question.doubtDetails.questionId);
                        }
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              ) : (
                <p>No questions available.</p>
              )}
            </div>
          </div>

          {/* Articles Container */}
          <div className="bg-white border-2 rounded-lg p-6 relative max-w-full">
            <h2 className="text-xl font-semibold sticky top-16 bg-gray-100 py-2 px-4 border-b z-10">Articles</h2>
            <div className="h-[50vh] overflow-y-auto mt-2">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <div key={article.articleDetails.articleId} className="mb-4 p-4 border-b border-gray-300 flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{article.articleDetails.articleTitle}</h3>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this article?')) {
                          handleDelete('article', article.articleDetails.articleId);
                        }
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              ) : (
                <p>No articles available.</p>
              )}
            </div>
          </div>

          {/* Audio Container */}
          <div className="bg-white border-2 rounded-lg p-6 relative max-w-full">
            <h2 className="text-xl font-semibold sticky top-16 bg-gray-100 py-2 px-4 border-b z-10">Audio</h2>
            <div className="flex justify-end mb-4">
            <button
            onClick={handleCreateAudio}
            className=" bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 text-sm"
            >
            Add Audio
            </button>

            </div>
            <div className="h-[50vh] overflow-y-auto mt-2">
              {audio.length > 0 ? (
                audio.map((audioItem) => (
                  <div key={audioItem.audioDetail.audioId} className="mb-4 p-4 border-b border-gray-300 flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{audioItem.audioDetail.audioTitle || 'Untitled'}</h3>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this audio?')) {
                          handleDelete('audio', audioItem.audioDetail.audioId);
                        }
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              ) : (
                <p>No audio available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Show Create Audio Popup */}
      {showCreateAudio && (
        <CreateAudio onSuccess={handleAudioUploadSuccess} onClose={handleCloseCreateAudio} />
      )}
    </div>
  );
};

export default Manage;
