import { motion, useAnimation } from 'framer-motion';
import rightarrow from "../styles/images/rightarrow.png";
import React, { CSSProperties, useEffect } from 'react';

interface FloatingArrowProps{
    arrowRight: string;
    arrowTop: string;
    arrowWidth: string;
}

const FloatingArrow = ({arrowRight, arrowTop, arrowWidth}: FloatingArrowProps) => {
  const controls = useAnimation();

  const animate = async () => {
    await controls.start({
      y: ['0%', '40%', '0%'],
      transition: {
        y: {
          duration: 2,
          repeat: 2,
          repeatType: 'reverse',
          ease: 'easeInOut',
          opacity: 1,
        },
      },
    });

    controls.start({ opacity: 0, transition: { duration: 0.5 } });
  };

  useEffect(() => {
    animate();
  }, []);

  const styles: CSSProperties = {
    position: 'fixed',
    top: arrowTop,
    width: arrowWidth,
    right: arrowRight,
  };


  return (
    <motion.div
      className='flex items-center'
      animate={controls}
      style={styles}
    >
      <img
        src={rightarrow}
        alt="Floating Arrow"
        style={{ width: '100%', height: 'auto' }}
      />
    </motion.div>
  );
};

export default FloatingArrow;