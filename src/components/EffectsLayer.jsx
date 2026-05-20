import { useEffect } from 'react';

export default function EffectsLayer() {
  useEffect(() => {
    // Periodic ambient light effects
    const ambientEffect = setInterval(() => {
      const ambient = document.createElement('div');
      ambient.className = 'ambient-glow';
      ambient.style.left = Math.random() * 100 + '%';
      ambient.style.top = Math.random() * 100 + '%';
      document.body.appendChild(ambient);
      
      setTimeout(() => ambient.remove(), 3000);
    }, 3000);

    return () => clearInterval(ambientEffect);
  }, []);

  return (
    <>
      <style>{`
        @keyframes ambientFloat {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(1);
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0.5);
          }
        }

        .ambient-glow {
          --tx: ${Math.random() * 200 - 100}px;
          --ty: ${Math.random() * 200 - 100}px;
          position: fixed;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 20, 147, 0.4), transparent);
          pointer-events: none;
          z-index: 1;
          animation: ambientFloat 3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
