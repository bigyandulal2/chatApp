import { color, motion } from "framer-motion";
import { FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import PasswordStrengthIndicator from "./PasswordIndicator";
import { useState } from "react";
export default function SignUpStep2({
  formData,
  setFormData,
  prevStep,
  handleSubmit,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      let strength = 0;
      if (value.length > 6) strength += 1;
      if (value.match(/[A-Z]/)) strength += 1;
      if (value.match(/[0-9]/)) strength += 1;
      if (value.match(/[^A-Za-z0-9]/)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const isPasswordValid = () => formData.password.length >= 8;
  const doPasswordsMatch = () => formData.password === formData.confirmPassword;
  const isStepValid = () => isPasswordValid() && doPasswordsMatch();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PasswordInput
        label="Create Password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handlePasswordChange}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        hasError={formData.password && !isPasswordValid()}
        errorMessage="Password must be at least 8 characters long"
      />
      <PasswordStrengthIndicator strength={passwordStrength} />

      <PasswordInput
        label="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handlePasswordChange}
        showPassword={showConfirmPassword}
        setShowPassword={setShowConfirmPassword}
        hasError={formData.confirmPassword && !doPasswordsMatch()}
        errorMessage="Passwords do not match"
      />

      <div className="flex space-x-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
          className="w-1/3 py-3 px-4 bg-transparent border border-gray-600 rounded-lg font-medium transition-colors hover:bg-gray-700 text-white"
        >
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!isStepValid()}
          className={`w-2/3 py-3 px-4 rounded-lg font-medium text-lg  transition-colors ${
            isStepValid()
              ? "bg-blue-500 text-white hover:bg-blue-600 text-white"
              : "bg-blue-600 text-white cursor-not-allowed "
          }`}
        >
          Create Account
        </motion.button>
      </div>
    </motion.div>
  );
}

function PasswordInput({
  label,
  showPassword,
  setShowPassword,
  hasError,
  errorMessage,
  ...props
}) {
  return (
    <div className="mb-6">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium mb-2 text-white placeholder-white"
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">
          <FiLock size={18} style={{ color: "white" }} />
        </span>
        <input
          type={showPassword ? "text" : "password"}
          className={`w-full py-3 pl-10 pr-12 bg-gray-700 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            hasError ? "border-red-500" : "border-gray-600"
          }`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
      {hasError && (
        <p className="mt-2 text-sm text-red-400 flex items-center">
          <FiAlertCircle className="mr-1" /> {errorMessage}
        </p>
      )}
    </div>
  );
}
