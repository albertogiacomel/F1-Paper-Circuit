
import { TrackDefinition } from '../../types/index';

// 1. AUSTRALIA (Albert Park)
// FIX: Path length increased to 22 points to accommodate Pit Stop at index 21.
export const AUSTRALIA: TrackDefinition = {
  id: 'australia',
  name: 'Australia GP',
  totalCells: 22, 
  pitStops: [21], // End of lap (Now visible at index 21)
  dangerZones: [4, 12, 18], 
  drsZones: [1, 2, 8, 9, 20], 
  path: [
    {x:4,y:12},{x:6,y:12},{x:8,y:12},{x:10,y:12}, // Main Straight
    {x:12,y:11},{x:13,y:9}, // T1-2
    {x:14,y:7},{x:16,y:6},{x:18,y:6}, 
    {x:20,y:7},{x:20,y:9},{x:20,y:11},{x:20,y:13}, // Back Straight (Lakeside)
    {x:18,y:14},{x:16,y:15}, // Fast chicane
    {x:14,y:15},{x:12,y:15}, 
    {x:10,y:14},{x:8,y:13},{x:6,y:14}, // Slow section
    {x:4,y:14}, // ADDED: Extra corner point to make length 22
    {x:4,y:13} // Finish (Index 21 - Pit Stop here)
  ].slice(0, 22)
};

// 2. CHINA (Shanghai)
export const CHINA: TrackDefinition = {
  id: 'china',
  name: 'China GP',
  totalCells: 45,
  pitStops: [40],
  dangerZones: [5, 18, 35],
  drsZones: [25, 26, 27, 28, 29, 30, 42, 43, 44, 1], // Huge back straight + Main
  path: [
    {x:4,y:4},{x:6,y:4},{x:8,y:4},{x:10,y:4}, // Start
    {x:12,y:5},{x:13,y:7},{x:12,y:9},{x:10,y:9}, // Snail Curve (T1-4)
    {x:9,y:7},{x:8,y:9},{x:8,y:11}, 
    {x:9,y:13},{x:11,y:14},{x:13,y:15},{x:15,y:15}, 
    {x:17,y:14},{x:18,y:12},{x:19,y:10}, // Mid sector
    {x:18,y:8},{x:16,y:7},{x:18,y:6}, // Hairpin entry
    {x:20,y:6},{x:22,y:8},{x:22,y:10},{x:22,y:12},{x:22,y:14},{x:22,y:16}, // MASSIVE BACK STRAIGHT
    {x:20,y:17},{x:18,y:16},{x:16,y:14},{x:14,y:12},{x:12,y:10}, // Technical finish
    {x:10,y:8},{x:8,y:6},{x:6,y:4}
  ].slice(0, 46)
};

// 3. JAPAN (Suzuka) - Figure 8 simulated
export const JAPAN: TrackDefinition = {
  id: 'japan',
  name: 'Japan GP',
  totalCells: 44,
  pitStops: [40],
  dangerZones: [8, 16, 32],
  drsZones: [1, 2, 3, 22, 23, 24, 25, 38, 39], // Main & Back straights
  path: [
    {x:4,y:10},{x:6,y:10},{x:8,y:10},{x:10,y:10}, // Start
    {x:12,y:9},{x:13,y:7},{x:12,y:5},{x:10,y:4}, // S-Curves
    {x:8,y:5},{x:9,y:7},{x:11,y:8}, // Dunlop
    {x:13,y:8},{x:15,y:8},{x:17,y:7},{x:18,y:5}, // Degner
    {x:17,y:3},{x:15,y:3},{x:13,y:3}, // Under crossover
    {x:11,y:4},{x:9,y:5}, // Hairpin
    {x:11,y:6},{x:13,y:6},{x:15,y:6},{x:17,y:6}, // Spoon approach
    {x:19,y:5},{x:21,y:4},{x:21,y:6},{x:19,y:8}, // Spoon
    {x:17,y:9},{x:15,y:10},{x:13,y:11}, // Back Straight (Over crossover)
    {x:11,y:12},{x:9,y:13},{x:7,y:12},{x:5,y:11} // 130R & Casio Triangle
  ].slice(0, 45)
};

