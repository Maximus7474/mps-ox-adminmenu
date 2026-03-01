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
    console.log('Received setVisible');
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
          <div className='fixed inset-0 flex items-center justify-center bg-black/20 px-10'>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className='w-full max-w-[1400px] h-[85vh] shadow-2xl rounded-xl border border-border/50 bg-background overflow-hidden flex flex-row'
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </VisibilityContext.Provider>
  );
};
