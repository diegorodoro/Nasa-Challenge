import React from 'react';
import { FaRocket } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';

const Loading2D = () => {
  // Rocket shaking and lift-off effect
  const { x, y } = useSpring({
    from: { x: -10, y: -50 }, // Posición inicial
    to: async (next) => {
      while (true) {
        await next({ x: 0, y: -10 }); // Movimiento hacia la derecha y arriba
        await next({ x: 0, y: 0 }); // Regresar a la posición inicial
      }
    },
    config: { tension: 0, friction: 0 },
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
            transform: x.to((val) => `translate(${val}px, ${y.get()}px)`), // Aplicar el efecto de sacudida
          }}
        >
          <FaRocket className="text-6xl mb-4 text-yellow-300 drop-shadow-lg" />
        </animated.div>
      </div>

      {/* Loading Text */}
      <p className="text-2xl mt-4">Blasting off!</p>
    </div>
  );
};

export default Loading2D;
