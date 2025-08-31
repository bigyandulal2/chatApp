
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/feature/LoginActionSlicer";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavBar({ scrolled }) {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.login);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogOut() {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    setMenuOpen(false); // Auto-close on logout
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
      {/* Brand */}
      <motion.div
        className="flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
      >
        <div className="bg-blue-500 w-8 h-8 rounded-lg flex items-center justify-center">
          <span className="font-bold text-white">Y</span>
        </div>
        <span className="text-xl font-bold">YapSpace</span>
      </motion.div>

      {/* Desktop links */}
      <div className="hidden md:flex space-x-8">
        <motion.a href="#features" className="font-medium hover:text-blue-400" whileHover={{ scale: 1.1 }}>Features</motion.a>
        <motion.a href="#pricing" className="font-medium hover:text-blue-400" whileHover={{ scale: 1.1 }}>Pricing</motion.a>
        <motion.a href="#support" className="font-medium hover:text-blue-400" whileHover={{ scale: 1.1 }}>Support</motion.a>
        <motion.a href="#about" className="font-medium hover:text-blue-400" whileHover={{ scale: 1.1 }}>About</motion.a>
      </div>

      {/* Desktop auth buttons */}
      {login && (
        <motion.button
          className="hidden md:block bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogOut}
        >
          Logout
        </motion.button>
      )}
      {!login && (
        <motion.button
          className="hidden md:block bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/signin")}
        >
          Signin
        </motion.button>
      )}

      {/* Hamburger Icon */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 flex flex-col items-start space-y-4 px-6 py-4 md:hidden">
          <a href="#features" className="text-white" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#pricing" className="text-white" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#support" className="text-white" onClick={() => setMenuOpen(false)}>Support</a>
          <a href="#about" className="text-white" onClick={() => setMenuOpen(false)}>About</a>
          {!login && (
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/signin");
              }}
              className="text-white bg-blue-500 px-4 py-2 rounded-md"
            >
              Signin
            </button>
          )}
          {login && (
            <button
              onClick={handleLogOut}
              className="text-white bg-blue-500 px-4 py-2 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </motion.nav>
  );
}
