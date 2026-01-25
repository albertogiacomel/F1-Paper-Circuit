
import React, { useMemo, useState, useEffect } from 'react';
import { Wrench, AlertTriangle, Zap, Flag } from 'lucide-react';
import { PlayerState, Language, TrackDefinition, PlayerId } from '../types/index';
import { TRANSLATIONS } from '../i18n/translations';

interface TrackMapProps {
  p1: PlayerState;
  p2: PlayerState;
  winner: PlayerId | null;
  isDarkMode: boolean;
  language: Language;
  map: TrackDefinition; 
}

// --- NATIONAL COLORS MAPPING ---
const COUNTRY_PALETTES: Record<string, [string, string]> = {
  // MapID: [Primary, Secondary] (Primary is solid, Secondary is dashed)
  monza_paper: ['#009246', '#CE2B37'], // Italy (Green/Red)
  italy: ['#009246', '#CE2B37'],
  imola: ['#009246', '#CE2B37'],
  
  australia: ['#FFCD00', '#00843D'], // Gold/Green
  brazil: ['#FFDF00', '#009C3B'], // Yellow/Green
  
  usa: ['#B22234', '#3C3B6E'], // Red/Blue
  miami: ['#00A3E0', '#F75C9A'], // Miami Blue/Pink (Special)
  las_vegas: ['#000000', '#D4AF37'], // Black/Gold
  
  japan: ['#BC002C', '#FFFFFF'], // Red/White
  china: ['#EE1C25', '#FFFF00'], // Red/Yellow
  
  netherlands: ['#FF4F00', '#21468B'], // Orange/Blue
  
  monaco: ['#CE1126', '#FFFFFF'], // Red/White
  canada: ['#FF0000', '#FFFFFF'], // Red/White
  austria: ['#ED2939', '#FFFFFF'], // Red/White
  bahrain: ['#CE1126', '#FFFFFF'], // Red/White
  hungary: ['#436F4D', '#CD2A3E'], // Green/Red
  
  uk: ['#012169', '#C8102E'], // Blue/Red
  silverstone: ['#012169', '#C8102E'],
  
  saudi: ['#165d31', '#FFFFFF'], // Green/White
  mexico: ['#006847', '#CE1126'], // Green/Red
  
  spa: ['#FFCD00', '#000000'], // Yellow/Red/Black (Simplified to Yellow/Black for visibility)
  
  // Default Curb Style (Red/White)
  default: ['#DC2626', '#F3F4F6'] 
};

// --- HELPER COMPONENTS ---

// F1 Car Icon Component (SVG)
const F1CarIcon = ({ color, borderColor }: { color: string, borderColor: string }) => (
  <g transform="scale(1.5) translate(-25, -15)">
    <g style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }}>
        <rect x="0" y="5" width="8" height="20" rx="2" fill={borderColor} />
        <path d="M 10 10 L 45 12 L 48 15 L 45 18 L 10 20 Z" fill={color} stroke={borderColor} strokeWidth="2" />
        <path d="M 45 8 L 45 22 L 50 20 L 50 10 Z" fill={borderColor} />
        <circle cx="25" cy="15" r="4" fill="white" stroke="black" strokeWidth="1" />
        <rect x="5" y="0" width="12" height="8" rx="3" fill="#1e293b" />
        <rect x="5" y="22" width="12" height="8" rx="3" fill="#1e293b" />
        <rect x="35" y="2" width="10" height="6" rx="2" fill="#1e293b" />
        <rect x="35" y="22" width="10" height="6" rx="2" fill="#1e293b" />
    </g>
  </g>
);

