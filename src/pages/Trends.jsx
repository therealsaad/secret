
import { motion } from "framer-motion";
import { Heart, Camera, Sparkles } from "lucide-react";

export default function Trends() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)]"
    >
      <div className="max-w-2xl w-full text-center">
        {/* Animated Heart Icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8"
        >
          <Camera className="w-24 h-24 mx-auto text-[var(--accent-pink)]" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="heading-1 gradient-text mb-6"
        >
          Our Memories 📸
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[var(--text-secondary)] mb-8"
        >
          Your beautiful moments deserve a place here. Share your favorite photos and let them tell our story together.
        </motion.p>

        {/* Call to action */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8 mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-[var(--accent-pink)]" />
            <h2 className="heading-3">Coming Soon</h2>
            <Sparkles className="w-6 h-6 text-[var(--accent-pink)]" />
          </div>
          <p className="text-[var(--text-secondary)]">
            We're building a beautiful gallery to showcase all our precious memories. Stay tuned!
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-4"
        >
          {[
            { icon: Heart, title: "Share Memories", desc: "Upload your favorite moments" },
            { icon: Sparkles, title: "Beautiful Gallery", desc: "Organized by date & events" },
            { icon: Camera, title: "Tell Stories", desc: "Captions & descriptions" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-2xl p-6"
            >
              <item.icon className="w-10 h-10 text-[var(--accent-pink)] mx-auto mb-3" />
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
