import React, { useState, useEffect } from 'react';

const BackgroundCarousel = ({ images, interval = 5000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    // Set up the interval to change images
    const intervalId = setInterval(() => {
      // First fade out
      setFadeIn(false);

      // After fade out, change the image and fade in
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true);
      }, 500); // This should match the CSS transition time
    }, interval);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [images, interval]);

  return (
    <div className="background-carousel">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-image ${index === currentImageIndex ? 'active' : ''} ${fadeIn ? 'fade-in' : 'fade-out'}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
};

export default BackgroundCarousel;
