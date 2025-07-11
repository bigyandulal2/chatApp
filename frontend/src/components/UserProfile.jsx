import { motion } from "framer-motion";
import { FiSettings } from "react-icons/fi";

export default function UserProfile() {
  return (
    <div className="p-4 border-t border-gray-700 flex items-center">
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
        U
      </div>
      <div className="flex-1">
        <div className="font-medium">User Name</div>
        <div className="text-sm text-gray-400">Online</div>
      </div>
      <motion.button
        className="text-gray-400 hover:text-white"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiSettings />
      </motion.button>
    </div>
  );
}
