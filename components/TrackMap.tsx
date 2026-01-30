import React, { useMemo, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Wrench, AlertTriangle, Zap, Flag } from 'lucide-react';
import { PlayerState, Language, TrackDefinition, PlayerId, Point } from '../types/index';
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
  const { pitStops: PIT_STOPS, dangerZones: DANGER_ZONES, drsZones: DRS_ZONES } = map;
  
  // State to hold the calculated points (either from grid or sampled from SVG)
  const [renderPoints, setRenderPoints] = useState<Point[]>(map.path);
  const [rotationCenter, setRotationCenter] = useState<Point>({x:0, y:0});
  const svgPathRef = useRef<SVGPathElement>(null);

  // Sampling logic for SVG tracks + Rotation Logic
  useLayoutEffect(() => {
    if (map.svgPath && svgPathRef.current) {
      try {
        const pathLen = svgPathRef.current.getTotalLength();
        const numPoints = map.totalCells;
        const newPoints: Point[] = [];
        
        // Sample points along the path
        for (let i = 0; i < numPoints; i++) {
          const distance = (i / numPoints) * pathLen;
          const pt = svgPathRef.current.getPointAtLength(distance);
          newPoints.push({ x: pt.x, y: pt.y });
        }

        // Apply Rotation if needed
        if (map.rotation) {
             // 1. Find Center
             const xs = newPoints.map(p => p.x);
             const ys = newPoints.map(p => p.y);
             const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
             const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
             setRotationCenter({x: cx, y: cy});

             // 2. Rotate points
             const angle = (map.rotation * Math.PI) / 180;
             const cos = Math.cos(angle);
             const sin = Math.sin(angle);
             
             const rotatedPoints = newPoints.map(p => ({
                 x: (p.x - cx) * cos - (p.y - cy) * sin + cx,
                 y: (p.x - cx) * sin + (p.y - cy) * cos + cy
             }));
             setRenderPoints(rotatedPoints);
        } else {
             setRenderPoints(newPoints);
             setRotationCenter({x:0, y:0}); // Unused if no rotation
        }

      } catch (e) {
        console.error("Error sampling SVG path", e);
        setRenderPoints(map.path); // Fallback
      }
    } else {
      setRenderPoints(map.path);
    }
  }, [map]);

  const TOTAL_CELLS = renderPoints.length;

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

  // Coordinate transforms
  // If SVG track, we use dynamic viewbox. If Grid track, we calculate bounds.
  const isSvgTrack = !!map.svgPath;
  const gridSize = isSvgTrack ? 1 : 100; // SVG coordinates are already fine, Grid needs scaling

  const getCoord = (pt: {x: number, y: number}) => ({ x: pt.x * gridSize, y: pt.y * gridSize });
  const getAngle = (pA: any, pB: any) => Math.atan2(pB.y - pA.y, pB.x - pA.x) * (180 / Math.PI);

  const getPositionInfo = (posIndex: number) => {
    const safeIndex = Math.max(0, Math.min(posIndex, renderPoints.length - 1));
    const currentPoint = renderPoints[safeIndex];
    if(!currentPoint) return { x:0, y:0, angle: 0 }; 
    const pA = renderPoints[safeIndex > 0 ? safeIndex - 1 : renderPoints.length - 1];
    const pB = renderPoints[safeIndex < renderPoints.length - 1 ? safeIndex + 1 : 0];
    return { x: currentPoint.x, y: currentPoint.y, angle: getAngle(pA, pB) };
  };

  const p1Visual = getPositionInfo(visualPos1);
  const p2Visual = getPositionInfo(visualPos2);

  const viewboxConfig = useMemo(() => {
    // If we have points, calculate the bounding box
    let pointsToMeasure = renderPoints;
    if (isSvgTrack) {
        // If SVG and points are dummy (0,0), don't calculate yet or use default
        const isDummy = renderPoints.every(p => p.x === 0 && p.y === 0);
        if (isDummy) return "0 0 500 500";
    } else {
        if (pointsToMeasure.length === 0) return "0 0 1000 1000";
    }

    const xs = pointsToMeasure.map(p => p.x);
    const ys = pointsToMeasure.map(p => p.y);
    let minX = Math.min(...xs);
    let maxX = Math.max(...xs);
    let minY = Math.min(...ys);
    let maxY = Math.max(...ys);

    // Apply grid scaling for non-SVG tracks
    if (!isSvgTrack) {
        minX *= gridSize;
        maxX *= gridSize;
        minY *= gridSize;
        maxY *= gridSize;
    }

    const width = maxX - minX;
    const height = maxY - minY;

    // ADJUSTED PADDING (5%)
    const paddingX = width * 0.05; 
    const paddingY = height * 0.05;

    const minSafePadding = Math.max(width, height) * 0.05;
    const finalPadX = Math.max(paddingX, minSafePadding);
    const finalPadY = Math.max(paddingY, minSafePadding);

    const vX = minX - finalPadX;
    const vY = minY - finalPadY;
    const vW = width + (finalPadX * 2);
    const vH = height + (finalPadY * 2);

    return `${vX} ${vY} ${vW} ${vH}`;
  }, [renderPoints, isSvgTrack, gridSize]);

  // VISUAL SETTINGS - ULTRA THIN LINES (Kept from previous setting)
  const trackWidth = isSvgTrack ? 6 : 20; 
  const kerbWidth = trackWidth + (isSvgTrack ? 3 : 8);
  
  const asphaltColor = isDarkMode ? "#15151e" : "#334155";
  const colors = COUNTRY_PALETTES[map.id] || COUNTRY_PALETTES.default;
  const kerbColor1 = colors[0]; const kerbColor2 = colors[1];

  // For Grid Tracks: Construct Polyline. For SVG Tracks: Use the path directly for visuals
  const pointsString = renderPoints.map(p => { const c = getCoord(p); return `${c.x},${c.y}`; }).join(' ');
  const closedPointsString = `${pointsString} ${getCoord(renderPoints[0]).x},${getCoord(renderPoints[0]).y}`;
  
  // Tiny icons
  const iconSize = isSvgTrack ? 2.5 : 10; 
  const iconOffset = iconSize / 2;
  const startAngle = renderPoints.length > 1 ? getAngle(renderPoints[0], renderPoints[1]) : 0;

  // Car Scaling - Ultra small (Kept from previous setting)
  const carScale = isSvgTrack ? 0.06 : 0.25; 
  const carLength = 50 * carScale;
  const carWidth = 30 * carScale;

  const collision = visualPos1 === visualPos2;
  const p1SideOffset = collision ? (isSvgTrack ? -1 : -4) : 0;
  const p2SideOffset = collision ? (isSvgTrack ? 1 : 4) : 0;

  const getGridOffset = (playerId: number, pos: number, laps: number) => {
    if (pos === 0 && laps === 1) {
      return isSvgTrack ? -3 : -10; 
    }
    return 0;
  };

  const p1GridOffset = getGridOffset(1, visualPos1, p1.laps);
  const p2GridOffset = getGridOffset(2, visualPos2, p2.laps);

  const p1OffsetY = p1SideOffset - (carWidth / 2);
  const p2OffsetY = p2SideOffset - (carWidth / 2);
  const p1OffsetX = (-carLength / 2) + p1GridOffset;
  const p2OffsetX = (-carLength / 2) + p2GridOffset;

  const startCoord = renderPoints.length > 0 ? getCoord(renderPoints[0]) : {x:0, y:0};

  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center">
      {/* Hidden path for sampling - Keep original rotation here to sample correct length */}
      {isSvgTrack && (
        <svg width="0" height="0" className="absolute">
          <path ref={svgPathRef} d={map.svgPath} fill="none" />
        </svg>
      )}

      <svg viewBox={viewboxConfig} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="skid-blur"><feGaussianBlur in="SourceGraphic" stdDeviation="1" /></filter>
          <pattern id="checkered" x="0" y="0" width={isSvgTrack ? 1 : 2.5} height={isSvgTrack ? 1 : 2.5} patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width={isSvgTrack?0.5:1.25} height={isSvgTrack?0.5:1.25} fill="white"/>
            <rect x={isSvgTrack?0.5:1.25} y="0" width={isSvgTrack?0.5:1.25} height={isSvgTrack?0.5:1.25} fill="black"/>
            <rect x="0" y={isSvgTrack?0.5:1.25} width={isSvgTrack?0.5:1.25} height={isSvgTrack?0.5:1.25} fill="black"/>
            <rect x={isSvgTrack?0.5:1.25} y={isSvgTrack?0.5:1.25} width={isSvgTrack?0.5:1.25} height={isSvgTrack?0.5:1.25} fill="white"/>
          </pattern>
        </defs>

        {/* TRACK RENDERING */}
        {isSvgTrack ? (
          <g transform={map.rotation ? `rotate(${map.rotation} ${rotationCenter.x} ${rotationCenter.y})` : undefined}>
             <path d={map.svgPath} fill="none" stroke={kerbColor1} strokeWidth={kerbWidth} strokeLinecap="round" strokeLinejoin="round" />
             <path d={map.svgPath} fill="none" stroke={kerbColor2} strokeWidth={kerbWidth} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" />
             <path d={map.svgPath} fill="none" stroke={asphaltColor} strokeWidth={trackWidth} strokeLinecap="round" strokeLinejoin="round" />
             {/* Center line */}
             <path d={map.svgPath} fill="none" stroke="#ffffff" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1.5 1.5" opacity="0.3" />
          </g>
        ) : (
          <>
            <polyline points={closedPointsString} fill="none" stroke={kerbColor1} strokeWidth={trackWidth + 8} strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={closedPointsString} fill="none" stroke={kerbColor2} strokeWidth={trackWidth + 8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 10" />
            <polyline points={closedPointsString} fill="none" stroke={asphaltColor} strokeWidth={trackWidth} strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={closedPointsString} fill="none" stroke="#ffffff" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 7.5" opacity="0.3" />
          </>
        )}

        {/* CELLS & ICONS */}
        {renderPoints.map((point, index) => {
          const { x, y } = getCoord(point);
          if (PIT_STOPS.includes(index)) return null;
          const isDanger = DANGER_ZONES.includes(index); const isDRS = DRS_ZONES?.includes(index); const isStart = index === 0;
          
          let fillC = isDarkMode ? "#1e293b" : "#f8fafc"; 
          let strokeC = isDarkMode ? "#475569" : "#cbd5e1"; 
          
          // Ultra tiny radius for cells
          let r = isSvgTrack ? 1.0 : 6; 
          
          if (isStart) { fillC = "transparent"; strokeC = "transparent"; r=1; } 
          else if (isDanger) { fillC = isDarkMode ? "#450a0a" : "#fef2f2"; strokeC = "#ef4444"; } 
          else if (isDRS) { fillC = isDarkMode ? "#083344" : "#ecfeff"; strokeC = "#06b6d4"; }
          
          return (
            <g key={index}>
              { !isStart && <circle cx={x} cy={y} r={r} fill={fillC} stroke={strokeC} strokeWidth={isSvgTrack ? 0.25 : 0.5} /> }
              {isDanger && <AlertTriangle x={x - iconOffset} y={y - iconOffset} width={iconSize} height={iconSize} className="text-red-600" />}
              {isDRS && <Zap x={x - iconOffset} y={y - iconOffset} width={iconSize} height={iconSize} className="text-cyan-600" />}
              
              { !isStart && !isDanger && !isDRS && !isSvgTrack && <text x={x} y={y} dominantBaseline="central" textAnchor="middle" fontSize="6" fontWeight="900" fill={isDarkMode ? "#ffffff" : "#0f172a"}>{index}</text>}
              { !isStart && !isDanger && !isDRS && isSvgTrack && (index % 1 === 0) && (
                  <text x={x} y={y} dominantBaseline="central" textAnchor="middle" fontSize={r * 0.9} fontWeight="900" fill={isDarkMode ? "#ffffff" : "#0f172a"} className="pointer-events-none select-none">
                      {index}
                  </text>
              )}
            </g>
          );
        })}

        {/* PIT STOPS */}
        {renderPoints.map((point, index) => {
             if (!PIT_STOPS.includes(index)) return null;
             const { x, y } = getCoord(point); const posInfo = getPositionInfo(index);
             const scale = isSvgTrack ? 0.08 : 0.25;
             return (
                 <g key={`pit-${index}`} transform={`translate(${x},${y}) rotate(${posInfo.angle}) scale(${scale})`}>
                     <line x1="0" y1="0" x2="0" y2="60" stroke="#ca8a04" strokeWidth="6" strokeDasharray="4 2"/>
                     <g transform="translate(0, 65)">
                        <rect x="-35" y="-35" width="70" height="70" rx="10" fill="#fef08a" stroke="#ca8a04" strokeWidth="6" className="animate-pulse" />
                        <Wrench x="-24" y="-24" width="48" height="48" className="text-yellow-800" />
                     </g>
                 </g>
             );
        })}

        {/* START LINE */}
        {renderPoints.length > 0 && (
          <g transform={`translate(${startCoord.x}, ${startCoord.y}) rotate(${startAngle})`}>
             <rect x={isSvgTrack ? -1 : -8} y={-(trackWidth/2)} width={isSvgTrack ? 2 : 16} height={trackWidth} fill="url(#checkered)" stroke="white" strokeWidth={isSvgTrack?0.1:1} />
             {/* Start Grid Slots */}
             <rect x={isSvgTrack ? -4 : -15} y={isSvgTrack ? -2 : -8} width={isSvgTrack ? 2.5 : 10} height={isSvgTrack ? 2 : 6} rx={isSvgTrack?0.25:1} fill="none" stroke="white" strokeWidth={isSvgTrack?0.15:0.5} strokeDasharray={isSvgTrack?"0.5 0.5":"1.5 1.5"} opacity="0.6" />
             <text x={isSvgTrack ? -5.5 : -20} y={isSvgTrack ? -1 : -3.5} fill="white" fontSize={isSvgTrack?1:3} fontWeight="bold" textAnchor="middle" dominantBaseline="middle" opacity="0.8">P1</text>
             <rect x={isSvgTrack ? -4 : -15} y={0} width={isSvgTrack ? 2.5 : 10} height={isSvgTrack ? 2 : 6} rx={isSvgTrack?0.25:1} fill="none" stroke="white" strokeWidth={isSvgTrack?0.15:0.5} strokeDasharray={isSvgTrack?"0.5 0.5":"1.5 1.5"} opacity="0.6" />
             <text x={isSvgTrack ? -5.5 : -20} y={isSvgTrack ? 1 : 3.5} fill="white" fontSize={isSvgTrack?1:3} fontWeight="bold" textAnchor="middle" dominantBaseline="middle" opacity="0.8">P2</text>
          </g>
        )}

        {/* PLAYERS */}
        <g 
          style={{ transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)' }}
          transform={`translate(${p1Visual.x * gridSize}, ${p1Visual.y * gridSize}) rotate(${p1Visual.angle})`}
        >
           <g transform={`translate(${p1OffsetX}, ${p1OffsetY}) scale(${carScale})`}> 
              <F1CarIcon color={p1.hexColor} borderColor={p1.hexBorderColor} width={50} height={30} />
           </g>
        </g>
        <g 
          style={{ transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)' }}
          transform={`translate(${p2Visual.x * gridSize}, ${p2Visual.y * gridSize}) rotate(${p2Visual.angle})`}
        >
          <g transform={`translate(${p2OffsetX}, ${p2OffsetY}) scale(${carScale})`}>
            <F1CarIcon color={p2.hexColor} borderColor={p2.hexBorderColor} width={50} height={30} />
          </g>
        </g>
      </svg>
    </div>
  );
}