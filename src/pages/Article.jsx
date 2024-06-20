import React from "react";
import Arrowup from "../icons/Arrowup";
import Arrowdown from "../icons/Arrowdown";
import UserInfo from "../components/UserInfoArticles";
import { useQuery } from "react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";
import NothingHere from "../components/NothingHere";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const Content = () => {
  const location = useLocation();
  const tags = new URLSearchParams(location.search).get("tags");
  const [openId, setOpenId] = React.useState([]);
  const [answer, setAnswer] = React.useState("");
  const navigate = useNavigate();

  const fetchArticles = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: "Bearer " + token }
    };
    const body = { tags: tags };

    let url = 'https://faithhub-skripsi-backend.vercel.app/api/article/get/all';

    
    const res = await axios.get(url,config);
    // console.log(res.data);
    return res.data;
    
  };
 

  const navigateToContent = (articleId) => {
    navigate({
      pathname: "/article",
      search: `?articleId=${articleId}`
    });
  };

  const { isLoading, data } = useQuery(["getArticles", tags], fetchArticles);

  if (isLoading) return <Loading />;

  return (
    <div className="md:w-[60%] flex flex-col items-center gap-y-5 md:gap-1 my-8 ">
      <Toaster />
      {data && data.length > 0 ? (
        data.map((article, index) => (
          <div
            key={index}
            className="w-[96%] md:w-[80%] mx-12 flex flex-col items-end p-3 md:p-1 rounded-md bg-black-100 dark:bg-slate-400 "
            onClick={() => navigate(`/article/${article.articleDetails.articleId}`)}
            style={{ cursor: "pointer" }}
          >
            <div className=" w-full bg-white dark:bg-[#1E212A] p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5 border-2 hover:bg-gray-200 transition-all ">
              {/* <div className="left-section space-y-1 text-center">
                <Arrowup id={article.articleDetails.articleId} />
                <h3 className="text-sm md:text-base">
                  {article?.articleDetails.upVotes?.length || 0}
                </h3>
                <Arrowdown id={article.articleDetails.articleId} />
              </div> */}
              <div className="right-section w-full">
                <h1 className="text-base md:text-lg dark:text-white">
                  {article?.articleDetails.articleTitle}
                </h1>
                <p className="text-sm md:text-base"> {parse(truncateText(article?.articleDetails.description, 150))}</p>
                <hr />
                <UserInfo openId={openId} index={index + 1} setOpenId={setOpenId} article={article} />
              </div>
            </div>
            {/* Include comments/replies section for articles if needed */}
          </div>
        ))
      ) : (
        <NothingHere />
      )}
    </div>
  );
};

export default Content;
