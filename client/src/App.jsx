import { useEffect, useState, createContext } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "./axiosConfig";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import { UserContext } from "./Context/UserContext";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Answer from "./pages/QuestAnswer/Answer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [userData, setUserData] = useState({});

  // check if token already exists in localStorage
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setUserData(data);
    } catch (error) {
      // console.log(error.response);
      navigate("/login");
    }
  }
  const logout = () => {
    setUserData({});
    localStorage.removeItem("token");
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <NavBar logout={logout} />
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask-questions" element={<AskQuestion />} />
        <Route path="/answers/:questionid" element={<Answer />} />
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
