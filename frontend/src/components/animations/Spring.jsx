import React from "react";
import { motion } from "framer-motion";

const Spring = ({ children }) => {
  return (
    <motion.div
      initial={{ scale: 0 }} // Start from a smaller scale
      animate={{ scale: 1 }} // Animate to default scale
      transition={{
        type: "spring",
        stiffness: 40,
        yoyo: Infinity,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Spring;
