import React from 'react';

const Footer = ({ data }) => {
  let { social = [] } = data || {};

  const networks = social.map((network) => (
    <li key={network.name}>
      <a href={network.url} target="_blank" rel="noopener noreferrer">
        <i className={network.className}></i>
      </a>
    </li>
  ));

  return (
    <footer>
      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">{networks}</ul>
          <ul className="copyright">
            <li>&copy; Copyright 2024 Aaron Feingold</li>
            <li>
              Additional Designs by{" "}
              <a title="Styleshout" href="http://www.styleshout.com/">
                Styleshout
              </a>
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
