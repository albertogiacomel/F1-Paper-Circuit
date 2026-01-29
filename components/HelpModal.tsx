import React from 'react';
import { X, Dice5, Zap, AlertTriangle, Wrench, Trophy, Move, RotateCcw, Flame } from 'lucide-react';
import { Language } from '../types/index';
import { TRANSLATIONS } from '../config/i18n/translations';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isDarkMode: boolean;
}

export function HelpModal({ isOpen, onClose, language, isDarkMode }: HelpModalProps) {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  const rules = [
    { icon: <Move className="text-blue-500" />, title: t.rule_movement_title, desc: t.rule_movement_desc },
    { icon: <Dice5 className="text-green-500" />, title: t.rule_six_title, desc: t.rule_six_desc },
    { icon: <Flame className="text-orange-500" />, title: t.rule_engine_title, desc: t.rule_engine_desc },
    { icon: <Wrench className="text-yellow-600" />, title: t.rule_pit_title, desc: t.rule_pit_desc },
    { icon: <AlertTriangle className="text-red-500" />, title: t.rule_danger_title, desc: t.rule_danger_desc },
    { icon: <Zap className="text-cyan-500" />, title: t.rule_drs_title, desc: t.rule_drs_desc },
    { icon: <Trophy className="text-yellow-500" />, title: t.rule_win_title, desc: t.rule_win_desc },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-lg p-6 rounded-3xl shadow-2xl transform transition-all scale-100 max-h-[85vh] overflow-hidden flex flex-col
        ${isDarkMode ? 'bg-slate-800 border-2 border-slate-700 text-white' : 'bg-white border-2 border-slate-800 text-slate-900'}`}>
        
        <div className="flex justify-between items-center mb-6 shrink-0">
          <h2 className="font-display text-3xl uppercase font-black tracking-tighter flex items-center gap-3">
             <span className="p-2 bg-blue-600 rounded-lg text-white">?</span>
             {t.help_title}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-400">
          {rules.map((rule, idx) => (
            <div 
              key={idx} 
              className={`flex gap-4 p-4 rounded-2xl border-2 transition-colors
                ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}
              `}
            >
              <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600">
                 {/* Fixed: cast icon to ReactElement<any> to allow 'size' prop injection via cloneElement */}
                 {React.cloneElement(rule.icon as React.ReactElement<any>, { size: 28 })}
              </div>
              <div>
                <h3 className="font-display font-bold text-lg uppercase tracking-tight mb-0.5">{rule.title}</h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-display font-bold text-xl uppercase tracking-widest rounded-2xl shadow-lg transition-transform active:scale-95"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}