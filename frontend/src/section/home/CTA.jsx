import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function CTA() {
  const navigate = useNavigate();
  const login = useSelector((state) => state.login.login);

  return (
    <>
      {!login && (
        <motion.section
          className="px-6 md:px-16 py-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start chatting?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join millions of users worldwide and experience communication
              without limits.
            </p>
            <motion.button
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
            >
              Sign Up for Free
            </motion.button>
          </motion.div>
        </motion.section>
      )}
    </>
  );
}
