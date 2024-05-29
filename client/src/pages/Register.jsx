import { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const usernameDom = useRef(null);
  const firstnameDom = useRef(null);
  const lastnameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const userValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (!userValue || !firstValue || !lastValue || !emailValue || !passValue) {
      alert("Please provide all required information");
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
      alert("registration successful. Please login");
      navigate("/login");
    } catch (error) {
      alert("something went wrong!");
      console.log(error.response);
    }
    // console.log(usernameDom.current.value);
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Username :--- </span>
          <input ref={usernameDom} type="text" placeholder="username" />
        </div>
        <br />
        <div>
          <span>First name :--- </span>
          <input ref={firstnameDom} type="text" placeholder="first name" />
        </div>
        <br />
        <div>
          <span>Last name :--- </span>
          <input ref={lastnameDom} type="text" placeholder="last name" />
        </div>
        <br />
        <div>
          <span>Email :--- </span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />
        <div>
          <span>Password :--- </span>
          <input ref={passwordDom} type="password" placeholder="password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <br />
      <Link to={"/login"}>Login</Link>
    </section>
  );
};

export default Register;
