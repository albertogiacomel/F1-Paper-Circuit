import { TrackDefinition } from '../../types/index';

// 1. AUSTRALIA (Albert Park) - Rivisto con curve più fluide
export const AUSTRALIA: TrackDefinition = {
  id: 'australia',
  name: 'Australia GP',
  totalCells: 24,
  pitStops: [23],
  dangerZones: [4, 12, 19],
  drsZones: [1, 2, 8, 9, 22],
  path: [
    {x:4,y:12},{x:6,y:12},{x:8,y:12},{x:10,y:12}, // Main Straight (4 cells)
    {x:12,y:11},{x:13,y:9},{x:14,y:7}, // T1-2 smooth curve
    {x:15,y:6},{x:17,y:6},{x:19,y:6}, // Fast section (Lakeside)
    {x:20,y:8},{x:20,y:10},{x:20,y:12},{x:20,y:14}, // Back Straight
    {x:19,y:15},{x:17,y:16}, // Fast chicane entry
    {x:15,y:16},{x:13,y:15},{x:11,y:14},{x:9,y:13},{x:7,y:13}, // Slow section curve
    {x:5,y:12},{x:4,y:12} // Finish
  ]
};

// 2. CHINA (Shanghai) - Increased length, Snail Curve più fedele
export const CHINA: TrackDefinition = {
  id: 'china',
  name: 'China GP',
  totalCells: 48,
  pitStops: [44],
  dangerZones: [5, 20, 38],
  drsZones: [26, 27, 28, 29, 30, 31, 1, 2, 3, 45, 46, 47],
  path: [
    {x:4,y:4},{x:6,y:4},{x:8,y:4},{x:10,y:4}, // Start
    {x:12,y:5},{x:13,y:7},{x:12,y:9},{x:10,y:9}, // Snail Curve (T1-4)
    {x:9,y:7},{x:8,y:9},{x:8,y:11},{x:9,y:13},
    {x:11,y:14},{x:13,y:15},{x:15,y:15},{x:17,y:14},
    {x:18,y:12},{x:19,y:10},{x:18,y:8},{x:16,y:7},{x:18,y:6}, // Hairpin entry
    {x:20,y:6},{x:22,y:8},{x:23,y:10},{x:23,y:12},{x:23,y:14},{x:23,y:16}, // MASSIVE BACK STRAIGHT
    {x:21,y:17},{x:19,y:16},{x:17,y:14},{x:15,y:12},{x:13,y:10},
    {x:11,y:8},{x:9,y:6},{x:7,y:4},{x:5,y:3},{x:3,y:4}
  ]
};

// 3. JAPAN (Suzuka) - Figure 8 con S-Curves iconiche
export const JAPAN: TrackDefinition = {
  id: 'japan',
  name: 'Japan GP',
  totalCells: 46,
  pitStops: [42],
  dangerZones: [8, 17, 34],
  drsZones: [1, 2, 3, 23, 24, 25, 26, 40, 41],
  path: [
    {x:4,y:10},{x:6,y:10},{x:8,y:10},{x:10,y:10}, // Start
    {x:12,y:9},{x:13,y:7},{x:12,y:5},{x:10,y:4}, // S-Curves (Dunlop section)
    {x:8,y:5},{x:9,y:7},{x:11,y:8},{x:13,y:8},
    {x:15,y:8},{x:17,y:7},{x:18,y:5},{x:17,y:3}, // Degner
    {x:15,y:2},{x:13,y:2},{x:11,y:3},{x:9,y:4}, // Under crossover
    {x:8,y:6},{x:9,y:8},{x:11,y:9},{x:13,y:9}, // Hairpin transition
    {x:15,y:9},{x:17,y:8},{x:19,y:7},{x:20,y:5},{x:21,y:3}, // Spoon curve
    {x:21,y:5},{x:20,y:7},{x:18,y:9},{x:16,y:10}, // Back Straight (Over crossover)
    {x:14,y:11},{x:12,y:12},{x:10,y:13},{x:8,y:12},{x:6,y:11},{x:4,y:10}
  ]
};

