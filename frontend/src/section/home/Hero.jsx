import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const login = useSelector((state) => state.login.login);
  const navigate = useNavigate();
  return (
    <motion.section
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 md:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="md:w-1/2 mb-10 md:mb-0">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Connect with <span className="text-blue-400">Anyone</span>,
          <br />
          Anywhere in the World
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-8"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Secure, fast, and feature-rich communication platform designed to keep
          you connected with the people who matter most.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {login && (
           
              <motion.button
                className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-medium text-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/room")}
              >
                MyRooms
              </motion.button>
          
          )}
          {!login && (
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-medium text-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          )}

          <motion.button
            className="bg-transparent border border-gray-400 hover:border-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="md:w-1/2 flex justify-center"
        initial={{ opacity: 0, rotateY: 30 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.div
          className="relative w-full max-w-md"
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            {/* Mock chat interface */}
            <div className="bg-gray-700 p-4 border-b border-gray-600 flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
              <div className="text-sm font-medium">YapSpace</div>
            </div>

            <div className="p-4 h-64 flex flex-col">
              <div className="bg-gray-700 rounded-lg p-3 mb-3 self-start max-w-xs">
                <p className="text-sm">Hey there! How's your day going?</p>
                <p className="text-xs text-gray-400 mt-1">10:24 AM</p>
              </div>

              <div className="bg-blue-600 rounded-lg p-3 mb-3 self-end max-w-xs">
                <p className="text-sm">
                  Pretty good! Working on that project we discussed.
                </p>
                <p className="text-xs text-blue-300 mt-1">10:26 AM</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-3 self-start max-w-xs">
                <p className="text-sm">
                  Great! Let me know if you need any help!
                </p>
                <p className="text-xs text-gray-400 mt-1">10:27 AM</p>
              </div>
            </div>
          </div>

          {/* 3D effect decorative elements */}
          <div className="absolute inset-0 rounded-2xl bg-blue-500 opacity-10 transform translate-x-4 translate-y-4 -z-10"></div>
          <div className="absolute inset-0 rounded-2xl bg-purple-500 opacity-10 transform -translate-x-2 translate-y-6 -z-20"></div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
