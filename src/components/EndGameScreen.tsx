import React from 'react';
import { CityStats, DecisionHistoryEntry } from '../types';
import { STARTER_CITIES } from '../data/applicants';
import { Trophy, RefreshCw, History, Star, Users, ShieldAlert, Coins } from 'lucide-react';

interface EndGameScreenProps {
  stats: CityStats;
  decisions: DecisionHistoryEntry[];
  starterCityId: string;
  playerName: string;
  onRestart: () => void;
}

export const EndGameScreen: React.FC<EndGameScreenProps> = ({
  stats,
  decisions,
  starterCityId,
  playerName,
  onRestart
}) => {
  const starterCity = STARTER_CITIES.find(c => c.id === starterCityId);

  // EVALUATOR LOGIC FOR 6 DISTINCT ENDINGS
  const getEndingDetails = () => {
    const totalDeports = decisions.filter(d => d.decision === 'DEPORT').length;
    const totalApproves = decisions.filter(d => d.decision === 'APPROVE').length;
    const averageScore = (Object.values(stats) as number[]).reduce((a, b) => a + b, 0) / Object.values(stats).length;

    // 1. Corrupt City (Public Safety is very low, or Leon Sterling was approved twice)
    if (stats.publicSafety < 30 && decisions.some(d => d.applicantId.includes('leon_sterling'))) {
      return {
        id: 'corrupt_city',
        title: 'Corrupt City',
        description: 'You prioritized bribes and questionable casino cartels over community interest. Under Leon Sterling’s syndicate, heavy smuggling dominates Mango Point. The streets belong to gangs; honest fishers and teachers have fled.',
        themeClass: 'from-purple-950 via-slate-900 to-slate-950 border-purple-500 text-purple-400',
        rating: 'D - Bureaucratic Failure'
      };
    }

    // 2. Empty City (High Deportation rate)
    if (totalDeports >= 7) {
      return {
        id: 'empty_city',
        title: 'Empty City',
        description: 'Driven by suspicion or strict quota paranoia, you slammed the gate on almost everyone. The schools are vacant, fields lie untilled, and clinical reserves remain in customs boxes. Mango Point is safe, but entirely abandoned and lifeless.',
        themeClass: 'from-slate-950 via-slate-900 to-slate-950 border-slate-500 text-slate-400',
        rating: 'E - Gatekeeper Paranoia'
      };
    }

    // 3. Overloaded City (Struggling stats & extremely low Housing)
    if (stats.housing < 30 && totalApproves >= 9) {
      return {
        id: 'overloaded_city',
        title: 'Overloaded City',
        description: 'You showed deep compassion but completely ignored administrative housing structures. Tenements at Hope Heights are collapsing under massive population pressure. Sewage systems are overloaded, resulting in widespread plumbing outages.',
        themeClass: 'from-orange-950 via-slate-900 to-slate-950 border-orange-500 text-orange-400',
        rating: 'C - Naive Humanitarian'
      };
    }

    // 4. Second Chance City (High Community Trust)
    if (stats.communityTrust >= 65 && totalApproves >= 7) {
      return {
        id: 'second_chance_city',
        title: 'Second Chance City',
        description: 'By prioritizing family reunifications, community educators, and organic builders, you created a sanctuary of redemption. Mango Point is celebrated as a town where desperate families got a real third chance to thrive in peace.',
        themeClass: 'from-cyan-950 via-slate-900 to-slate-950 border-cyan-500 text-cyan-400',
        rating: 'A - Community Builder'
      };
    }

    // 5. Security State (High Safety but dry details)
    if (stats.publicSafety >= 65 && stats.tourism < 35) {
      return {
        id: 'security_state',
        title: 'Security State',
        description: 'You established flawless security walls. Guard posts check every suitcase twice. There is zero crime, but also zero steel-pan bands, zero fusion seasonings, and zero tourists. The city lives in sterile, stagnant silence.',
        themeClass: 'from-indigo-950 via-slate-900 to-slate-950 border-indigo-500 text-indigo-400',
        rating: 'B - Watchful Guardian'
      };
    }

    // 6. Mango Point Rising (Default High stats / Thriving)
    if (averageScore >= 55) {
      return {
        id: 'mango_point_rising',
        title: 'Mango Point Rising',
        description: 'The ultimate administrative success! You balanced security checks with organic local talent. Solar grids run continuously, high-yield cooperative fisheries thrive, and Fusion diners are packed with rich international cruise-ship tourists.',
        themeClass: 'from-amber-950 via-slate-900 to-slate-950 border-amber-500 text-amber-400',
        rating: 'S - Administrative Mastermind'
      };
    }

    // Standard baseline ending
    return {
      id: 'mango_point_rising',
      title: 'Mango Point Restored',
      description: 'You successfully completed your relocation assignment. Mango Point is slowly integrating into a respectable, standard regional precinct under your custom leadership.',
      themeClass: 'from-slate-950 via-slate-900 to-slate-950 border-slate-700 text-slate-300',
      rating: 'B - Standard Officer'
    };
  };

  const ending = getEndingDetails();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-slate-100 space-y-8 select-none animate-fade-in">
      
      {/* Landing header */}
      <div className="text-center space-y-2">
        <span className="text-xs bg-amber-500 text-slate-950 px-3 py-1 rounded-full font-mono font-bold tracking-widest uppercase">
          COMMISSION FILE CONCLUDED
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-yellow-400 via-amber-500 to-red-500 bg-clip-text text-transparent">
          CAREER CONCLUSION
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Administrative reviews of Officer <strong>{playerName}</strong> are finalized. The history logs have been permanent-stamped.
        </p>
      </div>

      {/* Main Ending Reveal Box */}
      <div className={`border-2 rounded-3xl p-6 sm:p-8 bg-gradient-to-b ${ending.themeClass} relative overflow-hidden shadow-2xl`}>
        {/* Sunburst glowing background */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4 relative z-10">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              ASSIGNMENT PATHWAY UNLOCKED
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
              Ending: {ending.title}
            </h2>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/10 text-center font-mono font-black shadow-inner shrink-0">
            <span className="text-[9px] text-slate-400 uppercase tracking-widest block">RATING</span>
            <span className="text-sm sm:text-base text-yellow-400">{ending.rating}</span>
          </div>
        </div>

        <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-mono italic p-4 bg-black/30 border border-white/5 rounded-2xl relative z-10">
          "{ending.description}"
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center relative z-10">
          <div className="bg-black/30 p-3 rounded-2xl border border-white/5 font-mono">
            <span className="text-[9px] text-slate-400 block uppercase">Gateway start:</span>
            <span className="text-xs text-white font-bold">{starterCity?.name || 'Border control'}</span>
          </div>
          <div className="bg-black/30 p-3 rounded-2xl border border-white/5 font-mono">
            <span className="text-[9px] text-slate-400 block uppercase">STAMPS SEALED:</span>
            <span className="text-xs text-white font-bold">{decisions.length} / 15 Cases</span>
          </div>
          <div className="bg-black/30 p-3 rounded-2xl border border-white/5 font-mono">
            <span className="text-[9px] text-slate-400 block uppercase">DEPORT RATE:</span>
            <span className="text-xs text-rose-400 font-bold">
              {Math.round((decisions.filter(d => d.decision === 'DEPORT').length / decisions.length) * 100)}%
            </span>
          </div>
          <div className="bg-black/30 p-3 rounded-2xl border border-white/5 font-mono">
            <span className="text-[9px] text-slate-400 block uppercase">COMMUNITY TRUST:</span>
            <span className="text-xs text-cyan-400 font-bold">{stats.communityTrust}%</span>
          </div>
        </div>
      </div>

      {/* Retrospective Decision Timeline Log */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="font-extrabold text-slate-200 text-sm sm:text-base flex items-center gap-1.5 border-b border-slate-800 pb-3">
          <History size={18} className="text-amber-500" />
          Retrospective Decision Archives
        </h3>

        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 scrollbar-thin">
          {decisions.map((entry, idx) => (
            <div key={idx} className="bg-slate-950 hover:bg-slate-950/80 p-3 rounded-2xl flex items-start gap-3 border border-slate-850">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 font-mono text-center shrink-0 min-w-[55px]">
                <span className="text-[9px] text-slate-500 uppercase block">DAY</span>
                <span className="text-xs text-amber-500 font-black">{entry.day}</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-slate-200">{entry.applicantName}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-mono font-bold ${
                    entry.decision === 'APPROVE'
                      ? 'bg-emerald-950 text-emerald-400'
                      : entry.decision === 'DEPORT'
                      ? 'bg-rose-950 text-rose-400'
                      : 'bg-slate-900 text-slate-400'
                  }`}>
                    {entry.decision}
                  </span>
                  <span className="text-[9px] text-slate-650 font-mono">@{entry.city}</span>
                </div>
                <p className="text-slate-400 font-mono text-[11px] leading-relaxed">
                  Consequence Trace: {entry.traceSummary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons footer */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          id="replay-game-btn"
          onClick={onRestart}
          className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 font-bold text-slate-950 py-3.5 px-8 rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 uppercase text-xs tracking-wider"
        >
          <RefreshCw size={14} /> COMMENCE NEW ADMINISTRATIVE ASSIGNMENT
        </button>
      </div>

    </div>
  );
};
