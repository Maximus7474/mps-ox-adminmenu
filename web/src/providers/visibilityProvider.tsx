import React, { ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface visibilityProviderProps {
  isVisible: boolean;
  children: ReactNode;
}

const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const VisibilityProvider: React.FC<visibilityProviderProps> = ({
  isVisible,
  children,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={slideUpVariants}
          key="slide-up-content"
          style={{ 
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }} 
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VisibilityProvider;
