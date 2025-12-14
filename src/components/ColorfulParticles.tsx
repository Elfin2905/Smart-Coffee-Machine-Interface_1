import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export function ColorfulParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const colors = ['#F472B6', '#EC4899', '#A855F7', '#8B5CF6', '#06B6D4', '#10B981'];

  useEffect(() => {
    const parts: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      parts.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      });
    }
    setParticles(parts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: 0.3,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            filter: 'blur(2px)',
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) scale(0.9);
          }
          75% {
            transform: translateY(-25px) translateX(15px) scale(1.05);
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
