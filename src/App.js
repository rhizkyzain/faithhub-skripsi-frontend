import { Outlet, RouterProvider, createBrowserRouter , useLocation} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Content from "./components/Content";
import QuestionDetail from "./pages/QuestionDetail";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Notfound from "./components/Notfound";
import CreateButton from "./components/CreateButton";
import Askquestion from "./components/Askquestion";
import PostArticle from "./components/PostArticle";
import Myanswers from "./pages/Myanswers";
import Explore from "./pages/Explore";
import Article from "./pages/Article";
import ArticleDetails from "./pages/ArticleDetail";
import Audio from './pages/Audio'; 
import { useEffect} from "react";
import SearchResults from "./pages/SearchResult";



const queryClient = new QueryClient();

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    
  }, []);
  const createButtonConfig = {
    "/": { label: "Ask a Question", navigateTo: "/ask" },
    "/article": { label: "Post an Article", navigateTo: "/post" }
    // Add more paths as needed
  };
  const excludedPaths = ["/question/", "/anotherPathToExclude"]; // Add more paths to exclude if needed
  const showCreateButton = !excludedPaths.some(path => location.pathname.startsWith(path));
  const { label, navigateTo } = createButtonConfig[location.pathname] || {};

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div
        className="relative w-screen flex flex-col justify-center items-center 
      overflow-x-hidden bg-white dark:bg-[#32353F]"
      >
        <Navbar />
        <div
          className="w-full h-screen flex justify-center items-start px-4 
        md:px-12 pt-12 dark:bg-[#32353F]"
        >
          <Sidebar />
          <Outlet />
          {showCreateButton && label && navigateTo && (
            <div
              className="right-section
              hidden md:block
              h-8 fixed z-10 top-24 right-20"
            >
              <CreateButton label={label} navigateTo={navigateTo} />
            </div>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
};

const router = createBrowserRouter([
  
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Content />,
      },
      {
        path: "/question/:questionId",
        element: <QuestionDetail />,
      },
      {
        path: "/ask",
        element: <Askquestion />,
      },
      {
        path: "/post",
        element: <PostArticle />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/myqna",
        element: <Myanswers />,
      },
      {
        path: "/article",
        element: <Article />,
      },
      {
        path: "/article/:articleId",
        element: <ArticleDetails />,
      },
      {
        path: "/searchresults",
        element: <SearchResults />,
      },
      {
        path: "/audio",
        element: <Audio />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
