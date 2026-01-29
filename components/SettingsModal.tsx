import React, { useLayoutEffect, useRef, useState } from 'react';
import { X, Globe, Map as MapIcon, RotateCw, Info, Dice6, Bot, User } from 'lucide-react';
import { Language, GameMode } from '../types/index';
import { TRANSLATIONS } from '../config/i18n/translations';
import { MAPS } from '../config/maps/index';
import { LAP_OPTIONS, MAP_ORDER } from '../config/constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  currentMapId: string;
  onMapChange: (mapId: string) => void;
  totalLaps: number;
  onLapsChange: (laps: number) => void;
  manualDiceEnabled: boolean;
  setManualDiceEnabled: (val: boolean) => void;
  gameMode: GameMode;
  onToggleMode: () => void;
}

const TrackPreview = ({ mapId }: { mapId: string }) => {
    const map = (MAPS as any)[mapId];
    const pathRef = useRef<SVGPathElement>(null);
    // Default fallback
    const [viewBox, setViewBox] = useState("0 0 100 100");

    useLayoutEffect(() => {
        if (!map) return;

        if (map.svgPath) {
            // For SVG tracks, render the path and measure it
            if (pathRef.current) {
                try {
                    const bbox = pathRef.current.getBBox();
                    // Reduced padding (approx 5%)
                    const paddingX = bbox.width * 0.05;
                    const paddingY = bbox.height * 0.05;
                    
                    const minPad = Math.max(bbox.width, bbox.height) * 0.05;
                    const finalPadX = Math.max(paddingX, minPad);
                    const finalPadY = Math.max(paddingY, minPad);
                    
                    setViewBox(`${bbox.x - finalPadX} ${bbox.y - finalPadY} ${bbox.width + finalPadX*2} ${bbox.height + finalPadY*2}`);
                } catch(e) {
                    // fallback if getBBox fails (e.g. not attached)
                    setViewBox("0 0 500 500");
                }
            }
        } else if (map.path) {
            // Legacy Point System
            const xs = map.path.map((p:any) => p.x);
            const ys = map.path.map((p:any) => p.y);
            const minX = Math.min(...xs);
            const maxX = Math.max(...xs);
            const minY = Math.min(...ys);
            const maxY = Math.max(...ys);
            
            const padding = 2;
            const width = maxX - minX + (padding * 2);
            const height = maxY - minY + (padding * 2);
            setViewBox(`${minX - padding} ${minY - padding} ${width} ${height}`);
        }
    }, [map]);

    if (!map) return null;

    return (
        <div className="w-full h-32 bg-slate-100 dark:bg-slate-900 rounded-xl mb-4 p-4 flex items-center justify-center border-2 border-slate-200 dark:border-slate-700">
            <svg viewBox={viewBox} className="w-full h-full text-slate-400 dark:text-slate-500 stroke-current fill-none stroke-[2]">
                {map.svgPath ? (
                    <>
                        <path ref={pathRef} d={map.svgPath} stroke="currentColor" strokeWidth="15" fill="none" opacity="0.2" />
                        <path d={map.svgPath} stroke="currentColor" strokeWidth="5" fill="none" />
                    </>
                ) : (
                    <polyline points={map.path.map((p:any) => `${p.x},${p.y}`).join(' ')} strokeLinejoin="round" strokeLinecap="round" />
                )}
            </svg>
        </div>
    );
};

