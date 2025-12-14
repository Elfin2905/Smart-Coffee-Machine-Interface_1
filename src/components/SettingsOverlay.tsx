import { useState } from 'react';
import { X, Wrench, Wifi, Bluetooth, ChevronDown, Check } from 'lucide-react';
import { TouchButton } from './TouchButton';
import type { Theme } from '../theme';

interface SettingsOverlayProps {
  onClose: () => void;
  theme: Theme;
}

const languages = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' }
];

export function SettingsOverlay({ onClose, theme }: SettingsOverlayProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('de');
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(60);
  const [energySavingMode, setEnergySavingMode] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);

  return (
    <div 
      className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className={`w-[800px] max-h-[550px] rounded-3xl p-8 relative overflow-hidden ${theme.glassEffect} border`}
        style={{
          background: theme.cardBg,
          borderColor: theme.cardBorder
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Wrench className="w-8 h-8" style={{ color: theme.accent }} />
            <h2 className="text-3xl" style={{ color: theme.textPrimary }}>Einstellungen</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" style={{ color: theme.textPrimary }} />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-4 overflow-y-auto max-h-[420px] pr-2"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.accentGlow} rgba(255, 255, 255, 0.1)`
          }}
        >
          {/* Sprache */}
          <div className="p-6 rounded-2xl border bg-white/5" style={{ borderColor: theme.cardBorder }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg mb-1" style={{ color: theme.textPrimary }}>Sprache</h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>Systemsprache ändern</p>
              </div>
              <div className="relative">
                <button
                  className="px-4 py-2 rounded-xl bg-white/10 border focus:outline-none transition-all flex items-center gap-2 min-w-[140px]"
                  style={{
                    borderColor: isLanguageOpen ? theme.accent : theme.cardBorder,
                    color: theme.textPrimary,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  <span className="flex-1 text-left">{languages.find(l => l.code === selectedLanguage)?.label}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} style={{ color: theme.textPrimary }} />
                </button>
                {isLanguageOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-full min-w-[140px] rounded-xl border overflow-hidden shadow-2xl z-50"
                    style={{ 
                      backgroundColor: 'rgba(15, 15, 17, 0.95)',
                      borderColor: theme.accent,
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center justify-between"
                        style={{ color: theme.textPrimary }}
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          setIsLanguageOpen(false);
                        }}
                      >
                        <span>{lang.label}</span>
                        {selectedLanguage === lang.code && (
                          <Check className="w-4 h-4" style={{ color: theme.accent }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Helligkeit */}
          <div className="p-6 rounded-2xl border bg-white/5" style={{ borderColor: theme.cardBorder }}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg" style={{ color: theme.textPrimary }}>Helligkeit</h3>
                <span className="text-sm" style={{ color: theme.textSecondary }}>{brightness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${theme.accent} 0%, ${theme.accent} ${brightness}%, rgba(255,255,255,0.1) ${brightness}%, rgba(255,255,255,0.1) 100%)`
                }}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Lautstärke */}
          <div className="p-6 rounded-2xl border bg-white/5" style={{ borderColor: theme.cardBorder }}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg" style={{ color: theme.textPrimary }}>Lautstärke</h3>
                <span className="text-sm" style={{ color: theme.textSecondary }}>{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${theme.accent} 0%, ${theme.accent} ${volume}%, rgba(255,255,255,0.1) ${volume}%, rgba(255,255,255,0.1) 100%)`
                }}
                onChange={(e) => setVolume(parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Energiesparmodus */}
          <div className="p-6 rounded-2xl border bg-white/5" style={{ borderColor: theme.cardBorder }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg mb-1" style={{ color: theme.textPrimary }}>Energiesparmodus</h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>Nach 15 Minuten Inaktivität</p>
              </div>
              <button 
                className="w-14 h-8 rounded-full border relative transition-all"
                style={{
                  backgroundColor: energySavingMode ? theme.accentGlow : 'rgba(255, 255, 255, 0.1)',
                  borderColor: energySavingMode ? theme.accent : theme.cardBorder
                }}
                onClick={() => setEnergySavingMode(!energySavingMode)}
              >
                <div 
                  className="absolute top-1 w-6 h-6 rounded-full transition-all"
                  style={{ 
                    backgroundColor: energySavingMode ? theme.accent : 'rgba(255, 255, 255, 0.4)',
                    left: energySavingMode ? 'auto' : '4px',
                    right: energySavingMode ? '4px' : 'auto'
                  }}
                ></div>
              </button>
            </div>
          </div>

          {/* WLAN */}
          <div className="p-6 rounded-2xl border bg-white/5" style={{ borderColor: theme.cardBorder }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg mb-1 flex items-center gap-2" style={{ color: theme.textPrimary }}>
                  <Wifi className="w-5 h-5 text-green-400" />
                  WLAN
                </h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>Verbunden mit: Home Network</p>
              </div>
              <button 
                className="px-4 py-2 rounded-xl bg-white/10 border hover:bg-white/20 transition-all"
                style={{
                  borderColor: theme.cardBorder,
                  color: theme.textPrimary
                }}
              >
                Ändern
              </button>
            </div>
          </div>

          {/* Bluetooth */}
          <div className="p-6 rounded-2xl border bg-white/5" style={{ borderColor: theme.cardBorder }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg mb-1 flex items-center gap-2" style={{ color: theme.textPrimary }}>
                  <Bluetooth className="w-5 h-5 text-white/40" />
                  Bluetooth
                </h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>Nicht verbunden</p>
              </div>
              <button 
                className="w-14 h-8 rounded-full bg-white/10 border relative transition-all"
                style={{ 
                  backgroundColor: bluetoothEnabled ? theme.accentGlow : 'rgba(255, 255, 255, 0.1)',
                  borderColor: bluetoothEnabled ? theme.accent : theme.cardBorder 
                }}
                onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
              >
                <div 
                  className="absolute top-1 w-6 h-6 rounded-full transition-all" 
                  style={{ 
                    backgroundColor: bluetoothEnabled ? theme.accent : 'rgba(255, 255, 255, 0.4)',
                    left: bluetoothEnabled ? 'auto' : '4px',
                    right: bluetoothEnabled ? '4px' : 'auto'
                  }}
                ></div>
              </button>
            </div>
          </div>

          {/* Software Version */}
          <div className="p-6 rounded-2xl border bg-white/5" style={{ borderColor: theme.cardBorder }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg mb-1" style={{ color: theme.textPrimary }}>Software-Version</h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>v2.4.1 - Aktuell</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 transition-all">
                Auf dem neuesten Stand
              </button>
            </div>
          </div>

          {/* Werkseinstellungen */}
          <div className="p-6 rounded-2xl border border-red-400/20 bg-red-500/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg mb-1" style={{ color: theme.textPrimary }}>Werkseinstellungen</h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>Alle Einstellungen zurücksetzen</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-400/30 text-red-400 hover:bg-red-500/30 transition-all">
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}