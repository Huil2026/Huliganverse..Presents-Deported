import React, { useState } from 'react';
import { CityStats, DecisionHistoryEntry, District } from '../types';
import { DISTRICTS, STARTER_CITIES } from '../data/applicants';
import {
  Coins, HeartPulse, GraduationCap, Home, Shield, Palmtree, Users,
  UsersRound, Utensils, Radio, Map, History, ShieldAlert, CheckCircle,
  HelpCircle, Eye, Info
} from 'lucide-react';
import { GameMap } from './GameMap';

interface CityDashboardProps {
  stats: CityStats;
  decisions: DecisionHistoryEntry[];
  act: 1 | 2 | 3;
  starterCityId: string;
  walletBalance?: number;
  ledgerExpenses?: string[];
  bribesRecord?: Record<string, 'ACCEPTED' | 'REJECTED' | 'REPORTED'>;
  onSpendMoney?: (item: string, cost: number, statUpgrades?: Partial<CityStats>) => void;
}

export const CityDashboard: React.FC<CityDashboardProps> = ({
  stats,
  decisions,
  act,
  starterCityId,
  walletBalance = 0,
  ledgerExpenses = [],
  bribesRecord = {},
  onSpendMoney
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'districts' | 'consequences' | 'ledger' | 'map'>('stats');

  const starterCity = STARTER_CITIES.find(c => c.id === starterCityId);

  // Helper to map statistic to Lucide icons
  const getStatIcon = (name: keyof CityStats, size = 18) => {
    switch (name) {
      case 'economy':
        return <Coins size={size} className="text-yellow-400" />;
      case 'healthcare':
        return <HeartPulse size={size} className="text-red-400" />;
      case 'education':
        return <GraduationCap size={size} className="text-cyan-400" />;
      case 'housing':
        return <Home size={size} className="text-orange-400" />;
      case 'publicSafety':
        return <Shield size={size} className="text-purple-400" />;
      case 'tourism':
        return <Palmtree size={size} className="text-emerald-400" />;
      case 'laborSupply':
        return <Users size={size} className="text-teal-400" />;
      case 'communityTrust':
        return <UsersRound size={size} className="text-sky-400" />;
      case 'foodCulture':
        return <Utensils size={size} className="text-amber-400" />;
      default:
        return <HelpCircle size={size} />;
    }
  };

  // Helper to map statutory score to level descriptions
  const getStatLevel = (score: number) => {
    if (score >= 80) return { label: 'Exceptional', color: 'text-emerald-400' };
    if (score >= 60) return { label: 'Robust', color: 'text-teal-400' };
    if (score >= 40) return { label: 'Struggling', color: 'text-yellow-400' };
    if (score >= 20) return { label: 'Critical Failure', color: 'text-rose-400 animate-pulse' };
    return { label: 'Anarchy', color: 'text-red-500 font-extrabold animate-pulse' };
  };

  // Build the list of active District status modifiers depending on past choices!
  // e.g. if 'chef_marcus' approved, Market Square gets 'Gourmet jerks'. If deported, gets 'Bland diets'
  const getDistrictStatusModifiers = (districtId: string) => {
    const modifiers: { label: string; positive: boolean; desc: string }[] = [];

    const hasApp = (id: string, decision: string) =>
      decisions.some(d => d.applicantId === id && d.decision === decision);

    switch (districtId) {
      case 'harbourfront':
        if (hasApp('kofi_juma', 'APPROVE')) {
          modifiers.push({ label: 'Reinforced Bulkhead', positive: true, desc: 'Heavy basalt cement walls successfully resist seasonal tidal flooding.' });
        } else if (hasApp('kofi_juma', 'DEPORT')) {
          modifiers.push({ label: 'Flooded Accessways', positive: false, desc: 'Crumbling wooden piers wash away during minor tropical depressions.' });
        }
        if (hasApp('althea_bailey', 'APPROVE')) {
          modifiers.push({ label: 'Solar Fleet Hub', positive: true, desc: 'Solar-assisted wooden skiffs bring regular fresh catch cooperatives.' });
        }
        if (hasApp('nadia_volkov', 'APPROVE')) {
          modifiers.push({ label: 'Luxury Beach Resort', positive: true, desc: 'High-end offshore investment brings rich travelers but privatizes shoreline.' });
        }
        break;

      case 'market_square':
        if (hasApp('chef_marcus', 'APPROVE') || hasApp('returning_chef_marcus_approved', 'APPROVE')) {
          modifiers.push({ label: 'Fusion Culinary Sensation', positive: true, desc: 'Smoked spicy dumplings and pimento wood grills turn this into a tourism hotbed.' });
        } else if (hasApp('chef_marcus', 'DEPORT')) {
          modifiers.push({ label: 'Smirnoff & Bland Staple diet', positive: false, desc: 'Market stands suffer from expensive imported canned preservatives.' });
        }
        if (hasApp('returning_chef_marcus_deported', 'APPROVE')) {
          modifiers.push({ label: 'Secret Lane Joint', positive: true, desc: 'Quiet local alleyway eatery serving amazing smuggled recipes.' });
        }
        break;

      case 'hope_heights':
        if (hasApp('maya_song', 'APPROVE') || hasApp('returning_maya_song_approved', 'APPROVE')) {
          modifiers.push({ label: 'Hope Primary & Woodshop', positive: true, desc: 'Dozens of children receive certified trade training and reliable safety supervision.' });
        } else if (hasApp('maya_song', 'DEPORT')) {
          modifiers.push({ label: 'Unsupervised Streets', positive: false, desc: 'Vagrant youths drift into street gang operations due to lack of local schooling panels.' });
        }
        if (hasApp('cassandra_reyes', 'APPROVE')) {
          modifiers.push({ label: 'Hope First-Aid Clinic', positive: true, desc: 'Localized emergency trauma medicine is available 24/7 on the ridge climbing.' });
        } else if (hasApp('cassandra_reyes', 'DEPORT')) {
          modifiers.push({ label: 'Healthcare Vacuum', positive: false, desc: 'Minor injuries from deep shacks result in extreme clinical emergency transfers.' });
        }
        break;

      case 'industry_yard':
        if (hasApp('rajesh_patel', 'APPROVE')) {
          modifiers.push({ label: 'Stable Solar Microgrid', positive: true, desc: 'Transformer backups eliminate rolls of brownout failures overnight.' });
        } else if (hasApp('rajesh_patel', 'DEPORT')) {
          modifiers.push({ label: 'Rolling Power Brownouts', positive: false, desc: 'Welding machinery is damaged by chaotic grid load surges.' });
        }
        break;

      case 'culture_corner':
        if (hasApp('devon_higgins', 'APPROVE')) {
          modifiers.push({ label: 'Sub-Bass Speaker stack', positive: true, desc: 'Heavy reggae sound waves draw cohesive dancehall assemblies.' });
        }
        if (hasApp('chloe_dubois', 'APPROVE')) {
          modifiers.push({ label: 'Youth Mural Project', positive: true, desc: 'Brilliant historical murals eliminate gang taggings and promote regional pride.' });
        }
        break;

      case 'green_hills':
        if (hasApp('zoe_brooks', 'APPROVE')) {
          modifiers.push({ label: 'Permaculture Composting Ring', positive: true, desc: 'Recycled dock garbage soil supports incredible organic mango seedlings.' });
        }
        if (hasApp('professor_julian', 'APPROVE')) {
          modifiers.push({ label: 'Clay Terrace Aqueducts', positive: true, desc: 'Scientific hillside terracing maintains moisture even during tropical dry seasons.' });
        }
        break;
    }

    return modifiers;
  };

  // TRACE CONSEQUENCE SYSTEM CASES
  // Generates specific "scandals / incidents" based on choices and displays flow diagrams tracing them back!
  const getTraceableCases = () => {
    const list: {
      id: string;
      title: string;
      problemCode: string;
      problemDesc: string;
      severity: 'high' | 'medium' | 'positive';
      traceSteps: { title: string; desc: string; icon: string }[];
    }[] = [];

    // Case 1: Epidemic Crisis vs. Prevented Outbreak
    const deportedEvelyn = decisions.some(d => d.applicantId === 'dr_evelyn' && d.decision === 'DEPORT');
    const approvedEvelyn = decisions.some(d => d.applicantId === 'dr_evelyn' && d.decision === 'APPROVE');
    
    if (deportedEvelyn) {
      list.push({
        id: 'outbreak_tragedy',
        title: 'Epidemic Outbreak in Mango Heights',
        problemCode: 'HEALTHCARE CRISIS',
        problemDesc: 'Dozens of young dockworkers are admitted to the central hospital with severe hemorrhagic fever, shutting down pier loading cranes.',
        severity: 'high',
        traceSteps: [
          { title: 'Current Catastrophe', desc: 'Scurrying mosquitoes in stagnant summer sewer ponds infect eighty residents.', icon: 'ShieldAlert' },
          { title: 'Intermediary Gap', desc: 'No qualified epidemiologists were present to coordinate early larval pesticides or clinic quarantines.', icon: 'Layers' },
          { title: 'Root Decision', desc: 'Day 2: You deported Dr. Evelyn Vance over a minor spelling typo ("Vancee") on her work permit.', icon: 'History' }
        ]
      });
    } else if (approvedEvelyn) {
      list.push({
        id: 'outbreak_prevented',
        title: 'Epidemic Outbreak Averted successfully',
        problemCode: 'HEALTHCARE VICTORY',
        problemDesc: 'Mango Heights malaria levels fell by 82% over the rainy quarter, protecting city labor cycles.',
        severity: 'positive',
        traceSteps: [
          { title: 'Current Standings', desc: 'Clinics reported zero cases of hemorrhagic fever even during seasonal flooding.', icon: 'CheckCircle' },
          { title: 'Effective Intervention', desc: 'Epidemic traps and larval quarantine pools were set up ahead of monsoon vectors.', icon: 'Layers' },
          { title: 'Root Decision', desc: 'Day 2: You approved Dr. Evelyn Vance, validating credentials despite the typist misspelling.', icon: 'History' }
        ]
      });
    }

    // Case 2: Dock Casino Syndicate smuggling
    const approvedLeon = decisions.some(d => d.applicantId === 'leon_sterling' && d.decision === 'APPROVE');
    const auditedLeon = decisions.some(d => d.applicantId === 'returning_leon_sterling_approved' && d.decision === 'INVESTIGATE');
    const deportedLeon = decisions.some(d => d.applicantId === 'leon_sterling' && d.decision === 'DEPORT');

    if (approvedLeon && !auditedLeon) {
      list.push({
        id: 'syndicate_bloodshed',
        title: 'Dockyard Gunfight Scandal',
        problemCode: 'PUBLIC SAFETY HAZARD',
        problemDesc: 'Armed smuggling elements clash with local municipal guards over custom slot machine tax withholdings, leaving three civilian casualties.',
        severity: 'high',
        traceSteps: [
          { title: 'Current Catastrophe', desc: 'A major black-market weapon cache was discovered buried inside the beach slot roulette.', icon: 'ShieldAlert' },
          { title: 'Intermediary Gap', desc: 'Custom cargo containers were approved without deeper physical scans, establishing dock casinos.', icon: 'Layers' },
          { title: 'Root Decision', desc: 'Day 3: You APPROVED Leon "Slick" Sterling, admitting contraband goods under fake laminate.', icon: 'History' }
        ]
      });
    } else if (auditedLeon) {
      list.push({
        id: 'syndicate_busted',
        title: 'Stingray Weapon Syndicate Busted',
        problemCode: 'POLITICAL REPUTATION VICTORY',
        problemDesc: 'You exposed and arrested the largest weapon network in the Southern Islands, confiscating 60 automatic cargo guns.',
        severity: 'positive',
        traceSteps: [
          { title: 'Current Standings', desc: 'Municipal guard forces are fully armed and celebrated with high regional acclaim.', icon: 'CheckCircle' },
          { title: 'Decisive Sting', desc: 'You conducted a Deeper metal-scanner search on the "amusement wheel" cargo trucks, intercepting guns.', icon: 'Layers' },
          { title: 'Root Decision', desc: 'Day 13: You INVESTIGATED the returning Leon Sterling instead of taking his velvet pouch bribe.', icon: 'History' }
        ]
      });
    } else if (deportedLeon) {
      list.push({
        id: 'dockyard_peace',
        title: 'Peaceful Dockyard Trade Lanes',
        problemCode: 'COMMUNITY SAFETY GAIN',
        problemDesc: 'Trade lanes report zero violent offenses. Goods are transported under standard civilian cargo guilds.',
        severity: 'positive',
        traceSteps: [
          { title: 'Current Standings', desc: 'No illegal slot dens or smuggling syndicates established on waterfront piers.', icon: 'CheckCircle' },
          { title: 'Security Guarding', desc: 'Coast guard authorities are easily able to secure local legal shipping lanes.', icon: 'Layers' },
          { title: 'Root Decision', desc: 'Day 3: You DEPORTED Leon Sterling, refusing questionable high-risk offshore businesses.', icon: 'History' }
        ]
      });
    }

    // Case 3: Food crisis vs Success
    const approvedMarcus = decisions.some(d => d.applicantId === 'chef_marcus' && d.decision === 'APPROVE');
    const deportedMarcus = decisions.some(d => d.applicantId === 'chef_marcus' && d.decision === 'DEPORT');

    if (deportedMarcus) {
      list.push({
        id: 'bland_crisis',
        title: 'Decline in Tourism & Local Malnutrition',
        problemCode: 'CIVIC CULTURE CRISIS',
        problemDesc: 'Tourists complain of expensive, stale imported foods with zero regional character. Market Square revenues drop significantly.',
        severity: 'medium',
        traceSteps: [
          { title: 'Current Catastrophe', desc: 'Local spice stands are replaced by low-quality industrial dry supplies.', icon: 'ShieldAlert' },
          { title: 'Intermediary Gap', desc: 'No high-end Jerk-Fusion master chef was allowed to anchor a restaurant or train local kids.', icon: 'Layers' },
          { title: 'Root Decision', desc: 'Day 1: You DEPORTED Chef Marcus Chen over simple verbal travel contract misunderstandings.', icon: 'History' }
        ]
      });
    } else if (approvedMarcus) {
      list.push({
        id: 'jerk_boom',
        title: 'International Jerk Food Hub Praise',
        problemCode: 'CULTURAL BOOM',
        problemDesc: 'National food magazines feature Mango Point as the "Gourmet Capital of the archipelago", driving massive tourism profits.',
        severity: 'positive',
        traceSteps: [
          { title: 'Current Standings', desc: 'Market Square jerks generate huge retail employment and boost community gatherings.', icon: 'CheckCircle' },
          { title: 'Aesthetic Launch', desc: 'Marcus Chen establishes his gorgeous Sichuan fusion restaurant utilizing local scotch bonnet farms.', icon: 'Layers' },
          { title: 'Root Decision', desc: 'Day 1: You approved Chef Marcus Chen, allowing his innovative culinary plans to bloom.', icon: 'History' }
        ]
      });
    }

    return list;
  };

  const traceableCases = getTraceableCases();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      
      {/* City Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <span className="text-xs font-mono tracking-wider text-amber-500 uppercase font-bold">
            Act {act === 3 ? 2 : act}: {act === 1 ? 'Regional Frontier Gateway' : 'Mango Point Municipal Panel'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
            <Radio size={20} className="text-amber-500 animate-pulse" />
            {act === 1 ? `${starterCity?.name || 'Starter City'} HQ` : 'Mango Point Municipality'}
          </h2>
        </div>
        
        {/* Toggle tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            id="tab-stats"
            onClick={() => setActiveTab('stats')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'stats'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            Core Stats
          </button>
          <button
            id="tab-map"
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === 'map'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <Map size={12} />
            Territorial Map
          </button>
          {act === 3 && (
            <>
              <button
                id="tab-districts"
                onClick={() => setActiveTab('districts')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'districts'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                Districts
              </button>
              <button
                id="tab-consequences"
                onClick={() => setActiveTab('consequences')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  activeTab === 'consequences'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                Consequence Audits
                {traceableCases.some(c => c.severity === 'high') && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block animate-ping" />
                )}
              </button>
            </>
          )}
          <button
            id="tab-ledger"
            onClick={() => setActiveTab('ledger')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === 'ledger'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow'
                : 'text-amber-500 border border-amber-950 hover:bg-amber-950/20'
            }`}
          >
            <Coins size={12} />
            Private Drawer
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE TAB: STATS */}
      {activeTab === 'stats' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(stats) as Array<keyof CityStats>).map((key) => {
              const statName = key;
              const score = stats[statName];
              const { label, color } = getStatLevel(score);
              return (
                <div key={key} className="bg-slate-950 border border-slate-850 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-800 transition-all shadow-inner">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                       <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        {getStatIcon(statName, 18)}
                      </div>
                      <span className="text-xs font-bold tracking-wider capitalize text-slate-300">
                        {statName.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </div>
                    <span className="text-sm font-black text-slate-100 font-mono">
                      {score}%
                    </span>
                  </div>
                  
                  <div className="space-y-1.5">
                    {/* Meter Gauge */}
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          score >= 60 ? 'bg-emerald-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className={`font-semibold uppercase tracking-wider ${color}`}>
                        {label}
                      </span>
                      <span className="text-slate-600 font-mono">0 - 100 max</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-950 border border-slate-850 hover:border-slate-800 p-4 rounded-2xl flex items-start gap-3 mt-4">
            <Info size={18} className="text-amber-500 mt-0.5 shrink-0" />
            <div className="text-xs text-slate-400 space-y-1">
              <h4 className="font-bold text-slate-300">Social Interdependence Note:</h4>
              <p>Municipal development stands depend entirely on who operates local services. Approving highly-skilled engineers, educators, and doctors causes rapid upgrades, whereas deporting valuable candidates leads to decay. Choose which systems you prioritize carefully!</p>
            </div>
          </div>
        </div>
      )}

      {/* RENDER ACTIVE TAB: DISTRICTS */}
      {activeTab === 'districts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DISTRICTS.map((dist: District) => {
              const modifiers = getDistrictStatusModifiers(dist.id);
              return (
                <div key={dist.id} className="bg-slate-950 border border-slate-850 hover:border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                      <h3 className="font-extrabold text-slate-200 text-sm flex items-center gap-1.5">
                        <Map size={16} className="text-amber-500" />
                        {dist.name}
                      </h3>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                        District Sector
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed mb-3">
                      {dist.description} <span className="italic text-slate-600">"{dist.flavor}"</span>
                    </p>
                  </div>

                  <div className="space-y-1.5 mt-2">
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                      Physical Changes (Visual Evolution)
                    </span>
                    
                    {modifiers.length === 0 ? (
                      <div className="text-[10px] bg-slate-900 border border-slate-850/50 text-slate-500 py-2 px-3 rounded-lg flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                        Awaiting local development influence. Status is standard.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {modifiers.map((mod, i) => (
                          <div
                            key={i}
                            className={`p-2.5 rounded-xl border text-xs ${
                              mod.positive
                                ? 'bg-emerald-950/30 border-emerald-900/60 text-emerald-300'
                                : 'bg-red-950/30 border-red-900/60 text-red-300'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="font-extrabold tracking-wide">
                                {mod.positive ? '●' : '▲'} {mod.label}
                              </span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-mono font-bold ${
                                mod.positive ? 'bg-emerald-900/40 text-emerald-400' : 'bg-red-900/40 text-red-400'
                              }`}>
                                {mod.positive ? 'Positive' : 'Impediment'}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                              {mod.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* RENDER ACTIVE TAB: CONSEQUENCE TRACER */}
      {activeTab === 'consequences' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-1.5 mb-1.5">
              <Radio size={16} className="text-amber-500 animate-pulse" />
              Trace Consequence System (Audit Log)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every crisis, gang feud, agricultural miracle, or medical breakthrough in Mango Point is directly traceable back to your immigration decisions. Review current active histories to see the precise sequence of events.
            </p>
          </div>

          {traceableCases.length === 0 ? (
            <div className="text-center py-10 bg-slate-950/40 border border-slate-850 rounded-2xl border-dashed">
              <Eye size={28} className="text-slate-600 mx-auto mb-2" />
              <p className="text-slate-400 text-xs font-bold font-mono">NO ACTIVE DIAGNOSE TRACES YET</p>
              <p className="text-slate-500 text-[10px] mt-1">Make major applicant decisions and progress days to view systemic feedback loops.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {traceableCases.map((aud) => (
                <div key={aud.id} className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <div className="flex items-start justify-between border-b border-slate-900 pb-2">
                    <div>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                        aud.severity === 'high' ? 'bg-rose-950 text-rose-400' : aud.severity === 'medium' ? 'bg-yellow-950/50 text-yellow-400' : 'bg-emerald-950 text-emerald-400'
                      }`}>
                        {aud.problemCode}
                      </span>
                      <h4 className="font-extrabold text-slate-100 text-base mt-1 leading-tight">
                        {aud.title}
                      </h4>
                    </div>
                    <Radio size={18} className={`shrink-0 ${
                      aud.severity === 'high' ? 'text-red-500 animate-pulse' : aud.severity === 'medium' ? 'text-yellow-500' : 'text-emerald-500'
                    }`} />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-mono italic">
                    "{aud.problemDesc}"
                  </p>

                  <div className="pt-2 border-t border-slate-900">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">
                      Chronological Cause & Effect Trace:
                    </span>
                    
                    <div className="relative border-l border-slate-800 ml-2 pl-6 space-y-5">
                      {aud.traceSteps.map((step, i) => (
                        <div key={i} className="relative">
                          {/* Circle dot marker */}
                          <div className={`absolute -left-[31px] top-0.5 p-1 rounded-full border border-slate-900 bg-slate-950 text-xs shadow-md ${
                            i === 2
                              ? 'text-amber-400 border-amber-500 animate-pulse'
                              : i === 0
                              ? 'text-rose-400'
                              : 'text-slate-400'
                          }`}>
                            {i === 2 ? <History size={14} /> : i === 0 ? <ShieldAlert size={14} /> : <CheckCircle size={14} />}
                          </div>

                          <span className={`text-[10px] font-bold tracking-wider uppercase block ${
                            i === 2 ? 'text-amber-400' : 'text-slate-400'
                          }`}>
                            {step.title}
                          </span>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed font-mono">
                            {step.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* RENDER ACTIVE TAB: PRIVATE LEDGER DRAWER */}
      {activeTab === 'ledger' && (
        <div className="bg-amber-950/10 border border-amber-900/40 p-6 rounded-2xl space-y-6 relative overflow-hidden shadow-inner font-mono">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.06),transparent)] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-amber-950 pb-4 gap-4">
            <div>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-900/60 font-mono py-1 px-2 rounded-full font-bold uppercase tracking-widest">
                INSPECTOR'S REVENUE & INTEGRITY LEDGER
              </span>
              <h3 className="text-xl font-bold text-amber-100 font-mono flex items-center gap-2 mt-2 leading-none">
                🔑 Confined Mahogany Drawer
              </h3>
            </div>
            
            <div className="bg-slate-950 border-2 border-amber-500/60 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-md">
              <Coins className="text-amber-400 animate-bounce" size={24} />
              <div className="font-mono">
                <span className="text-[9px] text-slate-500 block font-bold uppercase">AVAILABLE CASH</span>
                <span className="text-2xl font-black text-amber-300">${walletBalance}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs leading-normal">
            {/* Left Ledger Column: Active Opportunities */}
            <div className="md:col-span-7 space-y-4">
              <h4 className="text-amber-400 font-extrabold tracking-wider uppercase text-xs">
                Discretionary Spending Action Items
              </h4>
              <p className="text-slate-400 font-mono text-[11px] mb-2 leading-relaxed">
                Use your private capital to fund crucial local upgrades or take care of your personal interests. Upgrades take effect immediately in city stats and influence final ending branches.
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    id: 'family',
                    title: '💌 Support Starving Family in Capital',
                    cost: 100,
                    description: 'Wire relief credits to your spouse and children surviving the cold winter back in the outer gateways.',
                    statBoostDesc: 'Will raise Career Reputation by +15',
                    impacts: {}
                  },
                  {
                    id: 'clinic_material',
                    title: '🏥 Fund Community Triage Clinic',
                    cost: 150,
                    description: 'Inconspicuously buy antibiotics, sutures, and oxygen cylinders for local triage clinics on residential ridges.',
                    statBoostDesc: 'Raises Healthcare (+15) and Community Trust (+10)',
                    impacts: { healthcare: 15, communityTrust: 10 }
                  },
                  {
                    id: 'solar_microgrid',
                    title: '⚡ Sponsor Solar Microgrid Transformers',
                    cost: 125,
                    description: 'Sponsor batteries and modular grid couplers to stop rolling blackouts for local craftsmen in Industry Yard.',
                    statBoostDesc: 'Raises Economy (+12) and Housing (+5)',
                    impacts: { economy: 12, housing: 5 }
                  },
                  {
                    id: 'uniform_upgrade',
                    title: '🎖️ High-Crest Officer Uniform & Gold Stamp',
                    cost: 55,
                    description: 'Upgrade your coat lining, purchase highly polished boots, and gold-cap your mechanical stamps. Project unyielding authority!',
                    statBoostDesc: 'Raises Public Safety (+10) and adds shiny golden border to status checks!',
                    impacts: { publicSafety: 10 }
                  }
                ].map((item) => {
                  const alreadySpent = ledgerExpenses.includes(item.id);
                  const canAfford = walletBalance >= item.cost;
                  
                  return (
                    <div
                      key={item.id}
                      className={`p-4 border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                        alreadySpent
                          ? 'border-emerald-900 bg-emerald-950/20 text-slate-400'
                          : 'border-amber-900/40 bg-slate-950/85 hover:border-amber-800'
                      }`}
                    >
                      <div className="space-y-1 max-w-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-200 text-sm">{item.title}</span>
                          {!alreadySpent && (
                            <span className="text-[10px] font-bold text-amber-400 font-mono bg-amber-950/40 border border-amber-900 px-1.5 py-0.5 rounded">
                              Cost: ${item.cost}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">{item.description}</p>
                        <span className="text-[10px] text-amber-500 font-mono block font-medium font-bold">
                          Effect: {item.statBoostDesc}
                        </span>
                      </div>

                      <div className="shrink-0 w-full sm:w-auto">
                        {alreadySpent ? (
                          <div className="text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-400 px-3 py-1.5 rounded-lg font-black font-mono text-center uppercase tracking-wider">
                            ✓ SECURED
                          </div>
                        ) : (
                          <button
                            id={`spend-btn-${item.id}`}
                            onClick={() => {
                              if (onSpendMoney) {
                                onSpendMoney(item.id, item.cost, item.impacts);
                              }
                            }}
                            disabled={!canAfford}
                            className={`w-full sm:w-auto text-[10px] font-black font-mono px-3.5 py-2 rounded-lg uppercase tracking-wider transition-all ${
                              canAfford
                                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
                                : 'bg-slate-900 text-slate-600 border border-slate-850 cursor-not-allowed'
                            }`}
                          >
                            Spend ${item.cost}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Bribe history & Integrity Audit */}
            <div className="md:col-span-5 bg-slate-950 border border-amber-950/30 p-4 rounded-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[9px] font-bold font-mono text-slate-500 uppercase tracking-widest block">
                  Active Integrity Audit
                </span>
                
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {Object.keys(bribesRecord).length === 0 ? (
                    <div className="text-slate-500 italic text-center py-8 text-[11px]">
                      No bribery inquiries recorded yet. Unused envelopes remain sealed.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(bribesRecord).map(([appId, status]) => {
                        const isAcc = status === 'ACCEPTED';
                        const isRep = status === 'REPORTED';
                        
                        return (
                          <div
                            key={appId}
                            className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg flex items-center justify-between font-mono text-[10px]"
                          >
                            <div>
                              <span className="text-slate-200 font-bold capitalize">{appId.replace(/_/g, ' ')}</span>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded font-black uppercase text-[8px] ${
                                isAcc
                                  ? 'bg-rose-950 text-rose-400 border border-rose-900'
                                  : isRep
                                  ? 'bg-indigo-950 text-indigo-400 border border-indigo-900'
                                  : 'bg-slate-950 text-slate-500 border border-slate-850'
                              }`}
                            >
                              {status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-amber-950/20 border border-amber-900/35 p-3 rounded-lg leading-normal text-[11px] font-mono text-amber-400">
                <span className="font-extrabold block text-[9px] uppercase tracking-wider mb-0.5 text-amber-500">
                  ⚠️ Ministry Policy Memo:
                </span>
                Refusing or seizing bribes builds Community Trust. Accepting bribes will deplete your Career Reputation. Remember: Internal Intelligence audits your files regularly!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER ACTIVE TAB: GEOGRAPHIC SURVEY MAP */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <GameMap currentCityId={starterCityId} isRelocated={act === 3} />
        </div>
      )}

    </div>
  );
};
