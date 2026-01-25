
import { MoveResult, PlayerState, TrackDefinition } from './types/index';

/**
 * Calculates the outcome of a dice roll based on game rules with LAP logic.
 */
export const calculateMove = (
  currentPlayer: PlayerState, 
  roll: number,
  track: TrackDefinition,
  totalRaceLaps: number
): MoveResult => {
  // Use the actual path length
  const trackLength = track.path.length;
  
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

  // RULE: Roll 6 = Extra Turn (Initial Check)
  if (roll === 6) {
      extraTurn = true;
      translationKey = 'log_roll_6';
      logType = 'success';
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
      extraTurn: false, // Win cancels extra turn
      skipTurn: false,
      eventKey: 'FINISH'
    };
  }
  
  // 1.5 Check Lap Complete (but not race finish)
  if (lapsGained > 0) {
      // Don't overwrite log if it was a 6, unless it's a critical lap update?
      // Actually, let's keep the "Roll 6" log as priority if it happened, 
      // or combine them. For simplicity, we prioritize the Roll 6 message if present,
      // but update the event key.
      if (translationKey !== 'log_roll_6') {
        translationKey = 'log_lap_complete';
        logType = 'success';
      }
      eventKey = 'LAP_COMPLETE';
      logArgs['lap'] = newLaps;
  }

  // 2. Check Special Tiles based on LANDED position (Wrapped)
  if (track.pitStops.includes(landedPosition)) {
    // Pit Stop Logic: Stop for a turn
    translationKey = 'log_pitstop';
    logType = 'warning'; 
    extraTurn = false; // Penalty overrides the 6 rule!
    skipTurn = true; 
    eventKey = 'PIT_STOP';
    
  } else if (track.dangerZones.includes(landedPosition)) {
    // Danger Zone Logic
    translationKey = 'log_danger';
    logType = 'danger';
    
    // Move BACK logic with wrapping
    let backPos = landedPosition - 1;
    if (backPos < 0) {
        backPos = trackLength - 1; 
    }
    newPosition = backPos;
    eventKey = 'DANGER_ZONE';
    // If you rolled a 6 but hit danger, you usually still get the extra turn 
    // unless the game is very punitive. Let's keep extraTurn = true if roll was 6.

  } else if (track.drsZones && track.drsZones.includes(landedPosition)) {
    // DRS Zone Logic - Boost Forward
    translationKey = 'log_drs';
    logType = 'success'; 
    
    // Boost movement by 2
    let drsPos = landedPosition + 2;
    // Check if DRS pushes across finish line
    if (drsPos >= trackLength) {
        drsPos = drsPos % trackLength;
        if (drsPos < landedPosition) { // Wrapped around
             newLaps += 1;
             if (newLaps > totalRaceLaps) {
                 eventKey = 'FINISH';
                 translationKey = 'log_finish';
                 extraTurn = false; // Win cancels extra turn
             }
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
    eventKey
  };
};
