import React, { useState } from 'react';
import { STARTER_CITIES } from '../data/applicants';
import { StarterCity } from '../types';
import { Shield, Anchor, Hammer, TreePine, Award, User, Sparkles, Radio } from 'lucide-react';
import { GameMap } from './GameMap';

const NEWS_HEADLINES = [
  "Mango Point clinics operating at 40% capacity.",
  "Ferry delays continue along southern coastal routes.",
  "Business owners demand intervention in Mango Point.",
  "Mango Point teacher shortages worsen.",
  "Officials deny rumors of a humanitarian crisis in Mango Point.",
  "Tourism board launches campaign to revive Mango Point.",
  "Cargo theft investigations continue at Mango Point Harbour.",
  "Mango Point residents call for infrastructure investment.",
  "Power grid failures trigger blackouts in Mango Point.",
  "Substandard municipal funding criticized in southern districts.",
  "Mango Point sanitary workers announce strike over wage disputes.",
  "Agricultural shipments halted due to southern port blockages.",
  "Public safety patrols increased in Mango Point central sectors.",
  "Slight rise in outbound migration reported from southern islands.",
  "Mango Point regional council requests urgent medical supply drop.",
  "Emergency medical flights dispatch limit reached in Mango Point.",
  "Deep sea telecommunication cable repairs disrupt southern connectivity.",
  "Sovereign council holds closed-session hearing on southern territory budgets."
];

interface StarterCityChooserProps {
  onSelect: (cityName: string, cityId: string) => void;
}

