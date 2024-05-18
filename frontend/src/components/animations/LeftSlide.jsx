import React from "react";
import { motion } from "framer-motion";

const LeftSlide = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
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

export default LeftSlide;
