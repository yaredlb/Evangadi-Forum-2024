import { useContext } from "react";
import { AppState } from "../App";
import NavBar from "../Components/NavBar/NavBar";
import './Home/Home.css'

const Home = () => {
  const { user } = useContext(AppState);
  return (
    <div>
      <NavBar />
      <div className="home-header">
        <div className="home-question">
          <h1>Ask Question</h1>
        </div>
        <div>
          <h2>Welcome: {user.username}</h2>
        </div>
      </div>
      <br />
      <div className="home-details">Questions</div>
      <hr />
    </div>
  );
};

export default Home;
