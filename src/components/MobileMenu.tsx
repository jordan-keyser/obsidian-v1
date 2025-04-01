
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-6 py-4 flex flex-col space-y-4 bg-white/10 backdrop-blur-md">
            <a href="#" className="py-2 px-4 font-medium hover:bg-white/20 rounded-md transition-all">Home</a>
            <a href="#" className="py-2 px-4 font-medium hover:bg-white/20 rounded-md transition-all">Features</a>
            <a href="#" className="py-2 px-4 font-medium hover:bg-white/20 rounded-md transition-all">Gallery</a>
            <a href="#" className="py-2 px-4 font-medium hover:bg-white/20 rounded-md transition-all">Contact</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
