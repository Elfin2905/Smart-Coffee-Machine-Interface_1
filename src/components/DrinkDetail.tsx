import { useState, useEffect } from 'react';
import { ChevronLeft, Heart, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { type Theme } from '../theme';

// Import drink images
import {
  espresso,
  cappuccino,
  latteMacchiato,
  milchKaffee,
  americano,
  wasser,
  caffeCrema,
  milchSchaum,
} from '../assets/image';

const espressoImage = espresso;
const cappuccinoImage = cappuccino;
const latteMacchiatoImage = latteMacchiato;
const milchKaffeeImage = milchKaffee;
const americanoImage = americano;
const wasserImage = wasser;
const caffeCremaImage = caffeCrema;
const milchSchaumImage = milchSchaum;


interface DrinkDetailProps {
  selectedDrink: string;
  drinkSize: number;
  setDrinkSize: (size: number) => void;
  milkFoam: boolean;
  setMilkFoam: (hasFoam: boolean) => void;
  milkFoamType: string;
  setMilkFoamType: (type: string) => void;
  temperature: number;
  setTemperature: (temp: number) => void;
  cupCount: number;
  setCupCount: (count: number) => void;
  onBack: () => void;
  onSave: () => void;
  onStart: () => void;
  theme: Theme;
}

export function DrinkDetail({
  selectedDrink,
  drinkSize,
  setDrinkSize,
  milkFoam,
  setMilkFoam,
  milkFoamType,
  setMilkFoamType,
  temperature,
  setTemperature,
  cupCount,
  setCupCount,
  onBack,
  onSave,
  onStart,
  theme
}: DrinkDetailProps) {
  const getDrinkImage = () => {
    switch (selectedDrink) {
      case 'Espresso': return espressoImage;
      case 'Cappuccino': return cappuccinoImage;
      case 'Latte Macchiato': return latteMacchiatoImage;
      case 'Caffè Crema': return caffeCremaImage;
      case 'Milchkaffee': return milchKaffeeImage;
      case 'Americano': return americanoImage;
      case 'Milch': return milchSchaumImage;
      case 'Heißes Wasser': return wasserImage;
      default: return espressoImage;
    }
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="absolute inset-0 z-50" style={{ background: theme.background }}>
      {/* Custom Header */}
      <header 
        className="h-[60px] px-6 flex items-center justify-between border-b"
        style={{ borderColor: theme.cardBorder }}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: theme.textPrimary }} />
          </button>
          <h1 style={{ color: theme.textPrimary }} className="text-2xl">{selectedDrink}</h1>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 p-6 h-[calc(600px-60px)] flex gap-6" style={{ fontFamily: theme.fontFamily }}>
        {/* Left: Drink Image + Start Button */}
        <div className="w-[240px] flex flex-col items-center justify-center gap-6">
          <div 
            className="w-[200px] h-[200px] rounded-full border-4 flex items-center justify-center relative overflow-hidden"
            style={{ borderColor: theme.accent }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br to-transparent" style={{ backgroundImage: `linear-gradient(to bottom right, ${theme.accentGlow}, transparent)` }}></div>
            
            {/* Drink Image */}
            <ImageWithFallback 
              src={getDrinkImage()}
              alt={selectedDrink}
              className={
                selectedDrink === 'Latte Macchiato' || selectedDrink === 'Milch' || selectedDrink === 'Heißes Wasser'
                  ? 'w-32 h-32 object-contain relative z-10' 
                  : 'w-64 h-64 object-contain relative z-10'
              }
            />
          </div>
          <div className="text-center w-full">
            <div className="text-3xl mb-4" style={{ color: theme.accent }}>{drinkSize}ml</div>
            
            {/* Heart Icon Button */}
            <button
              onClick={() => {
                setIsFavorite(!isFavorite);
                onSave();
                setShowPopup(true);
              }}
              className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center mb-3 mx-auto transition-all active:scale-95 group"
            >
              <Heart 
                className={`w-7 h-7 transition-all ${
                  isFavorite 
                    ? 'fill-[#EF4444] text-[#EF4444]' 
                    : 'text-white/60 group-hover:text-[#EF4444]'
                }`}
                style={{
                  filter: isFavorite ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))' : 'none'
                }}
              />
            </button>
            
            <button
              className="w-full px-8 py-4 rounded-xl transition-all hover:opacity-90 active:scale-95 shadow-lg"
              style={{
                background: theme.buttonGradient,
                color: theme.textPrimary,
                boxShadow: `0 10px 25px -5px ${theme.accentGlow}`
              }}
              onClick={onStart}
            >
              Starten
            </button>
          </div>
        </div>

        {/* Right: Single Container with All Settings */}
        <div className="flex-1">
          <div 
            className={`rounded-2xl p-6 ${theme.glassEffect} border h-full`}
            style={{ 
              background: theme.cardBg,
              borderColor: theme.cardBorder
            }}
          >
            <div className="h-full flex flex-col gap-6">
              {/* GRÖSSE */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm uppercase tracking-wider" style={{ color: theme.textSecondary }}>Größe</label>
                  <span style={{ color: theme.accent }}>{drinkSize} ml</span>
                </div>
                
                <input
                  type="range"
                  min="20"
                  max="300"
                  value={drinkSize}
                  onChange={(e) => setDrinkSize(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer mb-3"
                  style={{
                    background: `linear-gradient(to right, ${theme.accent} 0%, ${theme.accent} ${((drinkSize - 20) / 280) * 100}%, rgba(255,255,255,0.1) ${((drinkSize - 20) / 280) * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setDrinkSize(80)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all border`}
                    style={
                      drinkSize === 80 
                        ? { background: `${theme.accent}20`, color: theme.textPrimary, borderColor: theme.accent }
                        : { background: 'rgba(255, 255, 255, 0.05)', color: theme.textSecondary, borderColor: 'rgba(255, 255, 255, 0.1)' }
                    }
                  >
                    Klein
                  </button>
                  <button
                    onClick={() => setDrinkSize(150)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all border`}
                    style={
                      drinkSize === 150 
                        ? { background: `${theme.accent}20`, color: theme.textPrimary, borderColor: theme.accent }
                        : { background: 'rgba(255, 255, 255, 0.05)', color: theme.textSecondary, borderColor: 'rgba(255, 255, 255, 0.1)' }
                    }
                  >
                    Mittel
                  </button>
                  <button
                    onClick={() => setDrinkSize(250)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all border`}
                    style={
                      drinkSize === 250 
                        ? { background: `${theme.accent}20`, color: theme.textPrimary, borderColor: theme.accent }
                        : { background: 'rgba(255, 255, 255, 0.05)', color: theme.textSecondary, borderColor: 'rgba(255, 255, 255, 0.1)' }
                    }
                  >
                    Groß
                  </button>
                </div>
              </div>

              {/* TEMPERATUR */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm uppercase tracking-wider" style={{ color: theme.textSecondary }}>Temperatur</label>
                  <span style={{ color: theme.accent }}>{temperature}°C</span>
                </div>
                
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${theme.accent} 0%, ${theme.accent} ${((temperature - 60) / 35) * 100}%, rgba(255,255,255,0.1) ${((temperature - 60) / 35) * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>

              {/* MILCHSCHAUM - nur wenn nicht "Heißes Wasser" */}
              {selectedDrink !== 'Heißes Wasser' && (
                <div>
                  <label className="text-sm uppercase tracking-wider block mb-3" style={{ color: theme.textSecondary }}>Milchschaum</label>
                  
                  {/* Mit/Ohne Toggle */}
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setMilkFoam(false)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all border`}
                      style={
                        !milkFoam 
                          ? { background: `${theme.accent}20`, color: theme.textPrimary, borderColor: theme.accent }
                          : { background: 'rgba(255, 255, 255, 0.05)', color: theme.textSecondary, borderColor: 'rgba(255, 255, 255, 0.1)' }
                      }
                    >
                      Ohne
                    </button>
                    <button
                      onClick={() => setMilkFoam(true)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all border`}
                      style={
                        milkFoam 
                          ? { background: `${theme.accent}20`, color: theme.textPrimary, borderColor: theme.accent }
                          : { background: 'rgba(255, 255, 255, 0.05)', color: theme.textSecondary, borderColor: 'rgba(255, 255, 255, 0.1)' }
                      }
                    >
                      Mit
                    </button>
                  </div>

                  {/* Schaumtyp Auswahl - nur wenn "Mit" ausgewählt */}
                  {milkFoam && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setMilkFoamType('Wenig Schaum')}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all border`}
                        style={
                          milkFoamType === 'Wenig Schaum' 
                            ? { background: `${theme.accent}20`, color: theme.textPrimary, borderColor: theme.accent }
                            : { background: 'rgba(255, 255, 255, 0.05)', color: theme.textSecondary, borderColor: 'rgba(255, 255, 255, 0.1)' }
                        }
                      >
                        Wenig Schaum
                      </button>
                      <button
                        onClick={() => setMilkFoamType('Cremig')}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all border`}
                        style={
                          milkFoamType === 'Cremig' 
                            ? { background: `${theme.accent}20`, color: theme.textPrimary, borderColor: theme.accent }
                            : { background: 'rgba(255, 255, 255, 0.05)', color: theme.textSecondary, borderColor: 'rgba(255, 255, 255, 0.1)' }
                        }
                      >
                        Cremig
                      </button>
                      <button
                        onClick={() => setMilkFoamType('Fest')}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all border`}
                        style={
                          milkFoamType === 'Fest' 
                            ? { background: `${theme.accent}20`, color: theme.textPrimary, borderColor: theme.accent }
                            : { background: 'rgba(255, 255, 255, 0.05)', color: theme.textSecondary, borderColor: 'rgba(255, 255, 255, 0.1)' }
                        }
                      >
                        Fest
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ANZAHL */}
              <div>
                <label className="text-sm uppercase tracking-wider block mb-3" style={{ color: theme.textSecondary }}>Anzahl</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCupCount(1)}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all border`}
                    style={
                      cupCount === 1 
                        ? { background: `${theme.accent}20`, color: theme.textPrimary, borderColor: theme.accent }
                        : { background: 'rgba(255, 255, 255, 0.05)', color: theme.textSecondary, borderColor: 'rgba(255, 255, 255, 0.1)' }
                    }
                  >
                    1 Tasse
                  </button>
                  <button
                    onClick={() => setCupCount(2)}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all border`}
                    style={
                      cupCount === 2 
                        ? { background: `${theme.accent}20`, color: theme.textPrimary, borderColor: theme.accent }
                        : { background: 'rgba(255, 255, 255, 0.05)', color: theme.textSecondary, borderColor: 'rgba(255, 255, 255, 0.1)' }
                    }
                  >
                    2 Tassen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Popup */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center z-[60] pointer-events-none">
          <div 
            className="backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl flex flex-col items-center gap-4 animate-fadeIn pointer-events-auto"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              maxWidth: '400px'
            }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isFavorite ? 'bg-[#EF4444]/20' : 'bg-white/20'
            }`}>
              <Check className={`w-10 h-10 ${isFavorite ? 'text-[#EF4444]' : 'text-white/60'}`} strokeWidth={3} />
            </div>
            <p className="text-white text-center">
              {isFavorite 
                ? 'Dieser Kaffee wurde als Ihr Favorit in Ihrem Profil gespeichert'
                : 'Dieser Kaffee wurde aus Ihrem Profil als Favorit entfernt'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}