// 4. BAHRAIN - Turn 1 più marcato, back straight esteso
export const BAHRAIN: TrackDefinition = {
  id: 'bahrain',
  name: 'Bahrain GP',
  totalCells: 44,
  pitStops: [26],
  dangerZones: [4, 16, 34],
  drsZones: [6, 7, 8, 9, 21, 22, 23, 24, 36, 37, 38],
  path: [
    {x:4,y:12},{x:6,y:12},{x:8,y:12},{x:10,y:12},{x:12,y:12},{x:14,y:12}, // Main Straight
    {x:16,y:11},{x:17,y:9},{x:16,y:7}, // Turn 1 (marked danger)
    {x:14,y:6},{x:12,y:6},{x:10,y:6},{x:9,y:5}, // Switchback section
    {x:11,y:4},{x:13,y:3},{x:15,y:3},{x:17,y:4}, // High speed
    {x:18,y:6},{x:18,y:8},{x:19,y:10},{x:21,y:10}, // Mid sector
    {x:23,y:9},{x:23,y:7},{x:23,y:5},{x:21,y:2},{x:19,y:2},{x:17,y:2},{x:15,y:2},{x:13,y:2},{x:11,y:2}, // Back Straight
    {x:9,y:3},{x:7,y:4},{x:5,y:5},{x:4,y:7},{x:4,y:9},{x:3,y:11},{x:4,y:12}
  ]
};

// 5. SAUDI ARABIA (Jeddah) - Fast flowing, straights highlighted
export const SAUDI_ARABIA: TrackDefinition = {
  id: 'saudi',
  name: 'Saudi Arabia GP',
  totalCells: 48,
  pitStops: [44],
  dangerZones: [8, 22, 36],
  drsZones: [2, 3, 4, 15, 16, 17, 27, 28, 29, 41, 42],
  path: [
    {x:10,y:16},{x:10,y:14},{x:10,y:12},{x:10,y:10}, // Main Straight
    {x:8,y:9},{x:6,y:8},{x:4,y:7}, // T1 complex (danger)
    {x:5,y:5},{x:7,y:4},{x:9,y:4},{x:11,y:4}, // Fast section 1
    {x:13,y:5},{x:14,y:7},{x:13,y:9},{x:12,y:11}, // Mid straight section
    {x:14,y:12},{x:16,y:11},{x:18,y:10},{x:20,y:10}, // Flowing transitions
    {x:21,y:8},{x:21,y:6},{x:20,y:4},{x:18,y:3}, // Back straight
    {x:16,y:2},{x:14,y:2},{x:12,y:2},{x:10,y:2}, // Top section (danger)
    {x:8,y:3},{x:6,y:5},{x:6,y:7},{x:8,y:8}
  ]
};

// 6. MIAMI - Technical stadium section
export const MIAMI: TrackDefinition = {
  id: 'miami',
  name: 'Miami GP',
  totalCells: 42,
  pitStops: [37],
  dangerZones: [7, 24],
  drsZones: [1, 2, 3, 15, 16, 17, 18, 30, 31, 32],
  path: [
    {x:8,y:12},{x:10,y:12},{x:12,y:12},{x:14,y:12}, // Start
    {x:16,y:11},{x:17,y:9},{x:16,y:7}, // Stadium section (danger)
    {x:14,y:6},{x:12,y:6},{x:10,y:6},{x:8,y:6}, // Technical infield
    {x:6,y:7},{x:6,y:9},{x:8,y:10}, // Quick transition
    {x:10,y:11},{x:12,y:10},{x:14,y:10},{x:16,y:10}, // Back straight 1
    {x:18,y:11},{x:19,y:13},{x:18,y:15}, // Hairpin (danger)
    {x:16,y:16},{x:14,y:16},{x:12,y:16},{x:10,y:16},{x:8,y:16}, // Long straight
    {x:6,y:15},{x:6,y:13},{x:7,y:11}
  ]
};

