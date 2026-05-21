import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Heart, Sparkles } from "lucide-react";
import { useStories } from "../hooks/useStories.js";

function Story() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("me");

  // Default romantic stories
  const defaultStories = [
    { text: "The moment I met you, I knew my heart had found home. Your smile changed everything for me.", author: "her" },
    { text: "I love the way you laugh at my jokes, even the terrible ones. You make every moment magical.", author: "me" },
    { text: "In your eyes, I see my future, my forever, my everything. You are my greatest blessing.", author: "her" },
    { text: "Every day with you is a love story unfolding. I'm grateful for every single moment we share.", author: "me" },
    { text: "You didn't just find a place in my heart; you became the reason my heart beats. I love you endlessly.", author: "her" },
    { text: "The distance doesn't matter because my heart is always with you. You're my greatest adventure.", author: "me" },
  ];

  // Use custom hook for story management
  const { stories, isLoading, addStory } = useStories(defaultStories);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-4 md:px-6 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)]"
    >
      {/* Background animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: '10%', left: '5%' }}
        />
      </div>

      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="heading-1 gradient-text mb-4">Our Story 💕</h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Share your beautiful memories together
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-6 mb-8"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a memory... ✨"
            className="w-full p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[rgba(255,255,255,0.1)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-pink)] transition-colors resize-none"
            rows={4}
          />

          <div className="flex gap-3 mt-4 flex-col md:flex-row md:justify-between md:items-center">
            <select
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[rgba(255,255,255,0.1)] text-white focus:outline-none focus:border-[var(--accent-pink)] transition-colors"
            >
              <option value="me">Me 💙</option>
              <option value="her">Her 💖</option>
            </select>

            <motion.button
              onClick={() => addStory(text, author)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary flex items-center justify-center gap-2 w-full md:w-auto"
            >
              <Send className="w-4 h-4" />
              Add Memory
            </motion.button>
          </div>
        </motion.div>

        {/* Stories */}
        <AnimatePresence mode="popLayout">
          <motion.div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8 mx-auto text-[var(--accent-pink)]" />
                </motion.div>
                <p className="text-[var(--text-secondary)] mt-4">Loading memories...</p>
              </div>
            ) : stories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <Heart className="w-12 h-12 mx-auto text-[var(--accent-pink)] mb-4" />
                <p className="text-[var(--text-secondary)]">
                  No memories yet. Start by sharing your first one!
                </p>
              </motion.div>
            ) : (
              stories.map((story, idx) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-2xl max-w-[85%] ${
                    story.author === "me"
                      ? "ml-auto bg-gradient-to-r from-[var(--accent-pink)] to-pink-500 text-white"
                      : "mr-auto glass"
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed">{story.text}</p>
                  <p className={`text-xs mt-2 opacity-70 ${story.author === "me" ? "text-white" : "text-[var(--text-muted)]"}`}>
                    {story.author === "me" ? "You 💙" : "Arziya 💖"}
                  </p>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Story;
