import React from "react";
import logo from "../assets/images/logo.png";
const Header = () => {
  return (
    <header className="header">
      <nav className="logo">
        <img src={logo} alt="todoList"></img>
      </nav>
    </header>
  );
};

export default Header;
