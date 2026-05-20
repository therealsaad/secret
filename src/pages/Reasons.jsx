import React, { useState, useEffect } from "react";
import { reasons } from "../data/reasons";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import { Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/reasons.css";

export default function Reasons() {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    if (!started) return;

    const music = new Howl({
      src: ["/reason.mp3"],
      volume: 0,
      loop: true,
    });

    music.play();

    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.5) {
        vol += 0.02;
        music.volume(vol);
      } else {
        clearInterval(fade);
      }
    }, 200);

    setSound(music);

    return () => {
      clearInterval(fade);
      music.stop();
      music.unload();
    };
  }, [started]);

  // Auto storytelling mode
  useEffect(() => {
    if (!started) return;

    const timer = setInterval(() => {
      setIndex((prev) =>
        prev < reasons.length - 1 ? prev + 1 : prev
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [started]);

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setIndex((prev) =>
      prev < reasons.length - 1 ? prev + 1 : prev
    );
  };

  return (
    <div className="reasons-container">
      {/* Parallax Stars */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      {!started ? (
        <motion.div
          className="flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl"
          >
            💖
          </motion.div>
          <motion.button
            className="start-btn"
            onClick={() => setStarted(true)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Reading 1000 Reasons
          </motion.button>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-gray-400"
          >
            Tap to begin...
          </motion.p>
        </motion.div>
      ) : (
        <>
          <div className="progress-bar">
            <motion.div
              className="progress"
              initial={{ width: 0 }}
              animate={{
                width: `${(index / reasons.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="reason-card"
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -80, scale: 0.9 }}
              transition={{ duration: 1.2 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {reasons[index]}
              </motion.div>
              <motion.p
                className="text-xs mt-6 text-gray-400 text-center"
                animate={{ opacity: [0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Reason {index + 1} of {reasons.length}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-4 items-center z-10">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full glass hover:bg-[rgba(255,20,147,0.2)] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={() => setShowSecret(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary hidden md:flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Secret Message
            </motion.button>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full glass hover:bg-[rgba(255,20,147,0.2)] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Mobile Secret Button */}
          <motion.button
            onClick={() => setShowSecret(true)}
            className="md:hidden fixed bottom-20 right-6 p-4 rounded-full bg-gradient-to-r from-[var(--accent-pink)] to-pink-500 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="w-6 h-6 text-white" />
          </motion.button>
        </>
      )}

      {/* Secret Popup */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            className="secret-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSecret(false)}
          >
            <motion.div
              className="secret-box"
              initial={{ scale: 0, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 5 }}
              transition={{ duration: 0.6 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4 text-center"
              >
                💌
              </motion.div>
              <h2 className="text-2xl font-bold mb-4 gradient-text text-center">
                For Arziya
              </h2>
              <p className="text-lg leading-relaxed text-gray-300 mb-6">
                Out of 1000 reasons… I still can't explain how deeply I love you. You are my peace, my madness, my forever.
              </p>
              <motion.button
                onClick={() => setShowSecret(false)}
                className="w-full btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