// 4. BAHRAIN
export const BAHRAIN: TrackDefinition = {
  id: 'bahrain',
  name: 'Bahrain GP',
  totalCells: 42,
  pitStops: [25],
  dangerZones: [4, 15, 32],
  drsZones: [6, 7, 8, 9, 20, 21, 22, 23, 35, 36, 37],
  path: [
    {x:4,y:12},{x:6,y:12},{x:8,y:12},{x:10,y:12},{x:12,y:12},{x:14,y:12}, // Main Straight
    {x:16,y:11},{x:16,y:9}, // Turn 1
    {x:14,y:8},{x:12,y:8},{x:10,y:8}, // Switchback
    {x:9,y:6},{x:11,y:5},{x:13,y:4},{x:15,y:4}, // High speed
    {x:17,y:5},{x:17,y:7},{x:18,y:9},{x:20,y:9}, // Mid sector
    {x:22,y:8},{x:22,y:6},{x:22,y:4},{x:20,y:2},{x:18,y:2},{x:16,y:2},{x:14,y:2},{x:12,y:2},{x:10,y:2}, // Back Straight
    {x:8,y:3},{x:6,y:4},{x:4,y:5}, // Final complex
    {x:4,y:7},{x:4,y:9},{x:3,y:11},{x:2,y:12},{x:3,y:13},{x:4,y:13},{x:4,y:12}
  ].slice(0, 43)
};

// 5. SAUDI ARABIA (Jeddah)
export const SAUDI_ARABIA: TrackDefinition = {
  id: 'saudi',
  name: 'Saudi Arabia GP',
  totalCells: 46,
  pitStops: [42],
  dangerZones: [8, 20, 35],
  drsZones: [2, 3, 4, 14, 15, 16, 26, 27, 28, 40, 41], // Fast flowing straights
  path: [
    {x:10,y:16},{x:10,y:14},{x:10,y:12},{x:10,y:10}, // Main Straight
    {x:8,y:9},{x:6,y:8},{x:4,y:7}, // T1 complex
    {x:5,y:5},{x:7,y:4},{x:9,y:4},{x:11,y:4}, // Fast section 1
    {x:13,y:5},{x:13,y:7},{x:13,y:9}, // Mid straight
    {x:15,y:10},{x:17,y:11},{x:19,y:11}, 
    {x:21,y:10},{x:21,y:8},{x:21,y:6}, // Back straight
    {x:19,y:5},{x:17,y:4},{x:15,y:3}, 
    {x:13,y:2},{x:11,y:2},{x:9,y:2}, // Top section
    {x:7,y:3},{x:6,y:5},{x:6,y:7},{x:8,y:8} // Hairpin back
  ].slice(0, 47)
};

// 6. MIAMI
export const MIAMI: TrackDefinition = {
  id: 'miami',
  name: 'Miami GP',
  totalCells: 40,
  pitStops: [35],
  dangerZones: [7, 22],
  drsZones: [1, 2, 3, 14, 15, 16, 17, 29, 30, 31],
  path: [
    {x:8,y:12},{x:10,y:12},{x:12,y:12},{x:14,y:12}, // Start
    {x:16,y:11},{x:16,y:9},{x:14,y:8}, // Stadium
    {x:12,y:7},{x:10,y:6},{x:8,y:6}, 
    {x:6,y:7},{x:6,y:9},{x:8,y:10}, // Technical
    {x:10,y:10},{x:12,y:10},{x:14,y:10},{x:16,y:10}, // Back straight 1
    {x:18,y:11},{x:19,y:13},{x:18,y:15}, // Hairpin
    {x:16,y:16},{x:14,y:16},{x:12,y:16},{x:10,y:16},{x:8,y:16}, // Long straight
    {x:6,y:15},{x:6,y:13} // Finish
  ].slice(0, 41)
};

