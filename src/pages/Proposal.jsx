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
      particleCount: 300,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#ff1493', '#ff69b4', '#ff8fab', '#667eea', '#00d4ff'],
      shapes: ['circle', 'square'],
    });

    // Additional confetti bursts
    setTimeout(() => {
      confetti({
        particleCount: 150,
        angle: 60,
        spread: 100,
        origin: { x: 0, y: 0.6 },
      });
    }, 100);

    setTimeout(() => {
      confetti({
        particleCount: 150,
        angle: 120,
        spread: 100,
        origin: { x: 1, y: 0.6 },
      });
    }, 200);
  };

  return (
    <motion.div
      className="proposal-container min-h-screen bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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

      {/* INTRO MODE */}
      <AnimatePresence>
        {stage === "intro" && (
          <motion.div
            className="intro text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-8"
            >
              <h1 className="heading-1 gradient-text mb-4">A Story About Us</h1>
            </motion.div>
            <motion.p
              className="text-2xl text-gray-400 mb-2"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Directed by Destiny
            </motion.p>
            <p className="text-xl text-[var(--accent-pink)]">Starring Arziya & You</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EMOTIONAL TRAP MODE */}
      {stage === "trap" && (
        <motion.div
          className="trap glass rounded-3xl p-12 max-w-2xl text-center cursor-pointer"
          onClick={handleTap}
          whileHover={{ scale: 1.02 }}
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={tapCount}
              className="heading-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {tapCount === 0 && "Tap anywhere to continue..."}
              {tapCount === 1 && "Every love story is beautiful..."}
              {tapCount === 2 && "But ours feels different..."}
              {tapCount === 3 && "Because you are different..."}
              {tapCount === 4 && "You changed my world..."}
              {tapCount === 5 && "You became my peace..."}
              {tapCount === 6 && "You became my forever..."}
              {tapCount > 6 && "I don't need 1000 reasons..."}
            </motion.h2>
          </AnimatePresence>

          {/* Progress indicator */}
          <motion.div
            className="mt-8 h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--accent-pink)] to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: `${((tapCount + 1) / 8) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* FINAL PROPOSAL */}
      <AnimatePresence>
        {stage === "proposal" && !engaged && (
          <motion.div
            className="final glass rounded-3xl p-12 text-center max-w-2xl"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              💍
            </motion.div>

            <h1 className="heading-1 mb-4">Arziya...</h1>
            <h2 className="heading-2 gradient-text mb-8">
              Will You Stay With Me Forever?
            </h2>

            <motion.button
              className="btn btn-primary text-xl px-10 py-4"
              onClick={handleYes}
              whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(255,20,147,0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              YES FOREVER 💖
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ENGAGED MODE */}
      {engaged && (
        <motion.div
          className="engaged text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ rotate: 360, y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-8"
          >
            💍
          </motion.div>
          <h1 className="heading-1 gradient-text mb-4">Forever Starts Now</h1>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to forever, Arziya. I can't wait to spend every moment with you, creating endless memories and stories that will last a lifetime.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
