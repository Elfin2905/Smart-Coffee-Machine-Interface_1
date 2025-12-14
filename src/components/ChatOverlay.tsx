import { X, Send, Sparkles, Coffee, Bot, Mic, MicOff, Keyboard } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { VirtualKeyboard } from './VirtualKeyboard';
import type { Theme } from '../theme';

interface ChatOverlayProps {
  onClose: () => void;
  theme: Theme;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatOverlay({ onClose, theme }: ChatOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hallo! Ich bin KaffeeBot, Ihr intelligenter Kaffee-Assistent. Ich kann Ihnen helfen, den perfekten Kaffee zu finden, Rezepte zu erklären oder Fragen zur Kaffeemaschine zu beantworten. Wie kann ich Ihnen heute helfen?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'de-DE';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Spracherkennung wird von Ihrem Browser nicht unterstützt.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Kaffee-Empfehlungen
    if (lowerMessage.includes('empfehlung') || lowerMessage.includes('empfehlen') || lowerMessage.includes('welcher kaffee')) {
      return 'Basierend auf Ihren Vorlieben würde ich Ihnen einen Cappuccino empfehlen! Er kombiniert kräftigen Espresso mit cremigem Milchschaum und ist perfekt für einen entspannten Start in den Tag. Möchten Sie mehr über die Zubereitung erfahren?';
    }
    
    // Espresso-Fragen
    if (lowerMessage.includes('espresso')) {
      return 'Ein perfekter Espresso erfordert 7-9g fein gemahlenen Kaffee, eine Brühtemperatur von 92-96°C und einen Druck von 9 bar. Die Extraktionszeit sollte 25-30 Sekunden betragen. Im Barista-Modus können Sie all diese Parameter präzise einstellen!';
    }
    
    // Milchschaum
    if (lowerMessage.includes('milchschaum') || lowerMessage.includes('schaum')) {
      return 'Für perfekten Milchschaum empfehle ich: Verwenden Sie kalte Vollmilch (3,5% Fett) und erhitzen Sie sie auf 60-65°C. Im Menü "Milch & Wasser" können Sie zwischen drei Schaumstufen wählen: Wenig Schaum (luftig), Cremig (ausgewogen) oder Fest (dicht). Was bevorzugen Sie?';
    }
    
    // Reinigung
    if (lowerMessage.includes('reinig') || lowerMessage.includes('pflege') || lowerMessage.includes('sauber')) {
      return 'Die regelmäßige Pflege ist wichtig! Ich empfehle: Tägliches Entleeren des Tresterbehälters, wöchentliche Reinigung der Brühgruppe und monatliche Entkalkung. Im Pflege-Menü finden Sie automatische Programme für alle Reinigungsschritte.';
    }
    
    // Cappuccino
    if (lowerMessage.includes('cappuccino')) {
      return 'Ein klassischer Cappuccino besteht aus 1/3 Espresso, 1/3 heißer Milch und 1/3 Milchschaum. Die ideale Menge ist 180ml bei einer Temperatur von 65°C. Möchten Sie die Einstellungen für Ihren persönlichen Cappuccino anpassen?';
    }
    
    // Latte Macchiato
    if (lowerMessage.includes('latte') || lowerMessage.includes('macchiato')) {
      return 'Latte Macchiato ist perfekt für Milchliebhaber! Er besteht aus drei schönen Schichten: Zuerst heiße Milch, dann Espresso und obenauf cremiger Milchschaum. Empfohlene Menge: 240ml. Die richtige Reihenfolge sorgt für die charakteristischen Schichten!';
    }
    
    // Kaffeebohnen
    if (lowerMessage.includes('bohnen') || lowerMessage.includes('kaffee art')) {
      return 'Für optimale Ergebnisse empfehle ich Arabica-Bohnen mittlerer Röstung. Sie bieten eine ausgewogene Balance zwischen Säure und Bitterkeit. Lagern Sie die Bohnen luftdicht, kühl und dunkel. Frisch gemahlen schmeckt Kaffee am besten!';
    }
    
    // Barista Modus
    if (lowerMessage.includes('barista') || lowerMessage.includes('profi') || lowerMessage.includes('experte')) {
      return 'Im Barista-Modus haben Sie volle Kontrolle über: Mahlgrad (1-10), Brühdruck (7-11 bar), Temperatur (88-96°C), Extraktionszeit (20-35s), Kaffeemenge (7-22g) und Pre-Infusion. Perfekt für Kaffee-Enthusiasten!';
    }
    
    // Temperatur
    if (lowerMessage.includes('temperatur') || lowerMessage.includes('heiß') || lowerMessage.includes('warm')) {
      return 'Die optimale Brühtemperatur hängt vom Getränk ab: Espresso bei 92-96°C, Filterkaffee bei 92-95°C, und Milchgetränke sollten auf 60-65°C erhitzt werden. Zu heiß verbrennt die Aromen, zu kalt extrahiert nicht richtig.';
    }
    
    // Profile
    if (lowerMessage.includes('profil') || lowerMessage.includes('benutzer')) {
      return 'Sie können bis zu 8 personalisierte Profile erstellen! Jedes Profil speichert Ihre Lieblingsgetränke und individuellen Einstellungen. Perfekt für Familien oder Büros. Klicken Sie auf Ihren Namen oben rechts, um Profile zu verwalten.';
    }
    
    // Allgemeine Hilfe
    if (lowerMessage.includes('hilfe') || lowerMessage.includes('help') || lowerMessage.includes('wie')) {
      return 'Ich kann Ihnen bei vielen Themen helfen:\n\n• Kaffee-Empfehlungen und Rezepte\n• Optimale Einstellungen für jedes Getränk\n• Pflege und Wartung der Maschine\n• Barista-Techniken und Tipps\n• Fehlerbehebung\n\nStellen Sie mir einfach Ihre Frage!';
    }
    
    // Danke
    if (lowerMessage.includes('danke') || lowerMessage.includes('dankeschön')) {
      return 'Gern geschehen! Wenn Sie weitere Fragen haben, bin ich jederzeit für Sie da. Genießen Sie Ihren Kaffee! ☕';
    }
    
    // Grüße
    if (lowerMessage.includes('hallo') || lowerMessage.includes('hi') || lowerMessage.includes('guten')) {
      return 'Hallo! Schön, Sie zu sehen! Wie kann ich Ihnen heute bei Ihrer Kaffee-Zubereitung helfen?';
    }
    
    // Standard-Antwort
    return 'Das ist eine interessante Frage! Ich bin auf Kaffee-Themen spezialisiert und kann Ihnen bei Rezepten, Einstellungen, Pflege und Barista-Techniken helfen. Möchten Sie mehr über ein bestimmtes Getränk erfahren oder haben Sie Fragen zur Maschine?';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const savedInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(savedInput),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className={`w-[900px] rounded-3xl relative overflow-hidden ${theme.glassEffect} border flex flex-col shadow-2xl`}
        style={{
          height: showKeyboard ? '600px' : '520px',
          background: theme.cardBg,
          borderColor: theme.cardBorder,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
          transition: 'height 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom right, rgba(168, 85, 247, 0.05), transparent, ${theme.accentGlow})` }}></div>
        
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: theme.accentGlow }}></div>
        
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b flex-shrink-0" style={{ borderColor: theme.cardBorder }}>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600">
              <Bot className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <div>
              <h2 className="text-xl" style={{ color: theme.textPrimary }}>KaffeeBot</h2>
              <p className="text-xs" style={{ color: theme.textSecondary }}>Ihr KI-Kaffee-Assistent</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" style={{ color: theme.textPrimary }} />
          </button>
        </div>

        {/* Chat Messages */}
        <div 
          className="relative z-10 overflow-y-auto p-6 space-y-4"
          style={{
            height: showKeyboard ? '80px' : '320px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(212, 163, 115, 0.5) rgba(255, 255, 255, 0.1)',
            transition: 'height 0.3s ease'
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-[#D4A373] to-[#C49563] text-white'
                    : 'bg-white/10 text-white border border-white/10'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-60 mt-1 block">
                  {message.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A373] to-[#C49563] flex items-center justify-center">
                  <Coffee className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-white/10 border border-white/10">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          {isListening && (
            <div className="flex gap-3 justify-end">
              <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white border border-purple-400">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 animate-pulse" />
                  <span className="text-sm">Höre zu...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative z-10 p-4 border-t border-white/10 flex-shrink-0">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowKeyboard(true)}
              placeholder="Stellen Sie mir eine Frage über Kaffee..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#D4A373] transition-all"
            />
            <button
              onClick={toggleVoiceInput}
              className={`px-4 py-3 rounded-xl ${isListening ? 'bg-red-500' : 'bg-gradient-to-r from-purple-500 to-purple-600'} text-white hover:opacity-90 transition-all flex items-center gap-2`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          {/* Quick Suggestions */}
          {!showKeyboard && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {['Wie mache ich einen Cappuccino?', 'Espresso-Tipps', 'Reinigung'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInputValue(suggestion)}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Virtual Keyboard */}
        {showKeyboard && (
          <div className="relative z-20 border-t border-white/10" style={{ height: '400px' }}>
            <VirtualKeyboard
              onKeyPress={(key) => setInputValue(prev => prev + key)}
              onBackspace={() => setInputValue(prev => prev.slice(0, -1))}
              onEnter={() => {
                handleSend();
                setShowKeyboard(false);
              }}
              onClose={() => setShowKeyboard(false)}
              currentValue={inputValue}
            />
          </div>
        )}
      </div>
    </div>
  );
}