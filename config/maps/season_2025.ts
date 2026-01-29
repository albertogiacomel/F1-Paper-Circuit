import { TrackDefinition } from '../../types/index';

// 1. AUSTRALIA
export const AUSTRALIA: TrackDefinition = {
  id: 'australia',
  name: 'Australia GP',
  totalCells: 41,
  pitStops: [39],
  dangerZones: [7, 19, 35],
  drsZones: [1, 2, 3, 15, 16, 31, 32],
  path: [
    {x:8,y:20},{x:10,y:20},{x:12,y:20},{x:14,y:20},{x:16,y:20}, 
    {x:18,y:19},{x:19,y:17},{x:18,y:15}, 
    {x:16,y:14},{x:14,y:15},{x:12,y:14}, 
    {x:11,y:12},{x:12,y:10},{x:14,y:8},{x:16,y:7},{x:18,y:7},{x:20,y:8},{x:22,y:9}, 
    {x:23,y:11},{x:23,y:13},{x:23,y:15}, 
    {x:22,y:17},{x:24,y:18},{x:26,y:17}, 
    {x:27,y:15},{x:27,y:13},{x:26,y:11},{x:24,y:9}, 
    {x:22,y:7},{x:20,y:6},{x:18,y:5}, 
    {x:16,y:5},{x:14,y:6},{x:12,y:7}, 
    {x:10,y:8},{x:8,y:9},{x:6,y:11}, 
    {x:5,y:13},{x:5,y:15},{x:5,y:17}, 
    {x:6,y:19} 
  ]
};

// 2. CHINA (Shanghai International Circuit)
export const CHINA: TrackDefinition = {
  id: 'china',
  name: 'China GP',
  totalCells: 48,
  pitStops: [46],
  dangerZones: [12, 19, 37],
  drsZones: [1, 2, 3, 29, 30, 31, 32, 33, 34, 35],
  path: [
    {x:12,y:24}, {x:14,y:24}, {x:16,y:24}, {x:18,y:24}, {x:20,y:24}, // Main Straight
    {x:22,y:23}, {x:23,y:21}, {x:23,y:19}, {x:22,y:17}, {x:20,y:16}, // T1 Entry & Snail Top
    {x:18,y:16}, {x:17,y:18}, {x:16,y:20}, // Snail Tightening
    {x:14,y:19}, {x:12,y:18}, {x:10,y:17}, {x:8,y:16}, // Exit Snail & Sector 2
    {x:6,y:15}, {x:5,y:13}, {x:6,y:11}, {x:8,y:11}, // T6 Hairpin
    {x:10,y:11}, {x:12,y:10}, {x:14,y:9}, {x:16,y:9}, // S-Bends
    {x:15,y:7}, {x:14,y:5}, // T11-13
    {x:16,y:4}, {x:18,y:4}, {x:20,y:4}, {x:22,y:4}, {x:24,y:4}, {x:26,y:4}, {x:28,y:4}, {x:30,y:4}, {x:32,y:4}, // Back Straight
    {x:33,y:6}, {x:33,y:8}, {x:31,y:9}, // T14 Hairpin
    {x:29,y:10}, {x:27,y:12}, {x:25,y:14}, {x:23,y:16}, {x:21,y:18}, {x:19,y:20}, {x:17,y:22}, {x:15,y:23}, {x:13,y:24} // Return
  ]
};

// 3. JAPAN
export const JAPAN: TrackDefinition = {
  id: 'japan',
  name: 'Japan GP',
  totalCells: 42,
  pitStops: [40],
  dangerZones: [8, 22, 38],
  drsZones: [1, 2, 39, 40],
  path: [
    {x:8,y:16},{x:10,y:16},{x:12,y:16},{x:14,y:16}, 
    {x:16,y:15},{x:17,y:13},{x:16,y:11}, 
    {x:14,y:10},{x:12,y:9},{x:10,y:10}, 
    {x:8,y:11},{x:6,y:10},{x:6,y:8}, 
    {x:7,y:6},{x:9,y:5},{x:11,y:5}, 
    {x:13,y:6},{x:15,y:7}, 
    {x:16,y:9}, 
    {x:17,y:11},{x:19,y:11},{x:20,y:9}, 
    {x:19,y:7},{x:17,y:7},{x:16,y:6}, 
    {x:18,y:5},{x:20,y:4},{x:22,y:3}, 
    {x:24,y:4},{x:24,y:6},{x:22,y:7}, 
    {x:20,y:8},{x:18,y:10}, 
    {x:16,y:12},{x:14,y:12},{x:12,y:12}, 
    {x:10,y:13},{x:8,y:14},{x:6,y:15}, 
    {x:4,y:16},{x:5,y:18},{x:7,y:17} 
  ]
};

