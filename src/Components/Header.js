import React, { useEffect, useContext } from 'react';
import NavBar from './NavBar';
import BackgroundCarousel from './BackgroundCarousel';
import { ResumeContext } from './ResumeContext';
import SocialLinks from './SocialLinks';

const Header = ({ data }) => {
    const { loading } = useContext(ResumeContext);

    const {
        name = 'Aaron Feingold',
        description = 'guitarist, sommelier, and software engineer',
        social = [],
        backgroundImages = [
            '/images/header-bg.jpg',
            '/images/header-bg-1.jpg',
            '/images/header-bg-2.jpg',
            '/images/header-bg-3-founder.jpg',
        ],
        defaultBackground = '/images/testimonials-bg.jpg',
        imageSettings = {},
    } = data || {};

    useEffect(() => {
        const timer = setTimeout(() => {
            const headline = document.querySelector('.responsive-headline');
            if (headline) {
                headline.classList.add('responsive');
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <header id="home">
            <NavBar />
            <BackgroundCarousel
                images={backgroundImages}
                interval={2500}
                isLoading={loading}
                defaultBackground={defaultBackground}
                imageSettings={imageSettings}
            />
            <div className="carousel-overlay"></div>

            <div className="row banner">
                <div className="banner-text">
                    <h1 className="responsive-headline">{name}</h1>
                    <h2>{description}</h2>
                    <hr />
                    <ul className="social">
                        <SocialLinks social={social} location="header" />
                    </ul>
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
