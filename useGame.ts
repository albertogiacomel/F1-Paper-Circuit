
import { useState, useEffect, useCallback } from 'react';
import { PlayerId, GameMode, PlayerState, GameLog, EventKey, TranslationKey, TrackDefinition } from './types/index';
import { INITIAL_PLAYER_1, INITIAL_PLAYER_2, AVAILABLE_COLORS, DEFAULT_LAPS, MAP_ORDER } from './config/constants';
import { MAPS } from './config/maps/index';
import { calculateMove } from './gameEngine';

const STORAGE_KEY = 'f1_paper_save_v2'; // Bumped version for new schema

interface SavedState {
  gameMode: GameMode;
  activeMapId: string;
  turn: PlayerId;
  p1: PlayerState;
  p2: PlayerState;
  winner: PlayerId | null;
  logs: GameLog[];
  totalLaps: number;
}

export function useGame() {
  // Initialize State from LocalStorage if available
  const [initialized, setInitialized] = useState(false);

  const [activeMap, setActiveMap] = useState<TrackDefinition>(MAPS.australia);
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [turn, setTurn] = useState<PlayerId>(1);
  const [p1, setP1] = useState<PlayerState>(INITIAL_PLAYER_1);
  const [p2, setP2] = useState<PlayerState>(INITIAL_PLAYER_2);
  const [winner, setWinner] = useState<PlayerId | null>(null);
  const [logs, setLogs] = useState<GameLog[]>([]);
  const [totalLaps, setTotalLaps] = useState<number>(DEFAULT_LAPS);
  
  const [isRolling, setIsRolling] = useState(false);

  // Modal States
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'DICE' | 'EVENT';
    eventKey?: EventKey;
    rollValue?: number;
  }>({ isOpen: false, type: 'DICE' });

  // Pending updates (applied in steps)
  const [pendingUpdate, setPendingUpdate] = useState<{
    playerId: PlayerId;
    landedPosition: number;
    finalPosition: number;
    newLaps: number;
    extraTurn: boolean;
    skipTurn: boolean;
  } | null>(null);

  const addLog = useCallback((key: TranslationKey, args: Record<string, string|number> = {}, type: GameLog['type'] = 'info') => {
    setLogs(prev => [...prev, { 
        id: Math.random().toString(36), 
        translationKey: key, 
        args, 
        type 
    }]);
  }, []);

  // LOAD GAME ON MOUNT
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: SavedState = JSON.parse(saved);
        // @ts-ignore
        const map = Object.values(MAPS).find(m => m.id === parsed.activeMapId) || MAPS.australia;
        setActiveMap(map);
        setGameMode(parsed.gameMode);
        setTurn(parsed.turn);
        setP1(parsed.p1);
        setP2(parsed.p2);
        setWinner(parsed.winner);
        setLogs(parsed.logs);
        setTotalLaps(parsed.totalLaps || DEFAULT_LAPS);
      } catch (e) {
        console.error("Failed to load save", e);
      }
    }
    setInitialized(true);
  }, []);

  // SAVE GAME ON CHANGE
  useEffect(() => {
    if (!initialized) return;
    
    // Don't save if in main menu
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
      totalLaps
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [gameMode, activeMap, turn, p1, p2, winner, logs, totalLaps, initialized]);

  // HANDLE SKIP TURN LOGIC
  useEffect(() => {
    if (!gameMode || winner || isRolling || modalState.isOpen) return;

    const currentPlayer = turn === 1 ? p1 : p2;
    
    if (currentPlayer.skipTurn) {
        // Player must skip this turn
        const timer = setTimeout(() => {
            addLog('log_skip_turn', { player: currentPlayer.name }, 'warning');
            
            // Remove skip flag
            const updateFn = turn === 1 ? setP1 : setP2;
            updateFn(prev => ({ ...prev, skipTurn: false }));

            // Switch turn immediately
            setTurn(prev => prev === 1 ? 2 : 1);
        }, 1000);

        return () => clearTimeout(timer);
    }
  }, [turn, gameMode, winner, isRolling, modalState.isOpen, p1, p2, addLog]);


  const changeMap = (mapId: string) => {
    // @ts-ignore
    const newMap = Object.values(MAPS).find(m => m.id === mapId) || MAPS.australia;
    setActiveMap(newMap);
    // When changing map explicitly, we reset the game state
    resetGame(newMap); 
  };

  const goToNextMap = () => {
    const currentIndex = MAP_ORDER.indexOf(activeMap.id);
    const nextIndex = (currentIndex + 1) % MAP_ORDER.length;
    const nextMapId = MAP_ORDER[nextIndex];
    // @ts-ignore
    const nextMap = MAPS[nextMapId] || MAPS.australia;
    setActiveMap(nextMap);
    resetGame(nextMap);
  };
  
  const changeTotalLaps = (laps: number) => {
      setTotalLaps(laps);
  };

  const updatePlayerName = (id: PlayerId, newName: string) => {
    if (id === 1) {
      setP1(prev => ({ ...prev, name: newName }));
    } else {
      setP2(prev => ({ ...prev, name: newName }));
    }
  };

  const updatePlayerColor = (id: PlayerId, colorIndex: number) => {
    const newColor = AVAILABLE_COLORS[colorIndex];
    if (!newColor) return;

    const updater = (prev: PlayerState) => ({
      ...prev,
      color: newColor.tailwind,
      borderColor: newColor.border,
      hexColor: newColor.hex,
      hexBorderColor: newColor.borderHex
    });

    if (id === 1) setP1(updater);
    else setP2(updater);
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
    const mapToUse = newMap || activeMap;
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

  const handleModalClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));

    if (!pendingUpdate) return;

    if (modalState.type === 'DICE') {
      const updateFn = pendingUpdate.playerId === 1 ? setP1 : setP2;
      updateFn(prev => ({
          ...prev,
          position: pendingUpdate.landedPosition,
          lastRoll: modalState.rollValue || prev.lastRoll
      }));

      const currentPos = pendingUpdate.playerId === 1 ? p1.position : p2.position;
      let distance = Math.abs(pendingUpdate.landedPosition - currentPos);
      if (pendingUpdate.landedPosition < currentPos) {
          distance = (activeMap.totalCells - currentPos) + pendingUpdate.landedPosition;
      }
      
      const animationDelay = (distance * 200) + 400;

      const isSpecialEvent = modalState.eventKey && modalState.eventKey !== 'NORMAL_MOVE' && modalState.eventKey !== 'LAP_COMPLETE';

      if (isSpecialEvent) {
        setTimeout(() => {
            setModalState({
                isOpen: true,
                type: 'EVENT',
                eventKey: modalState.eventKey
            });
        }, animationDelay);
      } else {
        setTimeout(() => {
             finishTurnLogic();
        }, animationDelay);
      }
    } 
    else if (modalState.type === 'EVENT') {
       // Visual update to final pos (e.g., danger zone back move)
       const updateFn = pendingUpdate.playerId === 1 ? setP1 : setP2;
       updateFn(prev => ({
           ...prev,
           position: pendingUpdate.finalPosition,
           laps: pendingUpdate.newLaps
       }));
       
       setTimeout(() => {
           finishTurnLogic();
       }, 500); 
    }
  };

  const finishTurnLogic = () => {
    if (!pendingUpdate) return;
    const { playerId, newLaps, extraTurn, skipTurn } = pendingUpdate;

    const updateFn = playerId === 1 ? setP1 : setP2;
    updateFn(prev => ({
        ...prev,
        position: pendingUpdate.finalPosition,
        laps: pendingUpdate.newLaps,
        skipTurn: skipTurn // Apply skip turn flag if caught in pit
    }));

    if (newLaps > totalLaps) {
        setWinner(playerId);
    } else if (!extraTurn) {
        setTurn(prev => prev === 1 ? 2 : 1);
    }
    // If extraTurn is true (e.g., specific event), turn stays same. 
    // BUT: Pit Stop is now skipTurn, so extraTurn is false, turn switches to opponent.
    
    setIsRolling(false);
    setPendingUpdate(null);
  };

  const performRoll = useCallback(() => {
    if (winner || isRolling) return;
    
    const currentPlayer = turn === 1 ? p1 : p2;
    
    // Safety check: if skipping turn, we shouldn't be here, but just in case
    if (currentPlayer.skipTurn) return;

    setIsRolling(true);

    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      const result = calculateMove(currentPlayer, roll, activeMap, totalLaps);

      addLog(result.translationKey, result.logArgs, result.logType);

      setPendingUpdate({
        playerId: turn,
        landedPosition: result.landedPosition,
        finalPosition: result.newPosition,
        newLaps: result.newLaps,
        extraTurn: result.extraTurn,
        skipTurn: result.skipTurn
      });

      setModalState({
        isOpen: true,
        type: 'DICE',
        rollValue: roll,
        eventKey: result.eventKey
      });

    }, 500);
  }, [winner, isRolling, turn, p1, p2, addLog, activeMap, totalLaps]);

  // AI Logic
  useEffect(() => {
    if (gameMode === 'AI' && turn === 2 && !winner && !isRolling && !modalState.isOpen) {
      // AI check for skip turn is handled by the general useEffect above
      // If not skipping, perform roll
      if (!p2.skipTurn) {
          const timer = setTimeout(() => {
            performRoll();
          }, 1500);
          return () => clearTimeout(timer);
      }
    }
  }, [turn, gameMode, winner, isRolling, performRoll, modalState.isOpen, p2.skipTurn]);

  return {
    gameMode,
    activeMap,
    changeMap,
    goToNextMap, // Exported
    turn,
    p1,
    p2,
    winner,
    logs,
    isRolling,
    startGame,
    resetGame,
    performRoll,
    updatePlayerName,
    updatePlayerColor,
    modalState,
    handleModalClose,
    totalLaps,
    changeTotalLaps
  };
}
