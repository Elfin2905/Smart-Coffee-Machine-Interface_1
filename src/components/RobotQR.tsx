import { Bot } from 'lucide-react';
import qrCodeImage from '../assets/americano.png';

export function RobotQR() {
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Robot Antennas */}
      <div className="flex gap-3 mb-1">
        <div className="w-0.5 h-3 bg-[#4ADE80] rounded-full">
          <div className="w-2 h-2 bg-[#4ADE80] rounded-full -translate-x-[3px] -translate-y-1 shadow-lg shadow-[#4ADE80]/50 relative">
            <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="w-0.5 h-3 bg-[#4ADE80] rounded-full">
          <div className="w-2 h-2 bg-[#4ADE80] rounded-full -translate-x-[3px] -translate-y-1 shadow-lg shadow-[#4ADE80]/50 relative">
            <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
      
      {/* Robot Head - Bot Icon Style */}
      <div className="relative">
        <div className="w-14 h-12 bg-gradient-to-b from-[#D4A373] to-[#C49563] rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden border border-[#8B6347]/20">
          {/* Metallic shine effect */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
          
          {/* Robot Eyes */}
          <div className="flex gap-3 relative z-10">
            <div className="w-3 h-3 bg-white rounded-full shadow-inner">
              <div className="w-1.5 h-1.5 bg-[#0F0F11] rounded-full m-[3px]"></div>
            </div>
            <div className="w-3 h-3 bg-white rounded-full shadow-inner">
              <div className="w-1.5 h-1.5 bg-[#0F0F11] rounded-full m-[3px]"></div>
            </div>
          </div>
          
          {/* Robot Mouth */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
      
      {/* QR Code as Robot Body with Orange Frame */}
      <div className="relative">
        {/* Orange/Gold Frame */}
        <div className="w-24 h-24 bg-gradient-to-br from-[#D4A373] to-[#C49563] rounded-2xl shadow-xl p-1.5 relative overflow-hidden">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
          
          {/* QR Code */}
          <div className="relative w-full h-full bg-white rounded-xl p-1.5 shadow-inner">
            <img src={qrCodeImage} alt="QR Code" className="w-full h-full object-contain" />
          </div>
          
          {/* Frame details - screws */}
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#8B6347] rounded-full"></div>
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#8B6347] rounded-full"></div>
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#8B6347] rounded-full"></div>
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#8B6347] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}