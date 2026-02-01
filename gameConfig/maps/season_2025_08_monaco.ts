import { createTrack } from './tracks_utils';
export const MONACO = createTrack(
    'monaco', 'Circuit de Monaco',
    `M 100,600 L 500,600 C 650,600 700,450 600,350 C 500,250 550,100 750,100 C 950,100 950,300 800,400 L 600,500 L 400,300 C 300,150 100,200 100,400 Z`,
    60, [55], [52, 53, 54], // Unico mini-rettilineo
    [2, 3, 4, 18, 19, 20, 42, 43, 44], 
    true
);