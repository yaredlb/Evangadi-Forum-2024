import React, { useContext, useEffect, useRef, useState } from "react";
import "./Answer.css";
import axios from "../../axiosConfig";
import { user } from "react-icons-kit/metrize/user";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Icon from "react-icons-kit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Answer = () => {
  const { userData } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const ansDom = useRef();

  const { questionid } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  const loadQuestion = async () => {
    try {
      const response = await axios.get(
        `/questions/detail-question?questionid=${questionid}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setQuestion(response.data[0]);
    } catch (error) {
      console.error(error.response);
    }
  };

  const loadAnswers = async () => {
    try {
      const response = await axios.get(`/answers/get-answer/${questionid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAnswers(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ansValue = ansDom.current.value;

    if (!ansValue) {
      toast.error("Please provide the answer!");
      return;
    }
    try {
      await axios.post(
        "/answers/answer-question/",
        {
          answer: ansValue,
          questionid: questionid,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Answer submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadQuestion();
    loadAnswers();
  }, [questionid]);

  return (
    <section className="answer-section">
      <ToastContainer />
      <div className="question-container">
        <h3>Question</h3>
        <h4>{question?.title}</h4>
        <p>{question?.description}</p>
      </div>

      <hr />

      <div className="answers-container">
        <h3>Answers From The Community</h3>
        <hr />
        {answers.map((ans) => (
          <div key={ans.id} className="answer">
            <div className="user-container">
              <div>
                <Icon icon={user} className="user-icon" size={40} />
              </div>
              <div className="username text-center ms-2 ms-md-0">
                <p>{ans.username}</p>
              </div>
            </div>

            <div className="username2 text-center ms-2 ms-md-0">
              <h4>{ans.answer}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="inputs mt-5">
        <div className="input-description">
          <h3>Answer The Top Question</h3>
          <div className="mb-3">
            <Link className="li" to="/">
              Go to Question page
            </Link>
          </div>
        </div>

        <form className="box-input" onSubmit={handleSubmit}>
          <div>
            <textarea
              className="input-text-text input-text-one"
              name="description"
              maxLength={255}
              type="text"
              ref={ansDom}
              rows={5}
              placeholder="Your Answer..."
              required
            />
          </div>
          <div className="">
            <button className="btn btn-lg btn-primary mb-5" type="submit">
              Post Your Answer
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Answer;
