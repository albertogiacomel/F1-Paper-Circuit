export type PlayerId = 1 | 2;
export type GameMode = 'PVP' | 'AI' | null;
export type Language = 'it' | 'en';

export type LogType = 'info' | 'success' | 'danger' | 'warning';

export type TranslationKey = 
  | 'title'
  | 'start_pvp'
  | 'start_pvp_desc'
  | 'start_ai'
  | 'start_ai_desc'
  | 'reset'
  | 'play_again'
  | 'next_race'
  | 'winner'
  | 'wins'
  | 'race_finished'
  | 'rolling'
  | 'ai_thinking'
  | 'roll_dice'
  | 'enter_dice'
  | 'race_telemetry'
  | 'waiting_start'
  | 'pos'
  | 'laps'
  | 'last_roll'
  | 'your_turn'
  | 'settings'
  | 'language'
  | 'close'
  | 'start_finish_label'
  | 'settings_title'
  | 'total_laps'
  | 'version'
  | 'help_title'
  | 'rule_movement_title'
  | 'rule_movement_desc'
  | 'rule_six_title'
  | 'rule_six_desc'
  | 'rule_pit_title'
  | 'rule_pit_desc'
  | 'rule_danger_title'
  | 'rule_danger_desc'
  | 'rule_drs_title'
  | 'rule_drs_desc'
  | 'rule_win_title'
  | 'rule_win_desc'
  | 'manual_dice_label'
  | 'manual_dice_desc'
  | 'game_mode_label'
  | 'select_value'
  // Log Keys
  | 'log_start'
  | 'log_roll'
  | 'log_roll_6'
  | 'log_lap_complete'
  | 'log_finish'
  | 'log_pitstop'
  | 'log_danger'
  | 'log_move_back'
  | 'log_drs'
  | 'log_skip_turn'
  | 'log_engine_failure';

export interface GameLog {
  id: string;
  translationKey: TranslationKey; 
  args?: Record<string, string | number>; 
  type: LogType;
}

export interface PlayerState {
  id: PlayerId;
  position: number;
  laps: number; 
  lastRoll: number | null;
  name: string;
  color: string; 
  borderColor: string; 
  hexColor: string; 
  hexBorderColor: string; 
  isAi: boolean;
  skipTurn?: boolean;
  consecutiveSixes: number;
}

export type EventKey = 'PIT_STOP' | 'DANGER_ZONE' | 'NORMAL_MOVE' | 'FINISH' | 'DRS_ZONE' | 'LAP_COMPLETE' | 'ENGINE_FAILURE';

export interface MoveResult {
  landedPosition: number; 
  newPosition: number;    
  newLaps: number; 
  translationKey: TranslationKey; 
  logArgs: Record<string, string | number>;
  logType: LogType;
  extraTurn: boolean;
  skipTurn: boolean;
  eventKey: EventKey;
  rollValue: number;
  consecutiveSixes: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface TrackDefinition {
  id: string;
  name: string;
  totalCells: number;
  path: Point[];
  pitStops: number[];
  dangerZones: number[];
  drsZones: number[]; 
}

export interface TeamColor {
  id: string;
  teamName: string;
  tailwind: string;
  border: string;
  hex: string;
  borderHex: string;
}