import { useState, useEffect } from 'react';
import { GameState, CityStats, DecisionType, DecisionHistoryEntry } from './types';
import { STARTER_CITIES, INITIAL_CITY_STATS, getApplicantForDay } from './data/applicants';
import { StarterCityChooser } from './components/StarterCityChooser';
import { CityDashboard } from './components/CityDashboard';
import { InterviewUI } from './components/InterviewUI';
import { Cutscene } from './components/Cutscene';
import { EndGameScreen } from './components/EndGameScreen';
import { SoundtrackDeck } from './components/SoundtrackDeck';

import {
  FolderKanban, RefreshCw, Volume2, VolumeX, Save, Trash2, Home,
  ArrowRight, Radio, Shield, Sparkles, Smile, MessageSquare, Anchor
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'deported_game_state_save';

// Simple web synth sound generator for physical feedback
const playSynthesizerSound = (type: 'chirp' | 'beep' | 'stamp' | 'confront') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'chirp') {
      // Diagnostic receipt sound
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'beep') {
      // Small button click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'stamp') {
      // Heavy mechanical thump sound
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);

      // Add a small noise burst for friction sound
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.15, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();
    } else if (type === 'confront') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch (e) {
    // Ignore audio failures if blocked by browser policy
  }
};

export default function App() {
  // Primary screens manager
  const [screen, setScreen] = useState<'main_menu' | 'city_chooser' | 'gameplay' | 'cutscene' | 'ending'>('main_menu');
  const [gameState, setGameState] = useState<GameState | null>(null);
  
  // Cutscene specific visual feeds
  const [activeCutscene, setActiveCutscene] = useState<{
    type: 'fallout' | 'relocation';
    applicantName?: string;
    decision?: DecisionType;
    consequenceText?: string;
    statImpacts?: Partial<CityStats>;
  } | null>(null);

  // Settings: Audio & CRT filter styling
  const [muted, setMuted] = useState<boolean>(false);
  const [crtFilter, setCrtFilter] = useState<boolean>(false);

  // Load state from local storage on bootstrap
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as GameState;
        // Verify structural sanity before saving
        if (parsed.playerName && parsed.starterCityId) {
          setGameState(parsed);
        }
      } catch (err) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  // Sync state to local storage whenever game elements change
  const saveState = (newState: GameState) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    setGameState(newState);
  };

  // Sound Feedback Wrapper
  const touchSound = (type: 'chirp' | 'beep' | 'stamp' | 'confront') => {
    if (!muted) playSynthesizerSound(type);
  };

  // Initialize new career elements
  const handleStartCareer = (playerName: string, starterCityId: string) => {
    touchSound('chirp');
    
    // Choose selected starter city boost
    const city = STARTER_CITIES.find(c => c.id === starterCityId)!;
    const initialStats = { ...INITIAL_CITY_STATS };
    Object.entries(city.statsBoost).forEach(([stat, val]) => {
      const sKey = stat as keyof CityStats;
      initialStats[sKey] = Math.max(0, Math.min(100, initialStats[sKey] + val));
    });

    const freshState: GameState = {
      playerName,
      reputation: 55,
      starterCityId,
      currentDay: 1,
      act: 1,
      cityStats: initialStats,
      decisions: [],
      currentApplicantId: getApplicantForDay(1, []).id,
      relocationReason: '',
      currentEventId: null,
      gameEnded: false,
      endingId: null,
      unlockedTools: []
    };

    saveState(freshState);
    setScreen('gameplay');
  };

  // Resume active saved career
  const handleResumeCareer = () => {
    if (!gameState) return;
    touchSound('beep');
    if (gameState.gameEnded) {
      setScreen('ending');
    } else {
      setScreen('gameplay');
    }
  };

  // Deletes current active game states from localStorage
  const handleClearCareer = () => {
    if (window.confirm('Are you absolute sure you want to permanently delete your save file? This irreversibly clears applicant files.')) {
      touchSound('confront');
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setGameState(null);
      setScreen('main_menu');
    }
  };

  // PROCESS APPLICANT IMMIGRATION STAMP
  const handleProcessDecision = (decision: DecisionType) => {
    if (!gameState) return;
    touchSound('stamp');

    const app = getApplicantForDay(gameState.currentDay, gameState.decisions);
    const impact = app.statImpacts[decision];
    const consequence = app.consequenceSummary[decision];

    // Build the tracing summaries
    let trace = `Decided ${decision} on ${app.name}.`;
    if (decision === 'APPROVE') {
      trace = `Approving ${app.name} (${app.profession}) brought constructive growth to sectors.`;
    } else if (decision === 'DEPORT') {
      trace = `Deporting ${app.name} saved corporate security margins but blocked local labor expansion.`;
    } else if (decision === 'DELAY') {
      trace = `Delayed ${app.name}'s file to safeguard regional documentation channels.`;
    } else if (decision === 'TEMPORARY') {
      trace = `Sovereign temporary permit allowed ${app.name} restricted operational periods.`;
    } else if (decision === 'INVESTIGATE') {
      trace = `Deep judicial background checks verified ${app.name} credentials thoroughly.`;
    }

    // Update City Stats safely
    const updatedStats = { ...gameState.cityStats };
    Object.entries(impact).forEach(([stat, val]) => {
      const key = stat as keyof CityStats;
      updatedStats[key] = Math.max(0, Math.min(100, updatedStats[key] + val));
    });

    // Create decision archive entry
    const entry: DecisionHistoryEntry = {
      day: gameState.currentDay,
      applicantId: app.id,
      applicantName: app.name,
      decision,
      city: gameState.act === 1 ? 'Port Control' : 'Mango Point',
      comicPanels: [consequence],
      traceSummary: trace
    };

    const updatedDecisions = [...gameState.decisions, entry];

    // Setup active fallout cutscene metrics to display
    setActiveCutscene({
      type: 'fallout',
      applicantName: app.name,
      decision,
      consequenceText: consequence,
      statImpacts: impact
    });

    // Save preliminary metrics progression
    setGameState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        cityStats: updatedStats,
        decisions: updatedDecisions
      };
    });

    setScreen('cutscene');
  };

  // TRIGGER NEXT DAY PROGRESS
  const handleCutsceneComplete = () => {
    if (!gameState) return;
    touchSound('chirp');

    const completedDay = gameState.currentDay;
    const nextDay = completedDay + 1;
    let nextAct = gameState.act;
    let relocationReason = gameState.relocationReason;

    // ACT 1 COMPLETE -> TRANSITION TO ACT 2 FORCED MOVES
    if (completedDay === 5 && gameState.act === 1) {
      nextAct = 2; // Relocation Cutscene!
      
      // Determine forced move reason based on starter city selection and Approve rate
      const approves = gameState.decisions.filter(d => d.decision === 'APPROVE').length;
      if (gameState.starterCityId === 'port_ashley') {
        relocationReason = approves >= 3 
          ? 'EXPOSING SHADY SHELL TAX AVOIDANCES WITH CORRUPT SYNDICATES' 
          : 'FAILING CORPORATE REVENUE MINING QUOTAS (TOO PARANOID)';
      } else if (gameState.starterCityId === 'seaview') {
        relocationReason = 'DOCK-SIDE HOTEL PRIVATIZATION SCANDALS & DEVELOPER GRAFT';
      } else if (gameState.starterCityId === 'riverton') {
        relocationReason = 'LEAKING POISON CONCRETE LAB DATA TO CRITIC COALITIONS';
      } else {
        relocationReason = 'SEVERE SOCIAL INTEGRATION COLLAPSES (APPROVING GANG STATIONS)';
      }

      setActiveCutscene({
        type: 'relocation',
        consequenceText: relocationReason
      });

      // Update intermediate state variables
      const stepState: GameState = {
        ...gameState,
        act: 2,
        relocationReason
      };
      saveState(stepState);
      return;
    }

    // Debark at Mango Point (Act 2 ends)
    if (gameState.act === 2) {
      const stepState: GameState = {
        ...gameState,
        act: 3,
        currentDay: 6,
        currentApplicantId: getApplicantForDay(6, gameState.decisions).id
      };
      saveState(stepState);
      setActiveCutscene(null);
      setScreen('gameplay');
      return;
    }

    // ACT 3 COMPLETE -> TRIGGERS END GAME EVALUATION
    if (completedDay === 15) {
      const finalState: GameState = {
        ...gameState,
        gameEnded: true
      };
      saveState(finalState);
      setActiveCutscene(null);
      setScreen('ending');
      return;
    }

    // Otherwise, increment normal day progression
    const stepState: GameState = {
      ...gameState,
      currentDay: nextDay,
      currentApplicantId: getApplicantForDay(nextDay, gameState.decisions).id
    };
    saveState(stepState);
    setActiveCutscene(null);
    setScreen('gameplay');
  };

  const activeApplicant = gameState ? getApplicantForDay(gameState.currentDay, gameState.decisions) : null;
  const currentStarterCity = gameState ? STARTER_CITIES.find(c => c.id === gameState.starterCityId) : null;

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-all duration-305 relative selection:bg-amber-500 selection:text-slate-950 ${
      crtFilter ? 'before:content-[""] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] before:bg-[length:100%_4px,_6px_100%] before:pointer-events-none before:z-50' : ''
    }`}>

      {/* TOP HEADER STATUS PANEL */}
      <header className="bg-slate-900/85 border-b border-slate-800 p-4 sticky top-0 z-30 backdrop-blur flex justify-between items-center sm:px-6">
        <div className="flex items-center gap-3">
          <button
            id="home-logo-btn"
            onClick={() => { touchSound('beep'); setScreen('main_menu'); }}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent hover:opacity-80 font-black text-sm tracking-widest uppercase focus:outline-none"
          >
            <Radio className="text-amber-500 shrink-0" size={18} />
            HULIGANVERSE PRESENTS: DEPORTED
          </button>
          
          {screen === 'city_chooser' ? (
            <div className="hidden md:flex items-center gap-2 text-xs border-l border-slate-800 pl-3 text-slate-500">
              <span>Officer: <strong className="text-slate-300 font-mono">Pending Assignment</strong></span>
              <span>•</span>
              <span className="uppercase font-mono tracking-wider font-bold text-amber-500 py-0.5 px-2 bg-slate-950 border border-slate-850 rounded">
                ACT 1: REGIONAL ASSIGNMENT
              </span>
            </div>
          ) : gameState && screen !== 'main_menu' ? (
            <div className="hidden md:flex items-center gap-2 text-xs border-l border-slate-800 pl-3 text-slate-500">
              <span>Officer: <strong className="text-slate-300 font-mono">{gameState.playerName}</strong></span>
              <span>•</span>
              <span className="uppercase font-mono tracking-wider font-bold text-amber-500 py-0.5 px-2 bg-slate-950 border border-slate-850 rounded">
                {gameState.act === 1 ? `Act 1: ${currentStarterCity?.name}` : 'Act 2: Mango Point'}
              </span>
            </div>
          ) : null}
        </div>

        {/* Audio and filter options bar */}
        <div className="flex items-center gap-2">
          {/* Custom Ambient Synth Soundtrack choices */}
          <SoundtrackDeck isCompact={true} />

          {/* CRT display switch */}
          <button
            id="toggle-crt-btn"
            onClick={() => { setCrtFilter(!crtFilter); touchSound('beep'); }}
            className={`px-2 py-1.5 rounded-lg border text-[10px] font-mono tracking-wider font-extrabold transition-all flex items-center gap-1 ${
              crtFilter
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'text-slate-400 hover:text-slate-100 border-slate-850'
            }`}
          >
            CRT: {crtFilter ? 'ACTIVE' : 'OFF'}
          </button>

          {/* Sound switch */}
          <button
            id="toggle-mute-btn"
            onClick={() => setMuted(!muted)}
            className="p-1.5 bg-slate-950 rounded-lg border border-slate-850 hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-all"
            title={muted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* If gameplay active, offer Return to Main menu toggle */}
          {screen !== 'main_menu' && (
            <button
              id="header-home-btn"
              onClick={() => { touchSound('beep'); setScreen('main_menu'); }}
              className="p-1.5 bg-slate-950 rounded-lg border border-slate-855 hover:border-slate-700 text-slate-400 hover:text-slate-100 transition-all"
              title="Return to Main Menu"
            >
              <Home size={15} />
            </button>
          )}
        </div>
      </header>

      {/* PRIMARY ACTIVE INTERFACE CONTENT AREA */}
      <main className="flex-1 py-6">

        {/* SCREEN 1: MAIN MENU PAGE */}
        {screen === 'main_menu' && (
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-12 select-none animate-fade-in">
            <div className="text-center space-y-3">
              <span className="text-xs bg-amber-500/10 text-amber-500 border border-amber-900 px-3 py-1 rounded-full font-mono font-bold tracking-widest uppercase">
                Now Live on Web browser MVP
              </span>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-tight bg-gradient-to-r from-yellow-400 via-amber-500 to-red-500 bg-clip-text text-transparent drop-shadow">
                Deported
              </h1>
              <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
                Step into the office of an immigration review inspector. Weigh files, interrogate candidates, observe physical micro-expressions, and trace how your seals rebuild communities.
              </p>
            </div>

            {/* Simulated Caribbean Dub ambient synthesiser deck */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8 space-y-2">
                <span className="text-[10px] bg-red-950 text-red-400 border border-red-900 font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" /> Sound effect console
                </span>
                <h3 className="font-extrabold text-slate-200 text-sm sm:text-base flex items-center gap-1">
                  Huliganverse Presents: Synthesized Audio FX Matrix
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  No sluggish mp3 files needed! Today’s web platform uses the native <strong>Web Audio API</strong> to compile physical fax chirps, typewriter feed rhythms, and heavy seal-stamping thumps. Turn up speakers to experience.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-wrap gap-2 justify-start md:justify-end">
                <button
                  id="btn-sound-chirp"
                  onClick={() => playSynthesizerSound('chirp')}
                  className="bg-slate-950 border border-slate-850 hover:border-slate-700 text-[10px] px-3 py-2 rounded-xl font-mono text-slate-300 font-bold transition-all"
                >
                  🔊 Receipt wire.wav
                </button>
                <button
                  id="btn-sound-stamp"
                  onClick={() => playSynthesizerSound('stamp')}
                  className="bg-slate-950 border border-slate-850 hover:border-slate-700 text-[10px] px-3 py-2 rounded-xl font-mono text-slate-300 font-bold transition-all"
                >
                  🔊 Metal Stamp.wav
                </button>
                <button
                  id="btn-sound-confront"
                  onClick={() => playSynthesizerSound('confront')}
                  className="bg-slate-950 border border-slate-850 hover:border-slate-700 text-[10px] px-3 py-2 rounded-xl font-mono text-slate-300 font-bold transition-all"
                >
                  🔊 Confrontation.wav
                </button>
              </div>
            </div>

            {/* Interactive Procedural Music Soundtracks */}
            <SoundtrackDeck />

            {/* CAREER SLOTS PROGRESSION WINDOW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Card 1: Resume / Launch new */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-amber-400 font-extrabold tracking-widest text-xs uppercase mb-3">
                    District Commissioner Actions
                  </h3>
                  
                  {gameState ? (
                    <div className="space-y-2 mb-4 font-mono">
                      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 text-xs space-y-1.5 leading-normal">
                        <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 mb-1.5">
                          <span className="font-extrabold text-slate-200">ACTIVE IMMIGRANT RECORD</span>
                          <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-900 py-0.5 px-2 rounded-full font-bold">SAVED</span>
                        </div>
                        <p><span className="text-slate-500 font-bold">OFFICER:</span> {gameState.playerName}</p>
                        <p><span className="text-slate-500 font-bold">CURRENT:</span> Day {gameState.currentDay} / 15 Cases</p>
                        <p><span className="text-slate-500 font-bold">REPUTATION:</span> {gameState.reputation}%</p>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-slate-800 border-dashed rounded-2xl p-8 py-10 text-center text-xs text-slate-500 italic mb-4">
                      No active saved portfolio found. Ready to commence fresh career.
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {gameState && (
                    <button
                      id="resume-btn"
                      onClick={handleResumeCareer}
                      className="w-full bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-wider font-mono"
                    >
                      Resume Active Commission <ArrowRight size={14} />
                    </button>
                  )}

                  <button
                    id="new-career-btn"
                    onClick={() => { touchSound('beep'); setScreen('city_chooser'); }}
                    className="w-full bg-slate-950 border-2 border-slate-850 hover:border-slate-600 font-bold text-slate-100 py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-wider font-mono"
                  >
                    Start Fresh Career
                  </button>
                </div>
              </div>

              {/* Card 2: Features checklist overview */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-amber-400 font-extrabold tracking-widest text-xs uppercase">
                    Delivery Specifications Checklist
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-2 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      <span>✓ 4 Starter Gateways mapped</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      <span>✓ 6 District visual evolutions</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      <span>✓ 20 detailed Applicant JSON dossiers</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      <span>✓ 5 returning applicant branch chains</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      <span>✓ Interactive desktop & Discrepancies finder</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      <span>✓ Consequence flow tracing panels</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      <span>✓ 6 evaluative Ending conclusions</span>
                    </div>
                  </div>
                </div>

                {gameState && (
                  <button
                    id="clear-save-btn"
                    onClick={handleClearCareer}
                    className="w-full text-slate-500 hover:text-red-400 font-extrabold text-[10px] tracking-wider uppercase flex items-center justify-center gap-1 py-2 border border-slate-850 hover:border-red-950 bg-slate-950/20 hover:bg-red-950/10 rounded-xl transition-all"
                  >
                    <Trash2 size={13} /> Defer Active saved status
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* SCREEN 2: CHOOSE STARTER CITY SCREEN */}
        {screen === 'city_chooser' && (
          <div className="animate-fade-in">
            <StarterCityChooser
              onSelect={handleStartCareer}
            />
          </div>
        )}

        {/* SCREEN 3: MAIN GAMEPLAY HUB */}
        {screen === 'gameplay' && gameState && activeApplicant && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Split viewport: Dashboard + Interrogation desks */}
            <div className="space-y-8">
              
              {/* Left pane: Stats & Districts tracking */}
              <div>
                <CityDashboard
                  stats={gameState.cityStats}
                  decisions={gameState.decisions}
                  act={gameState.act}
                  starterCityId={gameState.starterCityId}
                />
              </div>

              {/* Right/Bottom pane: Interactive Desktop questioning */}
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-200">
                    Interrogating Applicant Dossier
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    Examine passport, permits and sponsor letters. Cross comparison verbal answers to confront discrepancy lies.
                  </p>
                </div>
                
                <InterviewUI
                  applicant={activeApplicant}
                  onDecision={handleProcessDecision}
                  day={gameState.currentDay}
                />
              </div>

            </div>

          </div>
        )}

        {/* SCREEN 4: CUTSCENES INTERFACE */}
        {screen === 'cutscene' && activeCutscene && gameState && (
          <div className="animate-fade-in py-10">
            <Cutscene
              type={activeCutscene.type}
              applicantName={activeCutscene.applicantName}
              decision={activeCutscene.decision}
              consequenceText={activeCutscene.consequenceText}
              statImpacts={activeCutscene.statImpacts}
              relocationReason={gameState.relocationReason}
              starterCityName={currentStarterCity?.name}
              onComplete={handleCutsceneComplete}
            />
          </div>
        )}

        {/* SCREEN 5: GAME OVER ENDINGS PAGE */}
        {screen === 'ending' && gameState && (
          <div className="animate-fade-in py-6">
            <EndGameScreen
              stats={gameState.cityStats}
              decisions={gameState.decisions}
              starterCityId={gameState.starterCityId}
              playerName={gameState.playerName || 'Officer Henderson'}
              onRestart={() => {
                touchSound('chirp');
                localStorage.removeItem(LOCAL_STORAGE_KEY);
                setGameState(null);
                setScreen('city_chooser');
              }}
            />
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900/40 p-4 text-center text-[10px] text-slate-600 border-t border-slate-900 font-mono">
        "I was not processing paperwork. I was shaping lives." • Huliganverse Presents: DEPORTED MVP • React & TypeScript Built
      </footer>

    </div>
  );
}
