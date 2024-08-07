import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import Arrowup from "../icons/Arrowup";
import Arrowdown from "../icons/Arrowdown";
import UserInfo from "./UserInfo";
import NothingHere from "./NothingHere";
import { Toaster } from "react-hot-toast";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const Content = () => {
  const location = useLocation();
  const tags = new URLSearchParams(location.search).get("tags");
  const [openId, setOpenId] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const navigate = useNavigate();

  // Fetch questions
  const fetchQuestions = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: "Bearer " + token } };
    const body = { tags: tags };

    let res;
    if (tags) {
      res = await axios.post('https://faithhub-skripsi-backend.vercel.app/api/question/getQuestionbyTags', body, config);
    } else {
      res = await axios.get('https://faithhub-skripsi-backend.vercel.app/api/question/fetchAll', config);
    }

    return res.data;
  };

  // Fetch articles only if tags are present
  const fetchArticles = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: "Bearer " + token } };
    const body = { tags: tags };

    let res;
    if (tags) {
      res = await axios.post('https://faithhub-skripsi-backend.vercel.app/api/article/getArticlebyTags', body, config);
    } else {
      res = [];
    }

    return res.data;
  };

  const { isLoading: isLoadingQuestions, data: questions } = useQuery(["getQuestions", tags], fetchQuestions);
  const { isLoading: isLoadingArticles, data: articles } = useQuery(["getArticles", tags], fetchArticles, {
    enabled: !!tags // Only fetch articles if tags are present
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationFinished(true);
    }, 1000); // 1 second delay for the animation

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animationFinished && !isLoadingQuestions && (!tags || !isLoadingArticles)) {
      setShowContent(true);
    }
  }, [animationFinished, isLoadingQuestions, isLoadingArticles, tags]);

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

  const hasQuestions = questions && questions.length > 0;
  const hasArticles = articles && articles.length > 0;

  if (!hasQuestions && !hasArticles) {
    return <NothingHere />;
  }

  return (
    <div className="md:w-[60%] flex flex-col items-center gap-y-5 md:gap-1 my-8">
      <Toaster />
      {hasQuestions && (
        <>
          {questions.map((question, index) => (
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
                    {!tags ? question?.doubtDetails.questionTitle : `[question] ${question?.doubtDetails.questionTitle}`}
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
          {articles.map((article, index) => (
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

export default Content;