// 7. IMOLA (Emilia Romagna) - Iconic corners detailed
export const IMOLA: TrackDefinition = {
  id: 'imola',
  name: 'Emilia Romagna GP',
  totalCells: 44,
  pitStops: [40],
  dangerZones: [6, 16, 27],
  drsZones: [1, 2, 3, 12, 13, 14, 31, 32],
  path: [
    {x:10,y:12},{x:12,y:12},{x:14,y:12},{x:16,y:12}, // Main (Tamburello approach)
    {x:18,y:11},{x:19,y:9},{x:18,y:7}, // Tamburello (danger)
    {x:16,y:6},{x:14,y:5},{x:12,y:4}, // Villeneuve section
    {x:10,y:5},{x:10,y:7},{x:10,y:9}, // Piratella
    {x:8,y:10},{x:6,y:11},{x:4,y:10}, // Acque Minerali-Alta transitions
    {x:4,y:8},{x:6,y:6},{x:8,y:5},{x:10,y:4}, // Rivazza complex
    {x:12,y:3},{x:14,y:2},{x:16,y:2},{x:18,y:3},{x:20,y:4},{x:21,y:6}
  ]
};

// 8. MONACO - Slow technical, iconic corners
export const MONACO: TrackDefinition = {
  id: 'monaco',
  name: 'Monaco GP',
  totalCells: 40,
  pitStops: [21],
  dangerZones: [8, 16, 27, 34],
  drsZones: [1, 2, 3],
  path: [
    {x:12,y:14},{x:14,y:14},{x:16,y:13},{x:17,y:11}, // Start (Casino-Loews)
    {x:16,y:9},{x:14,y:8},{x:12,y:7},{x:10,y:6}, // Loews corner (danger)
    {x:9,y:4},{x:8,y:6},{x:7,y:8},{x:9,y:9}, // Hairpin section (danger)
    {x:11,y:10},{x:13,y:11},{x:15,y:11},{x:17,y:11}, // Tunnel approach (danger)
    {x:19,y:12},{x:19,y:14},{x:17,y:15}, // Portier transition
    {x:15,y:15},{x:13,y:15},{x:11,y:14},{x:9,y:13}, // Tabac-Swimming Pool
    {x:7,y:12},{x:6,y:14},{x:8,y:15},{x:10,y:16},{x:12,y:16},{x:14,y:16}
  ]
};

// 9. SPAIN (Barcelona) - Technical high-speed
export const SPAIN: TrackDefinition = {
  id: 'spain',
  name: 'Spain GP',
  totalCells: 42,
  pitStops: [37],
  dangerZones: [5, 21],
  drsZones: [1, 2, 3, 4, 16, 17, 18, 19],
  path: [
    {x:6,y:14},{x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14}, // Main
    {x:16,y:13},{x:17,y:11},{x:16,y:9}, // T1 (Turns 1-3, danger)
    {x:14,y:8},{x:12,y:7},{x:10,y:6},{x:8,y:6}, // Technical section
    {x:6,y:7},{x:6,y:9},{x:8,y:10}, // Campsa corner
    {x:10,y:11},{x:12,y:12},{x:14,y:12},{x:16,y:12}, // Back Straight
    {x:17,y:14},{x:16,y:16},{x:14,y:16}, // Stadium turn (danger)
    {x:12,y:16},{x:10,y:15},{x:8,y:15},{x:6,y:14}
  ]
};

// 10. CANADA (Montreal) - Senna S iconic
export const CANADA: TrackDefinition = {
  id: 'canada',
  name: 'Canada GP',
  totalCells: 40,
  pitStops: [37],
  dangerZones: [6, 30],
  drsZones: [1, 2, 24, 25, 26, 27, 32, 33, 34],
  path: [
    {x:10,y:12},{x:12,y:12},{x:14,y:12}, // Start
    {x:15,y:10},{x:14,y:8},{x:12,y:7}, // Senna S (danger)
    {x:10,y:6},{x:8,y:6},{x:6,y:7},{x:6,y:9}, // Chicane transitions
    {x:8,y:10},{x:10,y:11},{x:12,y:11}, // Between sections
    {x:14,y:10},{x:16,y:9},{x:18,y:8}, // Bridge section
    {x:19,y:6},{x:18,y:4},{x:16,y:3}, // Hairpin (danger)
    {x:14,y:3},{x:16,y:4},{x:18,y:4},{x:20,y:4},{x:22,y:4}, // CASINO STRAIGHT
    {x:24,y:5},{x:24,y:7},{x:22,y:9},{x:20,y:10},{x:18,y:11}
  ]
};

