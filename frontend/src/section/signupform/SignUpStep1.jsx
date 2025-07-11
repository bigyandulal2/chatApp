import { motion } from "framer-motion";
import { FiUser, FiMail, FiArrowRight, FiAlertCircle } from "react-icons/fi";

export default function SignUpStep1({ formData, setFormData, nextStep }) {
  const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isStepValid = () => formData.name && isEmailValid();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white"
    >
      <InputField
        icon={<FiUser style={{ color: "white" }} />}
        label="Full Name"
        id="name"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="John Doe"
      />

      <InputField
        icon={<FiMail style={{ color: "white" }} />}
        label="Email Address"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="johndoe@example.com"
        error={formData.email && !isEmailValid()}
        errorMessage="Please enter a valid email address"
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextStep}
        disabled={!isStepValid()}
        className={`w-full py-3 px-4 mt-8 flex items-center justify-center rounded-lg font-medium text-lg text-white transition-colors ${
          isStepValid()
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-blue-600 cursor-not-allowed"
        }`}
      >
        Continue <FiArrowRight className="ml-2" />
      </motion.button>
    </motion.div>
  );
}

function InputField({ icon, label, error, errorMessage, ...props }) {
  return (
    <div className="mb-6">
      <label htmlFor={props.id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
        <input
          className="w-full py-3 pl-10 pr-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center">
          <FiAlertCircle className="mr-1" /> {errorMessage}
        </p>
      )}
    </div>
  );
}
