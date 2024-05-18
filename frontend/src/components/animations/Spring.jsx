import React from "react";
import { motion } from "framer-motion";

const Spring = ({ children }) => {
  return (
    <motion.div
      initial={{ scale: 0.2 }} // Start from a smaller scale
      animate={{ scale: 1 }} // Animate to default scale
      whileHover={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 50,
        yoyo: Infinity,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Spring;
