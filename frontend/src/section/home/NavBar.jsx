import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../redux/feature/LoginActionSlicer";
export default function NavBar({ scrolled }) {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.login);
  function handleLogOut() {
    console.log("i have been called");
    dispatch(logoutUser());
  }
  return (
    <motion.nav
      className={`sticky top-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
      >
        <div className="bg-blue-500 w-8 h-8 rounded-lg flex items-center justify-center">
          <span className="font-bold text-white">C</span>
        </div>
        <span className="text-xl font-bold">ChatApp</span>
      </motion.div>

      <div className="hidden md:flex space-x-8">
        {["Features", "Pricing", "Support", "About"].map((item, index) => (
          <motion.a
            key={index}
            href="#"
            className="font-medium hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            {item}
          </motion.a>
        ))}
      </div>

      <motion.button
        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-medium transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {!login && <Link to={"/signin"}>Sign In</Link>}
        {login && <h2 onClick={() => handleLogOut()}>logout</h2>}
      </motion.button>
    </motion.nav>
  );
}
