import React, { useMemo, useState, useEffect } from 'react';
import { Wrench, AlertTriangle, Zap, Flag } from 'lucide-react';
import { PlayerState, Language, TrackDefinition, PlayerId } from '../types/index';
import { TRANSLATIONS } from '../config/i18n/translations';
import { F1CarIcon } from './Icons';

interface TrackMapProps {
  p1: PlayerState;
  p2: PlayerState;
  winner: PlayerId | null;
  isDarkMode: boolean;
  language: Language;
  map: TrackDefinition; 
}

const COUNTRY_PALETTES: Record<string, [string, string]> = {
  italy: ['#009246', '#CE2B37'], imola: ['#009246', '#CE2B37'],
  australia: ['#FFCD00', '#00843D'], brazil: ['#FFDF00', '#009C3B'],
  usa: ['#B22234', '#3C3B6E'], miami: ['#00A3E0', '#F75C9A'], las_vegas: ['#000000', '#D4AF37'],
  japan: ['#BC002C', '#FFFFFF'], china: ['#EE1C25', '#FFFF00'], netherlands: ['#FF4F00', '#21468B'],
  monaco: ['#CE1126', '#FFFFFF'], canada: ['#FF0000', '#FFFFFF'], austria: ['#ED2939', '#FFFFFF'],
  bahrain: ['#CE1126', '#FFFFFF'], hungary: ['#436F4D', '#CD2A3E'],
  uk: ['#012169', '#C8102E'], silverstone: ['#012169', '#C8102E'],
  saudi: ['#165d31', '#FFFFFF'], mexico: ['#006847', '#CE1126'],
  spa: ['#FFCD00', '#000000'], default: ['#DC2626', '#F3F4F6'] 
};

