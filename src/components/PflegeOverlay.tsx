import { X, Sparkles, Droplet, Loader2, Zap, Milk } from 'lucide-react';
import { TouchButton } from './TouchButton';
import svgPathsWaste from '../imports/svg-6a6xzd913c';
import svgPathsCoffeeBeans from '../imports/svg-5g771j36un';

interface PflegeOverlayProps {
  onClose: () => void;
  isTresterFull: boolean;
  setIsTresterFull: (value: boolean) => void;
  isCleaningRunning: boolean;
  setIsCleaningRunning: (value: boolean) => void;
  isDescalingRunning: boolean;
  setIsDescalingRunning: (value: boolean) => void;
}

export function PflegeOverlay({
  onClose,
  isTresterFull,
  setIsTresterFull,
  isCleaningRunning,
  setIsCleaningRunning,
  isDescalingRunning,
  setIsDescalingRunning
}: PflegeOverlayProps) {
  return (
    <div 
      className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="w-[800px] max-h-[550px] rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl border border-white/20"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-emerald-400" />
            <h2 className="text-white text-3xl">Pflege & Wartung</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-4 overflow-y-auto max-h-[420px] pr-2"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(212, 163, 115, 0.5) rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Wassertank auffüllen */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Droplet className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="text-white text-lg">Wassertank auffüllen</h3>
                  <p className="text-white/60 text-sm">Aktueller Füllstand: 45%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-white/60 text-sm">45%</span>
              </div>
            </div>
          </div>

          {/* Kaffeebohnen nachfüllen */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32">
                  <path d={svgPathsCoffeeBeans.p34c53200} fill="#D4A373" />
                </svg>
                <div>
                  <h3 className="text-white text-lg">Kaffeebohnen nachfüllen</h3>
                  <p className="text-white/60 text-sm">Aktueller Füllstand: 70%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4A373] rounded-full" style={{ width: '70%' }}></div>
                </div>
                <span className="text-white/60 text-sm">70%</span>
              </div>
            </div>
          </div>

          {/* Reinigungsprogramm */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-emerald-400" />
                <div>
                  <h3 className="text-white text-lg">Reinigungsprogramm</h3>
                  <p className="text-white/60 text-sm">Automatische Reinigung (ca. 5 Min.)</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCleaningRunning(true);
                  setTimeout(() => setIsCleaningRunning(false), 5000);
                }}
                disabled={isCleaningRunning}
                className="px-6 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-400/30 flex items-center gap-2"
              >
                {isCleaningRunning && <Loader2 className="w-4 h-4 animate-spin" />}
                {isCleaningRunning ? 'Läuft...' : 'Starten'}
              </button>
            </div>
          </div>

          {/* Entkalkungsprogramm */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-amber-400" />
                <div>
                  <h3 className="text-white text-lg">Entkalkungsprogramm</h3>
                  <p className="text-white/60 text-sm">Entkalken empfohlen (ca. 15 Min.)</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsDescalingRunning(true);
                  setTimeout(() => setIsDescalingRunning(false), 5000);
                }}
                disabled={isDescalingRunning}
                className="px-6 py-2 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-amber-400/30 flex items-center gap-2"
              >
                {isDescalingRunning && <Loader2 className="w-4 h-4 animate-spin" />}
                {isDescalingRunning ? 'Läuft...' : 'Starten'}
              </button>
            </div>
          </div>

          {/* Milchsystem spülen */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Milk className="w-8 h-8 text-[#D4A373]" />
                <div>
                  <h3 className="text-white text-lg">Milchsystem spülen</h3>
                  <p className="text-white/60 text-sm">Automatische Spülung (ca. 2 Min.)</p>
                </div>
              </div>
              <button
                className="px-6 py-2 rounded-xl bg-[#D4A373]/20 text-[#D4A373] hover:bg-[#D4A373]/30 transition-all border border-[#D4A373]/30"
              >
                Starten
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}