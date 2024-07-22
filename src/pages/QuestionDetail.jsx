import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
import Arrowup from "../icons/Arrowup";
import Arrowdown from "../icons/Arrowdown";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import { BsArrowLeft } from "react-icons/bs"; // Importing left arrow icon from react-icons/bs

const QuestionDetail = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [questionData, setQuestionData] = useState({});
  const [ownerInfo, setOwnerInfo] = useState({});
  const [repliesData, setRepliesData] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [arrowUp, setArrowUp] = useState(0);
  const [arrowDown, setArrowDown] = useState(0);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get(
          `https://faithhub-skripsi-backend.vercel.app/api/question/getDetail/${questionId}`,
          config
        );
        const { questionData, ownerInfo, replies } = res.data;
        setQuestionData(questionData);
        setOwnerInfo(ownerInfo);
        setRepliesData(replies);
        setArrowUp(questionData.upvotes); // Assuming 'upvotes' is the field for upvotes count
        setArrowDown(questionData.downvotes); // Assuming 'downvotes' is the field for downvotes count
      } catch (error) {
        console.error("Error fetching question details:", error);
      }
    };

    fetchQuestionDetails();
  }, [questionId]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post(
        `https://faithhub-skripsi-backend.vercel.app/api/question/reply/${questionId}`,
        { reply: newReply },
        config
      );
      setNewReply(""); // Clear the input field
      fetchReplies(); // Refresh the replies
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const fetchReplies = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(
        `https://faithhub-skripsi-backend.vercel.app/api/question/getDetail/${questionId}`,
        config
      );
      setRepliesData(res.data.replies);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    const res = await axios.get(
      "https://faithhub-skripsi-backend.vercel.app/api/auth/myProfile",
      config
    );
    return res.data;
  };

  const commentConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter your comment here...",
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

  const { isLoading, data: currentUser } = useQuery("getUserInfo", fetchUser);

  if (isLoading) return <Loading />;

  return (
    <div className="mt-5 md:w-[100%] flex flex-col items-center">
      <Card className="w-full md:w-2/3 lg:w-1/2 mb-10">
        <Card.Body>
          <div className="flex items-center justify-between mb-4">
          <Button
  variant="light"
  onClick={() => navigate(-1)}
  className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
  style={{
    border: "1px solid #ccc",
    padding: "5px 10px",
    borderRadius: "5px",
    display: "flex",     // Ensure the button content is displayed as flexbox
    alignItems: "center" // Align items vertically centered
  }}
>
  <BsArrowLeft style={{ fontSize: "1.2rem", marginRight: "5px" }} /> {/* Left arrow icon */}
  <span className="text-xs font-semibold" style={{ lineHeight: "1" }}>Back</span>
</Button>



          </div>
          <Card.Title className="mb-0">{questionData.questionTitle}</Card.Title>
          <Card.Text>
            {questionData.description && parse(questionData.description)}
          </Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroupItem className="text-gray-300 text-xs">
              Posted by:{" "}
              <span className="ml-1 text-blue-800 font-bold  md:text-sm">
                {ownerInfo
                  ? ownerInfo.name === currentUser?.data.name
                    ? ownerInfo?.name + " (You)"
                    : ownerInfo?.name
                  : ""}
              </span>
            </ListGroupItem>
          </ListGroup>
          <div className="flex items-end justify-end">
            <Arrowup id={questionData.questionId} voteType="question" />
            <h3 className="text-sm text-right md:text-base mx-2 mb-1 m">
              {questionData.upVotes?.length || 0}
            </h3>
            <Arrowdown id={questionData.questionId} voteType="question" />
          </div>
        </Card.Body>
      </Card>

      <div style={{ width: "50%" }}>
        <JoditEditor
          value={newReply}
          config={commentConfig}
          onChange={(content) => setNewReply(content)}
        />
      </div>
      <Button variant="primary" onClick={handleReplySubmit} className="mt-2">
        Submit
      </Button>

      <div className="replies-section mt-5 md:w-[100%] flex flex-col items-center">
        {repliesData.map((reply, index) => (
          <Card key={index} className="mb-3 w-full md:w-2/3 lg:w-1/2">
            <Card.Body>
              <Card.Text>{parse(reply.replyData.reply.reply)}</Card.Text>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Posted by: {reply.replyData.ownerInfo.name}
                </small>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionDetail;
