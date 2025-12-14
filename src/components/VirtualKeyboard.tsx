import { Delete, Check, X } from 'lucide-react';
import { useState } from 'react';

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onClose: () => void;
  currentValue?: string; // Add prop to display current input
}

export function VirtualKeyboard({ onKeyPress, onBackspace, onEnter, onClose, currentValue = '' }: VirtualKeyboardProps) {
  const [isShift, setIsShift] = useState(false);
  const [isCapsLock, setIsCapsLock] = useState(false);

  const handleShift = () => {
    setIsShift(!isShift);
  };

  const handleCapsLock = () => {
    setIsCapsLock(!isCapsLock);
    setIsShift(false);
  };

  const handleKeyPress = (key: string) => {
    const shouldCapitalize = isCapsLock || isShift;
    const finalKey = shouldCapitalize ? key.toUpperCase() : key.toLowerCase();
    onKeyPress(finalKey);
    
    // Reset shift after single key press (but not caps lock)
    if (isShift && !isCapsLock) {
      setIsShift(false);
    }
  };

  const keyboardRows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
    ['y', 'x', 'c', 'v', 'b', 'n', 'm', 'ß', '-', '_']
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-white/8 to-white/2 pt-4 px-4 pb-8 overflow-hidden backdrop-blur-sm">
      <div className="relative h-full flex flex-col">
        {/* Keyboard Layout - Optimized for 2/3 display */}
        <div className="space-y-2.5">
          {/* Number Row */}
          <div className="flex gap-2 justify-center">
            {keyboardRows[0].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="w-[70px] h-12 rounded-lg bg-white/10 hover:bg-white/15 active:bg-[#D4A373]/30 border border-white/10 text-white transition-all active:scale-95 shadow-lg"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {key}
              </button>
            ))}
          </div>

          {/* First Letter Row */}
          <div className="flex gap-2 justify-center">
            {keyboardRows[1].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="w-[70px] h-12 rounded-lg bg-white/10 hover:bg-white/20 active:bg-[#D4A373]/30 border border-white/10 text-white transition-all active:scale-95"
              >
                {(isCapsLock || isShift) ? key.toUpperCase() : key}
              </button>
            ))}
          </div>

          {/* Second Letter Row */}
          <div className="flex gap-2 justify-center">
            {keyboardRows[2].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="w-[70px] h-12 rounded-lg bg-white/10 hover:bg-white/20 active:bg-[#D4A373]/30 border border-white/10 text-white transition-all active:scale-95"
              >
                {(isCapsLock || isShift) ? key.toUpperCase() : key}
              </button>
            ))}
          </div>

          {/* Third Letter Row with Shift */}
          <div className="flex gap-2 justify-center items-center">
            {/* Shift/Caps Lock */}
            <button
              onClick={handleShift}
              onDoubleClick={handleCapsLock}
              className={`w-20 h-12 rounded-lg border border-white/10 text-white text-sm transition-all active:scale-95 ${
                isCapsLock 
                  ? 'bg-[#D4A373]/50' 
                  : isShift 
                    ? 'bg-[#D4A373]/30' 
                    : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {isCapsLock ? 'CAPS' : '⇧'}
            </button>

            {keyboardRows[3].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="w-[60px] h-12 rounded-lg bg-white/10 hover:bg-white/20 active:bg-[#D4A373]/30 border border-white/10 text-white transition-all active:scale-95"
              >
                {(isCapsLock || isShift) ? key.toUpperCase() : key}
              </button>
            ))}

            {/* Backspace */}
            <button
              onClick={onBackspace}
              className="w-20 h-12 rounded-lg bg-red-500/20 hover:bg-red-500/30 active:bg-red-500/40 border border-red-500/20 text-white transition-all active:scale-95 flex items-center justify-center"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Row - Space, Enter and Close */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleKeyPress(' ')}
              className="flex-1 max-w-[600px] h-12 rounded-lg bg-white/10 hover:bg-white/20 active:bg-[#D4A373]/30 border border-white/10 text-white transition-all active:scale-95"
            >
              Leertaste
            </button>
            <button
              onClick={onEnter}
              className="w-24 h-12 rounded-lg bg-gradient-to-r from-[#D4A373] to-[#C49563] hover:opacity-90 active:opacity-80 text-white transition-all active:scale-95"
            >
              Fertig
            </button>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 transition-all active:scale-95 flex items-center justify-center"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}