// 4. BAHRAIN
export const BAHRAIN: TrackDefinition = {
  id: 'bahrain',
  name: 'Bahrain GP',
  totalCells: 37,
  pitStops: [35],
  dangerZones: [6, 18, 28],
  drsZones: [2, 3, 13, 14, 24, 25],
  path: [
    {x:8,y:18},{x:10,y:18},{x:12,y:18},{x:14,y:18}, 
    {x:16,y:17},{x:17,y:15},{x:16,y:13}, 
    {x:14,y:12},{x:12,y:11},{x:10,y:11}, 
    {x:8,y:10},{x:9,y:8},{x:11,y:7}, 
    {x:13,y:6},{x:15,y:6},{x:17,y:7}, 
    {x:18,y:9},{x:17,y:11},{x:16,y:12}, 
    {x:18,y:13},{x:20,y:12},{x:22,y:11}, 
    {x:23,y:9},{x:22,y:7},{x:20,y:5}, 
    {x:18,y:4},{x:16,y:3},{x:14,y:3},{x:12,y:3}, 
    {x:10,y:4},{x:8,y:5},{x:6,y:7}, 
    {x:5,y:9},{x:4,y:11},{x:4,y:13}, 
    {x:5,y:15},{x:6,y:17} 
  ]
};

// 5. SAUDI ARABIA
export const SAUDI_ARABIA: TrackDefinition = {
  id: 'saudi',
  name: 'Saudi Arabia GP',
  totalCells: 37,
  pitStops: [35],
  dangerZones: [8, 26, 30],
  drsZones: [2, 3, 18, 19, 36],
  path: [
    {x:10,y:20},{x:10,y:18},{x:10,y:16},{x:10,y:14}, 
    {x:9,y:12},{x:7,y:11},{x:5,y:10}, 
    {x:6,y:8},{x:8,y:7},{x:10,y:7}, 
    {x:12,y:8},{x:14,y:9},{x:16,y:10}, 
    {x:18,y:11},{x:20,y:12},{x:22,y:13}, 
    {x:24,y:12},{x:25,y:10},{x:24,y:8}, 
    {x:22,y:6},{x:20,y:5},{x:18,y:4}, 
    {x:16,y:3},{x:14,y:2},{x:12,y:2},{x:10,y:2}, 
    {x:8,y:3},{x:6,y:4},{x:4,y:6}, 
    {x:4,y:8},{x:5,y:10},{x:5,y:12}, 
    {x:4,y:14},{x:3,y:16},{x:4,y:18}, 
    {x:6,y:19},{x:8,y:20} 
  ]
};

// 6. MIAMI
export const MIAMI: TrackDefinition = {
  id: 'miami',
  name: 'Miami GP',
  totalCells: 36,
  pitStops: [34],
  dangerZones: [6, 18, 28],
  drsZones: [1, 2, 14, 15, 29],
  path: [
    {x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14},{x:16,y:14}, 
    {x:18,y:13},{x:19,y:11},{x:18,y:9}, 
    {x:16,y:8},{x:14,y:7},{x:12,y:6},{x:10,y:6}, 
    {x:8,y:6},{x:6,y:7},{x:5,y:9}, 
    {x:6,y:11},{x:8,y:12},{x:10,y:12},{x:12,y:12},{x:14,y:12},{x:16,y:12}, 
    {x:18,y:13},{x:19,y:15},{x:18,y:17}, 
    {x:16,y:18},{x:14,y:18},{x:12,y:18},{x:10,y:18}, 
    {x:8,y:18},{x:6,y:17},{x:4,y:16},{x:3,y:14}, 
    {x:3,y:12},{x:4,y:10},{x:6,y:11}, 
    {x:7,y:13} 
  ]
};

