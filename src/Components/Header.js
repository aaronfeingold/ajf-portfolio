import React from "react";
import NavBar from "./NavBar";

const Header = (props) => {
  let name;
  let social;
  let networks;
  let description;

  if (props.data) {
    ({ name, description, social } = props.data);
    networks = social.map(function (network) {
      return (
        <li key={network.name}>
          <a href={network.url} target="_blank" rel="noopener noreferrer">
            <i className={network.className}></i>
          </a>
        </li>
      );
    });
  }

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
