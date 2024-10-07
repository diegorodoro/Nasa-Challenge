import React from 'react';
import { FaRocket } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';

const Loading2D = () => {
  // Rocket shaking and lift-off effect
  const { y, x } = useSpring({
    from: { y: 100, x: -5 },
    to: async (next) => {
      while (true) {
        await next({ y: 0, x: 5 }); // Slight side shake
        await next({ y: -20, x: -5 }); // Lift-off with side shake
      }
    },
    config: { tension: 180, friction: 10 },
  });

  // Progress bar animation
  const { width } = useSpring({
    from: { width: '0%' },
    to: { width: '100%' },
    config: { duration: 4000 },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black-900 via-purple-900 to-black text-white">
      {/* Rocket Ship Animation */}
      <div className="relative">
        {/* Rocket Trails */}
        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-3 h-14 bg-gradient-to-t from-yellow-400 via-red-500 to-transparent rounded-full"></div>
          <div className="w-3 h-20 bg-gradient-to-t from-blue-400 via-green-400 to-transparent rounded-full"></div>
          <div className="w-3 h-16 bg-gradient-to-t from-pink-400 via-purple-400 to-transparent rounded-full"></div>
        </div>

        {/* Rocket Icon */}
        <animated.div
          style={{
            transform: x.to((val) => `translate(${val}px, ${y.get()}px)`), // Shaking and lifting effect
          }}
        >
          <FaRocket className="text-6xl mb-4 text-yellow-300 drop-shadow-lg" />
        </animated.div>
      </div>

      {/* Loading Text */}
      <p className="text-2xl mt-4">Blasting off!</p>

      {/* Loading Bar */}
      <div className="w-64 mt-8 h-2 bg-white/20 rounded-full overflow-hidden">
        <animated.div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500"
          style={{ width }}
        />
      </div>
    </div>
  );
};

export default Loading2D;
