import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const NavBar = () => {
  return (
    <nav className="container navbar">
      <Link className="logo-title" to={"/"}>
        <img src="/images/logo.png" alt="logo" height="30" />
        <span>&nbsp;K-Talk</span>
      </Link>
    </nav>
  );
};

export default NavBar;
