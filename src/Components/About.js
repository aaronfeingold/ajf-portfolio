import React from 'react';
import ResumeDownload from './ResumeDownload';

const About = ({ data }) => {
    const { image, bio } = data || {};

    let profilepic = `images/${image}`;

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

                <div className="about-text column eight">
                    <h2>About Me</h2>
                    {bio &&
                        bio
                            .split('\n\n')
                            .map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                    <div className="about-buttons">
                        <p className="address">
                            <h2>Contact Details</h2>
                            <span>ajfeingold88 [at] gmail [dot] com</span>
                        </p>
                        <ResumeDownload />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