// 7. IMOLA
export const IMOLA: TrackDefinition = {
  id: 'imola',
  name: 'Emilia Romagna GP',
  totalCells: 40,
  pitStops: [38],
  dangerZones: [6, 17, 31],
  drsZones: [1, 2, 12, 13, 33],
  path: [
    {x:6,y:14},{x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14},{x:16,y:14}, 
    {x:18,y:13},{x:19,y:11},{x:18,y:9},{x:16,y:8}, 
    {x:14,y:7},{x:12,y:6},{x:10,y:6},{x:9,y:7}, 
    {x:8,y:9},{x:8,y:11},{x:7,y:12}, 
    {x:5,y:12},{x:3,y:11},{x:3,y:9},{x:4,y:7}, 
    {x:5,y:6},{x:7,y:5},{x:9,y:4},{x:11,y:3}, 
    {x:13,y:3},{x:15,y:3},{x:17,y:4}, 
    {x:19,y:6},{x:20,y:8},{x:19,y:10}, 
    {x:18,y:12},{x:16,y:13},{x:14,y:13},{x:12,y:13}, 
    {x:10,y:13},{x:8,y:13},{x:7,y:14} 
  ]
};

// 8. MONACO
export const MONACO: TrackDefinition = {
  id: 'monaco',
  name: 'Monaco GP',
  totalCells: 29,
  pitStops: [27],
  dangerZones: [5, 12, 18],
  drsZones: [1],
  path: [
    {x:10,y:16},{x:12,y:16},{x:14,y:16}, 
    {x:16,y:15},{x:17,y:13},{x:16,y:11}, 
    {x:14,y:10},{x:12,y:9},{x:10,y:9}, 
    {x:9,y:7},{x:8,y:9},{x:9,y:11}, 
    {x:11,y:12},{x:13,y:12},{x:15,y:12}, 
    {x:17,y:12},{x:19,y:12}, 
    {x:20,y:14},{x:18,y:15},{x:16,y:15}, 
    {x:14,y:14},{x:12,y:14},{x:10,y:13}, 
    {x:8,y:13},{x:6,y:14},{x:6,y:16}, 
    {x:7,y:18},{x:9,y:18}, 
    {x:10,y:17} 
  ]
};

// 9. SPAIN
export const SPAIN: TrackDefinition = {
  id: 'spain',
  name: 'Spain GP',
  totalCells: 28,
  pitStops: [26],
  dangerZones: [6, 14, 21],
  drsZones: [1, 2, 17, 18],
  path: [
    {x:6,y:14},{x:8,y:14},{x:10,y:14},{x:12,y:14}, 
    {x:14,y:13},{x:15,y:11},{x:14,y:9}, 
    {x:12,y:8},{x:10,y:7},{x:8,y:6}, 
    {x:6,y:7},{x:5,y:9},{x:7,y:10}, 
    {x:9,y:11},{x:11,y:11},{x:13,y:12}, 
    {x:15,y:12},{x:17,y:12},{x:19,y:12}, 
    {x:21,y:13},{x:20,y:15},{x:18,y:16}, 
    {x:16,y:17},{x:14,y:17},{x:12,y:16}, 
    {x:10,y:15},{x:8,y:15},{x:6,y:15} 
  ]
};

