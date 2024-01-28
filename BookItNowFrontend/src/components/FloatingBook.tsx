import { motion, useAnimation } from 'framer-motion';
import FloatingBookImage from "../styles/images/floating-book.png"
import React from 'react';

const FloatingBook = () => {
    const controls = useAnimation();

    const animate = () => {
      controls.start({
        y: ['0%', '40%', '0%'],
        transition: {
          y: {
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
        },
      });
    };
  
    React.useEffect(() => {
      animate();
    }, []); 
  
    return (
        <motion.div
        className="floating-image"
        animate={controls}     
      >
        <img
          src={FloatingBookImage}
          alt="Floating Book"
          style={{ width: '35%', height: 'auto' }}
        />
      </motion.div>
    );
};

export default FloatingBook;

