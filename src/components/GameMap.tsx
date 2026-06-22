import React, { useState } from 'react';
import { Shield, Anchor, Hammer, TreePine, Navigation, Compass, MapPin, Eye, HelpCircle } from 'lucide-react';

interface GameMapProps {
  currentCityId?: string;
  isRelocated?: boolean; // If true, the player is at Mango Point
  onNodeClick?: (cityId: string) => void;
  hideSecretSector?: boolean;
}

export const GameMap: React.FC<GameMapProps> = ({
  currentCityId = 'port_ashley',
  isRelocated = false,
  onNodeClick,
  hideSecretSector = false
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Determine active city ID
  const activeCityId = isRelocated ? 'mango_point' : currentCityId;

  // 1. Geography data
  const locations = [
    {
      id: 'port_ashley',
      name: 'Port Ashley',
      tagline: 'Wealthy Corporate Border Gateway',
      desc: 'Secure high-tech border checkpoint. High pay and spotless corporate offices, but strict deportation quotas are enforced with digital urgency.',
      x: 22,
      y: 28,
      iconType: 'shield',
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-400',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      details: 'Quotas: Strict • Risk: Low • Salary: High ($350/day)'
    },
    {
      id: 'seaview',
      name: 'Seaview',
      tagline: 'Vibrant Coastal Tourism Capital',
      desc: 'Sandy beaches, waterfront hotels, and high cruise ship transit. Demands continuous sea-labor approvals while battling overstaying vacationers.',
      x: 18,
      y: 65,
      iconType: 'anchor',
      color: 'from-cyan-500 to-teal-500',
      textColor: 'text-cyan-400',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      details: 'Quotas: Medium • Risk: Low • Salary: Medium ($250/day)'
    },
    {
      id: 'riverton',
      name: 'Riverton',
      tagline: 'Smog-Covered Industrial Factory Hub',
      desc: 'Massive heavy-machinery and assembly warehouses. Plagued by medical forge issues and safety report discrepancies, but desperate for manual laborers.',
      x: 60,
      y: 55,
      iconType: 'pickaxe',
      color: 'from-orange-600 to-amber-750',
      textColor: 'text-orange-400',
      glowColor: 'rgba(249, 115, 22, 0.4)',
      details: 'Quotas: Lenient • Risk: Medium • Salary: Medium ($240/day)'
    },
    {
      id: 'highland_gate',
      name: 'Highland Gate',
      tagline: 'Tranquil Mountain Border Community',
      desc: 'Spruce pinelands, quiet alpine valleys, and tight public security. Locals demand absolute procedural perfection for fear of foreign agents.',
      x: 75,
      y: 22,
      iconType: 'pine_tree',
      color: 'from-emerald-600 to-green-600',
      textColor: 'text-emerald-400',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      details: 'Quotas: Strict • Risk: Low • Salary: Low ($180/day)'
    },
    {
      id: 'mango_point',
      name: 'Mango Point',
      tagline: 'Isolated Tropical Haven & Sovereign Outpost',
      desc: 'An overlooked coastal settlement characterized by Jamaican culture, sea breezes, and dense vegetation. Highly mysterious, distant from the mainland, and your ultimate relocation terminal.',
      x: 48,
      y: 86,
      iconType: 'mango',
      color: 'from-yellow-500 via-amber-500 to-red-500',
      textColor: 'text-amber-400',
      glowColor: 'rgba(245, 158, 11, 0.65)',
      details: 'Sector: ACT 2 forced outpost • Atmosphere: Tense & Majestic',
      isSecret: true
    }
  ];

  const enabledLocations = hideSecretSector ? locations.filter(l => l.id !== 'mango_point') : locations;

  // Helper to render requested icons
  const renderLocationIcon = (type: string, size = 18) => {
    switch (type) {
      case 'shield':
        return <Shield size={size} className="animate-pulse" />;
      case 'anchor':
        return <Anchor size={size} />;
      case 'pickaxe':
        return <Hammer size={size} />; // Pickaxe / tool style
      case 'pine_tree':
        return <TreePine size={size} />;
      case 'mango':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className="text-amber-300 drop-shadow-md">
            {/* Custom vector stylized Mango shape with green leaf */}
            <path d="M12 2C11.5 2 11 2.3 11 2.8C10.8 4 10.2 5.5 8.5 6C7.5 6.3 6.5 7 5.8 8C4.5 9.8 4 12 4.5 14C5 17.5 8 20 11.5 21C15.5 22.2 19 19.5 19.5 15.5C20 12 18.5 8.8 15.5 6.5C14.2 5.5 13.5 4 13.5 2.5C13.5 2.2 13.2 2 12.8 2H12Z" />
            <path d="M12.5 1.5C13.5 3 14.8 3.8 16.5 3.5C17.5 3.3 18.5 4 18 5C17 7 15 7.5 13 6.8C12 6.5 12 5 12.5 1.5Z" fill="#10B981" />
          </svg>
        );
      default:
        return <Compass size={size} />;
    }
  };

  const activeNode = enabledLocations.find(l => l.id === activeCityId) || enabledLocations[0];

  return (
    <div className="bg-slate-950 border border-slate-850 rounded-3xl p-4 sm:p-5 shadow-2xl relative overflow-hidden select-none select-none">
      
      {/* Background Water Grid and subtle map coordinates decor */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.15)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(15,23,42,0.15)_1.5px,transparent_1.5px)] bg-[size:30px_30px] pointer-events-none" />
      
      {/* Dynamic Fictional Grid Accents */}
      <div className="absolute top-2 left-4 text-[9px] font-mono text-slate-600 tracking-wider hidden sm:block">
        SECTOR MAP_0.81 // HULIGANVERSE PREVIEW
      </div>
      <div className="absolute top-2 right-4 text-[9px] font-mono text-slate-600 tracking-wider hidden sm:block">
        GRID LAT 18°N // LONG 77°W
      </div>

      <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Compass className="text-amber-500 animate-spin-slow" size={20} />
          <div>
            <h3 className="font-extrabold text-slate-200 text-sm tracking-wide">
              PROVINCIAL DEPLOYMENT GRAPH
            </h3>
            <p className="text-[10px] text-slate-500 font-mono">
              Fictional Transit Network: Starter Gateways, Coastal Ferry Systems & Relocation Outposts
            </p>
          </div>
        </div>
        
        {/* Quick Help Indicator */}
        <div className="text-[10px] text-amber-500 font-mono bg-amber-950/20 px-2 py-0.5 rounded border border-amber-900/30 flex items-center gap-1">
          <Eye size={12} />
          <span>Interactive HUD</span>
        </div>
      </div>

      {/* 16:9 MAP CONTAINER */}
      <div className="relative aspect-video w-full bg-[#030712] border border-slate-900 rounded-2xl overflow-hidden shadow-inner flex flex-col justify-between">
        
        {/* Animated Ripple at the ocean edge */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(8,145,178,0.03),transparent_70%)] pointer-events-none" />

        {/* --- MAP SVG WORKSPACE --- */}
        <svg
          viewBox="0 0 1000 562.5"
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        >
          <defs>
            {/* Pulsing gradient filter for interactive elements */}
            <radialGradient id="oceanGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="secretGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
            </radialGradient>

            {/* Glowing filter effect */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* FICTIONAL GEOGRAPHY LANDMASS BACKDROPS (Stretched Island & Southern Cay) */}
          {/* Northern Mainland */}
          <path
            d="M -50,-50 L 1050,-50 L 1050,300 Q 800,280 700,220 T 400,240 T 150,150 T -50,140 Z"
            fill="#090d16"
            stroke="#1e293b"
            strokeWidth="3.5"
            strokeDasharray="10,4"
            opacity="0.9"
          />

          {/* West Coast Ridge */}
          <path
            d="M -50,140 Q 80,180 120,280 T 250,380 T 100,480 T -50,420 Z"
            fill="#090d16"
            stroke="#1e293b"
            strokeWidth="3.5"
            strokeDasharray="10,4"
            opacity="0.9"
          />

          {/* Industrial Factory Bay (Riverton & Eastern Marsh) */}
          <path
            d="M 1050,300 Q 980,310 900,280 T 680,260 T 550,400 T 700,480 T 1050,450 Z"
            fill="#090d16"
            stroke="#1e293b"
            strokeWidth="3.5"
            strokeDasharray="10,4"
            opacity="0.85"
          />

          {/* Distant Mysterious Outpost Island (Mango Point) - Southern Coast Separated Island */}
          {!hideSecretSector && (
            <>
              <circle
                cx="480"
                cy="483.75"
                r="110"
                fill="url(#secretGlow)"
              />
              <path
                d="M 400,480 Q 430,420 480,430 T 560,470 T 520,530 T 420,510 Z"
                fill="#0a0f1d"
                stroke="#b45309"
                strokeWidth="4"
                strokeDasharray="5,3"
                filter="url(#glow)"
                className="animate-pulse"
              />
            </>
          )}

          {/* Sound/Atmosphere text on map */}
          <text x="500" y="370" fill="#3b4252" fontSize="13" fontFamily="monospace" letterSpacing="4" textAnchor="middle" fontWeight="bold">
            THE DEEP PASS CROSSING (LAMENT SEA)
          </text>
          <text x="180" y="25" fill="#1e293b" fontSize="10" fontFamily="monospace" textAnchor="start">
            ★ COLD GATEWAY TERRITORY (ACT 1)
          </text>
          {!hideSecretSector && (
            <text x="480" y="555" fill="#78350f" fontSize="12" fontFamily="monospace" textAnchor="middle" className="tracking-[0.25em] font-black blinking">
              * SOVEREIGN EXILE TERRITORY (ACT 2 Outpost) *
            </text>
          )}

          {/* --- TRANSIT CONNECTIVITY NETWORKS (ROADS & FERRIES) --- */}
          
          {/* Western Coastal Highway (Port Ashley -> Seaview) */}
          <line
            x1="220"
            y1="157.5"
            x2="180"
            y2="365.6"
            stroke="#f59e0b"
            strokeWidth="4.5"
            strokeLinecap="round"
            opacity="0.25"
          />
          <line
            x1="220"
            y1="157.5"
            x2="180"
            y2="365.6"
            stroke="#1e293b"
            strokeWidth="2"
            strokeDasharray="6,4"
          />

          {/* Northern Ridge Pass (Port Ashley -> Highland Gate) */}
          <line
            x1="220"
            y1="157.5"
            x2="750"
            y2="123.75"
            stroke="#f59e0b"
            strokeWidth="4.5"
            strokeLinecap="round"
            opacity="0.25"
          />
          <line
            x1="220"
            y1="157.5"
            x2="750"
            y2="123.75"
            stroke="#1e293b"
            strokeWidth="2"
            strokeDasharray="6,4"
          />

          {/* Industrial Rail Link (Highland Gate -> Riverton) */}
          <line
            x1="750"
            y1="123.75"
            x2="600"
            y2="309.3"
            stroke="#f59e0b"
            strokeWidth="4.5"
            strokeLinecap="round"
            opacity="0.25"
          />
          <line
            x1="750"
            y1="123.75"
            x2="600"
            y2="309.3"
            stroke="#1e293b"
            strokeWidth="2"
            strokeDasharray="6,4"
          />

          {/* Central Trade Highway (Seaview -> Riverton) */}
          <line
            x1="180"
            y1="365.6"
            x2="600"
            y2="309.3"
            stroke="#f59e0b"
            strokeWidth="4.5"
            strokeLinecap="round"
            opacity="0.25"
          />
          <line
            x1="180"
            y1="365.6"
            x2="600"
            y2="309.3"
            stroke="#1e293b"
            strokeWidth="2"
            strokeDasharray="6,4"
          />


          {/* --- AMBIENT SECURE BORDER BARRICADES (Port Ashley Edge) --- */}
          <path
            d="M 50,130 L 150,110 L 250,140 Q 320,160 380,100"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeDasharray="5,5"
            opacity="0.6"
          />
          <text x="310" y="125" fill="#ef4444" fontSize="8" fontFamily="monospace" opacity="0.8">
            CORPORATE SECURITY GATEWAY BARRICADE
          </text>
          
          {/* Dynamic Ocean Ferry Lane: SEAVIEW DOCKS to MANGO POINT */}
          {/* Curving dashed lane showing long maritime voyage */}
          {!hideSecretSector && (
            <>
              <path
                d="M 180,365.6 Q 300,430 480,483.7"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.25"
              />
              <path
                d="M 180,365.6 Q 300,430 480,483.7"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                strokeDasharray="10,8"
                className="animated-maritime-lane"
                style={{
                  strokeDashoffset: 100,
                  animation: 'dash 12s linear infinite'
                }}
              />

              {/* Dotted Ferry Route Alternative from Industrial Riverton */}
              <path
                d="M 600,309.3 Q 560,420 480,483.7"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.2"
              />
              <path
                d="M 600,309.3 Q 560,420 480,483.7"
                fill="none"
                stroke="#0891b2"
                strokeWidth="1.5"
                strokeDasharray="4,6"
              />
            </>
          )}

          {/* ACTIVE DISPATCH TARGET - PULSING RETICLE (Behind active city) */}
          {enabledLocations.map((loc) => {
            const isActive = loc.id === activeCityId;
            if (!isActive) return null;
            return (
              <g key={`ping-${loc.id}`}>
                <circle
                  cx={loc.x * 10}
                  cy={loc.y * 5.625}
                  r="38"
                  fill="none"
                  stroke={loc.id === 'mango_point' ? '#fbbf24' : '#f59e0b'}
                  strokeWidth="1.5"
                  className="animate-ping"
                  opacity="0.5"
                />
                <circle
                  cx={loc.x * 10}
                  cy={loc.y * 5.625}
                  r="24"
                  fill="none"
                  stroke={loc.id === 'mango_point' ? '#f59e0b' : '#d97706'}
                  strokeWidth="1"
                  strokeDasharray="4,2"
                  className="animate-spin-slow"
                />
              </g>
            );
          })}
        </svg>

        {/* CSS KEYFRAMES INJECTED INLINE FOR AMBIENT MOVING DOTS */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes dash {
            to {
              stroke-dashoffset: -100;
            }
          }
          .animated-maritime-lane {
            animation: dash 12s linear infinite !important;
          }
          .blinking {
            animation: mapPulse 2s ease-in-out infinite;
          }
          @keyframes mapPulse {
            0%, 100% { opacity: 0.35; }
            50% { opacity: 0.9; }
          }
        `}} />

        {/* --- MAP INTERACTIVE LAYER (HTML BUTTONS OVERLAID RESPONSIBLY) --- */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {enabledLocations.map((loc) => {
            const isActive = loc.id === activeCityId;
            const isHovered = hoveredNode === loc.id;
            
            return (
              <div
                key={loc.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${loc.x}%`,
                  top: `${loc.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* NODE BUTTON */}
                <button
                  id={`map-node-${loc.id}`}
                  onClick={() => {
                    setSelectedNode(selectedNode === loc.id ? null : loc.id);
                    if (onNodeClick) onNodeClick(loc.id);
                  }}
                  onMouseEnter={() => setHoveredNode(loc.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`group relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 transition-all duration-300 shadow-2xl cursor-pointer ${
                    isActive
                      ? 'bg-slate-950 border-amber-505 shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-110 z-40'
                      : loc.id === 'mango_point'
                      ? 'bg-slate-950 border-amber-700/60 shadow-[0_0_15px_rgba(247,160,25,0.15)] hover:border-amber-500 scale-105'
                      : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-400 hover:scale-105 hover:z-30'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 16px ${loc.glowColor}` : undefined
                  }}
                >
                  {/* Current Active Label Crown */}
                  {isActive && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[8px] font-black font-mono px-1.5 py-0.5 rounded uppercase tracking-wider shadow whitespace-nowrap z-50 animate-bounce flex items-center gap-1">
                      <MapPin size={8} /> Active Duty
                    </span>
                  )}

                  {/* Icon wrap */}
                  <div className={`transition-transform duration-300 ${loc.textColor} ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {renderLocationIcon(loc.iconType, 18)}
                  </div>
                </button>

                {/* VISUAL MINI-LABEL ALWAYS SHOWN FOR ACCESSIBILITY */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                  <span className={`block font-serif text-[10px] sm:text-xs font-black tracking-wide drop-shadow-[0_2px_2px_rgba(2,6,23,0.95)] ${
                    isActive ? 'text-amber-400 font-bold' : loc.id === 'mango_point' ? 'text-amber-500 italic' : 'text-slate-350'
                  }`}>
                    {loc.name}
                  </span>
                  {loc.isSecret && (
                    <span className="block text-[7px] font-mono text-amber-500/80 tracking-widest uppercase drop-shadow">
                      ACT 2 Exile Terminal
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* MAP LEGEND FOOTER (Positioned inside relative overlay) */}
        <div className="absolute bottom-2.5 left-2.5 bg-slate-950/95 border border-slate-900 rounded-xl p-2 max-w-[280px] sm:max-w-[340px] z-30 shadow-2xl backdrop-blur-md">
          <h4 className="text-[9px] font-bold tracking-widest text-slate-400 uppercase font-mono mb-1.5 flex items-center gap-1.5">
            <Compass size={11} className="text-amber-500" /> Transit Legend
          </h4>
          <div className="space-y-1.5 font-mono text-[8px] sm:text-[9px] text-slate-400 leading-normal">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-6 bg-slate-700 border-t border-dashed border-amber-500/60 block" />
              <span>Mainland Overland Highways (Act 1 Boundaries)</span>
            </div>
            {!hideSecretSector && (
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-6 bg-cyan-500 border-t border-dotted block animate-pulse" />
                <span className="text-cyan-300">Ocean Ferry Line (The Forced Relocation Passage)</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 outline outline-2 outline-slate-950 block" />
              <span>Current Assigned Gateway (Where you patrol today)</span>
            </div>
          </div>
        </div>

        {/* CURRENT ASSIGNMENT PANEL HUD */}
        <div className="absolute bottom-2.5 right-2 sm:right-3.5 bg-slate-950/95 border border-slate-900 rounded-xl p-2.5 max-w-[200px] sm:max-w-[260px] z-30 shadow-2xl backdrop-blur-sm self-end font-mono">
          <span className="text-[8px] text-slate-500 uppercase block font-bold">Duty Dispatch Status</span>
          <span className="text-[10px] sm:text-xs font-black text-amber-400 tracking-wide block uppercase mt-0.5">
            {activeNode.name}
          </span>
          <span className="text-[8px] block text-slate-400 leading-normal italic mt-1 font-sans border-t border-slate-900 pt-1">
            "{activeNode.tagline}"
          </span>
        </div>

      </div>

      {/* --- SELECTED NODE HOVER/CLICK INFORMATION DRAWER (OUTSIDE 16:9 VIEW FOR HIGH LEGIBILITY) --- */}
      <div className="mt-4 bg-slate-950/80 border border-slate-900/60 rounded-2xl p-3.5 space-y-2 relative">
        <div className="absolute top-2 right-3 flex gap-1 items-center">
          <HelpCircle size={11} className="text-slate-500" />
          <span className="text-[9px] font-mono text-slate-500">Click any city node to view dossier details</span>
        </div>

        {/* Shown node metadata */}
        {(() => {
          const detailNode = enabledLocations.find(l => l.id === (hoveredNode || selectedNode || activeCityId)) || activeNode;
          const isCurrentlyHere = detailNode.id === activeCityId;
          
          return (
            <div className="space-y-1.5 transition-all">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-500">
                  {renderLocationIcon(detailNode.iconType, 15)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-100 flex items-center gap-1.5">
                    {detailNode.name} 
                    {isCurrentlyHere && (
                      <span className="bg-amber-950/65 text-amber-400 text-[8px] font-mono px-1 py-0.2 rounded border border-amber-900/40 font-bold">
                        YOU ARE STATIONED HERE
                      </span>
                    )}
                  </h4>
                  <span className="text-[9px] font-mono text-amber-500/80 block uppercase tracking-wider">
                    {detailNode.tagline}
                  </span>
                </div>
              </div>

              <p className="text-[11px] sm:text-xs text-slate-400 leading-normal font-sans">
                {detailNode.desc}
              </p>

              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-2 text-[10px] sm:text-[11px] font-mono text-slate-300 flex flex-wrap items-center justify-between gap-2">
                <span>{detailNode.details}</span>
                {detailNode.id === 'mango_point' ? (
                  <span className="text-amber-500 font-bold">★ RELOCATION SITE</span>
                ) : (
                  <span className="text-slate-400 font-bold">★ Active Gate</span>
                )}
              </div>
            </div>
          );
        })()}
      </div>

    </div>
  );
};
