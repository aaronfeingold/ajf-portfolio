import React, { useState } from 'react';

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'portfolio', label: 'Projects' },
];

const NavBar = () => {
    const [current, setCurrent] = useState('home');

    const handleClick = (id) => {
        setCurrent(id);
    };

    return (
        <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
                Show navigation
            </a>
            <a className="mobile-btn" href="#home" title="Hide navigation">
                Hide navigation
            </a>
            <ul id="nav" className="nav">
                {navItems.map((item) => (
                    <li
                        key={item.id}
                        className={current === item.id ? 'current' : ''}
                    >
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
    );
};

export default NavBar;
