import { createTrack } from './tracks_utils';
export const SAUDI_ARABIA = createTrack(
    'saudi', 'Jeddah Corniche Circuit',
    `M 300,900 
     C 200,800 400,700 300,600 
     C 200,500 400,400 300,300 
     C 250,100 750,100 700,300 
     C 600,400 800,500 700,600 
     C 600,700 800,800 700,900 
     C 700,1000 300,1000 300,900 Z`,
    60, [58], [10, 11, 12, 35, 36, 37, 52, 53, 54], 
    [4, 5, 6, 22, 23, 24, 45, 46, 47], 
    true
);