// 11. AUSTRIA (Red Bull Ring) - 3 defined straights
export const AUSTRIA: TrackDefinition = {
  id: 'austria',
  name: 'Austria GP',
  totalCells: 38,
  pitStops: [32],
  dangerZones: [4, 13, 24],
  drsZones: [1, 2, 3, 8, 9, 10, 11, 16, 17, 18],
  path: [
    {x:6,y:14},{x:8,y:14},{x:10,y:14},{x:12,y:14}, // Main (danger)
    {x:14,y:12},{x:14,y:10},{x:14,y:8},{x:14,y:6}, // Uphill straight (DRS)
    {x:15,y:4},{x:17,y:4},{x:18,y:6}, // Remus section (danger)
    {x:18,y:8},{x:18,y:10},{x:18,y:12},{x:18,y:14}, // Downhill straight (DRS)
    {x:17,y:15},{x:15,y:15},{x:13,y:15},{x:11,y:15},{x:9,y:15},{x:7,y:14}
  ]
};

// 12. SILVERSTONE (UK) - Copse + Maggotts-Becketts flow
export const SILVERSTONE: TrackDefinition = {
  id: 'silverstone',
  name: 'British GP',
  totalCells: 46,
  pitStops: [30],
  dangerZones: [6, 20, 36],
  drsZones: [14, 15, 16, 17, 31, 32, 33, 34, 3, 4, 5],
  path: [
    {x:10,y:12},{x:12,y:12},{x:14,y:12}, // Main (danger)
    {x:16,y:11},{x:17,y:9},{x:16,y:7}, // Copse complex
    {x:14,y:6},{x:12,y:6},{x:10,y:7},{x:9,y:9}, // Maggotts-Becketts flow
    {x:7,y:8},{x:6,y:6},{x:6,y:4},{x:8,y:2},{x:10,y:2},{x:12,y:2},{x:14,y:2}, // Woodcote valley
    {x:16,y:3},{x:18,y:4},{x:20,y:5},{x:21,y:7}, // Back straight (DRS)
    {x:21,y:9},{x:20,y:11},{x:19,y:9},{x:18,y:7}, // Club chicane complex
    {x:18,y:9},{x:18,y:11},{x:18,y:13},{x:18,y:15}, // Farm curve section
    {x:16,y:16},{x:14,y:16},{x:12,y:15},{x:11,y:13}
  ]
};

// 13. SPA (Belgium) - Eau Rouge iconic + Mulsanne
export const SPA: TrackDefinition = {
  id: 'spa',
  name: 'Belgian GP',
  totalCells: 50,
  pitStops: [25],
  dangerZones: [4, 17, 32, 47],
  drsZones: [10, 11, 12, 13, 14, 15, 39, 40, 41, 42, 47, 48],
  path: [
    {x:4,y:10},{x:6,y:10}, // Approach
    {x:7,y:12},{x:8,y:14},{x:9,y:12}, // EAU ROUGE (danger - iconic)
    {x:11,y:10},{x:13,y:8},{x:15,y:6},{x:17,y:4},{x:19,y:2}, // Long climb
    {x:21,y:3},{x:22,y:5},{x:21,y:7}, // Raidillon descent
    {x:20,y:9},{x:19,y:11},{x:18,y:13}, // Les Combes section (danger)
    {x:16,y:13},{x:14,y:12},{x:12,y:11},{x:10,y:11}, // Technical middle
    {x:8,y:10},{x:6,y:9},{x:4,y:8},{x:3,y:6}, // Mulsanne approach (DRS)
    {x:4,y:4},{x:6,y:4},{x:6,y:6},{x:5,y:8}
  ]
};

