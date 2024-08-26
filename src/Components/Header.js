import React from "react";
import NavBar from "./NavBar";

const Header = ({ data }) => {
  const {
    name = "Your Name",
    description = "Your Description",
    social = [],
  } = data || {};

  const networks = Array.isArray(social)
    ? social.map((network) => (
        <li key={network.name}>
          <a href={network.url} target="_blank" rel="noopener noreferrer">
            <i className={network.className}></i>
          </a>
        </li>
      ))
    : null;

  return (
    <header id="home">
      <NavBar />
      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">{name}</h1>
          <h2>{description}</h2>
          <hr />
          <ul className="social">{networks}</ul>
        </div>
      </div>
      <p className="scrolldown">
        <a className="smoothscroll" href="#about">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
};

export default Header;
