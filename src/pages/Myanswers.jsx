import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Arrowup from "../icons/Arrowup";
import Arrowdown from "../icons/Arrowdown";
import UserInfo from "../components/UserInfo";
import SyncLoader from "react-spinners/SyncLoader";
import NothingHere from "../components/NothingHere";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const Myanswers = () => {
  const navigate = useNavigate();
  const [openId, setOpenId] = React.useState([]);
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: "Bearer " + token },
  };

  // Use Axios directly to get user questions
  const fetchUserQuestions = async () => {
    const response = await axios.get(
      'https://faithhub-skripsi-backend.vercel.app/api/question/getUserQuestion',
      config
    );
    return response.data;
  };

  const { isLoading, data } = useQuery("getMyQuestions", fetchUserQuestions);

  if (isLoading) {
    return (
      <div className="h-screen mt-[10%] w-[100%] text-center">
        <SyncLoader size={10} color="#7E22CE" />
      </div>
    );
  }

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

export default Myanswers;