// 14. HUNGARY (Hungaroring) - Technical chicane focused
export const HUNGARY: TrackDefinition = {
  id: 'hungary',
  name: 'Hungary GP',
  totalCells: 40,
  pitStops: [37],
  dangerZones: [5, 19, 32],
  drsZones: [1, 2, 3, 37, 38, 39],
  path: [
    {x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14}, // Main
    {x:16,y:12},{x:16,y:10},{x:14,y:9}, // T1 (danger)
    {x:12,y:8},{x:10,y:7},{x:8,y:6},{x:6,y:6}, // Technical section
    {x:5,y:8},{x:7,y:9},{x:9,y:10}, // Chicane complex (danger)
    {x:11,y:11},{x:13,y:11},{x:15,y:11}, // Mid-section straights
    {x:16,y:13},{x:14,y:14},{x:12,y:14}
  ]
};

// 15. ZANDVOORT (Netherlands) - Banked corners
export const ZANDVOORT: TrackDefinition = {
  id: 'netherlands',
  name: 'Dutch GP',
  totalCells: 40,
  pitStops: [36],
  dangerZones: [4, 16, 30],
  drsZones: [1, 2, 13, 14, 36, 37, 38],
  path: [
    {x:8,y:12},{x:10,y:12},{x:12,y:12}, // Main
    {x:14,y:11},{x:15,y:9},{x:14,y:7}, // Tarzan (danger)
    {x:12,y:6},{x:10,y:6},{x:8,y:5}, // Hugenholtz section (danger)
    {x:6,y:4},{x:4,y:4},{x:3,y:6}, // Infield turn
    {x:4,y:8},{x:6,y:9},{x:8,y:10}, // Back chicane
    {x:10,y:10},{x:12,y:10},{x:14,y:10}, // Back section (DRS)
    {x:15,y:12},{x:13,y:14},{x:11,y:14},{x:9,y:14}
  ]
};

// 16. MONZA (Italy) - HIGH SPEED, Parabolica + Variante
export const ITALY: TrackDefinition = {
  id: 'italy',
  name: 'Italian GP',
  totalCells: 43,
  pitStops: [42],
  dangerZones: [10, 18, 27, 32],
  drsZones: [1, 2, 3, 4, 19, 20, 21, 22, 36, 37, 38, 39],
  path: [
    {x:2,y:2},{x:4,y:2},{x:6,y:2},{x:8,y:2},{x:10,y:2},{x:12,y:2},{x:14,y:2},{x:16,y:2},{x:18,y:2}, // MAIN STRAIGHT (ultra-long)
    {x:19,y:4},{x:20,y:3},{x:21,y:5},{x:22,y:6}, // VARIANTE (danger - iconic chicane)
    {x:23,y:8},{x:24,y:10},{x:24,y:12}, // GRANDE CURVA (iconic)
    {x:23,y:14},{x:21,y:14},{x:20,y:16}, // ROGGIA
    {x:19,y:18},{x:21,y:19},{x:23,y:20},{x:24,y:22},{x:22,y:23}, // LESMO COMPLEX
    {x:20,y:21},{x:18,y:20},{x:16,y:19},{x:14,y:18}, // SERRAGLIO transition
    {x:12,y:17},{x:10,y:18},{x:9,y:16},{x:11,y:15},{x:13,y:14}, // ASCARI COMPLEX (danger)
    {x:14,y:12},{x:14,y:10},{x:14,y:8},{x:14,y:6}, // Long straight through middle
    {x:12,y:4},{x:10,y:4},{x:8,y:4},{x:6,y:3}, // PARABOLICA (iconic slow curve, danger)
    {x:4,y:2},{x:2,y:2}
  ]
};