export function TrackMap({ p1, p2, winner, isDarkMode, language, map }: TrackMapProps) {
  const t = TRANSLATIONS[language];
  const { path: TRACK_PATH, pitStops: PIT_STOPS, dangerZones: DANGER_ZONES, drsZones: DRS_ZONES } = map;
  const TOTAL_CELLS = TRACK_PATH.length;

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

  const gridSize = 100; 
  const getCoord = (pt: {x: number, y: number}) => ({ x: pt.x * gridSize, y: pt.y * gridSize });
  const getAngle = (pA: any, pB: any) => Math.atan2(pB.y - pA.y, pB.x - pA.x) * (180 / Math.PI);

  const getPositionInfo = (posIndex: number) => {
    const safeIndex = Math.max(0, Math.min(posIndex, TRACK_PATH.length - 1));
    const currentPoint = TRACK_PATH[safeIndex];
    if(!currentPoint) return { x:0, y:0, angle: 0 }; 
    const pA = TRACK_PATH[safeIndex > 0 ? safeIndex - 1 : TRACK_PATH.length - 1];
    const pB = TRACK_PATH[safeIndex < TRACK_PATH.length - 1 ? safeIndex + 1 : 0];
    return { x: currentPoint.x, y: currentPoint.y, angle: getAngle(pA, pB) };
  };

  const p1Visual = getPositionInfo(visualPos1);
  const p2Visual = getPositionInfo(visualPos2);

  const trackAnalysis = useMemo(() => {
    const heavyBraking: number[] = [];
    for(let i=0; i<TRACK_PATH.length; i++) {
        const prev = TRACK_PATH[i === 0 ? TRACK_PATH.length -1 : i-1];
        const curr = TRACK_PATH[i];
        const next = TRACK_PATH[i === TRACK_PATH.length -1 ? 0 : i+1];
        const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
        const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x);
        let diff = angle2 - angle1;
        while (diff <= -Math.PI) diff += 2*Math.PI;
        while (diff > Math.PI) diff -= 2*Math.PI;
        if (Math.abs(diff * (180/Math.PI)) > 35) heavyBraking.push(i);
    }
    return { heavyBraking };
  }, [TRACK_PATH]);

  const bounds = useMemo(() => {
    const xs = TRACK_PATH.map(p => p.x); const ys = TRACK_PATH.map(p => p.y);
    return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
  }, [TRACK_PATH]);

  const padding = 150; 
  const viewBoxX = (bounds.minX * gridSize) - padding;
  const viewBoxY = (bounds.minY * gridSize) - padding;
  const viewBoxWidth = ((bounds.maxX - bounds.minX) * gridSize) + (padding * 2);
  const viewBoxHeight = ((bounds.maxY - bounds.minY) * gridSize) + (padding * 2);

  const trackWidth = 70; const asphaltColor = isDarkMode ? "#15151e" : "#334155";
  const colors = COUNTRY_PALETTES[map.id] || COUNTRY_PALETTES.default;
  const kerbColor1 = colors[0]; const kerbColor2 = colors[1];

  const pointsString = TRACK_PATH.map(p => { const c = getCoord(p); return `${c.x},${c.y}`; }).join(' ');
  const closedPointsString = `${pointsString} ${getCoord(TRACK_PATH[0]).x},${getCoord(TRACK_PATH[0]).y}`;
  const iconSize = 40; const iconOffset = iconSize / 2;
  const startAngle = TRACK_PATH.length > 1 ? getAngle(TRACK_PATH[0], TRACK_PATH[1]) + 90 : 0;

  /**
   * Car dimension logic:
   * Further reducing size by 80% from previous 3.5.
   * New desired width = 3.5 * 0.2 = 0.7.
   */
  const carWidthDesired = 0.7;
  const carScale = carWidthDesired / 30; 
  const carLength = 50 * carScale;
  const carWidth = 30 * carScale;

  /**
   * Positioning logic:
   * By default, cars are centered (offset = 0).
   * If they are on the same visual cell, they shift side-by-side.
   */
  const collision = visualPos1 === visualPos2;
  const p1SideOffset = collision ? -15 : 0;
  const p2SideOffset = collision ? 15 : 0;

  // Final rendering offsets (SVG Y-axis relative to track center line)
  const p1Offset = p1SideOffset - (carWidth / 2);
  const p2Offset = p2SideOffset - (carWidth / 2);

  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center">
      <svg viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="skid-blur"><feGaussianBlur in="SourceGraphic" stdDeviation="1" /></filter>
          <pattern id="checkered" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="5" height="5" fill="white"/><rect x="5" y="0" width="5" height="5" fill="black"/><rect x="0" y="5" width="5" height="5" fill="black"/><rect x="5" y="5" width="5" height="5" fill="white"/>
          </pattern>
        </defs>
        <polyline points={closedPointsString} fill="none" stroke={kerbColor1} strokeWidth={trackWidth + 24} strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={closedPointsString} fill="none" stroke={kerbColor2} strokeWidth={trackWidth + 24} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40 40" />
        <polyline points={closedPointsString} fill="none" stroke={asphaltColor} strokeWidth={trackWidth} strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={closedPointsString} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="20 30" opacity="0.3" />

        {TRACK_PATH.map((point, index) => {
          const { x, y } = getCoord(point);
          if (PIT_STOPS.includes(index)) return null;
          const isDanger = DANGER_ZONES.includes(index); const isDRS = DRS_ZONES?.includes(index); const isStart = index === 0;
          let fillC = isDarkMode ? "#1e293b" : "#f8fafc"; let strokeC = isDarkMode ? "#475569" : "#cbd5e1"; let r = 24;
          if (isStart) { fillC = "transparent"; strokeC = "transparent"; r=1; } else if (isDanger) { fillC = isDarkMode ? "#450a0a" : "#fef2f2"; strokeC = "#ef4444"; } else if (isDRS) { fillC = isDarkMode ? "#083344" : "#ecfeff"; strokeC = "#06b6d4"; }
          return (
            <g key={index}>
              { !isStart && <circle cx={x} cy={y} r={r} fill={fillC} stroke={strokeC} strokeWidth="2" /> }
              {isDanger && <AlertTriangle x={x - iconOffset} y={y - iconOffset} width={iconSize} height={iconSize} className="text-red-600" />}
              {isDRS && <Zap x={x - iconOffset} y={y - iconOffset} width={iconSize} height={iconSize} className="text-cyan-600" />}
              { !isStart && <text x={x} y={y} dominantBaseline="central" textAnchor="middle" fontSize="24" fontWeight="900" fill={isDarkMode ? "#ffffff" : "#0f172a"}>{index}</text>}
            </g>
          );
        })}

        {TRACK_PATH.map((point, index) => {
             if (!PIT_STOPS.includes(index)) return null;
             const { x, y } = getCoord(point); const posInfo = getPositionInfo(index);
             return (
                 <g key={`pit-${index}`} transform={`translate(${x},${y}) rotate(${posInfo.angle})`}>
                     <line x1="0" y1="0" x2="0" y2="60" stroke="#ca8a04" strokeWidth="6" strokeDasharray="4 2"/>
                     <g transform="translate(0, 65)">
                        <rect x="-35" y="-35" width="70" height="70" rx="10" fill="#fef08a" stroke="#ca8a04" strokeWidth="6" className="animate-pulse" />
                        <Wrench x="-24" y="-24" width="48" height="48" className="text-yellow-800" />
                        <circle cx="25" cy="-25" r="14" fill="#ca8a04" stroke="white" strokeWidth="2" /><text x="25" y="-19" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">{index}</text>
                     </g>
                 </g>
             );
        })}

        {TRACK_PATH.length > 0 && (
          <g transform={`translate(${getCoord(TRACK_PATH[0]).x}, ${getCoord(TRACK_PATH[0]).y}) rotate(${startAngle})`}>
             <rect x="-15" y={-(trackWidth/2)} width="30" height={trackWidth} fill="url(#checkered)" stroke="white" strokeWidth="2" />
          </g>
        )}

        <g style={{ transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)', transform: `translate(${p1Visual.x * gridSize}px, ${p1Visual.y * gridSize}px) rotate(${p1Visual.angle}deg)` }}>
           <g transform={`translate(${-carLength/2}, ${p1Offset}) scale(${carScale})`}> 
              <F1CarIcon color={p1.hexColor} borderColor={p1.hexBorderColor} />
           </g>
        </g>
        <g style={{ transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)', transform: `translate(${p2Visual.x * gridSize}px, ${p2Visual.y * gridSize}px) rotate(${p2Visual.angle}deg)` }}>
          <g transform={`translate(${-carLength/2}, ${p2Offset}) scale(${carScale})`}>
            <F1CarIcon color={p2.hexColor} borderColor={p2.hexBorderColor} />
          </g>
        </g>
      </svg>
    </div>
  );
}