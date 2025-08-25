import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaComments,
  FaShieldAlt,
  FaUsers,
  FaRocket,
  FaSyncAlt,
} from "react-icons/fa";

const features = [
  {
    title: "Real-time Messaging",
    icon: <FaComments className="text-blue-500 text-xl" />,
    desc: "Stay connected with lightning-fast messaging powered by WebSockets.",
  },
  {
    title: "Privacy & Security",
    icon: <FaShieldAlt className="text-green-500 text-xl" />,
    desc: "End-to-end encryption ensures your conversations remain private and safe.",
  },
  {
    title: "Room meeting",
    icon: <FaUsers className="text-purple-500 text-xl" />,
    desc: "Create and join Rooms to engage in group conversations.",
  },
  {
    title: "Fast & Lightweight",
    icon: <FaRocket className="text-red-500 text-xl" />,
    desc: "Optimized for performance, Yapspace runs smoothly across devices.",
  },
];

const About = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="min-h-[60vh] flex items-center justify-center bg-gray-800  py-10 px-4"
      id="about"
    >
      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-6 text-gray-50"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Yapspace
        </motion.h2>

        <p className="text-center text-gray-100 opacity-80 mb-8">
          Yapspace is a modern chat communication platform designed to bring
          people together with seamless, secure, and real-time conversations.
        </p>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-200 shadow-md rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <span className="font-semibold text-gray-800">
                    {feature.title}
                  </span>
                </div>
                <span className="text-xl text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* Smooth Tailwind-based transition */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 border-t text-gray-600 bg-gray-50">
                  {feature.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
