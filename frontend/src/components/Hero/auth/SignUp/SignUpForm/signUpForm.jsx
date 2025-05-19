import { useState } from "react";
import { motion } from "framer-motion";
import SignUpStep1 from "../SignUpStep1/SignUpStep1";
import SignUpStep2 from "../SignUpStep2/SignUpStep2";
import SignUpSuccess from "../SignUpSuccess/SignUpSuccess";
import SignUpProgress from "../SignUpProgress/SignUpProgress";
import SignUpSocial from "../SignUpSocial/SignUpSocial";
import SignUpFooter from "../SignUpFooter/SignUpFooter";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formStep, setFormStep] = useState(0);

  const nextStep = () => setFormStep((prev) => prev + 1);
  const prevStep = () => setFormStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormStep(2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden p-8 relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-blue-500 opacity-5 transform translate-x-6 translate-y-6 rounded-2xl -z-10"></div>
          <div className="absolute inset-0 bg-purple-500 opacity-5 transform -translate-x-3 translate-y-8 rounded-2xl -z-20"></div>

          {/* Logo and heading */}
          <div className="text-center mb-8">
            <Logo />
            <h1 className="text-2xl font-bold mb-2 text-white">
              {formStep === 0 && "Create an Account"}
              {formStep === 1 && "Secure Your Account"}
              {formStep === 2 && "Welcome Aboard!"}
            </h1>
            {formStep < 2 && (
              <p className="text-gray-400">
                {formStep === 0 && "Start connecting with friends and family"}
                {formStep === 1 &&
                  "Choose a strong password to protect your account"}
              </p>
            )}
            {formStep < 2 && (
              <SignUpProgress currentStep={formStep} totalSteps={2} />
            )}
          </div>

          <form onSubmit={handleSubmit}>
            {formStep === 0 && (
              <SignUpStep1
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
              />
            )}
            {formStep === 1 && (
              <SignUpStep2
                formData={formData}
                setFormData={setFormData}
                prevStep={prevStep}
                handleSubmit={handleSubmit}
              />
            )}
            {formStep === 2 && <SignUpSuccess />}
          </form>

          {formStep === 0 && <SignUpSocial />}
          {formStep < 2 && <SignUpFooter />}
        </div>
      </motion.div>
    </div>
  );
}

function Logo() {
  return (
    <motion.div
      className="flex items-center justify-center space-x-2 mb-4"
      whileHover={{ scale: 1.05 }}
    >
      <div className="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
        <span className="font-bold text-white text-xl">C</span>
      </div>
      <span className="text-2xl font-bold text-white">ChatApp</span>
    </motion.div>
  );
}
