import React, { useContext, useRef } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AskQuestion.css";

const AskQuestion = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const titleRef = useRef();
  const descRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const title = titleRef.current.value;
    const description = descRef.current.value;

    if (!title || !description) {
      toast.error("Please provide all information!");
      return;
    }

    try {
      await axios.post(
        "/questions/ask-questions",
        { title, description },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Question posted successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while posting your question.");
    }
  }

  return (
    <div className="container">
      <ToastContainer />
      <div className="container-header">
        <h3 className="step">Steps to write a good question</h3>
        <ul className="list">
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
      <div className="inputs mt-5">
        <div className="input-description">
          <h3>Ask a public question</h3>
          <div className="mb-3">
            <Link className="li" to="/">
              Go to Question page
            </Link>
          </div>
        </div>
        <form className="box-input" onSubmit={handleSubmit}>
          <div>
            <input
              className="input-text-title input-text-one"
              type="text"
              name="title"
              ref={titleRef}
              placeholder="Title"
              required
            />
          </div>
          <div>
            <textarea
              className="input-text-text input-text-one"
              name="description"
              ref={descRef}
              maxLength={255}
              rows={5}
              placeholder="Question Description..."
              required
            />
          </div>
          <div>
            <button className="post-quest" type="submit">
              Post Your Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
