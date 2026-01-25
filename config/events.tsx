
import React from 'react';
import { Wrench, AlertTriangle, Flag, Zap, Timer, Skull, ThumbsUp, Wind, ChevronsRight } from 'lucide-react';
import { EventKey, Language } from '../types/index';

// Interfaccia per l'evento grafico
export interface GameEventDef {
  title: Record<Language, string>;
  description: Record<Language, string>;
  Illustration: React.FC<{ className?: string }>;
  color: string;
}

// Configurazione statica degli eventi
export const GAME_EVENTS: Record<EventKey, GameEventDef | null> = {
  'NORMAL_MOVE': null, // Nessun popup per movimento normale (gestito dal dado)
  'LAP_COMPLETE': null, // Nessun popup per completamento giro
  
  'PIT_STOP': {
    title: { it: "PIT STOP!", en: "PIT STOP!" },
    description: { 
      it: "Cambio gomme fulmineo! I meccanici sono stati velocissimi. Guadagni un turno extra!", 
      en: "Lightning fast tire change! Mechanics were super fast. You get an extra turn!" 
    },
    color: "text-yellow-600 bg-yellow-100 border-yellow-500",
    Illustration: () => (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 bg-yellow-200 rounded-full opacity-50 animate-pulse"></div>
        <Wrench size={64} className="relative z-10 text-yellow-700 -rotate-45" />
        <Timer size={40} className="absolute bottom-0 right-0 z-20 text-yellow-900 bg-white rounded-full p-1 border-2 border-yellow-700" />
        <Zap size={40} className="absolute top-0 left-0 z-20 text-red-500 animate-bounce" />
      </div>
    )
  },

  'DANGER_ZONE': {
    title: { it: "PERICOLO!", en: "DANGER!" },
    description: { 
      it: "Detriti in pista o testacoda! Devi rallentare per evitare danni. Torni indietro di 1 casella.", 
      en: "Debris on track or spin out! You must slow down to avoid damage. Move back 1 space." 
    },
    color: "text-red-600 bg-red-100 border-red-500",
    Illustration: () => (
      <div className="relative w-32 h-32 flex items-center justify-center">
         <div className="absolute inset-0 bg-red-200 rounded-full opacity-50 animate-ping"></div>
        <AlertTriangle size={64} className="relative z-10 text-red-600" />
        <Skull size={32} className="absolute bottom-2 right-2 z-20 text-black/50" />
        {/* Skid marks representation */}
        <div className="absolute bottom-0 left-4 w-12 h-2 bg-slate-800 -rotate-12 rounded-full opacity-60"></div>
        <div className="absolute bottom-2 left-6 w-12 h-2 bg-slate-800 -rotate-12 rounded-full opacity-60"></div>
      </div>
    )
  },

  'DRS_ZONE': {
    title: { it: "DRS ATTIVO!", en: "DRS ENABLED!" },
    description: {
      it: "Ala mobile aperta! Riduci la resistenza aerodinamica e guadagni 2 caselle extra.",
      en: "Rear wing open! Reduced drag allows you to surge forward 2 extra spaces."
    },
    color: "text-cyan-600 bg-cyan-100 border-cyan-500",
    Illustration: () => (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 bg-cyan-200 rounded-full opacity-50 animate-pulse"></div>
        <Wind size={64} className="relative z-10 text-cyan-600 animate-pulse" />
        <ChevronsRight size={48} className="absolute bottom-0 right-0 z-20 text-cyan-800 animate-bounce" />
      </div>
    )
  },

  'FINISH': {
    title: { it: "TRAGUARDO!", en: "FINISH LINE!" },
    description: { 
      it: "Bandiera a scacchi! Che gara incredibile!", 
      en: "Checkered flag! What an incredible race!" 
    },
    color: "text-green-600 bg-green-100 border-green-500",
    Illustration: () => (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <Flag size={80} className="relative z-10 text-green-600 fill-green-200" />
        <ThumbsUp size={32} className="absolute bottom-0 right-0 text-blue-600 animate-bounce" />
      </div>
    )
  }
};
