import { createTrack } from './tracks_utils';
export const JAPAN = createTrack(
    'japan', 'Suzuka Circuit',
    `M 200,400 
     C 400,400 600,100 800,100 
     C 1000,100 1100,300 900,500 
     C 700,700 500,800 300,800 
     C 100,800 0,600 200,400 Z`,
    60, [58], [52, 53, 54, 55, 56], // DRS zona traguardo
    [5, 6, 7, 22, 23, 24, 40, 41, 42], // Pericoli: S-Curves, Degner, 130R
    true
);