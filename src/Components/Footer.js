import React from 'react';
import SocialLinks from './SocialLinks';

const Footer = ({ data }) => {
    const { social = [], mantra } = data || {};
    const currentYear = new Date().getFullYear();

    const handleScrollToTop = (e) => {
        e.preventDefault();
        document.getElementById('home')?.scrollIntoView({
            behavior: 'smooth',
        });
    };

    return (
        <footer>
            <div className="row">
                <div className="twelve columns">
                    <nav
                        className="social-links"
                        aria-label="Social media links"
                    >
                        <SocialLinks social={social} location="footer" />
                    </nav>

                    <div className="copyright">
                        <p>&copy; Copyright {currentYear} Aaron Feingold</p>
                        {mantra && <p className="mantra">{mantra}</p>}
                    </div>
                </div>

                <button
                    id="go-top"
                    className="smoothscroll"
                    title="Back to Top"
                    onClick={handleScrollToTop}
                    aria-label="Scroll to top"
                >
                    <i className="icon-up-open" aria-hidden="true"></i>
                </button>
            </div>
        </footer>
    );
};

export default Footer;
