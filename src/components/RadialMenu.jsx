import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './RadialMenu.css';
import { FaSpaceShuttle } from 'react-icons/fa';

const RadialMenu = ({ isVisible, planetName, onDetailsClick }) => {
  const [isTracking, setIsTracking] = useState(false);

  // Use spring to control the offset smoothly
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 120, friction: 14 }, // Adjust for smooth return
  }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isTracking) {
        const xOffset = (e.clientX - window.innerWidth / 2) * 0.05;
        const yOffset = (e.clientY - window.innerHeight / 2) * 0.05;
        api.start({ x: xOffset, y: yOffset });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTracking, api]);

  // Handle mouse enter and leave events
  const handleMouseEnter = () => {
    setIsTracking(true);  // Start tracking on mouse enter
  };

  const handleMouseLeave = () => {
    setIsTracking(false); // Stop tracking
    // Smoothly return to center (0,0) when mouse leaves
    api.start({ x: 0, y: 0 });
  };

  const props = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.5)',
  });

  return (
    <div
      className="invisible-area"
      style={{
        position: 'absolute',
        width: '100%',   // Full width container to track mouse
        height: '100vh',  // Full screen height
        pointerEvents: isVisible ? 'auto' : 'none',
        top: '77%',       // Adjust this to control how high or low the menu appears
        left: '0',
        transform: 'translateY(-50%)',  // Center it vertically in the bottom section
      }}
      onMouseEnter={handleMouseEnter} // Start tracking when mouse enters the area
      onMouseLeave={handleMouseLeave} // Reset position on mouse leave
    >
      <animated.div
        style={{
          ...props,
          position: 'absolute',
          left: x.to((val) => `calc(50% + ${val}px)`), // Animate left position
          top: y.to((val) => `calc(50% + ${val}px)`),  // Animate top position
          transform: props.transform.to((t) => `${t} translate(-50%, -50%)`),
        }}
      >
        <div className="relative w-28 h-28">
          {/* The rotating SVG */}
          <svg 
            className="w-full h-full animate-spin-slow" // Apply spin animation
            viewBox="0 0 100 100"
          >
            <path
              id="curve"
              fill="transparent"
              d="M 50 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
            <text className="text-xs fill-white">
              <textPath 
                xlinkHref="#curve" 
                startOffset="0%" 
                textLength="233"
              >
                {`TRAVEL TO • ${planetName.toUpperCase()} • `.repeat(2)}
              </textPath>
            </text>
          </svg>

          {/* Button with spaceship SVG */}
          <button 
            className="absolute inset-0 flex items-center justify-center rounded-full outline-none"
            onClick={onDetailsClick}
            style={{ transform: 'rotate(-90deg)' }} // Rotate spaceship upwards
          >
            <FaSpaceShuttle className="w-8 h-8 text-white" />
          </button>
        </div>
      </animated.div>
    </div>
  );
};

export default RadialMenu;
