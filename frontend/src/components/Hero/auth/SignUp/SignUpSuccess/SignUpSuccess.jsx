import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
export default function SignUpSuccess() {
  const navigate = useNavigate();
  return (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.div
        className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <FiCheck size={40} />
      </motion.div>

      <h2 className="text-2xl font-bold mb-4 text-white">Account Created!</h2>
      <p className="text-gray-300 mb-8">
        Your account has been successfully created.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-500 hover:bg-blue-600 py-3 px-8 rounded-lg font-medium transition-colors text-gray-200"
        onClick={() => navigate("/")}
      >
        Go to Dashboard
      </motion.button>
    </motion.div>
  );
}
