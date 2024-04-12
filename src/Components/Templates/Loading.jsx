import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full m-auto bg-gray-900">
      <div className="flex">
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-blue-500 border-opacity-50"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360, transition: { duration: 1, repeat: Infinity, ease: "linear" } }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-700"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2, transition: { duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } }}
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
