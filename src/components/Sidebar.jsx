import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const open = useSelector((state) => state.sidebar.open);
  
  const active =
    " bg-blue-100 text-blue-400 px-4 py-2 rounded-sm border-l-4 border-purple-700";

  // Retrieve role from localStorage
  const role = localStorage.getItem("role");

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } md:block w-[60%] md:w-[15%] h-full md:h-80 fixed ${
        role === "admin" ? "left-0" : "left-28"
      } z-10 top-14 md:top-24 list-none
      text-gray-300 text-sm space-y-4 py-8 md:py-0
      bg-white dark:bg-[#1E212A] md:dark:bg-inherit shadow-md 
      md:shadow-none md:bg-transparent
      `}
    >
      {role === "admin" ? (
        <>
          <li
            onClick={() => navigate("/admin")}
            className={
              "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-400 transition-all " +
              (location === "/admin" ? active : "")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m-7.5-7.5v15"
              />
            </svg>
            ADMIN HOME
          </li>
          <li
            onClick={() => navigate("/manage")}
            className={
              "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-400 transition-all " +
              (location === "/manage" ? active : "")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75v-6m0 0L9.75 3m2.25 0L14.25 3m2.25 3v6m0 0L16.5 9.75m-1.5 0L18 9.75M6 15.75h12M6 18h12M6 21h12"
              />
            </svg>
            MANAGE
          </li>
        </>
      ) : (
        <>
          <li
            onClick={() => navigate("/")}
            className={
              "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 hover:cursor-pointer hover:bg-blue-100 hover:text-blue-400 transition-all " +
              (location === "/" ? active : " ")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            HOME
          </li>

          <li
            onClick={() => navigate("/explore")}
            className={
              "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-400 transition-all " +
              (location === "/explore" ? active : "")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
            EXPLORE TOPICS
          </li>
          <li
            onClick={() => navigate("/article")}
            className={
              "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-400 transition-all " +
              (location === "/article" ? active : "")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 3 2 L 3 20 M 6 5 L 16 5 L 16 6 L 6 6 Z M 6 8 L 16 8 L 16 9 L 6 9 Z M 6 11 L 16 11 L 16 12 L 6 12 Z M 19 2 L 3 2 M 19 20 L 19 2 M 19 20 L 3 20 M 6 14 L 16 14 L 16 15 L 6 15 Z"
              />
            </svg>
            ARTICLE
          </li>
          <li
            onClick={() => navigate("/myqna")}
            className={
              "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-400 transition-all " +
              (location === "/myqna" ? active : "")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v2m0 4v6m0 4v2m7-12v6m0 4v2M5 6v6m0 4v2m7-12v6m0 4v2"
              />
            </svg>
            MY QNA
          </li>
          <li
            onClick={() => navigate("/audio")}
            className={
              "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 cursor-pointer hover:bg-blue-100 hover:text-blue-400 transition-all " +
              (location === "/audio" ? active : "")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m-7-7h14m-7-7v14"
              />
            </svg>
            AUDIO
          </li>
        </>
      )}
    </div>
  );
};

export default Sidebar;