// 10. CANADA
export const CANADA: TrackDefinition = {
  id: 'canada',
  name: 'Canada GP',
  totalCells: 33,
  pitStops: [31],
  dangerZones: [6, 18, 28],
  drsZones: [2, 12, 23, 24],
  path: [
    {x:10,y:12},{x:12,y:12},{x:14,y:12}, 
    {x:15,y:10},{x:14,y:8},{x:12,y:7}, 
    {x:10,y:6},{x:8,y:6},{x:6,y:7}, 
    {x:5,y:9},{x:7,y:10},{x:9,y:10}, 
    {x:11,y:9},{x:13,y:8},{x:15,y:7}, 
    {x:17,y:6},{x:19,y:5},{x:20,y:3}, 
    {x:18,y:2},{x:16,y:2},{x:14,y:3}, 
    {x:16,y:4},{x:18,y:4},{x:20,y:4},{x:22,y:4}, 
    {x:24,y:5},{x:23,y:7},{x:21,y:8}, 
    {x:19,y:9},{x:17,y:10},{x:15,y:11}, 
    {x:13,y:12},{x:11,y:12} 
  ]
};

// 11. AUSTRIA
export const AUSTRIA: TrackDefinition = {
  id: 'austria',
  name: 'Austria GP',
  totalCells: 26,
  pitStops: [24],
  dangerZones: [5, 12, 20],
  drsZones: [1, 2, 6, 7, 10, 11],
  path: [
    {x:4,y:14},{x:6,y:14},{x:8,y:14},{x:10,y:14},{x:12,y:14}, 
    {x:14,y:13},{x:14,y:11},{x:14,y:9},{x:14,y:7}, 
    {x:15,y:6},{x:17,y:5},{x:19,y:4},{x:21,y:4}, 
    {x:22,y:6},{x:22,y:8},{x:22,y:10},{x:21,y:12}, 
    {x:20,y:14},{x:18,y:15},{x:16,y:16}, 
    {x:14,y:16},{x:12,y:16},{x:10,y:16},{x:8,y:16}, 
    {x:6,y:16},{x:5,y:15} 
  ]
};

// 12. SILVERSTONE
export const SILVERSTONE: TrackDefinition = {
  id: 'silverstone',
  name: 'Silverstone GP',
  totalCells: 42,
  pitStops: [40],
  dangerZones: [9, 21, 33],
  drsZones: [1, 2, 17, 18, 30],
  path: [
    {x:10,y:14},{x:12,y:14},{x:14,y:14}, 
    {x:16,y:13},{x:17,y:11},{x:16,y:9}, 
    {x:14,y:9},{x:12,y:10},{x:10,y:11}, 
    {x:8,y:10},{x:9,y:8},{x:11,y:7}, 
    {x:13,y:6},{x:15,y:5},{x:17,y:4}, 
    {x:19,y:4},{x:18,y:2},{x:16,y:2}, 
    {x:14,y:3},{x:13,y:5},{x:15,y:6}, 
    {x:17,y:7},{x:19,y:8},{x:21,y:9}, 
    {x:22,y:10},{x:20,y:11},{x:18,y:10}, 
    {x:17,y:8},{x:19,y:6},{x:21,y:5}, 
    {x:23,y:5},{x:24,y:7},{x:23,y:9}, 
    {x:22,y:11},{x:22,y:13},{x:21,y:15}, 
    {x:19,y:16},{x:17,y:15},{x:15,y:14}, 
    {x:13,y:15},{x:12,y:17},{x:11,y:15} 
  ]
};

// 13. SPA
export const SPA: TrackDefinition = {
  id: 'spa',
  name: 'Spa-Francorchamps',
  totalCells: 39,
  pitStops: [37],
  dangerZones: [5, 15, 29],
  drsZones: [2, 11, 12, 34],
  path: [
    {x:4,y:12},{x:6,y:12},{x:8,y:12}, 
    {x:9,y:14},{x:8,y:16},{x:7,y:14}, 
    {x:8,y:13},{x:10,y:11},{x:12,y:9}, 
    {x:14,y:7},{x:16,y:5},{x:18,y:3}, 
    {x:20,y:2},{x:22,y:2},{x:24,y:2}, 
    {x:26,y:3},{x:25,y:5},{x:23,y:6}, 
    {x:22,y:8},{x:23,y:10},{x:22,y:12}, 
    {x:20,y:13},{x:18,y:12},{x:16,y:12}, 
    {x:14,y:12},{x:12,y:13},{x:10,y:13}, 
    {x:8,y:12},{x:6,y:11},{x:5,y:9}, 
    {x:6,y:7},{x:8,y:6},{x:10,y:5}, 
    {x:12,y:6},{x:11,y:8},{x:10,y:6}, 
    {x:8,y:5},{x:6,y:5},{x:4,y:6} 
  ]
};

