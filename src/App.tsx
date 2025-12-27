
import { useState, useEffect, useMemo } from 'react';
import { Home, Coffee, Droplet, Sparkles, Wrench, Wifi, Bluetooth, Edit3, X, Loader2, Plus, Settings, MessageCircle, Hand, Bot, Star } from 'lucide-react';
import { getTheme, type Theme } from './theme';
import svgPathsWaste from './imports/svg-6a6xzd913c';
import svgPathsCoffeeBeans from './imports/svg-5g771j36un';
import { RobotQR } from './components/RobotQR';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { DrinkDetail } from './components/DrinkDetail';
import { MilchWasserDetail } from './components/MilchWasserDetail';
import { BaristaMode } from './components/BaristaMode';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { PflegeOverlay } from './components/PflegeOverlay';
import { SettingsOverlay } from './components/SettingsOverlay';
import { ChatOverlay } from './components/ChatOverlay';
import { SnowfallEffect } from './components/SnowfallEffect';
import { ColorfulParticles } from './components/ColorfulParticles';
import { Trash } from 'lucide-react';


// Import images
import {
  espresso,
  cappuccino,
  latteMacchiato,
  milchKaffee,
  americano,
  wasser,
  caffeCrema,
  milchSchaum,
} from './assets/image';

const espressoImage = espresso;
const cappuccinoImage = cappuccino;
const latteMacchiatoImage = latteMacchiato;
const milchKaffeeImage = milchKaffee;
const americanoImage = americano;
const wasserImage = wasser;
const caffeCremaImage = caffeCrema;
const milchSchaumImage = milchSchaum;





