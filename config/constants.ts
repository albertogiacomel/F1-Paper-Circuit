
import { PlayerState } from '../types/index';
import { ACTIVE_MAP } from './maps/index';

// Game Configuration from Active Map
// Use path.length to be safe against metadata mismatches
export const TOTAL_CELLS = ACTIVE_MAP.path.length;
export const PIT_STOPS = ACTIVE_MAP.pitStops;
export const DANGER_ZONES = ACTIVE_MAP.dangerZones;
export const DRS_ZONES = ACTIVE_MAP.drsZones;
export const TRACK_PATH = ACTIVE_MAP.path;
export const TRACK_NAME = ACTIVE_MAP.name;

// Available Lap Options
export const LAP_OPTIONS = [3, 5, 7, 10];
export const DEFAULT_LAPS = 5;

// CHAMPIONSHIP ORDER
export const MAP_ORDER = [
  'australia', 'china', 'japan', 'bahrain', 'saudi', 'miami', 'imola', 'monaco',
  'spain', 'canada', 'austria', 'silverstone', 'spa', 'hungary', 'zandvoort',
  'italy', 'azerbaijan', 'singapore', 'usa', 'mexico', 'brazil', 'las_vegas',
  'qatar', 'abu_dhabi', 'monza', 'oval' 
];

// F1 2025 INSPIRED TEAM COLORS
export const AVAILABLE_COLORS = [
  // Ferrari (Red / Black)
  { id: 'ferrari', tailwind: 'bg-red-600', border: 'border-red-900', hex: '#DC0000', borderHex: '#000000' },
  // McLaren (Papaya / Black)
  { id: 'mclaren', tailwind: 'bg-orange-500', border: 'border-slate-900', hex: '#FF8700', borderHex: '#000000' },
  // Red Bull (Navy / Yellow)
  { id: 'redbull', tailwind: 'bg-blue-900', border: 'border-yellow-400', hex: '#061D49', borderHex: '#FCD700' },
  // Mercedes (Silver / Cyan)
  { id: 'mercedes', tailwind: 'bg-slate-300', border: 'border-cyan-400', hex: '#C0C0C0', borderHex: '#00D2BE' },
  // Aston Martin (Racing Green / Lime)
  { id: 'aston', tailwind: 'bg-teal-800', border: 'border-lime-400', hex: '#006F62', borderHex: '#CEDC00' },
  // Alpine (Blue / Pink)
  { id: 'alpine', tailwind: 'bg-sky-500', border: 'border-pink-500', hex: '#0090FF', borderHex: '#FD4BC7' },
  // Williams (Blue / Navy)
  { id: 'williams', tailwind: 'bg-blue-600', border: 'border-blue-950', hex: '#005AFF', borderHex: '#000000' },
  // RB (Blue / Silver)
  { id: 'rb', tailwind: 'bg-blue-700', border: 'border-slate-200', hex: '#4E7C9B', borderHex: '#FFFFFF' },
  // Sauber/Kick (Neon Green / Black)
  { id: 'sauber', tailwind: 'bg-lime-400', border: 'border-black', hex: '#52E252', borderHex: '#000000' },
  // Haas (White / Red)
  { id: 'haas', tailwind: 'bg-slate-100', border: 'border-red-600', hex: '#FFFFFF', borderHex: '#B6BABD' },
];

export const INITIAL_PLAYER_1: PlayerState = {
  id: 1,
  position: 0,
  laps: 1, // Start at Lap 1
  lastRoll: null,
  name: "Player 1",
  // Default to Ferrari
  color: AVAILABLE_COLORS[0].tailwind,
  borderColor: AVAILABLE_COLORS[0].border,
  hexColor: AVAILABLE_COLORS[0].hex,
  hexBorderColor: AVAILABLE_COLORS[0].borderHex,
  isAi: false,
  skipTurn: false
};

export const INITIAL_PLAYER_2: PlayerState = {
  id: 2,
  position: 0,
  laps: 1, // Start at Lap 1
  lastRoll: null,
  name: "Player 2",
  // Default to McLaren
  color: AVAILABLE_COLORS[1].tailwind,
  borderColor: AVAILABLE_COLORS[1].border,
  hexColor: AVAILABLE_COLORS[1].hex,
  hexBorderColor: AVAILABLE_COLORS[1].borderHex,
  isAi: false,
  skipTurn: false
};
