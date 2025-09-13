import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SignUpSocial from "../section/signupform/SignUpSocial";
import { FiMail, FiAlertCircle, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/feature/LoginActionSlicer";
import "../css/SignInForm.css";

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const login = useSelector((state) => state.room.login);
  const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  // const {
  //   data: loginResponse,
  //   loading,
  //   error,
  //   refetch: userLogin,
  // } = useApi("http://localhost:5000/api/users/login", "POST", formData);
    

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const handlePasswordChange = (e) =>
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  const handleSubmit = async () => {
    
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;

    }
    try{
      const res=await api.post("/users/login",{email:formData.email,password:formData.password})
      if(!res.data){
        setLoginError(true);
         throw new Error("error fetching the data");
      }
      setLoginError(false);
      console.log("here is from the signin form",res.data);
      dispatch(loginUser(res.data));
      alert("Login successful!");
      navigate("/room", { state: { data: res.data } });

    }
    catch(error){
       console.error(error,"from signin");
    }
    
   
  
    
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
          </div>

          <InputField
            icon={<FiMail style={{ color: "white" }} />}
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="johndoe@example.com"
            error={formData.email && !isEmailValid()}
            errorMessage="Please enter a valid email address"
          />
          <PasswordInput
            label="Password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => handlePasswordChange(e)}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            className="w-full mt-4 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-colors"
          >
            Sign In
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/signup")}
            className="w-full mt-4 py-3 px-4 bg-white hover:bg-gray-200 text-blue-600 rounded-lg font-medium text-lg transition-colors"
          >
            Sign Up
          </motion.button>
          <SignUpSocial />
        </div>
      </motion.div>
      {loginError && (
        <motion.div className="signinerror">
          <h3 className="text-red-300">Failed Authentication!</h3>
        </motion.div>
      )}
    </div>
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
function InputField({ icon, label, error, errorMessage, ...props }) {
  return (
    <div className="mb-6">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium mb-2 text-white"
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
        <input
          className="w-full py-3 pl-10 pr-4 bg-gray-700 border text-white border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
