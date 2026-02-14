import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import confetti from "canvas-confetti";
import "../styles/proposal.css";

export default function Proposal() {

  const [stage, setStage] = useState("intro");
  const [tapCount, setTapCount] = useState(0);
  const [engaged, setEngaged] = useState(false);

  // 🎵 Cinematic Music
  useEffect(() => {
    const music = new Howl({
      src: ["/proposal.mp3"], // put in public folder
      volume: 0,
      loop: true,
    });

    music.play();

    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.6) {
        vol += 0.02;
        music.volume(vol);
      } else clearInterval(fade);
    }, 200);

    return () => {
      clearInterval(fade);
      music.stop();
      music.unload();
    };
  }, []);

  // Intro auto transition
  useEffect(() => {
    if (stage === "intro") {
      setTimeout(() => setStage("trap"), 6000);
    }
  }, [stage]);

  const handleTap = () => {
    setTapCount((prev) => prev + 1);

    if (tapCount > 6) {
      setStage("proposal");
    }
  };

  const handleYes = () => {
    setEngaged(true);

    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="proposal-container">

      {/* INTRO MODE */}
      <AnimatePresence>
        {stage === "intro" && (
          <motion.div
            className="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1>A Story About Us</h1>
            <p>Directed by Destiny</p>
            <p>Starring Arziya & You</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EMOTIONAL TRAP MODE */}
      {stage === "trap" && (
        <div className="trap" onClick={handleTap}>
          <motion.h2
            key={tapCount}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {tapCount === 0 && "Tap anywhere to continue..."}
            {tapCount === 1 && "Every love story is beautiful..."}
            {tapCount === 2 && "But ours feels different..."}
            {tapCount === 3 && "Because you are different..."}
            {tapCount === 4 && "You changed my world..."}
            {tapCount === 5 && "You became my peace..."}
            {tapCount === 6 && "You became my forever..."}
            {tapCount > 6 && "I don’t need 1000 reasons..."}
          </motion.h2>
        </div>
      )}

      {/* FINAL PROPOSAL */}
      <AnimatePresence>
        {stage === "proposal" && !engaged && (
          <motion.div
            className="final"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <h1>Arziya...</h1>
            <h2>Will You Stay With Me Forever? 💍</h2>

            <div className="buttons">
              <button className="yes" onClick={handleYes}>
                YES 💖
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ENGAGED MODE */}
      {engaged && (
        <motion.div
          className="engaged"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1>💍 Engaged Mode Activated 💍</h1>
          <p>Welcome to Forever, Arziya.</p>
        </motion.div>
      )}
    </div>
  );
}
