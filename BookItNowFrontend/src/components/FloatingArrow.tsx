import { delay, motion, useAnimation } from 'framer-motion';
import rightarrow from "../styles/images/rightarrow.png";
import React from 'react';

const FloatingArrow = () => {
  const controls = useAnimation();

  const animate = async () => {
    
    await controls.start({
      y: ['0%', '40%', '0%'],
      transition: {
        y: {
          duration: 2,
          repeat: 1,
          repeatType: 'reverse',
          ease: 'easeInOut',
          
          opacity: 1,
        },
      },
    });

    
    controls.start({ opacity: 0, transition: { duration: 0.5 } });
  };

  React.useEffect(() => {
    animate();
  }, []);

  return (
    <motion.div
      className='flex justify-end items-center'
      animate={controls}
    >
      <div style={{ marginRight: '4%' }}>
        <img
          src={rightarrow}
          alt="Floating Arrow"
          style={{ width: '18%', height: 'auto' }}
        />
      </div>
    </motion.div>
  );
};

export default FloatingArrow;