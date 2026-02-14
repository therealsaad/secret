import { useEffect, useRef, useState } from "react";
import "../styles/home.css";

export default function Home() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // 🎬 cinematic intro loader
  useEffect(() => {
    setTimeout(() => setLoaded(true), 2500);
  }, []);

  // 🎵 BACKGROUND MUSIC
  useEffect(() => {
    const audio = new Audio("/home.mp3"); 
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const startMusic = () => {
      audio.play().catch(() => {});

      // 🎬 cinematic fade-in
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 0.7) {
          vol += 0.03;
          audio.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 200);
    };

    // mobile autoplay fix
    document.addEventListener("click", startMusic, { once: true });

    return () => {
      audio.pause();
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

      // ⭐ stars
      ctx.fillStyle = "white";
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        s.y -= s.speed;
        if (s.y < 0) s.y = canvas.height;
      });

      // 🌠 meteors
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
      <div className="loader">
        <h1>Loading Love...</h1>
      </div>
    );
  }

  return (
    <div className="home" onClick={createHearts}>
      <canvas ref={canvasRef} className="galaxy"></canvas>

      {/* 🎵 music glow indicator */}
      <div className="music-indicator">
        🎵 playing
      </div>

      <div className="content">
        <h1>Our Universe 💫</h1>
        <p>
          Even across distance, our hearts beat in the same sky.
        </p>

        <button className="love-btn">Explore Love</button>
      </div>
    </div>
  );
}
