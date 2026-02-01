
import React, { useEffect, useRef } from 'react';
import { GameLog, Language } from '../types/index';
import { TRANSLATIONS } from '../gameConfig/i18n/translations';

interface GameLogsProps {
  logs: GameLog[];
  language: Language;
  isDarkMode: boolean;
}

export function GameLogs({ logs, language, isDarkMode }: GameLogsProps) {
  const logsEndRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Helper function to translate log with args
  const translateLog = (log: GameLog) => {
    const template = t[log.translationKey];
    if (!template) return log.translationKey; // Fallback

    if (!log.args) return template;

    // Replace {key} with value
    return Object.entries(log.args).reduce((acc, [key, value]) => {
      return acc.replace(`{${key}}`, String(value));
    }, template);
  };

  return (
    <div className={`w-full rounded-xl p-3 lg:p-4 border-2 shadow-none lg:shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] flex flex-col overflow-hidden transition-colors
      ${isDarkMode ? 'bg-slate-900 border-slate-700 lg:shadow-black' : 'bg-white border-slate-200'}
      h-full
    `}>
      <h3 className={`hidden lg:block text-[10px] lg:text-xs font-bold uppercase mb-2 tracking-widest border-b pb-1 shrink-0
         ${isDarkMode ? 'text-slate-400 border-slate-700' : 'text-slate-500 border-slate-200'}
      `}>
        {t.race_telemetry}
      </h3>
      
      <div className={`flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-xs lg:text-sm scrollbar-thin scrollbar-track-transparent
         ${isDarkMode ? 'scrollbar-thumb-slate-700' : 'scrollbar-thumb-slate-300'}
      `}>
        {logs.length === 0 && (
          <div className={`${isDarkMode ? 'text-slate-600' : 'text-slate-400'} italic text-center mt-4`}>
            {t.waiting_start}
          </div>
        )}
        {logs.map((log) => {
          return (
            <div 
              key={log.id} 
              className={`p-1.5 lg:p-2 rounded border-l-4 leading-tight transition-all
                ${log.type === 'success' 
                  ? (isDarkMode ? 'bg-green-900/10 border-green-500 text-green-200' : 'bg-green-50 border-green-500 text-green-900') :
                log.type === 'danger' 
                  ? (isDarkMode ? 'bg-red-900/10 border-red-500 text-red-200' : 'bg-red-50 border-red-500 text-red-900') :
                log.type === 'warning' 
                  ? (isDarkMode ? 'bg-yellow-900/10 border-yellow-500 text-yellow-200' : 'bg-yellow-50 border-yellow-500 text-yellow-900') :
                  (isDarkMode ? 'bg-blue-900/10 border-blue-500 text-blue-200' : 'bg-slate-50 border-blue-500 text-slate-700')
              }`}
              style={log.playerColor ? { 
                color: log.playerColor, 
                borderColor: log.playerColor,
                textShadow: isDarkMode ? '0 0 2px rgba(0,0,0,0.5)' : 'none',
                fontWeight: 'bold'
              } : {}}
            >
              {translateLog(log)}
            </div>
          );
        })}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}
