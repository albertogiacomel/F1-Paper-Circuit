import React, { useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { EventKey, Language } from '../types/index';
import { GAME_EVENTS } from '../config/events';

interface EventModalProps {
  isOpen: boolean;
  type: 'DICE' | 'EVENT' | 'MANUAL_INPUT';
  eventKey?: EventKey;
  rollValue?: number;
  onClose: () => void;
  onManualSelect?: (val: number) => void;
  language: Language;
}

export function EventModal({ isOpen, type, eventKey, rollValue, onClose, onManualSelect, language }: EventModalProps) {
  
  useEffect(() => {
    if (isOpen) {
        let timer: ReturnType<typeof setTimeout>;
        if (type === 'DICE') {
            timer = setTimeout(() => { onClose(); }, 2000);
        } else if (type === 'EVENT') {
            timer = setTimeout(() => { onClose(); }, 10000);
        }
        return () => clearTimeout(timer);
    }
  }, [isOpen, type, onClose]);

  if (!isOpen) return null;

  if (type === 'MANUAL_INPUT') {
    const DiceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border-4 border-slate-900 max-w-sm w-full">
          <h2 className="text-2xl font-display uppercase mb-6 dark:text-white text-center">
            {language === 'it' ? 'Inserisci il Dado' : 'Enter Dice Value'}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {DiceIcons.map((Icon, idx) => (
              <button
                key={idx}
                onClick={() => onManualSelect?.(idx + 1)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all border-slate-200 dark:border-slate-700 hover:border-blue-500"
              >
                <Icon size={48} className="text-blue-600 dark:text-blue-400" />
                <span className="font-bold text-xl">{idx + 1}</span>
              </button>
            ))}
          </div>
          <p className="mt-6 text-center text-xs opacity-50 uppercase font-bold tracking-widest">{language === 'it' ? 'Seleziona valore uscito' : 'Select the rolled value'}</p>
        </div>
      </div>
    );
  }

  if (type === 'DICE' && rollValue) {
    const DiceIcon = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6][rollValue - 1] || Dice6;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer" onClick={onClose}>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] border-4 border-slate-900 transform scale-100 animate-in zoom-in-95 duration-300 flex flex-col items-center">
          <h2 className="text-2xl font-display uppercase mb-4 dark:text-white">{language === 'it' ? 'Hai tirato...' : 'You rolled...'}</h2>
          <div className="text-blue-600 dark:text-blue-400 animate-bounce"><DiceIcon size={96} /></div>
          <div className="text-6xl font-black font-mono mt-4 text-slate-900 dark:text-white">{rollValue}</div>
        </div>
      </div>
    );
  }

  if (type === 'EVENT' && eventKey && GAME_EVENTS[eventKey]) {
    const event = GAME_EVENTS[eventKey]!;
    const Illustration = event.Illustration;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer" onClick={onClose}>
        <div className={`relative w-full max-w-md p-0 rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,0.4)] border-4 transform transition-all scale-100 ${event.color} bg-white dark:bg-slate-800`}>
          <div className={`h-4 w-full rounded-t-2xl opacity-50 ${event.color.split(' ')[1]}`}></div>
          <div className="p-8 flex flex-col items-center text-center">
            <div className="mb-6 transform hover:scale-110 transition-transform duration-300"><Illustration /></div>
            <h2 className="text-4xl font-black font-display uppercase tracking-tighter mb-4 text-slate-900 dark:text-white">{event.title[language]}</h2>
            <p className="text-lg font-bold font-mono leading-relaxed text-slate-700 dark:text-slate-300 mb-8 border-y-2 border-slate-200 dark:border-slate-700 py-4">{event.description[language]}</p>
            <button className="w-full py-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-display font-bold text-xl uppercase tracking-widest rounded-xl shadow-lg">CONTINUE</button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