// 7. EMILIA ROMAGNA (Imola)
export const IMOLA: TrackDefinition = {
  id: 'imola',
  name: 'Emilia Romagna GP',
  totalCells: 42,
  pitStops: [38],
  dangerZones: [6, 15, 25],
  drsZones: [1, 2, 3, 11, 12, 13, 30, 31],
  path: [
    {x:10,y:12},{x:12,y:12},{x:14,y:12},{x:16,y:12}, // Main
    {x:18,y:11},{x:19,y:9}, // Tamburello
    {x:18,y:7},{x:16,y:6}, // Villeneuve
    {x:14,y:5},{x:12,y:4}, // Tosa
    {x:10,y:5},{x:10,y:7},{x:10,y:9}, // Piratella
    {x:8,y:10},{x:6,y:11}, // Acque Minerali
    {x:4,y:10},{x:4,y:8}, // Alta
    {x:6,y:6},{x:8,y:5},{x:10,y:4}, // Rivazza
    {x:12,y:3},{x:14,y:2} // Final
  ].slice(0, 43)
};

// 8. MONACO
export const MONACO: TrackDefinition = {
  id: 'monaco',
  name: 'Monaco GP',
  totalCells: 38,
  pitStops: [20],
  dangerZones: [8, 15, 25, 32],
  drsZones: [1, 2, 3], // Only main straight really valid for DRS in game logic
  path: [
    {x:12,y:14},{x:14,y:14},{x:16,y:13},{x:17,y:11}, 
    {x:16,y:9},{x:14,y:8},{x:12,y:7},{x:10,y:6}, 
    {x:9,y:4},{x:8,y:6},{x:7,y:8}, 
    {x:9,y:9},{x:11,y:10}, 
    {x:13,y:11},{x:15,y:11},{x:17,y:11}, // Tunnel
    {x:19,y:12},{x:19,y:14},{x:17,y:15}, 
    {x:15,y:15},{x:13,y:15},{x:11,y:14},{x:9,y:13},{x:7,y:12},{x:6,y:14},{x:8,y:15},{x:10,y:16},{x:12,y:16},{x:14,y:16}
  ].slice(0, 39)
};

// 9. SPAIN (Barcelona)
export const SPAIN: TrackDefinition = {
  id: 'spain',
  name: 'Spain GP',
  totalCells: 40,
  pitStops: [35],
  dangerZones: [5, 20],
  drsZones: [1, 2, 3, 4, 15, 16, 17, 18], // Main & Back
  path: [
    {x:6,y:14},{x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14}, // Main
    {x:16,y:13},{x:17,y:11}, // T1
    {x:16,y:9},{x:14,y:8}, // T3
    {x:12,y:7},{x:10,y:6},{x:8,y:6}, 
    {x:6,y:7},{x:6,y:9}, // Campsa
    {x:8,y:10},{x:10,y:11},{x:12,y:12},{x:14,y:12}, // Back Straight
    {x:16,y:12},{x:17,y:14},{x:16,y:16}, // Stadium
    {x:14,y:16},{x:12,y:16},{x:10,y:15},{x:8,y:15} // Final
  ].slice(0, 41)
};

// 10. CANADA (Montreal)
export const CANADA: TrackDefinition = {
  id: 'canada',
  name: 'Canada GP',
  totalCells: 38,
  pitStops: [35],
  dangerZones: [6, 28], // Wall of Champions
  drsZones: [1, 2, 23, 24, 25, 26, 31, 32, 33], // Casino straight
  path: [
    {x:10,y:12},{x:12,y:12},{x:14,y:12}, // Start
    {x:15,y:10},{x:14,y:8}, // Senna S
    {x:12,y:7},{x:10,y:6},{x:8,y:6}, 
    {x:6,y:7},{x:6,y:9}, 
    {x:8,y:10},{x:10,y:11}, 
    {x:12,y:11},{x:14,y:10},{x:16,y:9}, // Bridge
    {x:18,y:8},{x:18,y:6}, // Hairpin entry
    {x:16,y:5},{x:14,y:5}, // Hairpin
    {x:16,y:4},{x:18,y:4},{x:20,y:4},{x:22,y:4}, // CASINO STRAIGHT
    {x:24,y:5},{x:24,y:7}, // Chicane
    {x:22,y:9},{x:20,y:10},{x:18,y:11} // Wall of champions
  ].slice(0, 39)
};

