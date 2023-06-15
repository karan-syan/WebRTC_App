import { useNavigate } from "react-router-dom";
import "./Home.css";
import Card from "../../components/Card";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={"cardWrapper"}>
      <Card logo="logo.png" title="Welcome to K-Talk!">
        <div className="container">
          <p className={"text"}>
            We're working hard to get Codershouse ready for everyone! While we
            wrap up the finishing youches, we're adding people gradually to make
            sure nothing breaks :{")"}
          </p>
          <button className="button" onClick={() => navigate("/login")}>
            <span>{"Let's Go"}&nbsp;</span>
            <img src={`/images/arrow-forward.png`} alt="arrow" height="15" />
          </button>
          <div className={"signInWrapper"}>
            <span className={"hasInvite"}>Have an invite text?</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