export default function App() {
  // Default Profile State - Load from localStorage on initial render
  const [defaultProfileId, setDefaultProfileId] = useState<string | null>(() => {
    return localStorage.getItem('defaultProfileId');
  });

  
// Profile Types
interface Profile {
  id: string;
  name: string;
  initials: string;
  color: string;
  colorTo: string;
  description: string;
  style: string;
}
  //clare storafe for profiles
 
  const [profiles, setProfiles] = useState<Profile[]>([
  {
    id: 'markus',
    name: 'Markus',
    initials: 'MK',
    color: '#4A90E2',
    colorTo: '#357ABD',
    description: 'Espresso-Liebhaber',
    style: 'Modern',
  },
  {
    id: 'elena',
    name: 'Elena',
    initials: 'EL',
    color: '#9B59B6',
    colorTo: '#8E44AD',
    description: 'Flat White-Fan',
    style: 'Elegant',
  },
  {
    id: 'gast',
    name: 'Gast',
    initials: 'GA',
    color: '#7F8C8D',
    colorTo: '#5D6D7E',
    description: 'Caffè Crema',
    style: 'Weihnachten',
  },
]);

  // Active Profile State - Load default profile if set
  const [activeProfile, setActiveProfile] = useState<Profile>(() => {
    const storedDefaultId = localStorage.getItem('defaultProfileId');
    if (storedDefaultId) {
      const defaultProfile = profiles.find(p => p.id === storedDefaultId);
      if (defaultProfile) return defaultProfile;
    }
    return profiles[0];
  });

  const [showProfileOverlay, setShowProfileOverlay] = useState(false);
  const [isTresterFull, setIsTresterFull] = useState(true); // Trester is full
  const [showEditFavorite, setShowEditFavorite] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  
  // Status Icons Active States
  const [isTresterActive, setIsTresterActive] = useState(false);
  const [isWaterActive, setIsWaterActive] = useState(false);
  const [isBeansActive, setIsBeansActive] = useState(false);
  const [isSparklesActive, setIsSparklesActive] = useState(false);
  
  // Profile-specific favorites
  const [profileFavorites, setProfileFavorites] = useState<{[key: string]: string}>({
    'markus': 'Espresso',
    'elena': 'Cappuccino',
    'lena': 'Milch',
    'gast': 'Caffè Crema'
  });
  
const favoriteDrink = profileFavorites[activeProfile.id] || 'Espresso';

const getFavoriteDrinkImage = () => {
  const drinkName = favoriteDrink.toLowerCase().split('(')[0].trim();

  if (drinkName.includes('cappuccino')) return cappuccinoImage;
  if (drinkName.includes('latte') || drinkName.includes('macchiato')) return latteMacchiatoImage;
  if (drinkName.includes('crema')) return caffeCremaImage;
  if (drinkName.includes('milchkaffee')) return milchKaffeeImage;
  if (drinkName.includes('americano')) return americanoImage;
  if (drinkName.includes('milch') && !drinkName.includes('milchkaffee')) return milchSchaumImage;
  if (drinkName.includes('wasser') || drinkName.includes('heißes')) return wasserImage;

  return espressoImage;
};

const getFavoriteDrinkImageSize = () => {
  const drinkName = favoriteDrink.toLowerCase().split('(')[0].trim();

  if (drinkName.includes('espresso')) return 'w-24 h-24';
  if (drinkName.includes('cappuccino')) return 'w-28 h-28';

  // Latte ist hoch → schmaler + höher + etwas nach unten
  if (drinkName.includes('latte') || drinkName.includes('macchiato')) {
    return 'w-24 h-32 translate-y-2';
  }

  if (drinkName.includes('crema')) return 'w-28 h-28';
  if (drinkName.includes('milchkaffee')) return 'w-28 h-28';
  if (drinkName.includes('americano')) return 'w-28 h-28';
  if (drinkName.includes('milch') && !drinkName.includes('milchkaffee')) return 'w-28 h-28';

  if (drinkName.includes('wasser') || drinkName.includes('heißes')) return 'w-24 h-24';

  if (drinkName.includes('flat white')) return 'w-28 h-28';
  if (drinkName.includes('mocha')) return 'w-24 h-36 translate-y-3';

  return 'w-28 h-28';
};
  
  // Customization states
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState('');
  const [drinkSize, setDrinkSize] = useState(150);
  const [milkFoam, setMilkFoam] = useState(true); // Mit/Ohne Milchschaum
  const [milkFoamType, setMilkFoamType] = useState('Cremig'); // Wenig Schaum/Cremig/Fest
  const [cupCount, setCupCount] = useState(1);
  const [showKlassikerMenu, setShowKlassikerMenu] = useState(false);
  const [showMilchMenu, setShowMilchMenu] = useState(false);
  const [temperature, setTemperature] = useState(85); // Temperature in Celsius
  const [showSettings, setShowSettings] = useState(false);
  const [foamLevel, setFoamLevel] = useState('Cremig'); // Wenig Schaum, Cremig, Fest
  const [showMilchWasserCustomization, setShowMilchWasserCustomization] = useState(false);
  const [selectedMilchWasser, setSelectedMilchWasser] = useState('');
  const [amount, setAmount] = useState(150); // Amount in ml

  // Barista Mode states
  const [showBaristaMode, setShowBaristaMode] = useState(false);
  const [grindLevel, setGrindLevel] = useState(5); // 1-10
  const [brewPressure, setBrewPressure] = useState(9); // 7-11 bar
  const [brewTemperature, setBrewTemperature] = useState(92); // 88-96°C
  const [extractionTime, setExtractionTime] = useState(27); // 20-35s
  const [coffeeAmount, setCoffeeAmount] = useState(14); // 7-22g
  const [waterAmount, setWaterAmount] = useState(50); // 25-250ml
  const [preInfusion, setPreInfusion] = useState(true);
  const [preInfusionTime, setPreInfusionTime] = useState(4); // 2-8s

  // Add Profile states
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileColor, setNewProfileColor] = useState('#4A90E2');
  const [newProfileColorTo, setNewProfileColorTo] = useState('#357ABD');
  const [newProfileCoffee, setNewProfileCoffee] = useState('Espresso');
  const [newProfileStyle, setNewProfileStyle] = useState('Modern');
  const [showKeyboard, setShowKeyboard] = useState(false);

  // Pflege & Settings states
  const [showPflege, setShowPflege] = useState(false);
  const [isCleaningRunning, setIsCleaningRunning] = useState(false);
  const [isDescalingRunning, setIsDescalingRunning] = useState(false);

  // Chat state
  const [showChat, setShowChat] = useState(false);

  const availableColors = [
    { name: 'Blau', color: '#4A90E2', colorTo: '#357ABD' },
    { name: 'Lila', color: '#9B59B6', colorTo: '#8E44AD' },
    { name: 'Grün', color: '#27AE60', colorTo: '#229954' },
    { name: 'Orange', color: '#E67E22', colorTo: '#D35400' },
    { name: 'Rot', color: '#E74C3C', colorTo: '#C0392B' },
    { name: 'Türkis', color: '#1ABC9C', colorTo: '#16A085' },
    { name: 'Pink', color: '#EC407A', colorTo: '#D81B60' },
    { name: 'Gold', color: '#D4A373', colorTo: '#C49563' }
  ];

  const baristaCoffees = [
    'Cappuccino',
    'Latte Macchiato',
    'Espresso',
    'Caffè Crema',
    'Milchkaffee',
    'Americano',
    'Milch',
    'Heißes Wasser'
  ];

  const interfaceStyles = [
    { name: 'Modern', icon: '✨' },
    { name: 'Elegant', icon: '💎' },
    { name: 'Verspielt', icon: '🎨' },
    { name: 'Vintage', icon: '🕰️' },
    { name: 'Weihnachten', icon: '🎄' }
  ];

  // Get current theme based on active profile
  const theme = useMemo(() => getTheme(activeProfile.style), [activeProfile.style]);

  const handleStartPreparation = () => {
    setIsPreparing(true);
    // Simulate preparation time
    setTimeout(() => {
      setIsPreparing(false);
    }, 5000);
  };

  const handleDeleteProfile = (profileId: string) => {
  if (profileId === 'gast') return;

  // falls default gelöscht wird
  if (defaultProfileId === profileId) {
    setDefaultProfileId(null);
    localStorage.removeItem('defaultProfileId');
  }

  // Favorites löschen
  setProfileFavorites((prev) => {
    const copy = { ...prev };
    delete copy[profileId];
    return copy;
  });

  // Profile löschen + active fallback (WICHTIG: alles in setProfiles)
  setProfiles((prev) => {
    const next = prev.filter((p) => p.id !== profileId);

    // wenn aktives Profil gelöscht wurde -> fallback setzen
    if (activeProfile.id === profileId) {
      const fallback = next.find((p) => p.id === 'gast') || next[0];
      if (fallback) setActiveProfile(fallback);
    }

    return next;
  });
};

  const handleDrinkSelect = (drink: string) => {
    setSelectedDrink(drink);
    setShowEditFavorite(false);
    setShowCustomization(true);
    
    // Set defaults based on drink type
    if (drink === 'Espresso') {
      setDrinkSize(30);
      setTemperature(85);
      setMilkFoam(false);
    } else if (drink === 'Cappuccino') {
      setDrinkSize(180);
      setTemperature(80);
      setMilkFoam(true);
      setMilkFoamType('Cremig');
    } else if (drink === 'Latte Macchiato') {
      setDrinkSize(240);
      setTemperature(80);
      setMilkFoam(true);
      setMilkFoamType('Wenig Schaum');
    } else if (drink === 'Caffè Crema') {
      setDrinkSize(200);
      setTemperature(85);
      setMilkFoam(false);
    } else if (drink === 'Milchkaffee') {
      setDrinkSize(200);
      setTemperature(80);
      setMilkFoam(true);
      setMilkFoamType('Wenig Schaum');
    } else if (drink === 'Americano') {
      setDrinkSize(150);
      setTemperature(85);
      setMilkFoam(false);
    } else if (drink === 'Milch') {
      setDrinkSize(150);
      setTemperature(65);
      setMilkFoam(true);
      setMilkFoamType('Cremig');
    } else if (drink === 'Heißes Wasser') {
      setDrinkSize(200);
      setTemperature(95);
      setMilkFoam(false);
    }
  };

  const handleSaveCustomDrink = () => {
    setProfileFavorites(prev => ({
      ...prev,
      [activeProfile.id]: `${selectedDrink} (${drinkSize}ml)`
    }));
    // Don't close the customization page - just save the favorite
  };

  const handleStartCustomDrink = () => {
    setProfileFavorites(prev => ({
      ...prev,
      [activeProfile.id]: `${selectedDrink} (${drinkSize}ml)`
    }));
    setShowCustomization(false);
    handleStartPreparation();
  };

  const handleMilchWasserSelect = (drink: string) => {
    setSelectedMilchWasser(drink);
    setShowMilchMenu(false);
    setShowMilchWasserCustomization(true);
    
    // Set defaults based on drink type
    if (drink === 'Heißwasser') {
      setAmount(150);
      setTemperature(85);
    } else if (drink === 'Milchschaum') {
      setFoamLevel('Cremig');
    } else if (drink === 'Warme Milch') {
      setAmount(200);
      setTemperature(75);
    }
  };

  const handleStartMilchWasser = () => {
    setProfileFavorites(prev => ({
      ...prev,
      [activeProfile.id]: `${selectedMilchWasser} (${amount}ml)`
    }));
    setShowMilchWasserCustomization(false);
    handleStartPreparation();
  };

  const handleSaveMilchWasser = () => {
    setProfileFavorites(prev => ({
      ...prev,
      [activeProfile.id]: `${selectedMilchWasser} (${amount}ml)`
    }));
    setShowMilchWasserCustomization(false);
  };

  const handleSaveBarista = () => {
    setProfileFavorites(prev => ({
      ...prev,
      [activeProfile.id]: `Barista Espresso (${waterAmount}ml)`
    }));
    setShowBaristaMode(false);
  };

  const handleStartBarista = () => {
    setProfileFavorites(prev => ({
      ...prev,
      [activeProfile.id]: `Barista Espresso (${waterAmount}ml)`
    }));
    setShowBaristaMode(false);
    handleStartPreparation();
  };

  // Function to set/unset default profile
  const handleSetDefaultProfile = (profileId: string) => {
    if (defaultProfileId === profileId) {
      // If clicking the same profile, unset as default
      setDefaultProfileId(null);
      localStorage.removeItem('defaultProfileId');
    } else {
      // Set new default profile
      setDefaultProfileId(profileId);
      localStorage.setItem('defaultProfileId', profileId);
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      {/* Main Container - Fixed 1024x600 */}
      <div 
        className="relative overflow-hidden rounded-3xl flex flex-col shadow-2xl"
        style={{
          width: '1024px',
          height: '600px',
          background: theme.backgroundGradient || theme.background,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          fontFamily: theme.fontFamily
        }}
      >
        {/* Special Effects */}
        {theme.specialEffects?.snowfall && <SnowfallEffect />}
        {theme.specialEffects?.particles && <ColorfulParticles />}
        
        {/* Header */}
        <header 
          className="h-[60px] px-6 flex items-center justify-between border-b flex-shrink-0"
          style={{
            borderColor: theme.cardBorder,
            background: theme.headerGradient || 'transparent'
          }}
        >
          {/* Time & Connectivity */}
          <div className="flex items-center gap-4">
            <div className="text-white">08:00</div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <Bluetooth className="w-4 h-4 text-white/40" />
            </div>
          </div>

          {/* Status Icons */}
          <div className="flex items-center gap-16">
            <button onClick={() => setIsTresterActive(!isTresterActive)} className="transition-all active:scale-95">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 32 32">
                <path d={svgPathsWaste.p382f8600} fill={isTresterActive ? theme.accent : "rgba(255, 255, 255, 0.4)"} />
              </svg>
            </button>
            <button onClick={() => setIsWaterActive(!isWaterActive)} className="transition-all active:scale-95">
              <Droplet className="w-7 h-7" style={{ color: isWaterActive ? theme.accent : "rgba(255, 255, 255, 0.4)" }} />
            </button>
            <button onClick={() => setIsBeansActive(!isBeansActive)} className="transition-all active:scale-95">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 32 32">
                <path d={svgPathsCoffeeBeans.p34c53200} fill={isBeansActive ? theme.accent : "rgba(255, 255, 255, 0.4)"} />
              </svg>
            </button>
            <button onClick={() => setIsSparklesActive(!isSparklesActive)} className="transition-all active:scale-95">
              <Sparkles className="w-7 h-7" style={{ color: isSparklesActive ? theme.accent : "rgba(255, 255, 255, 0.4)" }} />
            </button>
          </div>

          {/* Profile Button */}
          <button 
            className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => setShowProfileOverlay(true)}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
              style={{
                background: `linear-gradient(to bottom right, ${activeProfile.color}, ${activeProfile.colorTo})`
              }}
            >
              {activeProfile.initials}
            </div>
            <span style={{ color: theme.textPrimary }} className="text-sm">{activeProfile.name}</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 flex flex-col gap-4 overflow-hidden justify-center">
          {/* Top Row - Main Features (Equal Size) */}
          <div className="h-[240px] grid grid-cols-2 gap-4 flex-shrink-0">
            {/* Mein Favorit */}
            <div 
              className={`group rounded-3xl p-8 relative overflow-hidden ${theme.glassEffect} border transition-all duration-500 active:scale-[0.98]`}
              style={{
                background: theme.cardBg,
                borderColor: theme.cardBorder
              }}
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent" style={{ backgroundImage: `linear-gradient(to bottom right, transparent, ${theme.accentGlow})` }}></div>
              
              {/* Animated glow orbs */}
              <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: theme.accentGlow }}></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl animate-pulse delay-700" style={{ backgroundColor: theme.accentGlow, opacity: 0.5 }}></div>
              
              {/* Floating particles */}
              <div className="absolute top-10 left-20 w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: theme.accentGlow, animationDuration: '3s', animationDelay: '0s' }}></div>
              <div className="absolute top-20 left-40 w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: theme.accentGlow, opacity: 0.7, animationDuration: '4s', animationDelay: '1s' }}></div>
              <div className="absolute bottom-20 left-32 w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
              
              {/* Decorative Coffee Image */}
              {/* Fixierter Bild-Container wie in deiner Skizze */}
              <div className="absolute top-4 right-8 w-32 h-32 flex items-center justify-center pointer-events-none">
              <ImageWithFallback
              src={getFavoriteDrinkImage()}
              alt={favoriteDrink}
              className={`object-contain drop-shadow-2xl transition-transform duration-700 ${getFavoriteDrinkImageSize()}`}
              />
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Label with Edit Icon */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base uppercase tracking-wider" style={{ color: theme.textSecondary }}>Mein Favorit</span>
                  <button 
                    className="w-7 h-7 rounded-full bg-white/10 active:scale-95 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                    onClick={() => setShowEditFavorite(true)}
                  >
                    <Edit3 className="w-4 h-4 transition-all duration-300" style={{ color: theme.textSecondary }} />
                  </button>
                </div>
                
                {/* Title */}
                <div className="text-4xl mb-2 transition-colors duration-300" style={{ color: theme.textPrimary }}>{favoriteDrink.split('(')[0].trim()}</div>
                
                {/* Description */}
                <div className="text-base transition-colors duration-300 mb-auto" style={{ color: theme.textSecondary }}>Ihr persönlicher Favorit</div>
                
                {/* Button at Bottom */}
                <button 
                  className="relative w-full h-14 rounded-2xl text-xl active:scale-95 transition-all duration-300 flex items-center justify-center overflow-hidden group/btn mt-4"
                  style={{
                    background: theme.buttonGradient,
                    color: theme.textPrimary
                  }}
                  onClick={handleStartPreparation}
                  disabled={isPreparing}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] transition-transform duration-1000"></div>
                  {isPreparing ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>STARTEN</span>}
                </button>
              </div>
            </div>

            {/* KaffeeBot AI */}
            <div 
              className={`group rounded-3xl p-8 relative overflow-hidden ${theme.glassEffect} border transition-all duration-500 cursor-pointer active:scale-[0.98]`}
              style={{
                background: theme.cardBg,
                borderColor: theme.cardBorder
              }}
            >
              {/* Animated gradient mesh */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 via-transparent to-purple-500/5"></div>
              
              {/* Rotating glow rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-[#D4A373]/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-purple-500/5 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
              
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(212, 163, 115, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 163, 115, 0.5) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Online Indicator */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-base uppercase tracking-wider" style={{ color: theme.textSecondary }}>Online</span>
                </div>
                
                {/* Title */}
                <div className="text-4xl mb-2 transition-colors duration-300" style={{ color: theme.textPrimary }}>KaffeeBot</div>
                
                {/* Description */}
                <div className="text-base transition-colors duration-300 mb-auto" style={{ color: theme.textSecondary }}>Ihr intelligenter KI-Kaffee-Assistent</div>
                
                {/* Button at Bottom */}
                <button 
                  className="relative w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xl active:scale-95 transition-all duration-300 flex items-center justify-center overflow-hidden group/btn mt-4"
                  onClick={() => setShowChat(true)}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] transition-transform duration-1000"></div>
                  <span>CHATTEN</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row - Quick Access Cards */}
          <div className="flex-1 grid grid-cols-3 gap-4">
            {/* Kaffee Klassiker */}
            <div 
              className={`group rounded-3xl p-8 relative overflow-hidden ${theme.glassEffect} border transition-all duration-500 cursor-pointer active:scale-95`}
              style={{
                background: theme.cardBg,
                borderColor: theme.cardBorder
              }}
              onClick={() => setShowKlassikerMenu(true)}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent" style={{ backgroundImage: `linear-gradient(to bottom right, transparent, ${theme.accentGlow})` }}></div>
              
              {/* Animated line */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r to-transparent w-0" style={{ backgroundImage: `linear-gradient(to right, ${theme.accent}, transparent)` }}></div>
              
              <Coffee className="w-14 h-14 mb-4 relative z-10 transition-all duration-300 drop-shadow-lg" style={{ color: theme.accent }} />
              <div className="text-xl relative z-10 transition-transform duration-300" style={{ color: theme.textPrimary }}>Kaffee Klassiker</div>
            </div>

            {/* Milch & Wasser */}
            <div 
              className={`group rounded-3xl p-8 relative overflow-hidden ${theme.glassEffect} border transition-all duration-500 cursor-pointer active:scale-95`}
              style={{
                background: theme.cardBg,
                borderColor: theme.cardBorder
              }}
              onClick={() => setShowMilchMenu(true)}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-400/10"></div>
              
              {/* Animated line */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-transparent w-0"></div>
              
              <Droplet className="w-14 h-14 text-blue-400 mb-4 relative z-10 transition-all duration-300 drop-shadow-lg" />
              <div className="text-xl relative z-10 transition-transform duration-300" style={{ color: theme.textPrimary }}>Milch & Wasser</div>
            </div>

            {/* Barista Modus icon ersetzen */}
            <div 
              className={`group rounded-3xl p-8 relative overflow-hidden ${theme.glassEffect} border transition-all duration-500 cursor-pointer active:scale-95`}
              style={{
                background: theme.cardBg,
                borderColor: theme.cardBorder
              }}
              onClick={() => setShowBaristaMode(true)}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-purple-400/10"></div>
              
              {/* Rotating cog overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-[0.02] transition-opacity">
                <Settings className="w-full h-full animate-spin" style={{ animationDuration: '20s' }} />
              </div>
              
              {/* Animated line */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-transparent w-0"></div>
              
              <Hand className="w-14 h-14 text-purple-400 mb-4 relative z-10 transition-all duration-500 drop-shadow-lg" />
              <div className="text-xl relative z-10 transition-transform duration-300" style={{ color: theme.textPrimary }}>Barista Modus</div>
            </div>
          </div>
        </main>

        {/* Footer Navigation */}
        <footer className="h-[80px] border-t px-8 flex items-center justify-around" style={{ borderColor: theme.cardBorder }}>
          {/* Home */}
          <button className="active:scale-90 transition-all" style={{ color: theme.accent }}>
            <Home className="w-10 h-10" />
          </button>

          {/* Pflege  bearbeiten icon*/} 
          <button 
            className="text-white/40 active:text-white transition-all active:scale-90"
            onClick={() => setShowPflege(true)}
          >
            <Wrench className="w-10 h-10" />
          </button>

          {/* Setup */}
          <button 
            className="text-white/40 active:text-white transition-all active:scale-90"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="w-10 h-10" />
          </button>
        </footer>

        {/* Profile Overlay */}
        {showProfileOverlay && (
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
            onClick={() => setShowProfileOverlay(false)}
          >
            <div 
              className={`w-[600px] rounded-3xl p-8 relative overflow-hidden ${theme.glassEffect} border`}
              style={{
                background: theme.cardBg,
                borderColor: theme.cardBorder
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <h2 className="text-2xl" style={{ color: theme.textPrimary }}>Profil wählen</h2>
                <button 
                  onClick={() => setShowProfileOverlay(false)}
                  className="w-10 h-10 rounded-full bg-white/10 transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5" style={{ color: theme.textPrimary }} />
                </button>
              </div>

              {/* Profile Grid */}
              <div className="relative z-10 grid grid-cols-2 gap-4 mb-4">
                {profiles.map((profile) => {
                  const profileFavoriteDrink = profileFavorites[profile.id] || 'Espresso';
                  
                  return (
                    <div
                      key={profile.id}
                      className={`p-6 rounded-2xl border transition-all relative`}
                      style={{
                        borderColor: activeProfile.id === profile.id ? theme.accent : theme.cardBorder,
                        background: activeProfile.id === profile.id ? theme.accentGlow : 'rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      {/* Delete Button (unter Edit) */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsEditMode(true);
                            setEditingProfileId(profile.id);
                            setNewProfileName(profile.name);
                            setNewProfileColor(profile.color);
                            setNewProfileColorTo(profile.colorTo);
                            setNewProfileCoffee(profileFavorites[profile.id] || 'Espresso');
                            setNewProfileStyle(profile.style);
                            setShowProfileOverlay(false);
                            setShowAddProfile(true);
                          }}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                        >
                          <Edit3 className="w-4 h-4" style={{ color: theme.textSecondary }} />
                        </button>

                        {profile.id !== 'gast' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProfile(profile.id);
                            }}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/20 transition-all flex items-center justify-center"
                            title="Profil löschen"
                          >
                            <Trash className="w-4 h-4" style={{ color: theme.textSecondary }} />
                          </button>
                        )}
                      </div>


                      {/* Edit Profile Icon Button Icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Set S and populate form with profile data
                          setIsEditMode(true);
                          setEditingProfileId(profile.id);
                          setNewProfileName(profile.name);
                          setNewProfileColor(profile.color);
                          setNewProfileColorTo(profile.colorTo);
                          setNewProfileCoffee(profileFavorites[profile.id] || 'Espresso');
                          setNewProfileStyle(profile.style);
                          setShowProfileOverlay(false);
                          setShowAddProfile(true);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center z-10"
                      >
                        <Edit3 className="w-4 h-4" style={{ color: theme.textSecondary }} />
                      </button>

                      <button
                        onClick={() => {
                          setActiveProfile(profile);
                          setShowProfileOverlay(false);
                        }}
                        className="w-full text-left"
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                            style={{
                              background: `linear-gradient(to bottom right, ${profile.color}, ${profile.colorTo})`
                            }}
                          >
                            {profile.initials}
                          </div>
                          <div className="flex-1">
                            <div className="mb-1" style={{ color: theme.textPrimary }}>{profile.name}</div>
                            <div style={{ color: theme.textSecondary }}>
                              <div className="text-sm font-medium">{profileFavoriteDrink}</div>
                              <div className="text-xs opacity-80">{profile.style}</div>
                            </div>
                          </div>
                        </div>
                      </button>
                      
                      {/* Set as Default Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetDefaultProfile(profile.id);
                        }}
                        className="mt-3 w-full py-2 rounded-xl text-sm transition-all border"
                        style={{
                          backgroundColor: defaultProfileId === profile.id ? theme.accentGlow : 'rgba(255, 255, 255, 0.05)',
                          color: defaultProfileId === profile.id ? theme.accent : theme.textSecondary,
                          borderColor: defaultProfileId === profile.id ? theme.accent : theme.cardBorder
                        }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Star className={`w-4 h-4`} style={{ fill: defaultProfileId === profile.id ? theme.accent : 'none' }} />
                          <span>{defaultProfileId === profile.id ? 'Standard-Profil' : 'Als Standard festlegen'}</span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Add New Profile Edit */}
              
              {/* Add New Lösch Button */}
              {/* Edit Profile Icon Button */}
              

              
              {/* Add New Profile Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileOverlay(false);
                  // Reset to add mode
                  setIsEditMode(false);
                  setEditingProfileId(null);
                  setNewProfileName('');
                  setNewProfileColor('#4A90E2');
                  setNewProfileColorTo('#357ABD');
                  setNewProfileCoffee('Espresso');
                  setNewProfileStyle('Modern');
                  setShowAddProfile(true);
                }}
                className="relative z-10 w-full p-4 rounded-2xl border border-dashed bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                style={{ 
                  borderColor: theme.cardBorder,
                  color: theme.textSecondary
                }}
              >
                <Plus className="w-5 h-5" />
                <span>Neues Profil erstellen</span>
              </button>
            </div>
          </div>
        )}

        {/* Add Profile Overlay */}
        {showAddProfile && (
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col z-50"
            onClick={() => {
              setShowAddProfile(false);
              setShowKeyboard(false);
            }}
          >
            {/* Profile Creation Dialog */}
            <div className="flex-1 flex items-center justify-center">
              <div 
                className="w-[700px] max-h-[550px] rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl border border-white/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                
                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-6 flex-shrink-0">
                  <h2 className="text-white text-2xl">{isEditMode ? 'Profil information ändern' : 'Neues Profil erstellen'}</h2>
                  <button 
                    onClick={() => {
                      setShowAddProfile(false);
                      setShowKeyboard(false);
                      setIsEditMode(false);
                      setEditingProfileId(null);
                    }}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Content */}
                <div 
                  className="relative z-10 space-y-6 overflow-y-auto pr-2 flex-1"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(212, 163, 115, 0.5) rgba(255, 255, 255, 0.1)',
                    maxHeight: showKeyboard ? '60px' : '400px'
                  }}
                >
                  {/* Name Input */}
                  <div>
                    {!showKeyboard && (
                      <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">Name</label>
                    )}
                    <input
                      type="text"
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      onFocus={() => setShowKeyboard(true)}
                      placeholder="Name eingeben..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#D4A373] transition-all"
                    />
                  </div>

                  {/* Avatar Color Selection */}
                  {!showKeyboard && (
                    <div>
                      <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">Avatar-Farbe</label>
                      <div className="grid grid-cols-4 gap-3">
                        {availableColors.map((colorOption) => (
                          <button
                            key={colorOption.name}
                            onClick={() => {
                              setNewProfileColor(colorOption.color);
                              setNewProfileColorTo(colorOption.colorTo);
                            }}
                            className={`p-3 rounded-xl border transition-all ${
                              newProfileColor === colorOption.color
                                ? 'border-[#D4A373] bg-[#D4A373]/10'
                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="w-12 h-12 rounded-full"
                                style={{
                                  background: `linear-gradient(to bottom right, ${colorOption.color}, ${colorOption.colorTo})`
                                }}
                              />
                              <span className="text-white/80 text-xs">{colorOption.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Barista Coffee Preference */}
                  {!showKeyboard && (
                    <div>
                      <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">Lieblings Getränke</label>
                      <div className="grid grid-cols-3 gap-3">
                        {baristaCoffees.map((coffee) => (
                          <button
                            key={coffee}
                            onClick={() => setNewProfileCoffee(coffee)}
                            className={`p-3 rounded-xl border transition-all text-center ${
                              newProfileCoffee === coffee
                                ? 'border-[#D4A373] bg-[#D4A373]/10 text-white'
                                : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                            }`}
                          >
                            <Coffee className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-sm">{coffee}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interface Style Selection */}
                  {!showKeyboard && (
                    <div>
                      <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">Interface-Stil</label>
                      <div className="grid grid-cols-5 gap-3">
                        {interfaceStyles.map((style) => (
                          <button
                            key={style.name}
                            onClick={() => setNewProfileStyle(style.name)}
                            className={`p-3 rounded-xl border transition-all text-center ${
                              newProfileStyle === style.name
                                ? 'border-[#D4A373] bg-[#D4A373]/10 text-white'
                                : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                            }`}
                          >
                            <div className="text-2xl mb-1">{style.icon}</div>
                            <span className="text-xs">{style.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preview */}
                  {!showKeyboard && (
                    <div>
                      <label className="text-white/60 text-sm uppercase tracking-wider block mb-3">Vorschau</label>
                      <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg"
                            style={{
                              background: `linear-gradient(to bottom right, ${newProfileColor}, ${newProfileColorTo})`
                            }}
                          >
                            {newProfileName ? newProfileName.substring(0, 2).toUpperCase() : 'XX'}
                          </div>
                          <div className="flex-1">
                            <div className="text-white text-lg">{newProfileName || 'Neues Profil'}</div>
                            <div className="text-white/60 text-sm">{newProfileCoffee} • {newProfileStyle}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons Löschen hinzufügen */}
                  {!showKeyboard && (
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => {
                          setNewProfileName('');
                          setNewProfileColor('#4A90E2');
                          setNewProfileColorTo('#357ABD');
                          setNewProfileCoffee('Espresso');
                          setNewProfileStyle('Modern');
                          setShowAddProfile(false);
                          setIsEditMode(false);
                          setEditingProfileId(null);
                        }}
                        className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all"
                      >
                        Abbrechen
                      </button>
                      <button
                        onClick={() => {
                          if (!newProfileName.trim()) return;

                          // ======================
                          // EDIT MODE
                          // ======================
                          if (isEditMode && editingProfileId) {
                            // Update profiles (immutable)
                            setProfiles(prev =>
                              prev.map(profile =>
                                profile.id === editingProfileId
                                  ? {
                                      ...profile,
                                      name: newProfileName,
                                      initials: newProfileName.substring(0, 2).toUpperCase(),
                                      color: newProfileColor,
                                      colorTo: newProfileColorTo,
                                      style: newProfileStyle,
                                    }
                                  : profile
                              )
                            );

                            // Update favorite drink
                            setProfileFavorites(prev => ({
                              ...prev,
                              [editingProfileId]: newProfileCoffee,
                            }));

                            // Update active profile if needed
                            if (activeProfile.id === editingProfileId) {
                              setActiveProfile(prev => ({
                                ...prev,
                                name: newProfileName,
                                initials: newProfileName.substring(0, 2).toUpperCase(),
                                color: newProfileColor,
                                colorTo: newProfileColorTo,
                                style: newProfileStyle,
                              }));
                            }
                          }

                          // ======================
                          // CREATE MODE
                          // ======================
                          else {
                            const newProfile: Profile = {
                              id: newProfileName.toLowerCase().replace(/\s+/g, '-'),
                              name: newProfileName,
                              initials: newProfileName.substring(0, 2).toUpperCase(),
                              color: newProfileColor,
                              colorTo: newProfileColorTo,
                              description: newProfileCoffee,
                              style: newProfileStyle,
                            };

                            setProfiles(prev => [...prev, newProfile]);

                            setProfileFavorites(prev => ({
                              ...prev,
                              [newProfile.id]: newProfileCoffee,
                            }));

                            setActiveProfile(newProfile);
                          }

                          // ======================
                          // RESET & CLOSE
                          // ======================
                          setShowAddProfile(false);
                          setShowKeyboard(false);
                          setNewProfileName('');
                          setNewProfileColor('#4A90E2');
                          setNewProfileColorTo('#357ABD');
                          setNewProfileCoffee('Espresso');
                          setNewProfileStyle('Modern');
                          setIsEditMode(false);
                          setEditingProfileId(null);
                        }}
                        disabled={!newProfileName.trim()}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#D4A373] to-[#C49563] text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isEditMode ? 'Änderungen speichern' : 'Profil erstellen'}
                      </button>

                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Virtual Keyboard - Outside Dialog */}
            {showKeyboard && (
              <div 
                className="flex items-center justify-center pb-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-[900px]" style={{ height: '400px' }}>
                  <VirtualKeyboard
                    onKeyPress={(key) => setNewProfileName(newProfileName + key)}
                    onBackspace={() => setNewProfileName(newProfileName.slice(0, -1))}
                    onEnter={() => setShowKeyboard(false)}
                    onClose={() => setShowKeyboard(false)}
                    currentValue={newProfileName}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Edit Favorite Overlay */}
        {showEditFavorite && (
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
            onClick={() => setShowEditFavorite(false)}
          >
            <div 
              className="w-[600px] rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl border border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <h2 className="text-white text-2xl">Favorit bearbeiten</h2>
                <button 
                  onClick={() => setShowEditFavorite(false)}
                  className="w-10 h-10 rounded-full bg-white/10 transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Drink Selection */}
              <div className="relative z-10 space-y-3">
                {baristaCoffees.map((drink) => (
                  <button
                    key={drink}
                    onClick={() => handleDrinkSelect(drink)}
                    className={`w-full p-4 rounded-2xl border transition-all text-left ${
                      favoriteDrink === drink 
                        ? 'border-[#D4A373] bg-[#D4A373]/10' 
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Coffee className="w-6 h-6 text-[#D4A373]" />
                      <span className="text-white">{drink}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Customization Page */}
        {showCustomization && (
          <DrinkDetail
            selectedDrink={selectedDrink}
            drinkSize={drinkSize}
            setDrinkSize={setDrinkSize}
            milkFoam={milkFoam}
            setMilkFoam={setMilkFoam}
            milkFoamType={milkFoamType}
            setMilkFoamType={setMilkFoamType}
            temperature={temperature}
            setTemperature={setTemperature}
            cupCount={cupCount}
            setCupCount={setCupCount}
            onBack={() => {
              setShowCustomization(false);
              if (selectedDrink === 'Milch' || selectedDrink === 'Heißes Wasser') {
                setShowMilchMenu(true);
              } else {
                setShowKlassikerMenu(true);
              }
            }}
            onSave={handleSaveCustomDrink}
            onStart={handleStartCustomDrink}
            theme={theme}
          />
        )}

        {/* Preparation Animation Overlay */}
        {isPreparing && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50">
            <div className="text-center">
              {/* Animated Coffee Cup */}
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto relative">
                  <Coffee className="w-32 h-32 animate-pulse" style={{ color: theme.accent }} />
                  {/* Steam Animation */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-8 bg-white/20 rounded-full animate-pulse"
                        style={{
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: '1.5s'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Text */}
              <h2 className="text-3xl mb-2" style={{ color: theme.textPrimary }}>Zubereitung läuft...</h2>
              <p style={{ color: theme.textSecondary }}>Ihr {favoriteDrink} wird gerade zubereitet</p>
              
              {/* Progress Bar */}
              <div className="mt-8 w-64 mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full animate-pulse"
                  style={{
                    background: theme.buttonGradient,
                    animation: 'progress 5s linear forwards'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Kaffee Klassiker Menu */}
        {showKlassikerMenu && (
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
            onClick={() => setShowKlassikerMenu(false)}
          >
            <div 
              className={`w-[800px] rounded-3xl p-8 relative overflow-hidden ${theme.glassEffect} border`}
              style={{
                background: theme.cardBg,
                borderColor: theme.cardBorder
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl" style={{ color: theme.textPrimary }}>Kaffee Klassiker</h2>
                  <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>Wählen Sie Ihren Favoriten</p>
                </div>
                <button 
                  onClick={() => setShowKlassikerMenu(false)}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <X className="w-6 h-6" style={{ color: theme.textPrimary }} />
                </button>
              </div>

              {/* Drink Grid - 3 top, 2 bottom */}
              <div className="relative z-10 space-y-4">
                {/* Top Row - 3 Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      setShowKlassikerMenu(false);
                      handleDrinkSelect('Cappuccino');
                    }}
                    className="group p-4 rounded-2xl border bg-white/5 hover:bg-white/10 transition-all active:scale-95 overflow-hidden"
                    style={{ borderColor: theme.cardBorder }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent + '80'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.cardBorder}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden">
                        <ImageWithFallback 
                          src={cappuccinoImage}
                          alt="Cappuccino"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-center" style={{ color: theme.textPrimary }}>Cappuccino</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowKlassikerMenu(false);
                      handleDrinkSelect('Latte Macchiato');
                    }}
                    className="group p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#D4A373]/50 transition-all active:scale-95 overflow-hidden"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden">
                        <ImageWithFallback 
                          src={latteMacchiatoImage}
                          alt="Latte Macchiato"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-white text-center">Latte Macchiato</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowKlassikerMenu(false);
                      handleDrinkSelect('Espresso');
                    }}
                    className="group p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#D4A373]/50 transition-all active:scale-95 overflow-hidden"
                  >
                     {/* main menu Kaffee Klassijer */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden">
                        <ImageWithFallback 
                          src={espressoImage}
                          alt="Espresso"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-white text-center">Espresso</span>
                    </div>
                  </button>
                </div>
                
                {/* Bottom Row - 3 Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      setShowKlassikerMenu(false);
                      handleDrinkSelect('Caffè Crema');
                    }}
                    className="group p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#D4A373]/50 transition-all active:scale-95 overflow-hidden"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden">
                        <ImageWithFallback 
                          src={caffeCremaImage}
                          alt="Caffè Crema"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-white text-center">Caffè Crema</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowKlassikerMenu(false);
                      handleDrinkSelect('Milchkaffee');
                    }}
                    className="group p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#D4A373]/50 transition-all active:scale-95 overflow-hidden"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden">
                        <ImageWithFallback 
                          src={milchKaffeeImage}
                          alt="Milchkaffee"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-white text-center">Milchkaffee</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowKlassikerMenu(false);
                      handleDrinkSelect('Americano');
                    }}
                    className="group p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#D4A373]/50 transition-all active:scale-95 overflow-hidden"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden">
                        <img 
                          src={americanoImage}
                          alt="Americano"
                          className="w-full h-full object-contain scale-[1.7]"
                        />
                      </div>
                      <span className="text-white text-center">Americano</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Milch & Wasser Menu */}
        {showMilchMenu && (
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
            onClick={() => setShowMilchMenu(false)}
          >
            <div 
              className={`w-[800px] rounded-3xl p-8 relative overflow-hidden ${theme.glassEffect} border`}
              style={{
                background: theme.cardBg,
                borderColor: theme.cardBorder
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl" style={{ color: theme.textPrimary }}>Milch & Wasser</h2>
                  <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>Wählen Sie Ihre Option</p>
                </div>
                <button 
                  onClick={() => setShowMilchMenu(false)}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <X className="w-6 h-6" style={{ color: theme.textPrimary }} />
                </button>
              </div>

              {/* Drink Options - Grid matching Kaffee Klassiker */}
              <div className="relative z-10 grid grid-cols-3 gap-4">
                {/* Milch - now first */}
                <button
                  onClick={() => {
                    setShowMilchMenu(false);
                    handleDrinkSelect('Milch');
                  }}
                  className="group p-4 rounded-2xl border bg-white/5 hover:bg-white/10 transition-all active:scale-95 overflow-hidden"
                  style={{ borderColor: theme.cardBorder }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent + '80'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.cardBorder}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-xl overflow-hidden">
                      <ImageWithFallback 
                        src={milchSchaumImage}
                        alt="Milch"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-center" style={{ color: theme.textPrimary }}>Milch</span>
                  </div>
                </button>

                {/* Heißes Wasser - now second */}
                <button
                  onClick={() => {
                    setShowMilchMenu(false);
                    handleDrinkSelect('Heißes Wasser');
                  }}
                  className="group p-4 rounded-2xl border bg-white/5 hover:bg-white/10 transition-all active:scale-95 overflow-hidden"
                  style={{ borderColor: theme.cardBorder }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent + '80'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.cardBorder}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-xl overflow-hidden">
                      <ImageWithFallback 
                        src={wasserImage}
                        alt="Heißes Wasser"
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>
                    <span className="text-center" style={{ color: theme.textPrimary }}>Heißes Wasser</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Milch & Wasser Customization Page */}
        {showMilchWasserCustomization && (
          <MilchWasserDetail
            selectedDrink={selectedMilchWasser}
            amount={amount}
            setAmount={setAmount}
            temperature={temperature}
            setTemperature={setTemperature}
            foamLevel={foamLevel}
            setFoamLevel={setFoamLevel}
            cupCount={cupCount}
            setCupCount={setCupCount}
            onBack={() => setShowMilchWasserCustomization(false)}
            onSave={handleSaveMilchWasser}
            onStart={handleStartMilchWasser}
          />
        )}

        {/* Barista Mode */}
        {showBaristaMode && (
          <BaristaMode
            grindLevel={grindLevel}
            setGrindLevel={setGrindLevel}
            brewPressure={brewPressure}
            setBrewPressure={setBrewPressure}
            brewTemperature={brewTemperature}
            setBrewTemperature={setBrewTemperature}
            extractionTime={extractionTime}
            setExtractionTime={setExtractionTime}
            coffeeAmount={coffeeAmount}
            setCoffeeAmount={setCoffeeAmount}
            waterAmount={waterAmount}
            setWaterAmount={setWaterAmount}
            preInfusion={preInfusion}
            setPreInfusion={setPreInfusion}
            preInfusionTime={preInfusionTime}
            setPreInfusionTime={setPreInfusionTime}
            onBack={() => setShowBaristaMode(false)}
            onSave={handleSaveBarista}
            onStart={handleStartBarista}
          />
        )}

        {/* Pflege Overlay */}
        {showPflege && (
          <PflegeOverlay
            onClose={() => setShowPflege(false)}
            isTresterFull={isTresterFull}
            setIsTresterFull={setIsTresterFull}
            isCleaningRunning={isCleaningRunning}
            setIsCleaningRunning={setIsCleaningRunning}
            isDescalingRunning={isDescalingRunning}
            setIsDescalingRunning={setIsDescalingRunning}
          />
        )}

        {/* Settings Overlay */}
        {showSettings && (
          <SettingsOverlay
            onClose={() => setShowSettings(false)}
            theme={theme}
          />
        )}

        {/* Chat Overlay */}
        {showChat && (
          <ChatOverlay
            onClose={() => setShowChat(false)}
            theme={theme}
          />
        )}
      </div> 
    </div>
  );
}