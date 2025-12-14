import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  opacity: number;
  delay: number;
}

export function SnowfallEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 50; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 10 + Math.random() * 20,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.7,
        delay: Math.random() * 10,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white animate-fall"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.delay}s`,
            top: '-10px',
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(600px) translateX(${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 30}px);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}
