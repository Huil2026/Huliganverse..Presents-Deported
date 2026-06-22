import React from 'react';
import { DecisionType, CityStats } from '../types';
import { Film, ArrowRight, ShieldAlert, Heart, Coins, Music } from 'lucide-react';

interface CutsceneProps {
  type: 'fallout' | 'relocation';
  applicantName?: string;
  decision?: DecisionType;
  consequenceText?: string;
  statImpacts?: Partial<CityStats>;
  relocationReason?: string;
  starterCityName?: string;
  onComplete: () => void;
}

export const Cutscene: React.FC<CutsceneProps> = ({
  type,
  applicantName,
  decision,
  consequenceText,
  statImpacts,
  relocationReason,
  starterCityName,
  onComplete
}) => {

  const getDecisionColor = (dec?: DecisionType) => {
    switch (dec) {
      case 'APPROVE': return 'text-emerald-400 border-emerald-900 bg-emerald-950/20';
      case 'DEPORT': return 'text-rose-400 border-rose-900 bg-rose-950/20';
      case 'DELAY': return 'text-yellow-400 border-yellow-900 bg-yellow-950/20';
      case 'TEMPORARY': return 'text-cyan-400 border-cyan-900 bg-cyan-950/20';
      case 'INVESTIGATE': return 'text-indigo-400 border-indigo-900 bg-indigo-950/20';
      default: return 'text-slate-400 border-slate-900 bg-slate-950/20';
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-slate-100 bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative select-none animate-fade-in">
      
      {/* Decorative sunburst behind */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.05),transparent)] pointer-events-none" />

      {/* RENDER FALLOUT CUTSCENE TYPE */}
      {type === 'fallout' && (
        <div className="space-y-6 relative z-10">
          <div className="text-center space-y-1">
            <span className="text-[10px] bg-red-950 text-red-400 border border-red-900 font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <Film size={12} /> Fallout Case report
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 mt-2">
              The Fate of {applicantName}
            </h1>
            <div className="flex justify-center mt-2">
              <span className={`px-3 py-1 border rounded-lg text-xs font-mono font-extrabold uppercase ${getDecisionColor(decision)}`}>
                Decision Seared: {decision}
              </span>
            </div>
          </div>

          {/* Comic panel box */}
          <div className="bg-slate-900 border-4 border-amber-400 rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-amber-950/10">
            <div className="absolute top-1 left-2 text-[9px] font-mono text-slate-500">FRAME #01</div>
            <div className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-500">STATUS: CONCLUDED</div>
            
            <p className="text-sm sm:text-base text-slate-200 mt-2 font-mono leading-relaxed italic border-l-4 border-amber-400 pl-4">
              "{consequenceText || 'Your decision settles into state architecture, locking down localized progressions.'}"
            </p>
          </div>

          {/* Stat impact ledger */}
          {statImpacts && Object.keys(statImpacts).length > 0 && (
            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                Systemic City Metrics feedback:
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(statImpacts).map(([stat, val]) => {
                  const numberVal = val as number;
                  return (
                    <span
                      key={stat}
                      className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${
                        numberVal > 0
                          ? 'bg-emerald-950/40 border-emerald-900 text-emerald-400'
                          : 'bg-rose-950/40 border-rose-900 text-rose-450'
                      }`}
                    >
                      {stat.toUpperCase()}: {numberVal > 0 ? `+${numberVal}` : numberVal}%
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dialogue text box of reaction */}
          <div className="bg-slate-900/60 p-4 border border-slate-850 rounded-2xl text-xs text-slate-400 font-mono leading-relaxed">
            <span className="font-bold text-slate-300 block mb-1">MUNICIPAL SURVEY OFFICE RECOGNITION:</span>
            "Every citizen decision aggregates into the cultural and physical fabric of our sectors. Tourists, local bands, and agricultural cooperatives are responding to today’s border resolution. Proceed with next case dossier."
          </div>

          <button
            id="cutscene-continue-btn"
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-405 hover:to-red-405 font-bold text-slate-950 py-3.5 px-6 rounded-xl hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 uppercase text-xs tracking-wider"
          >
            Advance to next morning <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* RENDER RELATION FORCED TRANSITION CUTSCENE */}
      {type === 'relocation' && (
        <div className="space-y-6 relative z-10">
          <div className="text-center space-y-1">
            <span className="text-[12px] bg-red-950 text-red-500 border border-red-900 font-mono tracking-widest uppercase font-black px-3 py-1 rounded-full inline-flex items-center gap-1.5 animate-pulse">
              <ShieldAlert size={14} /> IMMIGRATION COMMAND SCANDAL ACTION
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 mt-2">
              Intermission: Forced Relocation
            </h1>
          </div>

          <p className="text-xs text-slate-400 border-b border-slate-900 pb-3 font-mono">
            GATEWAY REPORT: Assignment ended at {starterCityName || 'Starter Frontier'}.
          </p>

          <div className="space-y-4">
            
            {/* Comic panel box 1: The scandal */}
            <div className="bg-slate-900 border-l-4 border-red-500 rounded-2xl p-5 relative">
              <h3 className="font-extrabold text-sm text-red-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1">
                <Coins size={14} /> The Accusation / Scandal reason
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 italic font-mono leading-relaxed">
                "Following high audit inspections, the Capital Ministry accuses you of: <strong className="text-amber-400 uppercase">'{relocationReason}'</strong>. To prevent deep judicial investigations, you are stripped of your corporate salary!"
              </p>
            </div>

            {/* Comic panel box 2: The ferry ride */}
            <div className="bg-slate-900 border-l-4 border-amber-500 rounded-2xl p-5 relative">
              <h3 className="font-extrabold text-sm text-amber-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1">
                <Music size={14} /> Boarding the Red Dust Ferry
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 italic font-mono leading-relaxed">
                "You are thrown onto the rusty deck of the Red Dust, a municipal ferry chugging south. Your new assignment is <strong className="text-amber-400 uppercase">Mango Point</strong>—a struggling coastal slum with dilapidated bulkheads and empty clinics."
              </p>
            </div>

            {/* Comic panel box 3: The hope */}
            <div className="bg-slate-900 border-l-4 border-cyan-500 rounded-2xl p-5 relative">
              <h3 className="font-extrabold text-sm text-cyan-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1">
                <Heart size={14} /> Mango Point is Not Broken
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 italic font-mono leading-relaxed">
                "As the salty breeze hits you, you realize. Mango Point isn't broken. It’s simply overlooked. Many applicants you processed earlier have clustered here. Their fates remain woven with your stamps. You are the architect."
              </p>
            </div>

          </div>

          <button
            id="cutscene-continue-relocation-btn"
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-400 hover:to-amber-400 font-bold text-slate-950 py-3.5 px-6 rounded-xl shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 uppercase text-xs tracking-wider"
          >
            Debark at Mango Point Harbour <ArrowRight size={14} />
          </button>
        </div>
      )}

    </div>
  );
};
