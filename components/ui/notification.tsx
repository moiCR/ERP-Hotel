import { motion } from "framer-motion";

export const Notification = ({ message }: { message: string }) => {
  return (
    <motion.div
      className="fixed top-4 left-1/2 z-50 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, y: -50, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -50, x: "-50%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="bg-black/80 dark:bg-white/80 text-white dark:text-black p-2 rounded-3xl shadow-lg pointer-events-auto shadow-black/5 dark:shadow-white/5">
        <p className="text-sm font-semibold">{message}</p>
      </div>
    </motion.div>
  );
};
