import React from 'react';
import { FaRocket } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';

const RocketLaunch = () => {
  const { y } = useSpring({
    from: { y: 0 },
    to: { y: -100 },
    config: { duration: 2000 },
    loop: { reverse: true },
  });

  return (
    <div className="relative h-32">
      <animated.div
        style={{
          transform: y.to(value => `translateY(${value}%)`),
        }}
      >
        <FaRocket className="text-4xl text-white" />
      </animated.div>
    </div>
  );
};

export default RocketLaunch;