// 14. HUNGARY
export const HUNGARY: TrackDefinition = {
  id: 'hungary',
  name: 'Hungary GP',
  totalCells: 30,
  pitStops: [28],
  dangerZones: [6, 15, 24],
  drsZones: [1, 2, 10],
  path: [
    {x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14}, 
    {x:16,y:13},{x:17,y:11},{x:16,y:9}, 
    {x:14,y:8},{x:12,y:7},{x:10,y:7}, 
    {x:8,y:6},{x:6,y:6},{x:5,y:8}, 
    {x:6,y:10},{x:8,y:10},{x:10,y:11}, 
    {x:12,y:11},{x:13,y:10},{x:13,y:8}, 
    {x:12,y:6},{x:10,y:6},{x:9,y:8}, 
    {x:8,y:9},{x:6,y:10},{x:4,y:11}, 
    {x:3,y:13},{x:4,y:15},{x:6,y:15}, 
    {x:7,y:14},{x:7,y:12} 
  ]
};

// 15. ZANDVOORT
export const ZANDVOORT: TrackDefinition = {
  id: 'zandvoort',
  name: 'Zandvoort GP',
  totalCells: 30,
  pitStops: [28],
  dangerZones: [5, 12, 22],
  drsZones: [1, 10, 27],
  path: [
    {x:8,y:12},{x:10,y:12},{x:12,y:12}, 
    {x:14,y:11},{x:15,y:9},{x:14,y:7}, 
    {x:12,y:6},{x:10,y:5},{x:8,y:4}, 
    {x:6,y:4},{x:4,y:5},{x:4,y:7}, 
    {x:6,y:8},{x:8,y:9},{x:10,y:9}, 
    {x:12,y:9},{x:14,y:8},{x:16,y:7}, 
    {x:18,y:7},{x:19,y:9},{x:18,y:11}, 
    {x:16,y:12},{x:14,y:13},{x:12,y:14}, 
    {x:11,y:16},{x:13,y:17},{x:15,y:17}, 
    {x:17,y:16},{x:18,y:14},{x:16,y:13} 
  ]
};

// 16. ITALY (Monza)
export const ITALY: TrackDefinition = {
  id: 'italy',
  name: 'Monza GP',
  totalCells: 32,
  pitStops: [30],
  dangerZones: [6, 12, 22],
  drsZones: [1, 2, 3, 24, 25],
  path: [
    {x:8,y:22},{x:10,y:22},{x:12,y:22},{x:14,y:22},{x:16,y:22}, 
    {x:18,y:21},{x:18,y:19}, // T1 Chicane
    {x:19,y:17},{x:21,y:15},{x:22,y:13}, // Curva Grande
    {x:21,y:11},{x:19,y:10},{x:17,y:10}, // Roggia
    {x:15,y:9},{x:14,y:7}, // Lesmo 1
    {x:14,y:5},{x:16,y:4}, // Lesmo 2
    {x:18,y:4},{x:20,y:4},{x:22,y:4}, // Serraglio
    {x:24,y:5},{x:25,y:7},{x:24,y:9}, // Ascari
    {x:24,y:11},{x:24,y:13},{x:24,y:15}, // Back Straight
    {x:23,y:17},{x:21,y:19},{x:18,y:20},{x:15,y:21},{x:12,y:21},{x:9,y:21} // Parabolica
  ]
};