// 11. AUSTRIA (Red Bull Ring)
export const AUSTRIA: TrackDefinition = {
  id: 'austria',
  name: 'Austria GP',
  totalCells: 36,
  pitStops: [30],
  dangerZones: [4, 12, 22],
  drsZones: [1, 2, 3, 7, 8, 9, 10, 15, 16, 17], // 3 Straights
  path: [
    {x:6,y:14},{x:8,y:14},{x:10,y:14},{x:12,y:14}, // Main
    {x:14,y:12},{x:14,y:10},{x:14,y:8},{x:14,y:6}, // Uphill straight
    {x:15,y:4},{x:17,y:4}, // Remus
    {x:18,y:6},{x:18,y:8},{x:18,y:10},{x:18,y:12}, // Downhill straight
    {x:17,y:14},{x:15,y:15}, 
    {x:13,y:15},{x:11,y:15},{x:9,y:15},{x:7,y:14} // Infield
  ].slice(0, 37)
};

// 12. UK (Silverstone)
export const SILVERSTONE: TrackDefinition = {
  id: 'silverstone',
  name: 'British GP',
  totalCells: 44,
  pitStops: [28], 
  dangerZones: [6, 18, 34],
  drsZones: [13, 14, 15, 16, 30, 31, 32, 33, 3, 4, 5],
  path: [
    {x:10,y:12},{x:12,y:12},{x:14,y:12}, 
    {x:16,y:11},{x:17,y:9},{x:16,y:7}, 
    {x:14,y:6},{x:12,y:6},{x:10,y:7},{x:9,y:9}, 
    {x:7,y:8},{x:6,y:6},{x:6,y:4},{x:8,y:2},{x:10,y:2},{x:12,y:2},{x:14,y:2}, 
    {x:16,y:3},{x:18,y:4},{x:20,y:5}, 
    {x:22,y:6},{x:21,y:8},{x:20,y:10},{x:19,y:8},{x:18,y:6}, 
    {x:18,y:8},{x:18,y:10},{x:18,y:12},{x:18,y:14}, 
    {x:16,y:15},{x:14,y:15},{x:12,y:14},{x:11,y:13} 
  ].slice(0, 45)
};

// 13. BELGIUM (Spa)
export const SPA: TrackDefinition = {
  id: 'spa',
  name: 'Belgian GP',
  totalCells: 48,
  pitStops: [24],
  dangerZones: [4, 16, 30, 45],
  drsZones: [9, 10, 11, 12, 13, 14, 38, 39, 40, 41, 46, 47], 
  path: [
    {x:4,y:10},{x:6,y:10}, 
    {x:7,y:12},{x:8,y:14},{x:9,y:12}, // Eau Rouge
    {x:11,y:10},{x:13,y:8},{x:15,y:6},{x:17,y:4},{x:19,y:2}, 
    {x:21,y:3},{x:22,y:5},{x:21,y:7}, 
    {x:20,y:9},{x:19,y:11},{x:18,y:13}, 
    {x:16,y:13},{x:14,y:12},{x:12,y:11}, 
    {x:10,y:11},{x:8,y:10},{x:6,y:9},{x:4,y:8}, 
    {x:3,y:6},{x:4,y:4},{x:6,y:4},{x:6,y:6},{x:5,y:8} 
  ].slice(0, 49)
};

// 14. HUNGARY (Hungaroring)
export const HUNGARY: TrackDefinition = {
  id: 'hungary',
  name: 'Hungary GP',
  totalCells: 38,
  pitStops: [35],
  dangerZones: [5, 18, 30],
  drsZones: [1, 2, 3, 35, 36, 37], // Main straight
  path: [
    {x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14}, // Main
    {x:16,y:12},{x:16,y:10}, // T1
    {x:14,y:9},{x:12,y:8}, 
    {x:10,y:7},{x:8,y:6},{x:6,y:6}, 
    {x:5,y:8},{x:7,y:9}, // Chicane area
    {x:9,y:10},{x:11,y:11}, 
    {x:13,y:11},{x:15,y:11}, 
    {x:16,y:13},{x:14,y:14} // Finish
  ].slice(0, 39)
};

