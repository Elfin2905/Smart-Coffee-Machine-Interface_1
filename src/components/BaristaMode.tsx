import { ChevronLeft, Save, Coffee } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TouchButton } from './TouchButton';
import { americano as espressoImage } from '../assets/image';

interface BaristaModeProps {
  grindLevel: number;
  setGrindLevel: (value: number) => void;
  brewPressure: number;
  setBrewPressure: (value: number) => void;
  brewTemperature: number;
  setBrewTemperature: (value: number) => void;
  extractionTime: number;
  setExtractionTime: (value: number) => void;
  coffeeAmount: number;
  setCoffeeAmount: (value: number) => void;
  waterAmount: number;
  setWaterAmount: (value: number) => void;
  preInfusion: boolean;
  setPreInfusion: (value: boolean) => void;
  preInfusionTime: number;
  setPreInfusionTime: (value: number) => void;
  onBack: () => void;
  onSave: () => void;
  onStart: () => void;
}

export function BaristaMode({
  grindLevel,
  setGrindLevel,
  brewPressure,
  setBrewPressure,
  brewTemperature,
  setBrewTemperature,
  extractionTime,
  setExtractionTime,
  coffeeAmount,
  setCoffeeAmount,
  waterAmount,
  setWaterAmount,
  preInfusion,
  setPreInfusion,
  preInfusionTime,
  setPreInfusionTime,
  onBack,
  onSave,
  onStart
}: BaristaModeProps) {
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
        <div className="flex items-center gap-2">
          <Coffee className="w-6 h-6 text-purple-400" />
          <h1 className="text-white text-xl">Barista Modus</h1>
        </div>
        <div className="w-24"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex gap-6 overflow-hidden">
        {/* Left Side - Image and Start Button */}
        <div className="w-[380px] flex flex-col gap-6 flex-shrink-0">
          {/* Professional Coffee Image */}
          <div 
            className="flex-1 rounded-3xl overflow-hidden relative backdrop-blur-xl border border-purple-400/20"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.02) 100%)'
            }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1588239106501-7e9e546129cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJpc3RhJTIwbWFraW5nJTIwZXNwcmVzc298ZW58MXx8fHwxNzY1NjU4MTU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Barista Coffee"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>

        {/* Right Side - Professional Settings Container */}
        <div 
          className="flex-1 rounded-3xl p-8 relative overflow-auto backdrop-blur-xl border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
          }}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl">Professionelle Einstellungen</h2>
              <div className="px-3 py-1 rounded-full bg-purple-400/20 border border-purple-400/30">
                <span className="text-purple-400 text-sm">Experten-Modus</span>
              </div>
            </div>

            {/* MAHLGRAD */}
            <div>
              <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">
                Mahlgrad: {grindLevel} (1=Fein, 10=Grob)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={grindLevel}
                onChange={(e) => setGrindLevel(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #A855F7 0%, #A855F7 ${((grindLevel - 1) / 9) * 100}%, rgba(255,255,255,0.1) ${((grindLevel - 1) / 9) * 100}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="flex justify-between text-white/40 text-xs mt-2">
                <span>1 (Fein)</span>
                <span>10 (Grob)</span>
              </div>
            </div>

            {/* BRÜHTEMPERATUR */}
            <div>
              <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">
                Brühtemperatur: {brewTemperature}°C
              </label>
              <input
                type="range"
                min="88"
                max="96"
                step="0.5"
                value={brewTemperature}
                onChange={(e) => setBrewTemperature(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #A855F7 0%, #A855F7 ${((brewTemperature - 88) / 8) * 100}%, rgba(255,255,255,0.1) ${((brewTemperature - 88) / 8) * 100}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="flex justify-between text-white/40 text-xs mt-2">
                <span>88°C</span>
                <span>96°C</span>
              </div>
            </div>

            {/* BRÜHDRUCK */}
            <div>
              <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">
                Brühdruck: {brewPressure} bar
              </label>
              <input
                type="range"
                min="7"
                max="11"
                step="0.5"
                value={brewPressure}
                onChange={(e) => setBrewPressure(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #A855F7 0%, #A855F7 ${((brewPressure - 7) / 4) * 100}%, rgba(255,255,255,0.1) ${((brewPressure - 7) / 4) * 100}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="flex justify-between text-white/40 text-xs mt-2">
                <span>7 bar</span>
                <span>11 bar</span>
              </div>
            </div>

            {/* EXTRAKTIONSZEIT */}
            <div>
              <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">
                Extraktionszeit: {extractionTime}s
              </label>
              <input
                type="range"
                min="20"
                max="35"
                step="1"
                value={extractionTime}
                onChange={(e) => setExtractionTime(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #A855F7 0%, #A855F7 ${((extractionTime - 20) / 15) * 100}%, rgba(255,255,255,0.1) ${((extractionTime - 20) / 15) * 100}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="flex justify-between text-white/40 text-xs mt-2">
                <span>20s</span>
                <span>35s</span>
              </div>
            </div>

            {/* PRE-INFUSION */}
            <div>
              <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">Vorbrühung</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreInfusion(false)}
                  className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                    !preInfusion 
                      ? 'bg-purple-400/20 text-white border border-purple-400' 
                      : 'bg-white/5 text-white/60 border border-white/10'
                  }`}
                >
                  Aus
                </button>
                <button
                  onClick={() => setPreInfusion(true)}
                  className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                    preInfusion 
                      ? 'bg-purple-400/20 text-white border border-purple-400' 
                      : 'bg-white/5 text-white/60 border border-white/10'
                  }`}
                >
                  An
                </button>
              </div>
            </div>

            {/* PRE-INFUSION TIME (only if enabled) */}
            {preInfusion && (
              <div>
                <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">
                  Vorbrühzeit: {preInfusionTime}s
                </label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="0.5"
                  value={preInfusionTime}
                  onChange={(e) => setPreInfusionTime(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #A855F7 0%, #A855F7 ${((preInfusionTime - 2) / 6) * 100}%, rgba(255,255,255,0.1) ${((preInfusionTime - 2) / 6) * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
                <div className="flex justify-between text-white/40 text-xs mt-2">
                  <span>2s</span>
                  <span>8s</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}