import { createTrack } from './tracks_utils';
export const USA = createTrack(
    'usa', 'Circuit of the Americas',
    `M 100,800 L 400,200 C 450,100 550,100 600,250 C 650,400 750,400 800,250 C 850,100 950,100 1000,250 L 1100,600 C 1150,800 900,900 700,800 L 400,800 C 250,800 100,900 100,800 Z`,
    60, [58], [12, 13, 14, 52, 53, 54], 
    [5, 6, 7, 25, 26, 27, 42, 43, 44], 
    true
);