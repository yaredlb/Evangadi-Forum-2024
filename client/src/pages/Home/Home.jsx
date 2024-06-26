import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { UserContext } from "../../Context/UserContext";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import QuestionDetail from "../AskQuestion/QuestionDetail";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem("token");

  const loadQuestions = async () => {
    try {
      const response = await axios.get("/questions/all-questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(response?.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    if (!token || !userData) {
      toast.warning("please login")
      navigate("/login");
    } else {
      loadQuestions();
    }
  }, [userData, navigate]);

  return (
    <section className="home">
      <ToastContainer />
      <div className="home-header">
        <button
          className="home-question ask-question-btn"
          onClick={() => navigate("/ask-questions")}
        >
          Ask Question
        </button>
        <h1>Welcome: <span>{userData?.username}</span></h1>
      </div>
      <div>
        <h1 className="home-details">Questions</h1>
      </div>
      <div>
        {questions.map((question, i) => (
          <QuestionDetail question={question} key={i} />
        ))}
      </div>
    </section>
  );
};

export default Home;
