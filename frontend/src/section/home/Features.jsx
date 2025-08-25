import { motion } from "framer-motion";

const features = [
  {
    title: "Real-time Messaging",
    description:
      "Instant message delivery with typing indicators and read receipts.",
    icon: "💬",
  },
  {
    title: "Voice & Video Calls",
    description:
      "Crystal clear HD audio and video calls with groups up to 8 people.",
    icon: "📱",
  },
  {
    title: "File Sharing",
    description:
      "Securely share documents, photos, and videos with end-to-end encryption.",
    icon: "🔒",
  },
];

export default function Features() {
  return (
    <section className="bg-gray-800 px-6 md:px-16 py-16" id="features">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Powerful Features
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Everything you need for seamless communication with friends, family,
          and colleagues, all in one place.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      className="bg-gray-700 rounded-xl p-6 transition-all hover:bg-gray-600"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="text-4xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
      <p className="text-gray-300">{feature.description}</p>
    </motion.div>
  );
}