// 15. NETHERLANDS (Zandvoort)
export const ZANDVOORT: TrackDefinition = {
  id: 'netherlands',
  name: 'Dutch GP',
  totalCells: 38,
  pitStops: [34],
  dangerZones: [4, 15, 28],
  drsZones: [1, 2, 12, 13, 35, 36, 37], // Banked corner leading to straight
  path: [
    {x:8,y:12},{x:10,y:12},{x:12,y:12}, // Main
    {x:14,y:11},{x:15,y:9}, // Tarzan
    {x:14,y:7},{x:12,y:6},{x:10,y:6}, // Hugenholtz
    {x:8,y:5},{x:6,y:4},{x:4,y:4}, 
    {x:3,y:6},{x:4,y:8},{x:6,y:9}, 
    {x:8,y:10},{x:10,y:10}, 
    {x:12,y:10},{x:14,y:10}, // Back section
    {x:15,y:12},{x:13,y:14},{x:11,y:14},{x:9,y:14} // Arie Luyendyk
  ].slice(0, 39)
};

// 16. ITALY (Monza) - The Realistic Version
export const ITALY: TrackDefinition = {
  id: 'italy',
  name: 'Italian GP',
  totalCells: 41,
  pitStops: [40],
  dangerZones: [9, 17, 26, 31],
  drsZones: [1, 2, 3, 4, 18, 19, 20, 21, 35, 36, 37, 38], // Main Straight, Serraglio, Finish
  path: [
    { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 6, y: 2 }, { x: 8, y: 2 }, { x: 10, y: 2 }, { x: 12, y: 2 }, { x: 14, y: 2 }, { x: 16, y: 2 }, { x: 18, y: 2 },
    { x: 19, y: 4 }, { x: 20, y: 3 }, { x: 21, y: 5 }, // Variante
    { x: 23, y: 6 }, { x: 24, y: 8 }, { x: 24, y: 10 }, // Grande
    { x: 23, y: 12 }, { x: 21, y: 12 }, { x: 20, y: 14 }, // Roggia
    { x: 19, y: 16 }, { x: 21, y: 17 }, { x: 23, y: 18 }, { x: 24, y: 20 }, { x: 22, y: 21 }, // Lesmo
    { x: 20, y: 20 }, { x: 18, y: 19 }, { x: 16, y: 18 }, { x: 14, y: 17 }, // Serraglio
    { x: 12, y: 16 }, { x: 10, y: 17 }, { x: 9, y: 15 }, { x: 11, y: 14 }, { x: 13, y: 13 }, // Ascari
    { x: 14, y: 11 }, { x: 14, y: 9 }, { x: 14, y: 7 }, { x: 14, y: 5 }, // Straight
    { x: 12, y: 4 }, { x: 10, y: 4 }, { x: 8, y: 4 }, { x: 6, y: 3 }, { x: 4, y: 2 }, // Parabolica
    { x: 2, y: 2 } 
  ].slice(0, 42)
};

// 17. AZERBAIJAN (Baku)
export const AZERBAIJAN: TrackDefinition = {
  id: 'azerbaijan',
  name: 'Azerbaijan GP',
  totalCells: 46,
  pitStops: [42],
  dangerZones: [10, 22, 30], // Castle section
  drsZones: [1, 2, 3, 38, 39, 40, 41, 42, 43, 44, 45], // The Monster Straight
  path: [
    {x:6,y:16},{x:8,y:16},{x:10,y:16}, // Start
    {x:12,y:16},{x:12,y:14},{x:12,y:12}, 
    {x:10,y:12},{x:8,y:12},{x:6,y:12}, 
    {x:5,y:10},{x:7,y:10},{x:7,y:8},{x:5,y:8}, // Castle zig-zag
    {x:5,y:6},{x:7,y:6},{x:9,y:6}, 
    {x:11,y:6},{x:13,y:6},{x:15,y:6}, 
    {x:17,y:7},{x:17,y:9},{x:17,y:11}, 
    {x:16,y:13},{x:14,y:14},{x:12,y:15},{x:10,y:16} // Full throttle back
  ].slice(0, 47)
};

