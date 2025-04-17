import React from 'react';
import SocialLinks from './SocialLinks';
const Footer = ({ data }) => {
  let { social = [] } = data || {};

  return (
    <footer>
      <div className="row">
        <div className="twelve columns">
        <ul className="social-links">
            <SocialLinks social={social} location="footer" />
          </ul>
          <ul className="copyright">
            <li>&copy; Copyright 2025 Aaron Feingold</li>
            <li>
                Develop. Distribute. Democratize.
            </li>
          </ul>
        </div>
        <div id="go-top">
          <a className="smoothscroll" title="Back to Top" href="#home">
            <i className="icon-up-open"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
