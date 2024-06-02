import { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import './Login/Login.css';

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

      navigate("/");
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }

  return (
    <section>
      <NavBar />
      <div className="login">
        <div className="login-left">
        <h2>Login to your account</h2>
        <h3>
          Don't have an account?{" "}
          <Link to="/register">Create a new account</Link>
        </h3>
        <form onSubmit={handleSubmit}>
          <div>
            {/* <span>Email :--- </span> */}
            <input ref={emailDom} type="email" placeholder="Your Email" />
          </div>
          <br />
          <div>
            {/* <span>Password :--- </span> */}
            <input
              ref={passwordDom}
              type="password"
              placeholder="Your Password"
            />
          </div>
          <button type="submit">submit</button>
        </form>
        <br />
        <Link to={"/register"}>Create an account</Link>
      </div>
      <div className="login-right">
        <h2>About</h2>
        <h1>Evangadi Networks Q&A</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae cum
          recusandae dolorem,<br /> vitae culpa vero voluptatibus maiores architecto
          at natus dolores illo fugiat <br /> quibusdam accusamus deleniti eius facere
          reiciendis tempora. <br /> Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolorum vitae maiores<br /> quisquam odio est molestiae sunt
          reprehenderit, nam, quos, <br />hic sequi quo ipsa veritatis adipisci veniam
          quod quis alias laboriosam! <br /> Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Totam eius laborum sed impedit enim.<br /> Corporis
          assumenda temporibus dolorum vel nesciunt voluptatem eum sapiente eos? <br />
          Incidunt facilis consequatur quisquam. Quidem, tempore.
        </p>
        <h3 className="right-how">HOW IT WORKS</h3>
      </div>
      </div>
      
    </section>
  );
};

export default Login;
