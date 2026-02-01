
import React from 'react';
import { Flag, User, Bot } from 'lucide-react';
import { GameMode, Language } from '../types/index';
import { TRANSLATIONS } from '../gameConfig/i18n/translations';

interface MainMenuProps {
  onStart: (mode: GameMode) => void;
  language: Language;
  isDarkMode: boolean;
}

export function MainMenu({ onStart, language, isDarkMode }: MainMenuProps) {
  const t = TRANSLATIONS[language];

  return (
    <div className="flex-1 flex items-center justify-center p-4 w-full">
      <div className={`max-w-md w-full p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] text-center border-2
        ${isDarkMode ? 'bg-slate-800 border-slate-600 shadow-black' : 'bg-white border-slate-800'}
      `}>
        <div className="flex justify-center mb-6">
          <div className={`p-4 rounded-full border-2 ${isDarkMode ? 'bg-red-900/30 border-red-500' : 'bg-red-100 border-red-500'}`}>
            <Flag size={48} className="text-red-600" />
          </div>
        </div>
        <h1 className={`font-display text-4xl mb-2 font-black tracking-normal ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <span className="text-red-600">F1 PAPER</span> CIRCUIT
        </h1>
        <p className={`mb-8 font-medium uppercase tracking-widest text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Ready to race?</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => onStart('PVP')}
            className={`w-full group relative flex items-center justify-center gap-3 p-4 border-2 rounded-xl transition-all
              ${isDarkMode 
                ? 'bg-slate-700 border-slate-600 hover:border-blue-500 hover:bg-slate-600 text-white' 
                : 'bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-800'}
            `}
          >
            <div className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-800 text-blue-400 group-hover:bg-blue-500 group-hover:text-white' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white'}`}>
              <User size={24} />
            </div>
            <div className="text-left">
              <div className="font-bold uppercase">{t.start_pvp}</div>
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.start_pvp_desc}</div>
            </div>
          </button>

          <button 
            onClick={() => onStart('AI')}
            className={`w-full group relative flex items-center justify-center gap-3 p-4 border-2 rounded-xl transition-all
              ${isDarkMode 
                ? 'bg-slate-700 border-slate-600 hover:border-purple-500 hover:bg-slate-600 text-white' 
                : 'bg-white border-slate-200 hover:border-purple-500 hover:bg-purple-50 text-slate-800'}
            `}
          >
            <div className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-800 text-purple-400 group-hover:bg-purple-500 group-hover:text-white' : 'bg-purple-100 text-purple-600 group-hover:bg-purple-500 group-hover:text-white'}`}>
              <Bot size={24} />
            </div>
            <div className="text-left">
              <div className="font-bold uppercase">{t.start_ai}</div>
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.start_ai_desc}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