// 17. AZERBAIJAN (Baku) - Castle section zig-zag
export const AZERBAIJAN: TrackDefinition = {
  id: 'azerbaijan',
  name: 'Azerbaijan GP',
  totalCells: 48,
  pitStops: [44],
  dangerZones: [10, 24, 32],
  drsZones: [1, 2, 3, 39, 40, 41, 42, 43, 44, 45, 46],
  path: [
    {x:6,y:16},{x:8,y:16},{x:10,y:16}, // Start
    {x:12,y:16},{x:12,y:14},{x:12,y:12},{x:10,y:12}, // Opening section
    {x:8,y:12},{x:6,y:12},{x:5,y:10}, // Castle approach (danger)
    {x:7,y:10},{x:7,y:8},{x:5,y:8}, // Castle zig-zag 1 (danger)
    {x:5,y:6},{x:7,y:6},{x:9,y:6}, // Castle zig-zag 2
    {x:11,y:6},{x:13,y:6},{x:15,y:6}, // Fast section
    {x:17,y:7},{x:17,y:9},{x:17,y:11},{x:17,y:13}, // Mid-track straight
    {x:16,y:15},{x:14,y:16},{x:12,y:17},{x:10,y:18}, // Finish approach (danger)
    {x:8,y:17},{x:6,y:16}
  ]
};

// 18. SINGAPORE - Night race technical
export const SINGAPORE: TrackDefinition = {
  id: 'singapore',
  name: 'Singapore GP',
  totalCells: 42,
  pitStops: [38],
  dangerZones: [8, 22, 32],
  drsZones: [1, 2, 13, 14, 15, 26, 27],
  path: [
    {x:8,y:14},{x:10,y:14},{x:12,y:14}, // Start (danger)
    {x:13,y:12},{x:11,y:11},{x:9,y:10}, // Technical section (danger)
    {x:8,y:8},{x:10,y:7},{x:12,y:6},{x:14,y:6}, // Raffles area
    {x:16,y:7},{x:16,y:9},{x:14,y:10}, // Transition
    {x:12,y:11},{x:14,y:12},{x:16,y:13}, // Anderson bridge (danger)
    {x:18,y:13},{x:20,y:13},{x:21,y:11}, // Esplanade area
    {x:20,y:9},{x:18,y:8},{x:16,y:9}
  ]
};

// 19. USA (Austin - COTA) - Esses + Hill + Stadium
export const USA: TrackDefinition = {
  id: 'usa',
  name: 'USA GP',
  totalCells: 44,
  pitStops: [40],
  dangerZones: [5, 19, 30],
  drsZones: [1, 2, 23, 24, 25, 26, 27, 41, 42],
  path: [
    {x:8,y:14},{x:10,y:14},{x:12,y:14}, // Main (danger - Turn 1 hill)
    {x:13,y:12},{x:12,y:10},{x:10,y:9}, // Turn 1 downhill
    {x:8,y:8},{x:6,y:7},{x:8,y:6},{x:10,y:5}, // Technical Esses (danger)
    {x:12,y:4},{x:14,y:4},{x:16,y:5}, // Fast section
    {x:16,y:7},{x:16,y:9},{x:16,y:11},{x:16,y:13}, // Back straight long (DRS)
    {x:15,y:15},{x:13,y:16},{x:11,y:16}, // Stadium turn (danger)
    {x:9,y:15},{x:7,y:15}
  ]
};

// 20. MEXICO - Esses + Stadium
export const MEXICO: TrackDefinition = {
  id: 'mexico',
  name: 'Mexico GP',
  totalCells: 40,
  pitStops: [37],
  dangerZones: [11, 26],
  drsZones: [1, 2, 3, 4, 16, 17, 18],
  path: [
    {x:6,y:14},{x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14}, // Main
    {x:16,y:12},{x:14,y:11},{x:12,y:10}, // Esses section (danger)
    {x:10,y:9},{x:12,y:8},{x:14,y:7}, // S-curves continuing
    {x:16,y:6},{x:18,y:6},{x:20,y:7}, // Fast flowing
    {x:21,y:9},{x:20,y:11},{x:18,y:12}, // Stadium entry (danger)
    {x:16,y:13},{x:14,y:13},{x:12,y:13}
  ]
};

