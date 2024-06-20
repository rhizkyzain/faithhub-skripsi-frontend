import React from "react";
import Arrowup from "../icons/Arrowup";
import Arrowdown from "../icons/Arrowdown";
import UserInfo from "./UserInfo";
import { useQuery } from "react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loading from "./Loading";
import NothingHere from "./NothingHere";
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
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: "Bearer " + token }
    };
    const body = { tags: tags };
    
    let res;
    if (tags) {
      res = await axios.post('https://faithhub-skripsi-backend.vercel.app/api/question/getQuestionbyTags', body, config);
    } else {
      res = await axios.get('https://faithhub-skripsi-backend.vercel.app/api/question/fetchAll', config);
    }
  
    return res.data;
  };
  
  const navigateToContent = (questionId) => {
    navigate({
      pathname: "/question",
      search: `?questionId=${questionId}`
    });
  };
  const { isLoading, data } = useQuery(["getQuestions", tags], fetchQuestions);
// const { isLoading, data } = useQuery("getQuestions", fetchQuestions);
  

  // console.log(tags);
  if (isLoading) return <Loading />;

  return (
    <div className="md:w-[60%] flex flex-col items-center gap-y-5 md:gap-1 my-8 ">
      <Toaster />
      {data && data.length > 0 ? (
        data.map((question, index) => (
          <div
            key={index}
            className="w-[96%] md:w-[80%] mx-12 flex flex-col items-end p-3 md:p-1 rounded-md bg-black-100 dark:bg-slate-400 "
            onClick={() => navigate(`/question/${question.doubtDetails.questionId}`)}
              style={{ cursor: "pointer" }}
            // onClick={() => navigateToContent(question.doubtDetails.questionId)}
            //   style={{ cursor: "pointer" }}
          >
            <div className=" w-full bg-white dark:bg-[#1E212A] p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5 border-2 hover:bg-gray-200 transition-all ">
              <div className="left-section space-y-1 text-center">
                <Arrowup id={question.doubtDetails.questionId} />
                <h3 className="text-sm md:text-base">
                  {question?.doubtDetails.upVotes?.length || 0}
                </h3>
                <Arrowdown id={question.doubtDetails.questionId} />
              </div>
              <div className="right-section w-full">
                <h1 className="text-base md:text-lg dark:text-white">
                  {question?.doubtDetails.questionTitle}
                </h1>
                <p className="text-sm md:text-base"> {parse(truncateText(question?.doubtDetails.description, 150))}</p>
                <hr />
                <UserInfo openId={openId} index={index + 1} setOpenId={setOpenId} question={question} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <NothingHere />
      )}
    </div>
  );
};

export default Content;
