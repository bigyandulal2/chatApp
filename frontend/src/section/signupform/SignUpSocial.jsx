import { motion } from "framer-motion";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

export default function SignUpSocial() {
  return (
    <div className="mt-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800  text-gray-200">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <SocialButton
          icon={<FiGithub size={20} style={{ color: "white" }} />}
        />
        <SocialButton
          icon={<FiTwitter size={20} style={{ color: "white" }} />}
        />
        <SocialButton
          icon={<FiLinkedin size={20} style={{ color: "white" }} />}
        />
      </div>
    </div>
  );
}

function SocialButton({ icon }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      className="w-full py-2 px-4 border border-gray-600 rounded-lg flex justify-center items-center text-gray-300 hover:bg-gray-700 transition-colors"
    >
      {icon}
    </motion.button>
  );
}
