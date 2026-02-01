import { MoveResult, PlayerState, TrackDefinition } from '../types/index';

/**
 * Calculates the outcome of a dice roll based on game rules with LAP logic.
 */
export const calculateMove = (
  currentPlayer: PlayerState, 
  roll: number,
  track: TrackDefinition,
  totalRaceLaps: number
): MoveResult => {
  // Use the defined total cells from config
  const trackLength = track.totalCells;
  
  // Calculate raw position (can be greater than trackLength)
  const rawLandedPosition = currentPlayer.position + roll;
  
  // Calculate Laps gained during this move
  const lapsGained = Math.floor(rawLandedPosition / trackLength);
  
  // Normalize position to track coordinates (0 to trackLength-1)
  const landedPosition = rawLandedPosition % trackLength;
  
  // Calculate tentative new lap count
  let newLaps = currentPlayer.laps + lapsGained;
  
  let newPosition = landedPosition;
  
  // Base log info
  let translationKey: MoveResult['translationKey'] = 'log_roll';
  const logArgs: MoveResult['logArgs'] = {
      player: currentPlayer.name,
      roll: roll
  };
  
  let logType: MoveResult['logType'] = 'info';
  let extraTurn = false;
  let skipTurn = false; 
  let eventKey: MoveResult['eventKey'] = 'NORMAL_MOVE';
  
  // RULE: Consecutive Sixes Logic
  let consecutiveSixes = currentPlayer.consecutiveSixes || 0;
  
  if (roll === 6) {
      consecutiveSixes++;
      extraTurn = true;
      translationKey = 'log_roll_6';
      logType = 'success';

      // ENGINE BLOWN RULE
      if (consecutiveSixes >= 3) {
          return {
              landedPosition: currentPlayer.position, 
              newPosition: currentPlayer.position,
              newLaps: currentPlayer.laps,
              rollValue: roll,
              translationKey: 'log_engine_failure',
              logArgs: { player: currentPlayer.name },
              logType: 'danger',
              extraTurn: false,
              skipTurn: true,
              eventKey: 'ENGINE_FAILURE',
              consecutiveSixes: consecutiveSixes
          };
      }
  } else {
      consecutiveSixes = 0;
  }

  // 1. CHECK WIN CONDITION (Completed required laps)
  if (newLaps > totalRaceLaps) {
    return {
      landedPosition: landedPosition,
      newPosition: landedPosition,
      newLaps: newLaps,
      rollValue: roll,
      translationKey: 'log_finish',
      logArgs: { player: currentPlayer.name },
      logType: 'success',
      extraTurn: false, 
      skipTurn: false,
      eventKey: 'FINISH',
      consecutiveSixes
    };
  }
  
  // 1.5 Check Lap Complete (but not race finish)
  if (lapsGained > 0) {
      if (translationKey !== 'log_roll_6') {
        translationKey = 'log_lap_complete';
        logType = 'success';
      }
      eventKey = 'LAP_COMPLETE';
      logArgs['lap'] = newLaps;
  }

  // 2. Check Special Tiles based on LANDED position (Wrapped)
  if (track.pitStops.includes(landedPosition)) {
    translationKey = 'log_pitstop';
    logType = 'warning'; 
    extraTurn = false; 
    skipTurn = true; 
    eventKey = 'PIT_STOP';
    
  } else if (track.dangerZones.includes(landedPosition)) {
    translationKey = 'log_danger';
    logType = 'danger';
    
    let backPos = landedPosition - 1;
    if (backPos < 0) {
        backPos = trackLength - 1; 
    }
    newPosition = backPos;
    eventKey = 'DANGER_ZONE';

  } else if (track.drsZones && track.drsZones.includes(landedPosition)) {
    translationKey = 'log_drs';
    logType = 'success'; 
    
    let drsPos = landedPosition + 2;
    if (drsPos >= trackLength) {
        drsPos = drsPos % trackLength;
        newLaps += 1;
        if (newLaps > totalRaceLaps) {
            eventKey = 'FINISH';
            translationKey = 'log_finish';
            extraTurn = false;
        }
    }
    newPosition = drsPos;
    if (eventKey !== 'FINISH') eventKey = 'DRS_ZONE';
  }

  return {
    landedPosition,
    newPosition,
    newLaps,
    rollValue: roll,
    translationKey,
    logArgs,
    logType,
    extraTurn,
    skipTurn,
    eventKey,
    consecutiveSixes
  };
};