export const StarterCityChooser: React.FC<StarterCityChooserProps> = ({ onSelect }) => {
  const [playerName, setPlayerName] = useState('Officer Henderson');
  const [selectedCityId, setSelectedCityId] = useState('port_ashley');

  // Select one random news headline per session
  const [newsHeadline] = useState(() => NEWS_HEADLINES[Math.floor(Math.random() * NEWS_HEADLINES.length)]);

  const selectedCity = STARTER_CITIES.find(c => c.id === selectedCityId) || STARTER_CITIES[0];

  const handleStartGame = () => {
    if (!playerName.trim()) return;
    onSelect(playerName, selectedCityId);
  };

  const getCityIcon = (id: string, size: number = 24) => {
    switch (id) {
      case 'port_ashley':
        return <Shield size={size} className="text-blue-400" />;
      case 'seaview':
        return <Anchor size={size} className="text-cyan-400" />;
      case 'riverton':
        return <Hammer size={size} className="text-orange-400" />;
      case 'highland_gate':
        return <TreePine size={size} className="text-emerald-400" />;
      default:
        return <Award size={size} className="text-amber-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-slate-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-yellow-400 via-amber-500 to-red-500 bg-clip-text text-transparent drop-shadow-md mb-2">
          DEPORTED
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Every file tells a story. Every decision builds a city. Choose your starting district assignment to begin Act 1.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        
        {/* Left column: Setup Name & Options info */}
        <div className="md:col-span-1 space-y-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
          <div className="space-y-4">
            <div>
              <label className="block text-amber-400 font-bold tracking-wider text-xs uppercase mb-2">
                Officer Credentials
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="officer-name-input"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value.slice(0, 24))}
                  placeholder="Enter officer surname..."
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-100 rounded-xl py-3 pl-10 pr-4 text-sm font-medium transition-all"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Your name will appear on official deportation stamps and regional archives.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-850 rounded-2xl p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <Sparkles size={14} className="text-amber-400" /> Administrative Notice
              </h3>
              <p className="text-xs leading-relaxed text-slate-400/90 gap-1 flex flex-col">
                <span>Immigration officers may be reassigned between regions based on performance reviews, staffing shortages, departmental restructuring, or national priorities.</span>
                <span className="block mt-1 pt-1 border-t border-slate-900 text-slate-500 text-[10px]">Assignment histories remain permanently attached to officer records.</span>
              </p>
            </div>

            {/* National News Bulletin Panel */}
            <div className="bg-slate-950/80 border border-slate-850 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500" />
              <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <Radio size={14} className="text-amber-500 animate-pulse shrink-0" /> National News Bulletin
              </h3>
              <div className="p-3 bg-slate-900/95 rounded-xl border border-red-950/40 font-mono text-[11px] leading-relaxed text-slate-300">
                <span className="text-red-500 font-extrabold text-[9px] uppercase tracking-wider block mb-1">
                  [ WIRE TRANSCRIPT ]
                </span>
                <p className="italic">
                  "{newsHeadline}"
                </p>
              </div>
              <div className="flex justify-between items-center mt-2 text-[9px] font-mono text-slate-500">
                <span>SOURCE: CONTINENTAL DIGEST</span>
                <span className="text-slate-600 animate-pulse">● BROADCAST LIVE</span>
              </div>
            </div>
          </div>

          <button
            id="start-career-btn"
            onClick={handleStartGame}
            disabled={!playerName.trim()}
            className="w-full mt-6 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 font-bold text-slate-950 py-3.5 px-6 rounded-xl shadow-lg shadow-amber-950/20 active:scale-[0.98] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed text-center text-sm tracking-wider uppercase"
          >
            Commence Assignment
          </button>
        </div>

        {/* Right column: Choose Starter City */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-sm font-bold tracking-widest text-amber-400 uppercase mb-4">
            Select Starter Gateway
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STARTER_CITIES.map((city) => {
              const matchesSelected = selectedCityId === city.id;
              return (
                <button
                  id={`city-choice-${city.id}`}
                  key={city.id}
                  onClick={() => setSelectedCityId(city.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    matchesSelected
                      ? 'border-amber-400 bg-amber-950/20 shadow-lg shadow-amber-950/10'
                      : 'border-slate-800/80 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      {getCityIcon(city.id, 20)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm sm:text-base leading-tight">
                        {city.name}
                      </h3>
                      <span className="text-[10px] text-slate-500 tracking-wider uppercase font-mono">
                        Pay: {city.pay}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {city.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Details for Selected Starter City */}
          <div className="bg-slate-950/60 border border-slate-850 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pm-2 pb-2">
              {getCityIcon(selectedCity.id, 22)}
              <h3 className="font-bold text-amber-400 text-sm">
                Assignment Dossier: {selectedCity.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs leading-relaxed">
              <div>
                <span className="text-slate-500 font-mono">CORE PRIORITIES:</span>
                <p className="text-slate-300 font-medium">{selectedCity.priority}</p>
              </div>
              <div>
                <span className="text-slate-500 font-mono">DEPORTATION QUOTAS:</span>
                <p className="text-slate-300 font-medium">{selectedCity.quotas}</p>
              </div>
              <div className="sm:col-span-2 mt-2">
                <span className="text-slate-500 font-mono">REGIONAL CHALLENGE:</span>
                <p className="text-slate-300 font-medium">{selectedCity.challenge}</p>
              </div>
              <div className="sm:col-span-2 mt-3">
                <span className="text-slate-500 font-mono">INITIAL IMPACT OVERLAY:</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {Object.entries(selectedCity.statsBoost).map(([stat, val]) => (
                    <span
                      key={stat}
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider font-semibold ${
                        val > 0
                          ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900'
                          : 'bg-rose-950/50 text-rose-400 border border-rose-900'
                      }`}
                    >
                      {stat}: {val > 0 ? `+${val}` : val}%
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Territorial Map Survey */}
          <div className="mt-6 border border-slate-850/80 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-slate-900/60 p-3.5 border-b border-slate-850">
              <span className="text-[10px] font-mono tracking-wider text-amber-500 font-extrabold uppercase">PROVINCIAL SURVEY HUD</span>
              <h4 className="text-xs font-bold text-slate-300">Territorial Deployment Blueprint</h4>
            </div>
            <GameMap 
              currentCityId={selectedCityId} 
              hideSecretSector={true}
              onNodeClick={(clickedId) => {
                // Click on map to auto select starter city, if click on mango_point show warning or do nothing as it's the target relocation
                if (clickedId !== 'mango_point') {
                  setSelectedCityId(clickedId);
                }
              }} 
            />
          </div>

        </div>

      </div>
    </div>
  );
};
