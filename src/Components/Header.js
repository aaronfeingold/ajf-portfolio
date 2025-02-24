// src/Components/Header.js
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import BackgroundCarousel from "./BackgroundCarousel";
import "./BackgroundCarousel.css";

const Header = ({ data }) => {
  const {
    name = "Your Name",
    description = "Your Description",
    social = [],
    backgroundImages = [
      "/images/header-bg-1.jpg",
      "/images/header-bg-2.jpg",
      "/images/header-bg-3.jpg",
    ], // Default images (replace with your actual images)
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

  // useEffect to add class after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const headline = document.querySelector(".responsive-headline");
      if (headline) {
        headline.classList.add("responsive");
      }
    }, 100);
    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <header id="home">
      <NavBar />
      {/* Add the BackgroundCarousel component */}
      <BackgroundCarousel images={backgroundImages} interval={7000} />
      {/* Optional overlay for better text readability */}
      <div className="carousel-overlay"></div>

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
