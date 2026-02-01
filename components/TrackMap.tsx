
import React, { useMemo, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Wrench, AlertTriangle, Zap } from 'lucide-react';
import { PlayerState, Language, TrackDefinition, PlayerId, Point } from '../types/index';
import { TRANSLATIONS } from '../gameConfig/i18n/translations';
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
  const { pitStops: PIT_STOPS, dangerZones: DANGER_ZONES, drsZones: DRS_ZONES } = map;
  
  const [renderPoints, setRenderPoints] = useState<Point[]>([]);
  const svgPathRef = useRef<SVGPathElement>(null);

  const viewboxInfo = useMemo(() => {
    if (renderPoints.length === 0) return { x: 0, y: 0, w: 1000, h: 1000, scaleRef: 1000 };

    const xs = renderPoints.map(p => p.x);
    const ys = renderPoints.map(p => p.y);
    
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const w = maxX - minX;
    const h = maxY - minY;
    const maxSide = Math.max(w, h, 100);
    const padding = maxSide * 0.05; 

    return {
      x: minX - padding,
      y: minY - padding,
      w: w + padding * 2,
      h: h + padding * 2,
      scaleRef: maxSide
    };
  }, [renderPoints]);

  useLayoutEffect(() => {
    if (map.svgPath && svgPathRef.current) {
      try {
        const pathLen = svgPathRef.current.getTotalLength();
        const numPoints = map.totalCells;
        const newPoints: Point[] = [];
        
        for (let i = 0; i < numPoints; i++) {
          const distance = (i / numPoints) * pathLen;
          const pt = svgPathRef.current.getPointAtLength(distance);
          newPoints.push({ x: pt.x, y: pt.y });
        }
        setRenderPoints(newPoints);
      } catch (e) {
        console.error("Errore campionamento SVG:", e);
      }
    }
  }, [map.svgPath, map.totalCells]);

  const [visualPos1, setVisualPos1] = useState(p1.position);
  const [visualPos2, setVisualPos2] = useState(p2.position);

  useEffect(() => {
    if (visualPos1 !== p1.position) {
      const timer = setTimeout(() => {
        const total = map.totalCells;
        const distForward = (p1.position - visualPos1 + total) % total;
        const distBackward = (visualPos1 - p1.position + total) % total;
        if (distForward <= distBackward) setVisualPos1(prev => (prev + 1) % total);
        else setVisualPos1(prev => (prev - 1 + total) % total);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [p1.position, visualPos1, map.totalCells]);

  useEffect(() => {
    if (visualPos2 !== p2.position) {
      const timer = setTimeout(() => {
        const total = map.totalCells;
        const distForward = (p2.position - visualPos2 + total) % total;
        const distBackward = (visualPos2 - p2.position + total) % total;
        if (distForward <= distBackward) setVisualPos2(prev => (prev + 1) % total);
        else setVisualPos2(prev => (prev - 1 + total) % total);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [p2.position, visualPos2, map.totalCells]);

  const getPositionInfo = (posIndex: number) => {
    if (renderPoints.length === 0) return { x: 0, y: 0, angle: 0 };
    const idx = Math.max(0, Math.min(posIndex, renderPoints.length - 1));
    const pt = renderPoints[idx];
    const pPrev = renderPoints[idx > 0 ? idx - 1 : renderPoints.length - 1];
    const pNext = renderPoints[(idx + 1) % renderPoints.length];
    const angle = Math.atan2(pNext.y - pPrev.y, pNext.x - pPrev.x) * (180 / Math.PI);
    return { x: pt.x, y: pt.y, angle };
  };

  const p1V = getPositionInfo(visualPos1);
  const p2V = getPositionInfo(visualPos2);

  const strokeWidth = viewboxInfo.scaleRef * 0.07;   
  const carScale = (strokeWidth * 0.52) / 30;      
  const cellRadius = strokeWidth * 0.18;            
  const sideOffset = (strokeWidth * 0.22) / carScale; 

  const asphaltColor = isDarkMode ? "#1e1e26" : "#475569";
  const colors = COUNTRY_PALETTES[map.id] || COUNTRY_PALETTES.default;

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-slate-200/10 dark:bg-slate-900/10 rounded-xl overflow-hidden">
      <svg style={{ position: 'absolute', width: 0, height: 0, visibility: 'hidden' }}><path ref={svgPathRef} d={map.svgPath} /></svg>
      <svg viewBox={`${viewboxInfo.x} ${viewboxInfo.y} ${viewboxInfo.w} ${viewboxInfo.h}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="checkered" x="0" y="0" width={strokeWidth/2} height={strokeWidth/2} patternUnits="userSpaceOnUse">
            <rect width={strokeWidth/4} height={strokeWidth/4} fill="white"/><rect x={strokeWidth/4} y={strokeWidth/4} width={strokeWidth/4} height={strokeWidth/4} fill="white"/><rect x={strokeWidth/4} width={strokeWidth/4} height={strokeWidth/4} fill="black"/><rect y={strokeWidth/4} width={strokeWidth/4} height={strokeWidth/4} fill="black"/>
          </pattern>
          <filter id="danger-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" /><feFlood floodColor="#ef4444" floodOpacity="0.4" result="glowColor"/><feComposite in="glowColor" in2="blur" operator="in" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="drs-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" /><feFlood floodColor="#06b6d4" floodOpacity="0.4" result="glowColor"/><feComposite in="glowColor" in2="blur" operator="in" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g opacity={renderPoints.length > 0 ? 1 : 0}>
          <path d={map.svgPath} fill="none" stroke={colors[0]} strokeWidth={strokeWidth * 1.2} strokeLinecap="round" />
          <path d={map.svgPath} fill="none" stroke={colors[1]} strokeWidth={strokeWidth * 1.2} strokeLinecap="round" strokeDasharray={`${strokeWidth/2} ${strokeWidth/2}`} />
          <path d={map.svgPath} fill="none" stroke={asphaltColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        </g>
        {renderPoints.length > 0 && (
          <g transform={`translate(${renderPoints[0].x}, ${renderPoints[0].y}) rotate(${getPositionInfo(0).angle})`}><rect x={-strokeWidth*0.08} y={-strokeWidth/2} width={strokeWidth*0.16} height={strokeWidth} fill="url(#checkered)" stroke="#000" strokeWidth={strokeWidth*0.02} /></g>
        )}
        {renderPoints.map((pt, i) => {
          if (i === 0) return null;
          if (PIT_STOPS.includes(i)) return <g key={`pit-${i}`}><circle cx={pt.x} cy={pt.y} r={cellRadius} fill="#fbbf24" stroke="#92400e" strokeWidth={cellRadius * 0.2} /><Wrench x={pt.x - cellRadius*0.6} y={pt.y - cellRadius*0.6} width={cellRadius*1.2} height={cellRadius*1.2} className="text-amber-900" /></g>;
          if (DANGER_ZONES.includes(i)) return <g key={`danger-${i}`} transform={`translate(${pt.x}, ${pt.y})`} filter="url(#danger-glow)"><circle cx="0" cy="0" r={cellRadius} fill="#ef4444" stroke="white" strokeWidth={cellRadius * 0.2} /><AlertTriangle x={-cellRadius*0.6} y={-cellRadius*0.6} width={cellRadius*1.2} height={cellRadius*1.2} className="text-white" /></g>;
          if (DRS_ZONES?.includes(i)) return <g key={`drs-${i}`} transform={`translate(${pt.x}, ${pt.y})`} filter="url(#drs-glow)"><circle cx="0" cy="0" r={cellRadius} fill="#06b6d4" stroke="white" strokeWidth={cellRadius * 0.2} /><Zap x={-cellRadius*0.6} y={-cellRadius*0.6} width={cellRadius*1.2} height={cellRadius*1.2} className="text-white" /></g>;
          return <g key={i}><circle cx={pt.x} cy={pt.y} r={cellRadius} fill="white" stroke="#0f172a" strokeWidth={cellRadius * 0.1} opacity={0.6}/><text x={pt.x} y={pt.y} dominantBaseline="central" textAnchor="middle" fontSize={cellRadius} fontWeight="900" fill="#1e293b" className="pointer-events-none select-none opacity-40">{i}</text></g>;
        })}
        {renderPoints.length > 0 && (
          <><g style={{ transition: 'transform 0.08s linear' }} transform={`translate(${p2V.x}, ${p2V.y}) rotate(${p2V.angle}) scale(${carScale})`}><g transform={`translate(-25, ${visualPos1 === visualPos2 ? sideOffset - 15 : -15})`}><F1CarIcon color={p2.hexColor} borderColor={p2.hexBorderColor} width={50} height={30} /></g></g>
            <g style={{ transition: 'transform 0.08s linear' }} transform={`translate(${p1V.x}, ${p1V.y}) rotate(${p1V.angle}) scale(${carScale})`}><g transform={`translate(-25, ${visualPos1 === visualPos2 ? -sideOffset - 15 : -15})`}><F1CarIcon color={p1.hexColor} borderColor={p1.hexBorderColor} width={50} height={30} /></g></g></>
        )}
      </svg>
    </div>
  );
}
