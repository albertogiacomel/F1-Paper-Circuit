import React, { useState, useRef, useEffect } from 'react';
import { User, Bot, Edit2, Check, Flag } from 'lucide-react';
import { PlayerState, Language } from '../types/index';
import { AVAILABLE_COLORS } from '../config/constants';
import { TRANSLATIONS } from '../config/i18n/translations';
import { F1CarIcon } from './Icons';

interface PlayerCardProps {
  player: PlayerState;
  isActive: boolean;
  isWinner: boolean;
  language: Language;
  isDarkMode: boolean;
  onNameChange: (name: string) => void;
  onColorChange: (colorIndex: number) => void;
  totalLaps: number;
}

export function PlayerCard({ player, isActive, isWinner, language, isDarkMode, onNameChange, onColorChange, totalLaps }: PlayerCardProps) {
  const t = TRANSLATIONS[language];
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(player.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (tempName.trim()) onNameChange(tempName.trim());
    else setTempName(player.name);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') { setTempName(player.name); setIsEditing(false); }
  };

  return (
    <div className={`
      relative overflow-hidden rounded-xl border-2 transition-all duration-300 transform
      ${isActive 
        ? `scale-105 z-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] ring-4 ring-offset-2 ${isDarkMode ? 'ring-offset-slate-900 ring-green-500 border-green-500 bg-slate-800' : 'ring-offset-white ring-green-500 border-green-600 bg-white'}` 
        : `opacity-70 grayscale-[0.3] scale-95 ${isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}
      ${isWinner ? 'ring-4 ring-yellow-400 border-yellow-500 opacity-100 grayscale-0 scale-105' : ''}
    `}>
      {isActive && !isWinner && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-[9px] lg:text-[10px] font-black uppercase px-2 py-1 rounded-bl-lg shadow-sm animate-pulse z-20">
          {t.your_turn}
        </div>
      )}

      <div className={`h-2 lg:h-3 w-full transition-colors duration-300 ${player.color}`} />
      
      <div className="p-3 lg:p-4 flex flex-col gap-2 lg:gap-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 mr-2 min-w-0">
             <div className="flex items-center gap-1.5 lg:gap-2 mb-1">
                {player.isAi ? <Bot size={18} className="text-red-500 lg:w-5 lg:h-5"/> : <User size={18} className={`lg:w-5 lg:h-5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}/>}
                
                {isEditing ? (
                  <div className="flex items-center gap-1 flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full text-base lg:text-lg font-bold bg-transparent border-b-2 outline-none min-w-[60px] ${isDarkMode ? 'text-white border-blue-500' : 'text-slate-900 border-blue-500'}`}
                      maxLength={12}
                    />
                    <button onClick={handleSave} className="text-green-500"><Check size={16} /></button>
                  </div>
                ) : (
                  <div 
                    className={`font-bold text-base lg:text-lg flex items-center gap-2 group cursor-pointer truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                    onClick={() => !player.isAi && setIsEditing(true)}
                  >
                    <span className="truncate">{player.name}</span>
                    {!player.isAi && <Edit2 size={12} className="opacity-0 group-hover:opacity-50 transition-opacity hidden lg:block" />}
                  </div>
                )}
             </div>
          </div>

          <div className="text-right shrink-0">
            <div className={`text-[9px] lg:text-[10px] uppercase font-bold tracking-wider mb-0.5 lg:mb-1 flex items-center justify-end gap-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <Flag size={10} /> LAPS
            </div>
            <div className={`text-xl lg:text-2xl font-display leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {Math.min(player.laps, totalLaps)}<span className="text-sm lg:text-base text-slate-500">/{totalLaps}</span>
            </div>
          </div>
        </div>
        
        {isEditing && (
          <div className="mt-2 space-y-4 animate-in slide-in-from-top-2 overflow-y-auto max-h-64 pr-2">
            <div className="grid grid-cols-1 gap-2">
              {AVAILABLE_COLORS.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => onColorChange(idx)}
                  className={`flex items-center gap-3 p-2 rounded-xl border-2 transition-all text-left
                    ${player.hexColor === c.hex 
                      ? 'bg-blue-600/10 border-blue-500 shadow-sm' 
                      : (isDarkMode ? 'bg-slate-900/40 border-slate-700 hover:border-slate-500' : 'bg-white border-slate-100 hover:border-slate-300')}
                  `}
                >
                  <div className="w-12 h-8 shrink-0">
                    <F1CarIcon color={c.hex} borderColor={c.borderHex} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`text-xs font-black uppercase truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{c.id}</span>
                    <span className={`text-[10px] font-bold truncate opacity-60`}>{c.teamName}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={`flex justify-between items-center rounded-lg p-2 lg:p-3 ${
            isActive ? (isDarkMode ? 'bg-green-900/20 border border-green-500/30' : 'bg-green-50 border border-green-200') : (isDarkMode ? 'bg-slate-800' : 'bg-slate-100')
          }`}>
           <div className="flex flex-col">
              <span className={`text-[9px] lg:text-[10px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.pos}</span>
              <span className={`font-mono font-bold text-base lg:text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{player.position}</span>
           </div>
           <div className="flex flex-col items-end">
              <span className={`text-[9px] lg:text-[10px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.last_roll}</span>
              <span className={`font-mono font-black text-lg lg:text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{player.lastRoll || '-'}</span>
           </div>
        </div>
      </div>
    </div>
  );
}