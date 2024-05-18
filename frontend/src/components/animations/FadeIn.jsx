import React from "react";
import { motion } from "framer-motion";

const FadeIn = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-[100%] p-0 m-0"
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
