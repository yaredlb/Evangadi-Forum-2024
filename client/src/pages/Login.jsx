import { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (!emailValue || !passValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("login successful!");

      localStorage.setItem("token", data.token);

      // navigate("/");
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Email :--- </span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />
        <div>
          <span>Password :--- </span>
          <input ref={passwordDom} type="password" placeholder="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <br />
      <Link to={"/register"}>Register</Link>
    </section>
  );
};

export default Login;
