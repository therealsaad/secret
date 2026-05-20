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

  // 🎵 AUTO-PLAY BACKGROUND MUSIC with auto-start
  useEffect(() => {
    const audio = new Audio("/home.mp3");
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    // Start music automatically when page loads
    const startMusicAutomatically = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        
        // Cinematic fade-in
        let vol = 0;
        const fade = setInterval(() => {
          if (vol < 0.7) {
            vol += 0.03;
            audio.volume = vol;
          } else {
            clearInterval(fade);
          }
        }, 150);
      } catch (err) {
        console.log("[v0] Autoplay blocked, waiting for user interaction");
      }
    };

    // Auto-start after a short delay
    const autoplayTimer = setTimeout(startMusicAutomatically, 500);

    // Fallback: start on first user interaction
    const startMusicOnInteraction = async () => {
      if (!isPlaying) {
        try {
          await audio.play();
          setIsPlaying(true);
          let vol = 0;
          const fade = setInterval(() => {
            if (vol < 0.7) {
              vol += 0.03;
              audio.volume = vol;
            } else {
              clearInterval(fade);
            }
          }, 150);
        } catch (err) {
          console.log("[v0] Play failed:", err);
        }
      }
      document.removeEventListener("click", startMusicOnInteraction);
      document.removeEventListener("touchstart", startMusicOnInteraction);
    };

    document.addEventListener("click", startMusicOnInteraction);
    document.addEventListener("touchstart", startMusicOnInteraction);

    return () => {
      clearTimeout(autoplayTimer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying]);

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

  // 💖 MEGA HEART BURST with light effects
  const createHearts = () => {
    // Large burst of hearts
    for (let i = 0; i < 60; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 2 + 2 + "s";
      heart.style.setProperty('--delay', Math.random() * 0.2 + 's');
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 4500);
    }

    // Create light burst effect
    const lightBurst = document.createElement("div");
    lightBurst.className = "light-burst";
    lightBurst.style.left = window.innerWidth / 2 + "px";
    lightBurst.style.top = window.innerHeight / 2 + "px";
    document.body.appendChild(lightBurst);
    setTimeout(() => lightBurst.remove(), 1200);

    // Particle explosion
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = window.innerWidth / 2 + "px";
      particle.style.top = window.innerHeight / 2 + "px";
      particle.style.setProperty('--angle', Math.random() * 360 + 'deg');
      particle.style.setProperty('--distance', Math.random() * 300 + 100 + 'px');
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1500);
    }
  };

  // 🎆 Create periodic light flashes
  useEffect(() => {
    if (!isPlaying) return;

    const flashInterval = setInterval(() => {
      const flash = document.createElement("div");
      flash.className = "flash-effect";
      flash.style.opacity = Math.random() * 0.3 + 0.1;
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 600);
    }, 4000);

    return () => clearInterval(flashInterval);
  }, [isPlaying]);

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

      {/* Music indicator with crazy glow */}
      <motion.div
        className="music-indicator"
        animate={{
          scale: isPlaying ? [1, 1.15, 1] : 1,
          opacity: isPlaying ? [0.7, 1, 0.7] : 0.5,
          textShadow: isPlaying ? [
            '0 0 10px rgba(255,20,147,0.3)',
            '0 0 30px rgba(255,20,147,0.8)',
            '0 0 10px rgba(255,20,147,0.3)'
          ] : 'none'
        }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        {isPlaying ? (
          <>
            <Music className="w-5 h-5 animate-bounce" />
            <span className="font-bold">🎵 Now Playing</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4" />
            <span>Click to start music</span>
          </>
        )}
      </motion.div>

      {/* Floating orbs effect */}
      <div className="floating-orbs">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="orb"
            animate={{
              x: [0, Math.cos(i) * 100, 0],
              y: [0, Math.sin(i) * 100, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: i === 0 ? 'radial-gradient(circle, #ff1493, transparent)' : 
                         i === 1 ? 'radial-gradient(circle, #667eea, transparent)' :
                         'radial-gradient(circle, #00d4ff, transparent)',
            }}
          />
        ))}
      </div>

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
