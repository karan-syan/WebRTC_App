import React from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Button from "../../components/Button";
const Home = () => {
  const navigate = useNavigate();
  return (
    <Card logo="logo.png" title="Welcome to K-Talk!">
      <div className="container">
        <p className="text">
          We're working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we're adding people gradually to make
          sure nothing breaks :{")"}
        </p>
        <div>
          <Button
            text="Get Your username"
            logo="arrow-forward.png"
            onclick={() => navigate("/register")}
          />
        </div>
        <div className="sign-in-wrapper">
          <span className="has-invite">Have an invite text?</span>
          <Link className="signin-link" to={"/login"}>
            &nbsp;Sign in
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default Home;