// 18. SINGAPORE
export const SINGAPORE: TrackDefinition = {
  id: 'singapore',
  name: 'Singapore GP',
  totalCells: 40,
  pitStops: [36],
  dangerZones: [8, 20, 30],
  drsZones: [1, 2, 12, 13, 14, 25, 26],
  path: [
    {x:8,y:14},{x:10,y:14},{x:12,y:14}, 
    {x:13,y:12},{x:11,y:11},{x:9,y:10}, 
    {x:8,y:8},{x:10,y:7},{x:12,y:6},{x:14,y:6}, // Raffles
    {x:16,y:7},{x:16,y:9}, 
    {x:14,y:10},{x:12,y:11},{x:14,y:12}, // Anderson bridge
    {x:16,y:13},{x:18,y:13},{x:20,y:13}, // Esplanade
    {x:21,y:11},{x:20,y:9},{x:18,y:8} // Bay grandstand
  ].slice(0, 41)
};

// 19. USA (Austin - COTA)
export const USA: TrackDefinition = {
  id: 'usa',
  name: 'USA GP',
  totalCells: 42,
  pitStops: [38],
  dangerZones: [5, 18, 28],
  drsZones: [1, 2, 22, 23, 24, 25, 26, 39, 40], // Main & Back
  path: [
    {x:8,y:14},{x:10,y:14},{x:12,y:14}, // Main
    {x:13,y:12},{x:12,y:10}, // Turn 1 (Hill)
    {x:10,y:9},{x:8,y:8},{x:6,y:7},{x:8,y:6},{x:10,y:5}, // Esses
    {x:12,y:4},{x:14,y:4}, 
    {x:16,y:5},{x:16,y:7},{x:16,y:9},{x:16,y:11},{x:16,y:13}, // Back straight
    {x:15,y:15},{x:13,y:16},{x:11,y:16}, // Stadium
    {x:9,y:15},{x:7,y:15} // Finish
  ].slice(0, 43)
};

// 20. MEXICO
export const MEXICO: TrackDefinition = {
  id: 'mexico',
  name: 'Mexico GP',
  totalCells: 38,
  pitStops: [35],
  dangerZones: [10, 25],
  drsZones: [1, 2, 3, 4, 15, 16, 17], // Main straight is long
  path: [
    {x:6,y:14},{x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14}, // Main
    {x:16,y:12},{x:14,y:11},{x:12,y:10}, // Esses
    {x:10,y:9},{x:12,y:8},{x:14,y:7}, 
    {x:16,y:6},{x:18,y:6},{x:20,y:7}, 
    {x:21,y:9},{x:20,y:11},{x:18,y:12}, // Stadium entry
    {x:16,y:13},{x:14,y:13},{x:12,y:13} // Stadium
  ].slice(0, 39)
};

// 21. BRAZIL (Interlagos)
export const BRAZIL: TrackDefinition = {
  id: 'brazil',
  name: 'Brazil GP',
  totalCells: 38,
  pitStops: [25],
  dangerZones: [3, 15, 30],
  drsZones: [10, 11, 12, 13, 33, 34, 35, 36, 1, 2],
  path: [
    {x:16,y:4},{x:14,y:5},{x:12,y:6}, 
    {x:11,y:8},{x:10,y:10},{x:12,y:11}, 
    {x:14,y:12},{x:16,y:13},{x:18,y:14}, 
    {x:20,y:12},{x:21,y:10},{x:20,y:8}, 
    {x:18,y:7},{x:16,y:8},{x:15,y:10}, 
    {x:17,y:11},{x:19,y:11},{x:21,y:11}, 
    {x:22,y:9},{x:22,y:7},{x:21,y:5},{x:19,y:4},{x:17,y:4} 
  ].slice(0, 39)
};

