import React, { useState } from "react";

const Header = (props) => {
  const [current, setCurrent] = useState("home");
  let name;
  let social;
  let networks;
  let description;

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "resume", label: "Resume" },
    { id: "portfolio", label: "Projects" },
  ];

  const handleClick = (id) => {
    setCurrent(id);
  };

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
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>
        <ul id="nav" className="nav">
          {navItems.map((item) => (
            <li key={item.id} className={current === item.id ? "current" : ""}>
              <a
                className="smoothscroll"
                href={`#${item.id}`}
                onClick={() => handleClick(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
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
