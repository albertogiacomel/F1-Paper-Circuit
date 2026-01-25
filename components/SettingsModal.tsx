
import React from 'react';
import { X, Globe, Map as MapIcon, RotateCw } from 'lucide-react';
import { Language } from '../types/index';
import { TRANSLATIONS } from '../i18n/translations';
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
}

export function SettingsModal({ isOpen, onClose, language, setLanguage, isDarkMode, currentMapId, onMapChange, totalLaps, onLapsChange }: SettingsModalProps) {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  // Create sorted map list using imported MAP_ORDER
  const sortedMaps = MAP_ORDER.map(id => {
      // @ts-ignore
      const m = MAPS[id];
      return m ? m : null;
  }).filter(m => m !== null);

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
          {/* Map Selector */}
          <div>
            <label className="flex items-center gap-2 font-bold mb-3 text-lg">
              <MapIcon size={20} />
              Circuit / Tracciato
            </label>
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
                        {index + 1}. {map.name} ({map.path.length} steps)
                    </option>
                ))}
            </select>
            <p className="text-xs mt-2 opacity-60 italic">
               *Changing map will reset the current game.
            </p>
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
              <button 
                onClick={() => setLanguage('it')}
                className={`py-3 px-4 rounded-xl font-bold border-2 transition-all ${
                  language === 'it' 
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md transform scale-[1.02]' 
                    : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                Italiano 🇮🇹
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`py-3 px-4 rounded-xl font-bold border-2 transition-all ${
                  language === 'en' 
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md transform scale-[1.02]' 
                    : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                English 🇬🇧
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold rounded-lg transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