// 22. LAS VEGAS
export const LAS_VEGAS: TrackDefinition = {
  id: 'las_vegas',
  name: 'Las Vegas GP',
  totalCells: 40,
  pitStops: [30],
  dangerZones: [5, 20, 35],
  drsZones: [6, 7, 8, 9, 10, 22, 23, 24, 25, 26, 27, 28], 
  path: [
    {x:6,y:12},{x:8,y:12},{x:10,y:12}, 
    {x:11,y:10},{x:10,y:8},{x:9,y:6}, 
    {x:11,y:6},{x:13,y:6},{x:15,y:6},{x:17,y:6},{x:19,y:6}, 
    {x:21,y:7},{x:21,y:9},{x:21,y:11},{x:21,y:13}, 
    {x:19,y:14},{x:17,y:14},{x:15,y:14},{x:13,y:14},{x:11,y:14},{x:9,y:14}, 
    {x:7,y:13},{x:6,y:12} 
  ].slice(0, 41)
};

// 23. QATAR (Losail)
export const QATAR: TrackDefinition = {
  id: 'qatar',
  name: 'Qatar GP',
  totalCells: 38,
  pitStops: [32],
  dangerZones: [8, 22],
  drsZones: [1, 2, 3, 4, 34, 35, 36, 37], // Main straight
  path: [
    {x:6,y:12},{x:8,y:12},{x:10,y:12},{x:12,y:12}, // Main
    {x:13,y:10},{x:12,y:8},{x:10,y:7}, // T1 complex
    {x:8,y:7},{x:6,y:8},{x:6,y:10}, 
    {x:8,y:11},{x:10,y:11}, 
    {x:12,y:10},{x:14,y:9},{x:16,y:9}, // Fast sections
    {x:18,y:10},{x:18,y:12},{x:16,y:13}, 
    {x:14,y:14},{x:12,y:14},{x:10,y:14} // Final corner
  ].slice(0, 39)
};

// 24. ABU DHABI
export const ABU_DHABI: TrackDefinition = {
  id: 'abu_dhabi',
  name: 'Abu Dhabi GP',
  totalCells: 40,
  pitStops: [28],
  dangerZones: [8, 22, 36],
  drsZones: [10, 11, 12, 13, 24, 25, 26, 27, 1, 2, 3],
  path: [
    {x:6,y:4},{x:8,y:4},{x:10,y:4}, 
    {x:12,y:5},{x:13,y:7},{x:12,y:9}, 
    {x:10,y:10},{x:8,y:11},{x:6,y:12}, 
    {x:8,y:13},{x:10,y:14},{x:12,y:15},{x:14,y:16},{x:16,y:16}, 
    {x:18,y:15},{x:19,y:13},{x:19,y:11},{x:19,y:9}, 
    {x:17,y:8},{x:15,y:7},{x:13,y:6},{x:11,y:5},{x:9,y:4} 
  ].slice(0, 41)
};

// 25. MONZA PAPER (Classic)
export const MONZA_PAPER: TrackDefinition = {
  id: 'monza',
  name: 'Monza Classic',
  totalCells: 17,
  pitStops: [15],
  dangerZones: [5, 12],
  drsZones: [1, 2, 3],
  path: [
    {x:4,y:12},{x:6,y:12},{x:8,y:12},{x:10,y:12},{x:12,y:12}, 
    {x:14,y:11},{x:16,y:10},{x:17,y:8},{x:17,y:6}, 
    {x:16,y:4},{x:14,y:4},{x:12,y:4}, 
    {x:10,y:5},{x:8,y:6},{x:6,y:7}, 
    {x:5,y:9},{x:4,y:11} 
  ]
};

// 26. OVAL SPEED
export const OVAL_SPEED: TrackDefinition = {
  id: 'oval',
  name: 'Super Oval',
  totalCells: 18,
  pitStops: [16],
  dangerZones: [8],
  drsZones: [1, 2, 3, 10, 11, 12],
  path: [
    {x:8,y:14},{x:10,y:14},{x:12,y:14},{x:14,y:14},{x:16,y:14}, 
    {x:18,y:13},{x:19,y:11},{x:19,y:9},{x:18,y:7}, 
    {x:16,y:6},{x:14,y:6},{x:12,y:6},{x:10,y:6},{x:8,y:6}, 
    {x:6,y:7},{x:5,y:9},{x:5,y:11},{x:6,y:13} 
  ]
};
