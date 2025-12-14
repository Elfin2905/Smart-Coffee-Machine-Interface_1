import { useState, useRef, MouseEvent, ReactNode } from 'react';

interface TouchButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function TouchButton({ children, onClick, className = '', disabled = false, variant = 'primary' }: TouchButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || !buttonRef.current) return;

    // Create ripple effect
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);

    onClick?.();
  };

  const baseStyles = 'relative overflow-hidden transition-all duration-200 active:scale-[0.97]';
  
  const variantStyles = {
    primary: 'bg-gradient-to-br from-[#D4A373] via-[#C49563] to-[#B58553] text-white shadow-lg shadow-[#D4A373]/20',
    secondary: 'bg-white/5 border border-white/10 text-white backdrop-blur-xl',
    ghost: 'bg-transparent text-white'
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-[ripple_0.6s_ease-out]"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
      
      {/* Shimmer overlay for primary variant */}
      {variant === 'primary' && !disabled && (
        <span 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s infinite'
          }}
        />
      )}
    </button>
  );
}
