import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Music } from "lucide-react";
import "../styles/home.css";

export default function Home() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🎬 cinematic intro loader
  useEffect(() => {
    setTimeout(() => setLoaded(true), 2500);
  }, []);

  // 🎵 BACKGROUND MUSIC
  useEffect(() => {
    const audio = new Audio("/home.mp3");
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    const startMusic = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          // Fade in effect
          let vol = 0;
          const fade = setInterval(() => {
            if (vol < 0.7) {
              vol += 0.02;
              audio.volume = vol;
            } else {
              clearInterval(fade);
            }
          }, 100);
        })
        .catch(err => {
          console.log("Audio play blocked:", err);
        });

      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
    };

    document.addEventListener("click", startMusic);
    document.addEventListener("touchstart", startMusic);

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // 🌌 galaxy + shooting meteors
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const stars = [];
    const meteors = [];

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.4,
      });
    }

    const createMeteor = () => {
      meteors.push({
        x: Math.random() * canvas.width,
        y: -50,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 6 + 4,
      });
    };

    setInterval(createMeteor, 2000);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "white";
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        s.y -= s.speed;
        if (s.y < 0) s.y = canvas.height;
      });

      meteors.forEach((m, index) => {
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x - m.length,
          m.y + m.length
        );
        gradient.addColorStop(0, "white");
        gradient.addColorStop(1, "transparent");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.length, m.y + m.length);
        ctx.stroke();

        m.x -= m.speed;
        m.y += m.speed;

        if (m.y > canvas.height) meteors.splice(index, 1);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // 💖 heart burst on tap
  const createHearts = () => {
    for (let i = 0; i < 40; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 2 + 2 + "s";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }
  };

  if (!loaded) {
    return (
      <motion.div
        className="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.h1
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Love...
        </motion.h1>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="home"
      onClick={createHearts}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas ref={canvasRef} className="galaxy"></canvas>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: '20%', left: '10%' }}
        />
      </div>

      {/* Music indicator */}
      {isPlaying && (
        <motion.div
          className="music-indicator"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Music className="w-4 h-4" />
          <span>Now Playing</span>
        </motion.div>
      )}

      <motion.div
        className="content relative z-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 gradient-text"
          animate={{ textShadow: ['0 0 20px rgba(255,20,147,0.3)', '0 0 40px rgba(255,20,147,0.6)', '0 0 20px rgba(255,20,147,0.3)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Our Universe 💫
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Even across distance, our hearts beat in the same sky.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.button
            className="btn btn-primary flex items-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(255,20,147,0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-5 h-5" />
            Explore Love
          </motion.button>

          <motion.button
            className="btn btn-glass flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5" />
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Tap indicator */}
      <motion.div
        className="absolute bottom-10 text-center text-sm text-gray-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p>Click to celebrate 💕</p>
      </motion.div>
    </motion.div>
  );
}
