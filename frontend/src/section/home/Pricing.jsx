import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaCrown } from "react-icons/fa";
const plans = [
  {
    name: "Weekly",
    price: "$5",
    description: "Perfect for short-term use and trial periods.",
    icon: <FaClock className="text-blue-500 text-4xl mb-4" />,
  },
  {
    name: "Monthly",
    price: "$15",
    description: "Best for regular users who want flexibility.",
    icon: <FaCalendarAlt className="text-green-500 text-4xl mb-4" />,
  },
  {
    name: "Annual",
    price: "$120",
    description: "Great value for long-term commitment.",
    icon: <FaCrown className="text-yellow-500 text-4xl mb-4" />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, type: "spring", stiffness: 100 },
  }),
};

export default function Pricing() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-[50vh]  py-12 px-6"
      id="pricing"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-white mb-10"
      >
        Pricing Plans
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-transform"
          >
            {plan.icon}
            <h2 className="text-2xl font-semibold mb-2 text-2xl text-gray-400">
              {plan.name}
            </h2>
            <p className="text-gray-600 mb-4 text-center text-xl">
              {plan.description}
            </p>
            <span className="text-3xl font-bold mb-4 text-3xl text-green-600">
              {plan.price}
            </span>
            <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-transform cursor-pointer">
              Choose {plan.name}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
