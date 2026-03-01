import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { fetchNui } from '../utils/fetchNui';
import { isEnvBrowser } from '../utils/misc';

interface VisibilityContextProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const VisibilityContext = createContext<VisibilityContextProps>({
  visible: false,
  setVisible: () => {},
});

export const useVisibility = () => useContext(VisibilityContext);

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const closeNui = useCallback(() => {
    setVisible(false);
    void fetchNui('exit');

    if (isEnvBrowser()) {
      setTimeout(() => setVisible(true), 1_000);
    }
  }, []);

  useNuiEvent('setVisible', (data: { visible?: boolean }) => {
    console.log('Received setVisible')
    setVisible(data.visible || false);
  });

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && visible) {
        closeNui();
      }
    };

    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [visible, closeNui]);

  return (
    <VisibilityContext.Provider value={{ visible, setVisible }}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ height: '100vh', width: '100vw' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </VisibilityContext.Provider>
  );
};
