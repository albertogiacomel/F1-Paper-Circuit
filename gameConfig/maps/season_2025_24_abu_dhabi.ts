import { createTrack } from './tracks_utils';

export const ABU_DHABI = createTrack(
    'abu_dhabi', 
    'Yas Marina Circuit',
    // Layout "a serpente" pulito senza incroci: 
    // Rettilineo box -> Curva 1 -> Lungo Rettilineo 1 -> Chicane -> Lungo Rettilineo 2 -> Settore Hotel
    `M 100,100 
     L 900,100 
     C 1050,100 1050,300 900,300 
     L 400,300 
     C 300,300 300,500 400,500 
     L 900,500 
     C 1050,500 1050,700 900,700 
     L 100,700 
     C 0,700 0,100 100,100 Z`,
    60, 
    [58],
    // DRS ricalibrato sui segmenti rettilinei L
    // Rettilineo 1: 5-12, Rettilineo 2: 25-32, Rettilineo Arrivo: 50-55
    [6, 7, 8, 26, 27, 28, 51, 52, 53], 
    // Pericoli limitati a blocchi di 3 nelle chicane/curve C
    // Turn 1: 15-17, Chicane centrale: 35-37, Hotel: 43-45, Ultima curva: 57-59
    [15, 16, 17, 35, 36, 37, 43, 44, 45, 57, 59], 
    true
);