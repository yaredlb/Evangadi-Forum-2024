import React from "react";
import { user } from "react-icons-kit/metrize/user";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { useNavigate } from "react-router-dom";
import Icon from "react-icons-kit";
import "./QuestionDetail.css";

const QuestionDetail = ({ question }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/answers/${question.questionid}`);
  };

  return (
    <div className="question-detail-container d-md-flex align-items-center justify-content-between">
      <div className="user-container d-flex flex-md-column">
        <Icon icon={user} className="user-icon" size={40} />
        <div className="username text-center ms-2 ms-md-0">
          {question?.username}
        </div>
      </div>
      <div
        className="question-title-container ms-md-5 flex-grow-1"
        onClick={handleClick}
      >
        <div className="arrow-question d-flex ">
          <div className="question-title pt-2 pt-md-0">{question?.title}</div>
          <div className="arrow-div">
            <Icon
              icon={chevronRight}
              className="right-arrow-icon d-none d-md-block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