// 21. BRAZIL (Interlagos) - Roller coaster elevation
export const BRAZIL: TrackDefinition = {
  id: 'brazil',
  name: 'Brazil GP',
  totalCells: 40,
  pitStops: [27],
  dangerZones: [3, 16, 32],
  drsZones: [11, 12, 13, 14, 34, 35, 36, 37, 1, 2],
  path: [
    {x:16,y:4},{x:14,y:5},{x:12,y:6}, // Start uphill
    {x:11,y:8},{x:10,y:10},{x:12,y:11}, // Downhill section (danger)
    {x:14,y:12},{x:16,y:13},{x:18,y:14}, // Uphill again
    {x:20,y:12},{x:21,y:10},{x:20,y:8}, // Roller coaster (danger)
    {x:18,y:7},{x:16,y:8},{x:15,y:10}, // Technical middle
    {x:17,y:11},{x:19,y:11},{x:21,y:11}, // Straight (DRS)
    {x:22,y:9},{x:22,y:7},{x:21,y:5},{x:19,y:4},{x:17,y:4}
  ]
};

// 22. LAS VEGAS - Long straights, futuristic
export const LAS_VEGAS: TrackDefinition = {
  id: 'las_vegas',
  name: 'Las Vegas GP',
  totalCells: 42,
  pitStops: [32],
  dangerZones: [5, 21, 37],
  drsZones: [6, 7, 8, 9, 10, 23, 24, 25, 26, 27, 28, 29],
  path: [
    {x:6,y:12},{x:8,y:12},{x:10,y:12}, // Start
    {x:11,y:10},{x:10,y:8},{x:9,y:6}, // Turn complex (danger)
    {x:11,y:6},{x:13,y:6},{x:15,y:6},{x:17,y:6},{x:19,y:6}, // Long back straight (DRS)
    {x:21,y:7},{x:21,y:9},{x:21,y:11},{x:21,y:13}, // Chicane turn section
    {x:19,y:14},{x:17,y:14},{x:15,y:14},{x:13,y:14},{x:11,y:14},{x:9,y:14}, // Long front straight (DRS)
    {x:7,y:13},{x:6,y:12}
  ]
};

// 23. QATAR (Losail) - Desert technical
export const QATAR: TrackDefinition = {
  id: 'qatar',
  name: 'Qatar GP',
  totalCells: 40,
  pitStops: [34],
  dangerZones: [8, 24],
  drsZones: [1, 2, 3, 4, 36, 37, 38, 39],
  path: [
    {x:6,y:12},{x:8,y:12},{x:10,y:12},{x:12,y:12}, // Main (DRS)
    {x:13,y:10},{x:12,y:8},{x:10,y:7}, // T1 complex (danger)
    {x:8,y:7},{x:6,y:8},{x:6,y:10}, // Slow section
    {x:8,y:11},{x:10,y:11},{x:12,y:10}, // Transition
    {x:14,y:9},{x:16,y:9},{x:18,y:10}, // Fast sections
    {x:18,y:12},{x:16,y:13},{x:14,y:14}, // Turn 3-4
    {x:12,y:14},{x:10,y:14}
  ]
};

// 24. ABU DHABI - Yas Island fast sections
export const ABU_DHABI: TrackDefinition = {
  id: 'abu_dhabi',
  name: 'Abu Dhabi GP',
  totalCells: 42,
  pitStops: [30],
  dangerZones: [8, 24, 38],
  drsZones: [11, 12, 13, 14, 25, 26, 27, 28, 1, 2, 3],
  path: [
    {x:6,y:4},{x:8,y:4},{x:10,y:4}, // Start (DRS)
    {x:12,y:5},{x:13,y:7},{x:12,y:9}, // Turn 1 (danger)
    {x:10,y:10},{x:8,y:11},{x:6,y:12}, // Mid section
    {x:8,y:13},{x:10,y:14},{x:12,y:15},{x:14,y:16},{x:16,y:16}, // Long turn
    {x:18,y:15},{x:19,y:13},{x:19,y:11},{x:19,y:9}, // Finishing area (danger)
    {x:17,y:8},{x:15,y:7},{x:13,y:6},{x:11,y:5},{x:9,y:4}
  ]
};