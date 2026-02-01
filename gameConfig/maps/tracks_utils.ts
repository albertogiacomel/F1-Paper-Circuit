
import { TrackDefinition } from '../../types/index';

export const createTrack = (
  id: string, 
  name: string, 
  svgPath: string, 
  totalCells: number,
  pitStops: number[],
  dangerZones: number[],
  drsZones: number[],
  complete: boolean = false
): TrackDefinition => ({
  id,
  name,
  totalCells,
  path: [], 
  svgPath,
  pitStops,
  dangerZones,
  drsZones,
  complete
});

export const PLACEHOLDER_PATH = 'M 100,500 A 400,400 0 1,0 900,500 A 400,400 0 1,0 100,500 Z';
