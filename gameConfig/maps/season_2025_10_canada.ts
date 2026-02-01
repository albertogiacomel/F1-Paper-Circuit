import { createTrack } from './tracks_utils';
export const CANADA = createTrack(
    'canada', 'Circuit Gilles Villeneuve',
    `M 200,800 L 500,800 C 650,800 700,700 600,600 L 700,500 C 750,450 750,350 700,300 L 1000,300 C 1150,300 1150,600 1000,600 L 400,600 C 250,600 150,750 200,800 Z`,
    60, [58], [12, 13, 14, 32, 33, 34, 54, 55, 56], 
    [5, 6, 7, 22, 23, 24, 50, 51, 52], 
    true
);