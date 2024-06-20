import React from "react";
import Comment from "../icons/Comment";
import moment from "moment";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../components/Loading";

const UserInfo = ({ openId, index, setOpenId, question, answer }) => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: "Bearer " + token},
    };
    // console.log(config);
    const res = await axios.get('https://faithhub-skripsi-backend.vercel.app/api/auth/myProfile', config);
    // console.log(res);
    return res.data;
  };
  const { isLoading,data } = useQuery("getUserInfo", fetchUser);
  if (isLoading) return <Loading />;
  const currentUser = data;
  // console.log(data);

  // console.log(question);
  return (
    <div className="w-full  flex items-cente justify-between">
      <div className="w-[48%] md:max-w-screen-md posted-by flex items-center gap-2 md:gap-3">
        {/* <img
          src={
            question?.author?.profileImage ||
            answer?.author?.profileImage ||
            "https://avatars.githubusercontent.com/u/56132780?v=4"
          }
          alt="profile"
          className="h-5 md:w-6 w-5 md:h-6 rounded-full"
        /> */}
        <h2 className="text-gray-300 text-xs">
          {answer ? "answered by\n" : "posted by "}{" "}
          <span className="text-blue-800 font-bold  md:text-sm">
            {question
              ? question?.ownerInfo.name === currentUser?.data.name
                ? question?.ownerInfo?.name + " (You)"
                : question?.ownerInfo?.name
              : answer
              ? answer?.author?.name === currentUser?.name
                ? answer?.author?.name + " (You)"
                : answer?.author?.name
              : ""}
          </span>
        </h2>
      </div>
      <div className="posted-on mx-auto">
        <h2 className="text-gray-300 text-xs">
          {question
            ? moment(question.doubtDetails.createdAt).fromNow()
            : moment(answer?.createdAt).fromNow()}
        </h2>
      </div>
      {openId && (
        <div
          className="comment flex gap-2 ml-auto cursor-pointer"
          onClick={() => {
            if (!openId.find((ele) => ele === index)) {
              console.log("hello");
              setOpenId([...openId, index]);
            }
            if (openId.find((ele) => ele === index)) {
              setOpenId(openId.filter((ele) => ele !== index));
            }
          }}
        >
          <Comment />
          <span className="text-gray-300 text-xs">
            {question?.doubtDetails.replyCount || "No replies"}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
