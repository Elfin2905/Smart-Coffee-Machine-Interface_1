import { ChevronLeft, Save } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TouchButton } from './TouchButton';

interface MilchWasserDetailProps {
  selectedDrink: string;
  amount: number;
  setAmount: (value: number) => void;
  temperature: number;
  setTemperature: (value: number) => void;
  foamLevel: string;
  setFoamLevel: (value: string) => void;
  cupCount: number;
  setCupCount: (count: number) => void;
  onBack: () => void;
  onSave: () => void;
  onStart: () => void;
}

export function MilchWasserDetail({
  selectedDrink,
  amount,
  setAmount,
  temperature,
  setTemperature,
  foamLevel,
  setFoamLevel,
  cupCount,
  setCupCount,
  onBack,
  onSave,
  onStart
}: MilchWasserDetailProps) {
  const isMilchschaum = selectedDrink === 'Milchschaum';
  const isHeisswasser = selectedDrink === 'Heißwasser';
  const isWarmeMilch = selectedDrink === 'Warme Milch';

  // Get appropriate image based on drink type
  const getImageUrl = () => {
    if (isMilchschaum) {
      return 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwZm9hbXxlbnwwfHx8fDE3MzM1MDY0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (isHeisswasser) {
      return 'https://images.unsplash.com/photo-1606312619070-d48b4cff3edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjB3YXRlciUyMGN1cHxlbnwwfHx8fDE3MzM1MDY0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080';
    } else {
      return 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwbWlsa3xlbnwwfHx8fDE3MzM1MDY0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080';
    }
  };

  return (
    <div className="absolute inset-0 bg-[#0F0F11] z-50 flex flex-col">
      {/* Header */}
      <header className="h-[60px] px-6 flex items-center justify-between border-b border-white/10 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Zurück</span>
        </button>
        <h1 className="text-white text-xl">{selectedDrink}</h1>
        <div className="w-24"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex gap-6 overflow-hidden">
        {/* Left Side - Image and Start Button */}
        <div className="w-[240px] flex flex-col items-center justify-center gap-6">
          {/* Drink Image Circle */}
          <div 
            className="w-[200px] h-[200px] rounded-full border-4 flex items-center justify-center relative overflow-hidden"
            style={{ borderColor: '#D4A373' }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/20 to-transparent"></div>
            
            {/* Drink Image */}
            <ImageWithFallback
              src={getImageUrl()}
              alt={selectedDrink}
              className="w-64 h-64 object-contain relative z-10"
            />
          </div>
          <div className="text-center w-full">
            <div className="text-[#D4A373] text-3xl mb-4">{amount}ml</div>
            
            {/* Heart Icon Button */}
            <button
              className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center mb-3 mx-auto transition-all active:scale-95 group"
            >
              <svg className="w-7 h-7 text-white/60 group-hover:text-[#EF4444] transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <button
              className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4A373] to-[#C49563] text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-[#D4A373]/20"
              onClick={onStart}
            >
              Starten
            </button>
          </div>
        </div>

        {/* Right Side - Settings Container */}
        <div 
          className="flex-1 rounded-3xl p-8 relative overflow-auto backdrop-blur-xl border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
          }}
        >
          <div className="space-y-8">
            <h2 className="text-white text-2xl mb-6">Einstellungen</h2>

            {/* MILCHSCHAUM - Show Foam Options */}
            {isMilchschaum && (
              <div>
                <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">Schaumart</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFoamLevel('Wenig Schaum')}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                      foamLevel === 'Wenig Schaum' 
                        ? 'bg-[#D4A373]/20 text-white border border-[#D4A373]' 
                        : 'bg-white/5 text-white/60 border border-white/10'
                    }`}
                  >
                    Wenig Schaum
                  </button>
                  <button
                    onClick={() => setFoamLevel('Cremig')}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                      foamLevel === 'Cremig' 
                        ? 'bg-[#D4A373]/20 text-white border border-[#D4A373]' 
                        : 'bg-white/5 text-white/60 border border-white/10'
                    }`}
                  >
                    Cremig
                  </button>
                  <button
                    onClick={() => setFoamLevel('Fest')}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                      foamLevel === 'Fest' 
                        ? 'bg-[#D4A373]/20 text-white border border-[#D4A373]' 
                        : 'bg-white/5 text-white/60 border border-white/10'
                    }`}
                  >
                    Fest
                  </button>
                </div>
              </div>
            )}

            {/* HEISSWASSER or WARME MILCH - Show Amount and Temperature */}
            {(isHeisswasser || isWarmeMilch) && (
              <>
                {/* MENGE (Amount) */}
                <div>
                  <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">
                    Menge: {amount}ml
                  </label>
                  <input
                    type="range"
                    min={isHeisswasser ? "50" : "100"}
                    max={isHeisswasser ? "300" : "250"}
                    step="10"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4A373]"
                    style={{
                      background: `linear-gradient(to right, #D4A373 0%, #D4A373 ${((amount - (isHeisswasser ? 50 : 100)) / (isHeisswasser ? 250 : 150)) * 100}%, rgba(255,255,255,0.1) ${((amount - (isHeisswasser ? 50 : 100)) / (isHeisswasser ? 250 : 150)) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-white/40 text-xs mt-2">
                    <span>{isHeisswasser ? '50ml' : '100ml'}</span>
                    <span>{isHeisswasser ? '300ml' : '250ml'}</span>
                  </div>
                </div>

                {/* TEMPERATUR */}
                <div>
                  <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">
                    Temperatur: {temperature}°C
                  </label>
                  <input
                    type="range"
                    min="60"
                    max="100"
                    step="5"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4A373]"
                    style={{
                      background: `linear-gradient(to right, #D4A373 0%, #D4A373 ${((temperature - 60) / 40) * 100}%, rgba(255,255,255,0.1) ${((temperature - 60) / 40) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-white/40 text-xs mt-2">
                    <span>60°C</span>
                    <span>100°C</span>
                  </div>
                </div>
              </>
            )}

            {/* ANZAHL */}
            <div>
              <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">Anzahl</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCupCount(1)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                    cupCount === 1 
                      ? 'bg-[#D4A373]/20 text-white border border-[#D4A373]' 
                      : 'bg-white/5 text-white/60 border border-white/10'
                  }`}
                >
                  1 Tasse
                </button>
                <button
                  onClick={() => setCupCount(2)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                    cupCount === 2 
                      ? 'bg-[#D4A373]/20 text-white border border-[#D4A373]' 
                      : 'bg-white/5 text-white/60 border border-white/10'
                  }`}
                >
                  2 Tassen
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}