// 17. AZERBAIJAN
export const AZERBAIJAN: TrackDefinition = {
  id: 'azerbaijan',
  name: 'Baku GP',
  totalCells: 34,
  pitStops: [32],
  dangerZones: [6, 14, 25],
  drsZones: [1, 2, 29, 30],
  path: [
    {x:8,y:18},{x:10,y:18},{x:12,y:18},{x:14,y:18}, 
    {x:16,y:17},{x:16,y:15},{x:16,y:13}, 
    {x:14,y:12},{x:12,y:12},{x:10,y:12}, 
    {x:8,y:11},{x:6,y:10},{x:6,y:8}, 
    {x:7,y:7},{x:9,y:6},{x:7,y:6}, 
    {x:5,y:6},{x:4,y:8},{x:3,y:10}, 
    {x:4,y:12},{x:6,y:13},{x:8,y:13}, 
    {x:10,y:14},{x:12,y:15},{x:14,y:16}, 
    {x:16,y:17},{x:16,y:19},{x:14,y:20}, 
    {x:12,y:21},{x:10,y:22},{x:8,y:22},{x:6,y:21}, 
    {x:5,y:19},{x:6,y:18} 
  ]
};

// 18. SINGAPORE
export const SINGAPORE: TrackDefinition = {
  id: 'singapore',
  name: 'Singapore GP',
  totalCells: 30,
  pitStops: [28],
  dangerZones: [6, 17, 24],
  drsZones: [1, 2, 13],
  path: [
    {x:10,y:16},{x:12,y:16},{x:14,y:16}, 
    {x:16,y:15},{x:15,y:13},{x:13,y:12}, 
    {x:11,y:11},{x:10,y:9},{x:11,y:7}, 
    {x:13,y:6},{x:15,y:6},{x:17,y:7}, 
    {x:18,y:9},{x:17,y:11},{x:15,y:12}, 
    {x:17,y:13},{x:19,y:14},{x:21,y:13}, 
    {x:23,y:11},{x:22,y:9},{x:20,y:8}, 
    {x:18,y:8},{x:16,y:9},{x:14,y:10}, 
    {x:12,y:11},{x:10,y:12},{x:8,y:13}, 
    {x:6,y:14},{x:7,y:16},{x:9,y:16} 
  ]
};

// 19. USA
export const USA: TrackDefinition = {
  id: 'usa',
  name: 'USA GP',
  totalCells: 31,
  pitStops: [29],
  dangerZones: [5, 15, 25],
  drsZones: [1, 2, 18, 19],
  path: [
    {x:8,y:16},{x:10,y:16},{x:12,y:16}, 
    {x:13,y:14},{x:12,y:12},{x:10,y:11}, 
    {x:8,y:10},{x:9,y:8},{x:11,y:7}, 
    {x:13,y:6},{x:15,y:5},{x:17,y:6}, 
    {x:18,y:8},{x:17,y:10},{x:18,y:12}, 
    {x:20,y:12},{x:22,y:12},{x:24,y:12},{x:26,y:12}, 
    {x:27,y:14},{x:25,y:16},{x:23,y:16}, 
    {x:21,y:17},{x:19,y:17},{x:17,y:17}, 
    {x:15,y:17},{x:13,y:16},{x:11,y:15}, 
    {x:9,y:16},{x:7,y:17},{x:6,y:18} 
  ]
};

// 20. MEXICO
export const MEXICO: TrackDefinition = {
  id: 'mexico',
  name: 'Mexico GP',
  totalCells: 32,
  pitStops: [30],
  dangerZones: [8, 17, 26],
  drsZones: [1, 2, 3, 14, 15],
  path: [
    {x:6,y:14},{x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14},{x:16,y:14}, 
    {x:18,y:13},{x:19,y:11},{x:18,y:9}, 
    {x:16,y:9},{x:14,y:10},{x:12,y:11}, 
    {x:10,y:10},{x:9,y:8},{x:10,y:6}, 
    {x:12,y:5},{x:14,y:5},{x:16,y:6}, 
    {x:18,y:7},{x:19,y:9},{x:18,y:11}, 
    {x:17,y:13},{x:16,y:15},{x:18,y:16}, 
    {x:20,y:17},{x:18,y:19},{x:16,y:19}, 
    {x:14,y:18},{x:12,y:17},{x:10,y:16}, 
    {x:8,y:15},{x:6,y:14} 
  ]
};

