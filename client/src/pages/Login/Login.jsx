import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { eye, eyeOff } from "react-icons-kit/feather";
import Icon from "react-icons-kit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = emailRef.current.value;
    const passValue = passwordRef.current.value;

    if (!emailValue || !passValue) {
      setError("Please provide all required information!");
      toast.warning("Please provide all required information!");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      toast.success("Login successful. Please continue!");
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
        setProcess(false);
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error.response);
    }
  };

  return (
    <section className="authfy-login bgd">
      <ToastContainer />
      <div className="authfy-panel panel-login text-center active">
        <div className="authfy-heading">
          <h3 className="auth-title">Login to your account</h3>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="lnk-toggler">
              Create a new account
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="custom-login-input form-control input-lg"
              ref={emailRef}
              type="email"
              placeholder="Your Email"
            />
          </div>
          <div className="form-group custom-password-input-wrapper">
            <div className="wrap-input position-relative">
              <input
                className="custom-login-input form-control input-lg col-4"
                ref={passwordRef}
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
              />
              <span
                className="custom-password-toggle position-absolute end-0 top-50 translate-middle-y"
                onClick={togglePasswordVisibility}
              >
                {visible ? <Icon icon={eye} /> : <Icon icon={eyeOff} />}
              </span>
            </div>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <button
              className="custom-login-btn btn btn-lg btn-primary btn-block"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <br />
        <Link to="/register" className="link-account">
          Create an account?
        </Link>
      </div>
      <div className="info col-12 col-md">
        <small className="about">About</small>
        <h2 className="evangadi title-gradient">Evangadi Networks Q&A</h2>
        <p className="font-p mg-bt-30">
          No matter what stage of life you are in, whether you’re just starting
          elementary
          <br /> school or being promoted to CEO of a Fortune 500 company, you
          have much
          <br /> to offer to those who are trying to follow in your footsteps.
        </p>
        <p className="font-p mg-bt-30">
          Whether you are willing to share your knowledge or you are just
          looking to
          <br /> meet mentors of your own, please start by joining the network
          here.
        </p>
        <a
          href="https://www.evangadi.com/explained/"
          className="btn-blue lnk-toggler"
          target="_blank"
          rel="noopener noreferrer"
        >
          HOW IT WORKS
        </a>
      </div>
    </section>
  );
};

export default Login;
