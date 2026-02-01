import { createTrack } from './tracks_utils';
export const SILVERSTONE = createTrack(
    'silverstone', 'Silverstone Circuit',
    `M 100,600 L 500,600 C 650,600 700,500 650,400 C 600,300 800,200 900,300 C 1050,450 1150,300 1050,150 L 800,50 C 600,50 450,150 400,300 L 300,500 C 250,600 100,750 100,600 Z`,
    60, [58], [15, 16, 35, 36, 52, 53], [5, 6, 7, 25, 26, 27, 42, 43, 44], true
);