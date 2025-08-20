import React from 'react';

const SocialLinks = ({ social }) => {
    if (!Array.isArray(social) || social.length === 0) return null;

    return social.map((network) => (
        <li key={network.name}>
            <a href={network.url} target="_blank" rel="noopener noreferrer">
                {network.imageSrc ? (
                    <img
                        src={network.imageSrc}
                        alt={network.name}
                        className={`social-icon ${network.className}`}
                        style={{
                            verticalAlign: 'middle',
                        }}
                    />
                ) : (
                    <i className={network.className}></i>
                )}
            </a>
        </li>
    ));
};

export default SocialLinks;