export function SettingsModal({ 
  isOpen, onClose, language, setLanguage, isDarkMode, currentMapId, 
  onMapChange, totalLaps, onLapsChange, manualDiceEnabled, setManualDiceEnabled,
  gameMode, onToggleMode
}: SettingsModalProps) {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const sortedMaps = MAP_ORDER.map(id => (MAPS as any)[id] || null).filter(m => m !== null);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-full max-w-md p-6 rounded-2xl shadow-2xl transform transition-all scale-100 max-h-[90vh] overflow-y-auto
        ${isDarkMode ? 'bg-slate-800 border-2 border-slate-700 text-white' : 'bg-white border-2 border-slate-800 text-slate-900'}`}>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl uppercase tracking-wide">{t.settings_title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Game Mode Toggle */}
          <div>
            <label className="flex items-center gap-2 font-bold mb-3 text-lg">
              <Bot size={20} />
              {t.game_mode_label}
            </label>
            <button 
              onClick={onToggleMode}
              className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all font-bold
                ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-300'}
              `}
            >
              <div className="flex items-center gap-2">
                {gameMode === 'AI' ? <Bot size={20} className="text-purple-500" /> : <User size={20} className="text-blue-500" />}
                <span>{gameMode === 'AI' ? t.start_ai : t.start_pvp}</span>
              </div>
              <div className="text-xs text-blue-500 underline uppercase">Switch</div>
            </button>
          </div>

          <hr className={`border-t-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`} />

          {/* Manual Dice Toggle */}
          <div>
             <label className="flex items-center gap-2 font-bold mb-1 text-lg">
               <Dice6 size={20} />
               {t.manual_dice_label}
             </label>
             <p className={`text-xs mb-3 opacity-60`}>{t.manual_dice_desc}</p>
             <button
               onClick={() => setManualDiceEnabled(!manualDiceEnabled)}
               className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all font-bold
                 ${manualDiceEnabled 
                   ? 'bg-green-600/20 border-green-500 text-green-500' 
                   : (isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-500')}
               `}
             >
               <span>{manualDiceEnabled ? 'ON' : 'OFF'}</span>
               <div className={`w-10 h-6 rounded-full relative transition-colors ${manualDiceEnabled ? 'bg-green-500' : 'bg-slate-400'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${manualDiceEnabled ? 'left-5' : 'left-1'}`} />
               </div>
             </button>
          </div>

          <hr className={`border-t-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`} />

          {/* Map Selector */}
          <div>
            <label className="flex items-center gap-2 font-bold mb-3 text-lg">
              <MapIcon size={20} />
              Circuit / Tracciato
            </label>
            
            <TrackPreview mapId={currentMapId} />

            <select
                value={currentMapId}
                onChange={(e) => onMapChange(e.target.value)}
                className={`w-full p-3 rounded-xl font-bold border-2 outline-none appearance-none cursor-pointer transition-all
                  ${isDarkMode 
                    ? 'bg-slate-700 border-slate-600 text-white hover:border-blue-500' 
                    : 'bg-slate-100 border-slate-300 text-slate-900 hover:border-blue-500'}
                `}
            >
                {sortedMaps.map((map, index) => (
                    <option key={map.id} value={map.id}>
                        {index + 1}. {map.name}
                    </option>
                ))}
            </select>
          </div>

          <hr className={`border-t-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`} />
          
          {/* Lap Selector */}
          <div>
             <label className="flex items-center gap-2 font-bold mb-3 text-lg">
               <RotateCw size={20} />
               {t.total_laps}
             </label>
             <div className="flex gap-2">
                 {LAP_OPTIONS.map((opt) => (
                     <button
                        key={opt}
                        onClick={() => onLapsChange(opt)}
                        className={`flex-1 py-2 rounded-lg font-bold border-2 transition-all
                           ${totalLaps === opt
                             ? 'bg-green-600 text-white border-green-700'
                             : (isDarkMode ? 'bg-slate-700 border-slate-600 hover:border-green-500' : 'bg-slate-100 border-slate-300 hover:border-green-500')
                           }
                        `}
                     >
                        {opt}
                     </button>
                 ))}
             </div>
          </div>

          <hr className={`border-t-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`} />

          {/* Language Switch */}
          <div>
            <label className="flex items-center gap-2 font-bold mb-3 text-lg">
              <Globe size={20} />
              {t.language}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setLanguage('it')} className={`py-3 px-4 rounded-xl font-bold border-2 transition-all ${language === 'it' ? 'bg-blue-600 text-white border-blue-700' : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700'}`}>Italiano 🇮🇹</button>
              <button onClick={() => setLanguage('en')} className={`py-3 px-4 rounded-xl font-bold border-2 transition-all ${language === 'en' ? 'bg-blue-600 text-white border-blue-700' : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700'}`}>English 🇬🇧</button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold rounded-lg transition-colors">{t.close}</button>
        </div>
      </div>
    </div>
  );
}