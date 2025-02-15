"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface LoadingProps {
  imageSrc?: string;
  imageAlt?: string;
}

const Loading = ({  imageSrc, imageAlt = "Loading Image" }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {imageSrc && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image src={imageSrc} alt={imageAlt} width={300} height={300} className="mb-4" />
        </motion.div>
      )}
    </div>
  );
};

export default Loading;