export function TrackMap({ p1, p2, winner, isDarkMode, language, map }: TrackMapProps) {
  const t = TRANSLATIONS[language];
  const { path: TRACK_PATH, pitStops: PIT_STOPS, dangerZones: DANGER_ZONES, drsZones: DRS_ZONES } = map;
  const TOTAL_CELLS = TRACK_PATH.length;

  // --- ANIMATION STATE ---
  const [visualPos1, setVisualPos1] = useState(p1.position);
  const [visualPos2, setVisualPos2] = useState(p2.position);

  useEffect(() => {
    const dist = Math.abs(p1.position - visualPos1);
    if (dist > TOTAL_CELLS / 2) { setVisualPos1(p1.position); return; }
    if (visualPos1 === p1.position) return;
    const timer = setTimeout(() => {
      setVisualPos1(prev => prev + (p1.position - visualPos1 > 0 ? 1 : -1));
    }, 200); 
    return () => clearTimeout(timer);
  }, [p1.position, visualPos1, TOTAL_CELLS]);

  useEffect(() => {
    const dist = Math.abs(p2.position - visualPos2);
    if (dist > TOTAL_CELLS / 2) { setVisualPos2(p2.position); return; }
    if (visualPos2 === p2.position) return;
    const timer = setTimeout(() => {
      setVisualPos2(prev => prev + (p2.position - visualPos2 > 0 ? 1 : -1));
    }, 200);
    return () => clearTimeout(timer);
  }, [p2.position, visualPos2, TOTAL_CELLS]);

  // --- GEOMETRY HELPERS ---
  const gridSize = 100; 

  const getCoord = (pt: {x: number, y: number}) => ({
    x: pt.x * gridSize,
    y: pt.y * gridSize
  });

  const getAngle = (pA: any, pB: any) => {
    return Math.atan2(pB.y - pA.y, pB.x - pA.x) * (180 / Math.PI);
  };

  const getPositionInfo = (posIndex: number) => {
    const safeIndex = Math.max(0, Math.min(posIndex, TRACK_PATH.length - 1));
    const currentPoint = TRACK_PATH[safeIndex];
    if(!currentPoint) return { x:0, y:0, angle: 0 }; 

    const pA = TRACK_PATH[safeIndex > 0 ? safeIndex - 1 : TRACK_PATH.length - 1];
    const pB = TRACK_PATH[safeIndex < TRACK_PATH.length - 1 ? safeIndex + 1 : 0];
    
    // Smooth angle based on prev and next
    const angle = getAngle(pA, pB);

    return { x: currentPoint.x, y: currentPoint.y, angle };
  };

  const p1Visual = getPositionInfo(visualPos1);
  const p2Visual = getPositionInfo(visualPos2);

  // --- TRACK METRICS CALCULATION ---
  const trackAnalysis = useMemo(() => {
    const curves: number[] = [];
    const heavyBraking: number[] = [];

    for(let i=0; i<TRACK_PATH.length; i++) {
        const prev = TRACK_PATH[i === 0 ? TRACK_PATH.length -1 : i-1];
        const curr = TRACK_PATH[i];
        const next = TRACK_PATH[i === TRACK_PATH.length -1 ? 0 : i+1];

        const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
        const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x);
        
        // Difference in radians, normalized
        let diff = angle2 - angle1;
        while (diff <= -Math.PI) diff += 2*Math.PI;
        while (diff > Math.PI) diff -= 2*Math.PI;
        
        const degDiff = Math.abs(diff * (180/Math.PI));

        if (degDiff > 15) {
            curves.push(i);
        }
        if (degDiff > 35) {
            heavyBraking.push(i);
        }
    }
    return { curves, heavyBraking };
  }, [TRACK_PATH]);


  // --- VIEWBOX ---
  const bounds = useMemo(() => {
    if(!TRACK_PATH.length) return { minX:0, maxX:10, minY:0, maxY:10 };
    const xs = TRACK_PATH.map(p => p.x);
    const ys = TRACK_PATH.map(p => p.y);
    return {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    };
  }, [TRACK_PATH]);

  const padding = 150; 
  const viewBoxX = (bounds.minX * gridSize) - padding;
  const viewBoxY = (bounds.minY * gridSize) - padding;
  const viewBoxWidth = ((bounds.maxX - bounds.minX) * gridSize) + (padding * 2);
  const viewBoxHeight = ((bounds.maxY - bounds.minY) * gridSize) + (padding * 2);

  // --- STYLING ---
  const trackWidth = 70; 
  const asphaltColor = isDarkMode ? "#15151e" : "#334155"; // Match dark mode background for a "cutout" look or dark slate
  
  // Kerb Colors
  const colors = COUNTRY_PALETTES[map.id] || COUNTRY_PALETTES.default;
  const kerbColor1 = colors[0];
  const kerbColor2 = colors[1];

  // Points string
  const pointsString = TRACK_PATH.map(p => {
    const c = getCoord(p);
    return `${c.x},${c.y}`;
  }).join(' ');
  const startCoord = getCoord(TRACK_PATH[0]);
  const closedPointsString = `${pointsString} ${startCoord.x},${startCoord.y}`;
  
  const iconSize = 40;
  const iconOffset = iconSize / 2;

  // Calculate Start/Finish Line Angle
  const startAngle = TRACK_PATH.length > 1 ? getAngle(TRACK_PATH[0], TRACK_PATH[1]) + 90 : 0;

  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center">
      <svg 
        viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`} 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ filter: isDarkMode ? 'drop-shadow(4px 4px 8px rgba(0,0,0,0.6))' : 'drop-shadow(4px 4px 6px rgba(0,0,0,0.2))' }}
      >
        <defs>
            <filter id="skid-blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            </filter>
            {/* Checkered Pattern for Start Line */}
            <pattern id="checkered" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="5" height="5" fill="white"/>
                <rect x="5" y="0" width="5" height="5" fill="black"/>
                <rect x="0" y="5" width="5" height="5" fill="black"/>
                <rect x="5" y="5" width="5" height="5" fill="white"/>
            </pattern>
        </defs>

        {/* --- LAYER 1: KERBS --- */}
        <polyline 
          points={closedPointsString}
          fill="none"
          stroke={kerbColor1}
          strokeWidth={trackWidth + 24}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline 
          points={closedPointsString}
          fill="none"
          stroke={kerbColor2}
          strokeWidth={trackWidth + 24}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="40 40" 
        />

        {/* --- LAYER 2: ASPHALT --- */}
        <polyline 
          points={closedPointsString}
          fill="none"
          stroke={asphaltColor}
          strokeWidth={trackWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* --- LAYER 3: SKID MARKS --- */}
        {trackAnalysis.heavyBraking.map((index, i) => {
            const currIdx = index;
            const prevIdx = index === 0 ? TRACK_PATH.length - 1 : index - 1;
            
            const p1 = getCoord(TRACK_PATH[prevIdx]);
            const p2 = getCoord(TRACK_PATH[currIdx]);
            
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            const offset = 15;

            const x1 = p1.x + (p2.x - p1.x) * 0.4;
            const y1 = p1.y + (p2.y - p1.y) * 0.4;
            const x2 = p1.x + (p2.x - p1.x) * 0.9;
            const y2 = p1.y + (p2.y - p1.y) * 0.9;

            return (
                <g key={`skid-${i}`} opacity="0.4" filter="url(#skid-blur)">
                    <line 
                        x1={x1 + Math.cos(angle + Math.PI/2)*offset} 
                        y1={y1 + Math.sin(angle + Math.PI/2)*offset}
                        x2={x2 + Math.cos(angle + Math.PI/2)*offset}
                        y2={y2 + Math.sin(angle + Math.PI/2)*offset}
                        stroke="#111" strokeWidth="4" strokeLinecap="round"
                    />
                    <line 
                        x1={x1 - Math.cos(angle + Math.PI/2)*offset} 
                        y1={y1 - Math.sin(angle + Math.PI/2)*offset}
                        x2={x2 - Math.cos(angle + Math.PI/2)*offset}
                        y2={y2 - Math.sin(angle + Math.PI/2)*offset}
                        stroke="#111" strokeWidth="4" strokeLinecap="round"
                    />
                </g>
            );
        })}

        {/* --- LAYER 4: CENTERLINE --- */}
        <polyline 
          points={closedPointsString}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="20 30"
          opacity="0.3"
        />

        {/* --- LAYER 5: STANDARD CELLS --- */}
        {TRACK_PATH.map((point, index) => {
          const { x, y } = getCoord(point);
          // Skip Pit Stops here, we render them later on top
          if (PIT_STOPS.includes(index)) return null;

          const isDanger = DANGER_ZONES.includes(index);
          const isDRS = DRS_ZONES?.includes(index);
          const isStart = index === 0;
          
          let fillColor = isDarkMode ? "#1e293b" : "#f8fafc"; 
          let strokeColor = isDarkMode ? "#475569" : "#cbd5e1";
          let r = 24; 
          let strokeW = 2;

          if (isStart) { 
            fillColor = "transparent"; strokeColor = "transparent"; strokeW = 0; r=1;
          } else if (isDanger) { 
            fillColor = isDarkMode ? "#450a0a" : "#fef2f2"; strokeColor = "#ef4444"; strokeW = 3;
          } else if (isDRS) {
            fillColor = isDarkMode ? "#083344" : "#ecfeff"; strokeColor = "#06b6d4"; strokeW = 3;
          }

          return (
            <g key={index}>
              { !isStart && <circle cx={x} cy={y} r={r} fill={fillColor} stroke={strokeColor} strokeWidth={strokeW} /> }
              
              {isDanger && (
                 <AlertTriangle 
                   x={x - iconOffset} y={y - iconOffset} width={iconSize} height={iconSize}
                   className="text-red-600 dark:text-red-500 opacity-80" 
                 />
              )}
               {isDRS && (
                 <Zap 
                   x={x - iconOffset} y={y - iconOffset} width={iconSize} height={iconSize}
                   className="text-cyan-600 dark:text-cyan-500 opacity-80" 
                 />
              )}
              
              { !isStart && (
                <text 
                  x={x} y={y} dominantBaseline="central" textAnchor="middle" 
                  fontSize="24" fontWeight="900" 
                  fill={isDarkMode ? "#ffffff" : "#0f172a"}
                  className="select-none pointer-events-none font-display relative z-10"
                  style={{ 
                    textShadow: isDarkMode 
                      ? '0px 2px 4px rgba(0,0,0,0.9)' 
                      : '0px 0px 4px rgba(255,255,255,1), 0px 0px 2px rgba(255,255,255,1)'
                  }}
                >
                  {index}
                </text>
              )}
            </g>
          );
        })}

        {/* --- LAYER 5.5: SPECIAL PIT STOPS (On Top of Regular Cells) --- */}
        {TRACK_PATH.map((point, index) => {
             if (!PIT_STOPS.includes(index)) return null;
             
             const { x, y } = getCoord(point);
             const posInfo = getPositionInfo(index);
             
             return (
                 <g key={`pit-${index}`} transform={`translate(${x},${y}) rotate(${posInfo.angle})`} style={{ zIndex: 50 }}>
                     {/* Connector line (Thick and clear) */}
                     <line x1="0" y1="0" x2="0" y2="60" stroke="#ca8a04" strokeWidth="6" strokeDasharray="4 2"/>
                     
                     {/* The Box (Adjusted offset to 65 to ensure it's visible but not overlapping track too much) */}
                     <g transform="translate(0, 65)">
                        <rect x="-35" y="-35" width="70" height="70" rx="10" 
                              fill="#fef08a" 
                              stroke="#ca8a04" strokeWidth="6" 
                              className="animate-pulse" 
                              style={{ filter: 'drop-shadow(4px 4px 6px rgba(0,0,0,0.6))' }}
                        />
                        <Wrench x="-24" y="-24" width="48" height="48" className="text-yellow-800" />
                        <text y="48" textAnchor="middle" fontSize="18" fontWeight="900" fill="#ca8a04" style={{ textShadow: '0px 1px 2px white' }}>PIT</text>
                        
                         <circle cx="25" cy="-25" r="14" fill="#ca8a04" stroke="white" strokeWidth="2" />
                         <text x="25" y="-19" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">{index}</text>
                     </g>
                 </g>
             );
        })}

        {/* --- LAYER 6: START/FINISH LINE DECORATION (CHECKERED) --- */}
        {TRACK_PATH.length > 0 && (
          <g transform={`translate(${getCoord(TRACK_PATH[0]).x}, ${getCoord(TRACK_PATH[0]).y}) rotate(${startAngle})`}>
             {/* Checkered Strip on Track */}
             <rect 
                x="-15" 
                y={-(trackWidth/2)} 
                width="30" 
                height={trackWidth} 
                fill="url(#checkered)" 
                stroke="white" 
                strokeWidth="2"
             />
             
             {/* Stylish Icon next to track - Only show if there is a winner */}
             {winner && (
                 <g transform={`translate(0, ${trackWidth/2 + 35}) rotate(-90)`}>
                     <Flag size={32} className="text-black dark:text-white fill-current animate-bounce" />
                 </g>
             )}
          </g>
        )}

        {/* PLAYER 1 CAR */}
        <g 
          style={{ 
            transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)', 
            transform: `translate(${p1Visual.x * gridSize}px, ${p1Visual.y * gridSize}px) rotate(${p1Visual.angle}deg)`
          }}
          className="drop-shadow-2xl z-20"
        >
           {/* If skipTurn is true, show visual indicator like dimmed car or Zzz */}
           {p1.skipTurn && (
               <g transform="translate(0, -60)">
                  <text textAnchor="middle" fontSize="30">💤</text>
               </g>
           )}
           <g transform="translate(0, -20)"> 
              <F1CarIcon color={p1.hexColor} borderColor={p1.hexBorderColor} />
              <text y="-30" textAnchor="middle" fontSize="16" fill={isDarkMode ? "white" : "#1e293b"} fontWeight="bold" transform={`rotate(${-p1Visual.angle})`}>P1</text>
           </g>
        </g>

        {/* PLAYER 2 CAR */}
        <g 
          style={{ 
            transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            transform: `translate(${p2Visual.x * gridSize}px, ${p2Visual.y * gridSize}px) rotate(${p2Visual.angle}deg)`
          }}
          className="drop-shadow-2xl z-20"
        >
          {p2.skipTurn && (
               <g transform="translate(0, -60)">
                  <text textAnchor="middle" fontSize="30">💤</text>
               </g>
           )}
          <g transform="translate(0, 20)">
            <F1CarIcon color={p2.hexColor} borderColor={p2.hexBorderColor} />
            <text y="45" textAnchor="middle" fontSize="16" fill={isDarkMode ? "white" : "#1e293b"} fontWeight="bold" transform={`rotate(${-p2Visual.angle})`}>P2</text>
          </g>
        </g>

      </svg>
    </div>
  );
}
