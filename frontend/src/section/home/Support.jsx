import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeadset, FaQuestionCircle, FaLifeRing } from "react-icons/fa";

const supportData = [
  {
    id: 1,
    icon: <FaHeadset className="text-indigo-500 text-3xl" />,
    title: "customer",
    description:
      "Get instant help from our team through live chat. We're here to assist you 24/7 with any queries.",
  },
  {
    id: 2,
    icon: <FaQuestionCircle className="text-green-500 text-3xl" />,
    title: "FAQs",
    description:
      "Browse through our frequently asked questions to quickly find solutions to common problems.",
  },
  {
    id: 3,
    icon: <FaLifeRing className="text-pink-500 text-3xl" />,
    title: "Community",
    description:
      "Join our community forum to connect, share tips, and learn from other users just like you.",
  },
];

export default function SupportSection() {
  const [activeId, setActiveId] = useState(1);

  return (
    <div className="w-full max-w-4xl mx-auto p-6" id="support">
      <h2 className="text-2xl font-bold text-center text-white mb-8">
        Need Help? <span className="text-indigo-500">We’re Here</span>
      </h2>

      <div className="flex justify-center  gap-6 mb-6">
        {supportData.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`flex flex-col items-center gap-2 px-4 w-[100px] py-3 rounded-2xl shadow-sm transition text-center
            ${
              activeId === item.id
                ? "bg-indigo-100 text-indigo-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.title}</span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[100px]">
        <AnimatePresence mode="wait">
          {supportData
            .filter((item) => item.id === activeId)
            .map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-6"
              >
                {item.icon}
                <h3 className="text-lg font-bold mt-4 text-[20px] text-blue-600">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center mt-2 font-semibold">{item.description}</p>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
