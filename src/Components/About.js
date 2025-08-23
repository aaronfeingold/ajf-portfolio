import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ResumeDownload from './ResumeDownload';

const About = ({ data }) => {
    const { image } = data || {};
    const [bioContent, setBioContent] = useState('');
    const [loading, setLoading] = useState(true);

    let profilepic = `images/${image}`;

    useEffect(() => {
        // Fetch the markdown file
        fetch('/bio.md')
            .then((response) => response.text())
            .then((markdown) => {
                setBioContent(markdown);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error loading bio:', error);
                setLoading(false);
            });
    }, []);

    const renderBio = () => {
        if (loading) return <p>Loading bio...</p>;
        if (!bioContent) return <p>Bio content not available.</p>;

        return (
            <div className="about-text-content">
                <ReactMarkdown>{bioContent}</ReactMarkdown>
            </div>
        );
    };

    return (
        <section id="about">
            <div className="about-wrapper row">
                <div className="column four">
                    <img
                        className="profile-pic"
                        src={profilepic}
                        alt="Aaron Feingold Profile Pic"
                    />
                </div>

                <div id="about-me" className="about-text column eight">
                    {renderBio()}
                    <div className="about-buttons">
                        <div className="address">
                            <h2>Contact Details</h2>
                            <p>
                                <span>ajfeingold88 [at] gmail [dot] com</span>
                            </p>
                        </div>
                        <ResumeDownload />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
