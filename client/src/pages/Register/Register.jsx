import { useRef, useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Icon from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const usernameRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userValue = usernameRef.current.value;
    const firstValue = firstnameRef.current.value;
    const lastValue = lastnameRef.current.value;
    const emailValue = emailRef.current.value;
    const passValue = passwordRef.current.value;

    if (!userValue || !firstValue || !lastValue || !emailValue || !passValue) {
      setError("Please provide all required information!");
      toast.warning("Please provide all required information!");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: userValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      toast.success("Registration successful. Please login!");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error.response);
    }
  };

  return (
    <section className="reg-background">
      <ToastContainer />
      <div className="p-4 bg-light login text-center authfy-panel panel-login active col">
        <div className="authfy-heading">
          <h3 className="auth-title">Join the Network</h3>
          <p>
            Already have an account?{" "}
            <Link className="lnk-toggler" to="/login">
              Sign in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="wrap-input">
            <input
              className="login-input form-control input-lg"
              ref={emailRef}
              type="email"
              placeholder="Email"
            />
          </div>
          <br />
          <div className="row g-3">
            <div className="col">
              <input
                className="login-input form-control input-lg"
                ref={firstnameRef}
                type="text"
                placeholder="First Name"
              />
            </div>
            <br />
            <div className="col">
              <input
                className="login-input form-control input-lg"
                ref={lastnameRef}
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <br />
          <div>
            <input
              className="login-input form-control input-lg"
              ref={usernameRef}
              type="text"
              placeholder="User Name"
            />
          </div>
          <br />
          <div className="form-group login-input-password">
            <input
              className="login-input form-control input-lg col-4"
              value={password}
              ref={passwordRef}
              type={visible ? "text" : "password"}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <span className="icon-pass" onClick={() => setVisible(!visible)}>
              <Icon icon={visible ? eye : eyeOff} />
            </span>
          </div>
          <br />
          <button
            className="login-btn btn btn-lg btn-primary btn-block"
            type="submit"
          >
            Agree and Join
          </button>
          <br />
          <br />
          <p>
            I agree to the{" "}
            <Link
              className="lnk-toggler"
              to="https://www.evangadi.com/legal/privacy/"
            >
              privacy policy
            </Link>{" "}
            and{" "}
            <Link
              className="lnk-toggler"
              to="https://www.evangadi.com/legal/terms/"
            >
              terms of service
            </Link>
            .
          </p>
          <Link className="lnk-toggler" to="/login">
            Already have an account?
          </Link>
          <br />
          <br />
        </form>
      </div>
      <div className="info col-12 col-md">
        <small className="about">About</small>
        <h2 className="evangadi title-gradient">Evangadi Networks Q&A</h2>
        <p className="font-p mg-bt-30">
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p className="font-p mg-bt-30">
          Whether you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
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

export default Register;