// 21. BRAZIL
export const BRAZIL: TrackDefinition = {
  id: 'brazil',
  name: 'Brazil GP',
  totalCells: 30,
  pitStops: [28],
  dangerZones: [6, 14, 24],
  drsZones: [1, 2, 11, 28],
  path: [
    {x:14,y:6},{x:12,y:7},{x:10,y:8}, 
    {x:9,y:10},{x:8,y:12},{x:10,y:13}, 
    {x:12,y:14},{x:14,y:14},{x:16,y:13}, 
    {x:18,y:12},{x:20,y:11},{x:22,y:10}, 
    {x:21,y:8},{x:19,y:7},{x:17,y:8}, 
    {x:16,y:10},{x:14,y:11},{x:12,y:12}, 
    {x:13,y:14},{x:15,y:13},{x:17,y:12}, 
    {x:18,y:10},{x:20,y:9},{x:21,y:11}, 
    {x:20,y:13},{x:18,y:13},{x:16,y:11}, 
    {x:15,y:9},{x:15,y:7},{x:15,y:5} 
  ]
};

// 22. LAS VEGAS
export const LAS_VEGAS: TrackDefinition = {
  id: 'las_vegas',
  name: 'Las Vegas GP',
  totalCells: 31,
  pitStops: [29],
  dangerZones: [7, 18, 27],
  drsZones: [1, 2, 14, 15, 16],
  path: [
    {x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14}, 
    {x:16,y:13},{x:17,y:11},{x:16,y:9}, 
    {x:14,y:8},{x:12,y:8},{x:10,y:8}, 
    {x:8,y:7},{x:6,y:6},{x:5,y:4}, 
    {x:7,y:3},{x:9,y:3},{x:11,y:3},{x:13,y:3},{x:15,y:3},{x:17,y:3},{x:19,y:3},{x:21,y:3}, 
    {x:23,y:4},{x:24,y:6},{x:23,y:8}, 
    {x:21,y:9},{x:19,y:10},{x:17,y:11}, 
    {x:15,y:12},{x:13,y:13},{x:11,y:14}, 
    {x:9,y:14}
  ]
};

// 23. QATAR
export const QATAR: TrackDefinition = {
  id: 'qatar',
  name: 'Qatar GP',
  totalCells: 28,
  pitStops: [26],
  dangerZones: [5, 15, 23],
  drsZones: [1, 2],
  path: [
    {x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14}, 
    {x:16,y:13},{x:17,y:11},{x:16,y:9}, 
    {x:14,y:8},{x:12,y:8},{x:10,y:9}, 
    {x:8,y:10},{x:6,y:9},{x:6,y:7}, 
    {x:7,y:5},{x:9,y:4},{x:11,y:4}, 
    {x:13,y:5},{x:15,y:6},{x:17,y:7}, 
    {x:19,y:8},{x:20,y:10},{x:19,y:12}, 
    {x:17,y:13},{x:15,y:13},{x:13,y:13}, 
    {x:11,y:12},{x:9,y:12},{x:7,y:13} 
  ]
};

// 24. ABU DHABI
export const ABU_DHABI: TrackDefinition = {
  id: 'abu_dhabi',
  name: 'Abu Dhabi GP',
  totalCells: 29,
  pitStops: [27],
  dangerZones: [6, 16, 24],
  drsZones: [1, 2, 10, 11],
  path: [
    {x:8,y:6},{x:10,y:6},{x:12,y:6}, 
    {x:14,y:7},{x:15,y:9},{x:14,y:11}, 
    {x:12,y:12},{x:10,y:13},{x:8,y:14}, 
    {x:6,y:15},{x:8,y:17},{x:10,y:18}, 
    {x:12,y:19},{x:14,y:20},{x:16,y:20}, 
    {x:18,y:19},{x:19,y:17},{x:20,y:15}, 
    {x:21,y:13},{x:21,y:11},{x:21,y:9}, 
    {x:20,y:7},{x:18,y:6},{x:16,y:5}, 
    {x:14,y:4},{x:12,y:4},{x:10,y:4}, 
    {x:8,y:5},{x:6,y:5} 
  ]
};