import React, { useState, useEffect } from "react";
import { reasons } from "../data/reasons";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import "../styles/reasons.css";
export default function Reasons() {

  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [sound, setSound] = useState(null); // ✅ INSIDE component

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

  return (
    <div className="reasons-container">

      {/* Parallax Stars */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      {!started ? (
        <motion.button
          className="start-btn"
          onClick={() => setStarted(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          💖 Start The Story Arziya
        </motion.button>
      ) : (
        <>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${(index / reasons.length) * 100}%`,
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="reason-card"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 1.2 }}
            >
              {reasons[index]}
            </motion.div>
          </AnimatePresence>

          <button
            className="secret-btn"
            onClick={() => setShowSecret(true)}
          >
            💌 Secret
          </button>
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
          >
            <motion.div
              className="secret-box"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2>For Arziya 💖</h2>
              <p>
                Out of 1000 reasons…  
                I still can’t explain how deeply I love you.  
                You are my peace, my madness, my forever.
              </p>
              <button onClick={() => setShowSecret(false)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
