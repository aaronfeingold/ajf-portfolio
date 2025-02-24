import React, { useState, useEffect } from "react";

const BackgroundCarousel = ({
  images,
  interval = 2500,
  isLoading = false,
  defaultBackground = null,
  imageSettings = {},
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [imageAspectRatios, setImageAspectRatios] = useState({});

  const isFounderImage = (imagePath) => {
    return imagePath.toLowerCase().includes("founder");
  };

  const detectImageAspectRatio = (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const isPortrait = img.height > img.width;
        resolve({ isPortrait, width: img.width, height: img.height });
      };
      img.onerror = () => {
        resolve({ isPortrait: false, width: 0, height: 0 });
      };
      img.src = imageUrl;
    });
  };

  useEffect(() => {
    if (!images || images.length === 0) return;

    const preloadImagesAndDetectRatios = async () => {
      const ratios = {};

      for (let i = 0; i < images.length; i++) {
        const src = images[i];
        const img = new Image();
        img.src = src;

        // Detect if image is portrait
        const { isPortrait } = await detectImageAspectRatio(src);
        ratios[i] = { isPortrait };
      }

      setImageAspectRatios(ratios);
    };

    preloadImagesAndDetectRatios();
  }, [images]);

  useEffect(() => {
    if (isLoading || !images || images.length === 0) {
      return;
    }

    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }

    // Preload images to prevent flashing
    const preloadImages = () => {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };
    preloadImages();

    if (images.length <= 1) return;

    const intervalId = setInterval(() => {
      const next = (currentImageIndex + 1) % images.length;
      setNextImageIndex(next);

      setFadeIn(false);

      const fadeOutTime = 600;
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setNextImageIndex(null);

        // Small delay before fading in to prevent flashing
        setTimeout(() => {
          setFadeIn(true);
        }, 50);
      }, fadeOutTime);
    }, interval);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [images, interval, isLoading, isInitialized, currentImageIndex]);

  // If loading or no images, show nothing
  if (isLoading || !images || images.length === 0) {
    return defaultBackground ? (
      <div
        className="carousel-default-bg"
        style={{ backgroundImage: `url(${defaultBackground})` }}
      />
    ) : null;
  }

  return (
    <div className="background-carousel">
      {images.map((image, index) => {
        const isActive = index === currentImageIndex;
        const isNext = index === nextImageIndex;

        const isPortrait = imageAspectRatios[index]?.isPortrait;

        const customSettings = imageSettings[image] || {};

        const bgPosition =
          customSettings.position ||
          (isPortrait ? "center center" : "center 20%");

        const isFounder = isFounderImage(image);

        return (
          <div
            key={index}
            className={`carousel-image ${isActive ? "active" : ""} ${
              isActive && fadeIn ? "fade-in" : isNext ? "" : "fade-out"
            } ${isFounder ? "founder-image" : ""}`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: bgPosition,
              ...(customSettings.style || {}),
            }}
          />
        );
      })}
    </div>
  );
};

export default BackgroundCarousel;
