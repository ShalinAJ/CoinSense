import React from "react";
import { motion } from "framer-motion";

const RightSlide = ({ children }) => {
  return (
    <motion.div
      initial={{ x: "100vw" }} // Start from the right side (off-screen)
      animate={{ x: 0 }} // Animate to its default position (0)
      whileHover={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 25,
      }}
    >
      {children}
    </motion.div>
  );
};

export default RightSlide;
