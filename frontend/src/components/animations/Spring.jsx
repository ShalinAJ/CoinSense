import React from "react";
import { motion } from "framer-motion";

const Spring = ({ children }) => {
  return (
    <motion.div
      initial={{ scale: 0 }} // Start from a smaller scale
      animate={{ scale: 1 }} // Animate to default scale
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 100,
        yoyo: Infinity,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Spring;
