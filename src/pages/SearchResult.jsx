import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import UserInfo from "../components/UserInfo";
import NothingHere from "../components/Notfound";
import { Toaster } from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import Arrowup from "../icons/Arrowup";
import Arrowdown from "../icons/Arrowdown";
import { useQuery } from "react-query";


const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");
    const [openId, setOpenId] = useState([]);
    const [showContent, setShowContent] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);
    const navigate = useNavigate();
  
    const fetchSearchResults = async () => {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: "Bearer " + token } };
      const params = { query: query };
  
      try {
        const res = await axios.get('https://faithhub-skripsi-backend.vercel.app/api/question/searchContent', { params, ...config });
        return res.data;
      } catch (err) {
        console.error("Error fetching search results:", err);
        return { questions: [], articles: [] }; // Return empty arrays on error
      }
    };
  
    const { isLoading, data } = useQuery(["searchResults", query], fetchSearchResults);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimationFinished(true);
      }, 1000); // 1 second delay for the animation
  
      return () => clearTimeout(timer);
    }, []);
  
    useEffect(() => {
      if (animationFinished && !isLoading) {
        setShowContent(true);
      }
    }, [animationFinished, isLoading]);
  
    if (!showContent) {
      return (
        <div className="md:w-[60%] flex flex-col items-center gap-y-5 md:gap-1 my-8">
          <Toaster />
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-[96%] md:w-[80%] mx-12 flex flex-col items-end p-3 md:p-1 rounded-md bg-black-100 dark:bg-slate-400">
              <div className="w-full bg-white dark:bg-[#1E212A] p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5 border-2 animate-pulse">
                <div className="left-section space-y-1 text-center">
                  <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                </div>
                <div className="right-section w-full space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  
    const hasQuestions = data?.questions && data?.questions.length > 0;
    const hasArticles = data?.articles && data?.articles.length > 0;
  
    if (!hasQuestions && !hasArticles) {
      return <NothingHere />;
    }
  
    return (
      <div className="md:w-[60%] flex flex-col items-center gap-y-5 md:gap-1 my-8">
        <Toaster />
        {hasQuestions && (
          <>
            {data.questions.map((question, index) => (
              <div
                key={index}
                className="w-[96%] md:w-[80%] mx-12 flex flex-col items-end p-3 md:p-1 rounded-md bg-black-100 dark:bg-slate-400"
                onClick={() => navigate(`/question/${question.doubtDetails.questionId}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="w-full bg-white dark:bg-[#1E212A] p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5 border-2 hover:bg-gray-200 transition-all hover:scale-105">
                  <div className="left-section space-y-1 text-center">
                    <Arrowup id={question.doubtDetails.questionId} />
                    <h3 className="text-sm md:text-base">
                      {question?.doubtDetails.upVotes?.length || 0}
                    </h3>
                    <Arrowdown id={question.doubtDetails.questionId} />
                  </div>
                  <div className="right-section w-full">
                    <h1 className="text-base md:text-lg dark:text-white">
                      [question] {question?.doubtDetails.questionTitle}
                    </h1>
                    <p className="text-sm md:text-base">
                      {parse(truncateText(question?.doubtDetails.description, 150))}
                    </p>
                    <hr />
                    <UserInfo openId={openId} index={index + 1} setOpenId={setOpenId} question={question} />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
  
        {hasArticles && (
          <>
            {data.articles.map((article, index) => (
              <div
                key={index}
                className="w-[96%] md:w-[80%] mx-12 flex flex-col items-end p-3 md:p-1 rounded-md bg-black-100 dark:bg-slate-400"
                onClick={() => navigate(`/article/${article.articleDetails.articleId}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="w-full bg-white dark:bg-[#1E212A] p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5 border-2 hover:bg-gray-200 transition-all hover:scale-105">
                  <div className="right-section w-full">
                    <h1 className="text-base md:text-lg dark:text-white">
                      [article] {article?.articleDetails.articleTitle}
                    </h1>
                    <p className="text-sm md:text-base">
                      {parse(truncateText(article?.articleDetails.description, 150))}
                    </p>
                    <hr />
                    <UserInfo openId={openId} index={index + 1} setOpenId={setOpenId} article={article} />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };
  
  export default SearchResults;
