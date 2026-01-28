import { useState, useEffect, useCallback } from 'react';
import { PlayerId, GameMode, PlayerState, GameLog, EventKey, TranslationKey, TrackDefinition } from '../types/index';
import { INITIAL_PLAYER_1, INITIAL_PLAYER_2, AVAILABLE_COLORS, DEFAULT_LAPS, MAP_ORDER } from '../config/constants';
import { MAPS } from '../config/maps/index';
import { calculateMove } from './gameEngine';

const STORAGE_KEY = 'f1_paper_save_v3';

interface SavedState {
  gameMode: GameMode;
  activeMapId: string;
  turn: PlayerId;
  p1: PlayerState;
  p2: PlayerState;
  winner: PlayerId | null;
  logs: GameLog[];
  totalLaps: number;
  manualDiceEnabled: boolean;
}

export function useGame() {
  const [initialized, setInitialized] = useState(false);
  const [activeMap, setActiveMap] = useState<TrackDefinition>(MAPS.australia);
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [turn, setTurn] = useState<PlayerId>(1);
  const [p1, setP1] = useState<PlayerState>(INITIAL_PLAYER_1);
  const [p2, setP2] = useState<PlayerState>(INITIAL_PLAYER_2);
  const [winner, setWinner] = useState<PlayerId | null>(null);
  const [logs, setLogs] = useState<GameLog[]>([]);
  const [totalLaps, setTotalLaps] = useState<number>(DEFAULT_LAPS);
  const [manualDiceEnabled, setManualDiceEnabled] = useState<boolean>(false);
  const [isRolling, setIsRolling] = useState(false);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'DICE' | 'EVENT' | 'MANUAL_INPUT';
    eventKey?: EventKey;
    rollValue?: number;
  }>({ isOpen: false, type: 'DICE' });

  const [pendingUpdate, setPendingUpdate] = useState<{
    playerId: PlayerId;
    landedPosition: number;
    finalPosition: number;
    newLaps: number;
    extraTurn: boolean;
    skipTurn: boolean;
    consecutiveSixes: number;
    eventKey: EventKey;
  } | null>(null);

  const addLog = useCallback((key: TranslationKey, args: Record<string, string|number> = {}, type: GameLog['type'] = 'info') => {
    setLogs(prev => [...prev, { 
        id: Math.random().toString(36), 
        translationKey: key, 
        args, 
        type 
    }]);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: SavedState = JSON.parse(saved);
        const map = Object.values(MAPS).find(m => m.id === parsed.activeMapId) || MAPS.australia;
        setActiveMap(map);
        setGameMode(parsed.gameMode);
        setTurn(parsed.turn);
        setP1(parsed.p1);
        setP2(parsed.p2);
        setWinner(parsed.winner);
        setLogs(parsed.logs);
        setTotalLaps(parsed.totalLaps || DEFAULT_LAPS);
        setManualDiceEnabled(!!parsed.manualDiceEnabled);
      } catch (e) {
        console.error("Failed to load save", e);
      }
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    if (!gameMode) {
        localStorage.removeItem(STORAGE_KEY);
        return;
    }
    const stateToSave: SavedState = {
      gameMode,
      activeMapId: activeMap.id,
      turn,
      p1,
      p2,
      winner,
      logs,
      totalLaps,
      manualDiceEnabled
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [gameMode, activeMap, turn, p1, p2, winner, logs, totalLaps, manualDiceEnabled, initialized]);

  useEffect(() => {
    if (!gameMode || winner || isRolling || modalState.isOpen) return;
    const currentPlayer = turn === 1 ? p1 : p2;
    if (currentPlayer.skipTurn) {
        const timer = setTimeout(() => {
            addLog('log_skip_turn', { player: currentPlayer.name }, 'warning');
            const updateFn = turn === 1 ? setP1 : setP2;
            updateFn(prev => ({ ...prev, skipTurn: false }));
            setTurn(prev => prev === 1 ? 2 : 1);
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, [turn, gameMode, winner, isRolling, modalState.isOpen, p1, p2, addLog]);

  const toggleMode = () => {
    const newMode = gameMode === 'AI' ? 'PVP' : 'AI';
    setGameMode(newMode);
    setP2(prev => ({
      ...prev,
      isAi: newMode === 'AI',
      name: newMode === 'AI' ? "CPU Bot" : (prev.name === "CPU Bot" ? "Player 2" : prev.name)
    }));
  };

  const changeMap = (mapId: string) => {
    const newMap = Object.values(MAPS).find(m => m.id === mapId) || MAPS.australia;
    setActiveMap(newMap);
    resetGame(newMap); 
  };

  const goToNextMap = () => {
    const currentIndex = MAP_ORDER.indexOf(activeMap.id);
    const nextIndex = (currentIndex + 1) % MAP_ORDER.length;
    const nextMapId = MAP_ORDER[nextIndex];
    const nextMap = (MAPS as any)[nextMapId] || MAPS.australia;
    setActiveMap(nextMap);
    resetGame(nextMap);
  };
  
  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setP1({ ...INITIAL_PLAYER_1 });
    setP2({ 
      ...INITIAL_PLAYER_2, 
      name: mode === 'AI' ? "CPU Bot" : "Player 2",
      isAi: mode === 'AI'
    });
    setLogs([]);
    setWinner(null);
    setTurn(1);
    addLog('log_start', {}, 'info');
  };

  const resetGame = (newMap?: TrackDefinition) => {
    if (!gameMode) return; 
    setTurn(1);
    setP1({ ...INITIAL_PLAYER_1, name: p1.name });
    setP2({ 
        ...INITIAL_PLAYER_2,
        name: p2.name, 
        isAi: p2.isAi
    });
    setWinner(null);
    setLogs([]);
    setModalState({ isOpen: false, type: 'DICE' });
    if(newMap) setActiveMap(newMap);
    addLog('log_start', {}, 'info');
  };

  const processRollResult = (roll: number) => {
    const currentPlayer = turn === 1 ? p1 : p2;
    const result = calculateMove(currentPlayer, roll, activeMap, totalLaps);
    addLog(result.translationKey, result.logArgs, result.logType);
    setPendingUpdate({
      playerId: turn,
      landedPosition: result.landedPosition,
      finalPosition: result.newPosition,
      newLaps: result.newLaps,
      extraTurn: result.extraTurn,
      skipTurn: result.skipTurn,
      consecutiveSixes: result.consecutiveSixes,
      eventKey: result.eventKey
    });
    setModalState({
      isOpen: true,
      type: 'DICE',
      rollValue: roll,
      eventKey: result.eventKey
    });
  };

  const handleModalClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    if (!pendingUpdate) return;
    if (modalState.type === 'DICE') {
      const updateFn = pendingUpdate.playerId === 1 ? setP1 : setP2;
      updateFn(prev => ({
          ...prev,
          position: pendingUpdate.landedPosition,
          lastRoll: modalState.rollValue || prev.lastRoll,
          consecutiveSixes: pendingUpdate.consecutiveSixes
      }));
      
      // If Engine Failure, skip animation delays and go straight to event
      if (pendingUpdate.eventKey === 'ENGINE_FAILURE') {
         setModalState({ isOpen: true, type: 'EVENT', eventKey: 'ENGINE_FAILURE' });
         return;
      }

      const currentPos = pendingUpdate.playerId === 1 ? p1.position : p2.position;
      let distance = Math.abs(pendingUpdate.landedPosition - currentPos);
      if (pendingUpdate.landedPosition < currentPos) {
          distance = (activeMap.totalCells - currentPos) + pendingUpdate.landedPosition;
      }
      const animationDelay = (distance * 200) + 400;
      const isSpecialEvent = modalState.eventKey && modalState.eventKey !== 'NORMAL_MOVE' && modalState.eventKey !== 'LAP_COMPLETE';
      if (isSpecialEvent) {
        setTimeout(() => {
            setModalState({ isOpen: true, type: 'EVENT', eventKey: modalState.eventKey });
        }, animationDelay);
      } else {
        setTimeout(() => { finishTurnLogic(); }, animationDelay);
      }
    } 
    else if (modalState.type === 'EVENT') {
       if (pendingUpdate.eventKey === 'ENGINE_FAILURE') {
            // Instant Loss Logic
            finishTurnLogic();
            return;
       }

       const updateFn = pendingUpdate.playerId === 1 ? setP1 : setP2;
       updateFn(prev => ({
           ...prev,
           position: pendingUpdate.finalPosition,
           laps: pendingUpdate.newLaps
       }));
       setTimeout(() => { finishTurnLogic(); }, 500); 
    }
  };

  const finishTurnLogic = () => {
    if (!pendingUpdate) return;
    const { playerId, newLaps, skipTurn, extraTurn, eventKey } = pendingUpdate;

    if (eventKey === 'ENGINE_FAILURE') {
        // Player 1 blew up? Player 2 wins.
        setWinner(playerId === 1 ? 2 : 1);
        setIsRolling(false);
        setPendingUpdate(null);
        return;
    }

    const updateFn = playerId === 1 ? setP1 : setP2;
    updateFn(prev => ({
        ...prev,
        position: pendingUpdate.finalPosition,
        laps: pendingUpdate.newLaps,
        skipTurn: skipTurn
    }));
    
    if (newLaps > totalLaps) setWinner(playerId);
    else if (!extraTurn) setTurn(prev => prev === 1 ? 2 : 1);
    setIsRolling(false);
    setPendingUpdate(null);
  };

  const performRoll = useCallback(() => {
    if (winner || isRolling) return;
    const currentPlayer = turn === 1 ? p1 : p2;
    if (currentPlayer.skipTurn) return;

    if (manualDiceEnabled && !currentPlayer.isAi) {
      setModalState({ isOpen: true, type: 'MANUAL_INPUT' });
      return;
    }

    setIsRolling(true);
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      processRollResult(roll);
    }, 500);
  }, [winner, isRolling, turn, p1, p2, activeMap, totalLaps, manualDiceEnabled]);

  useEffect(() => {
    if (gameMode === 'AI' && turn === 2 && !winner && !isRolling && !modalState.isOpen) {
      if (!p2.skipTurn) {
          const timer = setTimeout(() => { performRoll(); }, 1500);
          return () => clearTimeout(timer);
      }
    }
  }, [turn, gameMode, winner, isRolling, performRoll, modalState.isOpen, p2.skipTurn]);

  return {
    gameMode,
    toggleMode,
    activeMap,
    changeMap,
    goToNextMap,
    turn,
    p1,
    p2,
    winner,
    logs,
    isRolling,
    startGame,
    resetGame,
    performRoll,
    processRollResult,
    updatePlayerName: (id: PlayerId, name: string) => id === 1 ? setP1(p => ({...p, name})) : setP2(p => ({...p, name})),
    updatePlayerColor: (id: PlayerId, idx: number) => {
      const c = AVAILABLE_COLORS[idx];
      const u = (p: PlayerState) => ({...p, color: c.tailwind, borderColor: c.border, hexColor: c.hex, hexBorderColor: c.borderHex});
      if (id === 1) setP1(u); else setP2(u);
    },
    modalState,
    handleModalClose,
    totalLaps,
    changeTotalLaps: setTotalLaps,
    manualDiceEnabled,
    setManualDiceEnabled
  };
}