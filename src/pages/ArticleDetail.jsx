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

const ArticleDetail = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [articleData, setArticleData] = useState({});
  const [ownerInfo, setOwnerInfo] = useState({});
  const [repliesData, setRepliesData] = useState([]);
  const [newReply, setNewReply] = useState("");

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get(
          `https://faithhub-skripsi-backend.vercel.app/api/article/get/${articleId}`,
          config
        );
        const { articleData, ownerInfo, replies } = res.data;
        setArticleData(articleData);
        setOwnerInfo(ownerInfo);
        setRepliesData(replies);
      } catch (error) {
        console.error("Error fetching article details:", error);
      }
    };

    fetchArticleDetails();
  }, [articleId]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post(
        `https://faithhub-skripsi-backend.vercel.app/api/article/reply/${articleId}`,
        { reply: newReply },
        config
      );
      setNewReply("");
      fetchReplies();
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
        `https://faithhub-skripsi-backend.vercel.app/api/article/get/${articleId}`,
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
    const res = await axios.get("https://faithhub-skripsi-backend.vercel.app/api/auth/myProfile", config);
    return res.data;
  };

  const replyConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter your reply here...",
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
        "image"
      ],
    }),
    []
  );

  const { isLoading, data } = useQuery("getUserInfo", fetchUser);
  if (isLoading) return <Loading />;
  const currentUser = data;

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
          <Card.Title className="mb-0">{articleData.articleTitle}</Card.Title>
          <Card.Text>
            {articleData.description && parse(articleData.description)}
          </Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroupItem className="text-gray-300 text-xs">
              Written by:
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
          <Arrowup id={articleData.articleId} voteType="article" /> {/* Assuming 'articleId' as identifier */}
            <h3 className="text-sm text-right md:text-base mx-2 mb-1 m">{articleData.upVotes?.length || 0}</h3>
          <Arrowdown id={articleData.articleId} voteType="article" /> {/* Assuming 'articleId' as identifier */}
          </div>
        </Card.Body>
      </Card>

      <div style={{ width: "50%" }}>
        <JoditEditor
          value={newReply}
          config={replyConfig}
          onChange={(content) => setNewReply(content)}
        />
      </div>
      <Button variant="primary" onClick={handleReplySubmit} className="mt-2">
        Submit
      </Button>

      <div className="replies-section mt-5 md:w-[100%] flex flex-col items-center">
        {repliesData && repliesData.length > 0 ? (
          repliesData.map((reply, index) => (
            <Card key={index} className="mb-3 w-full md:w-2/3 lg:w-1/2">
              <Card.Body>
                <Card.Text>{reply.replyData.reply && parse(reply.replyData.reply)}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">Posted by: {reply.ownerInfo.name}</small>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No replies yet</p>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
