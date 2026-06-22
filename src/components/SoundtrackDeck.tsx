import React, { useEffect, useState } from 'react';
import { gameMusicPlayer, SONG_CHOICES, SongChoice } from '../lib/gameMusicPlayer';
import { Music, Play, Square, Volume2, VolumeX, Sliders, Radio } from 'lucide-react';

export const SoundtrackDeck: React.FC<{ isCompact?: boolean }> = ({ isCompact = false }) => {
  const [playerState, setPlayerState] = useState(gameMusicPlayer.getPlaybackState());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tempoPulse, setTempoPulse] = useState(false);

  // Monitor playback state changes
  useEffect(() => {
    const unsubscribe = gameMusicPlayer.subscribe(() => {
      setPlayerState(gameMusicPlayer.getPlaybackState());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Soft visual beat pulse according to selected track's BPM
  useEffect(() => {
    if (!playerState.isPlaying || !playerState.activeTrackId) return;
    
    const activeSong = SONG_CHOICES.find(s => s.id === playerState.activeTrackId);
    if (!activeSong) return;

    const intervalMs = (60 / activeSong.bpm) * 1000;
    
    const timer = setInterval(() => {
      setTempoPulse(prev => !prev);
    }, intervalMs / 2); // Pulse on eighth-notes

    return () => clearInterval(timer);
  }, [playerState.isPlaying, playerState.activeTrackId]);

  const handlePlay = (trackId: string) => {
    gameMusicPlayer.playTrack(trackId);
  };

  const handleStop = () => {
    gameMusicPlayer.stop();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    gameMusicPlayer.setVolume(vol);
  };

  const handleToggleMute = () => {
    gameMusicPlayer.setMuted(!playerState.isMuted);
  };

  const activeSong = SONG_CHOICES.find(s => s.id === playerState.activeTrackId);

  // COMPACT COMPONENT FOR GAMEPLAY HEADER NAVIGATION BAR
  if (isCompact) {
    return (
      <div className="relative inline-block text-left select-none z-40">
        <button
          id="music-compact-btn"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-mono tracking-wider font-extrabold transition-all flex items-center gap-1.5 ${
            playerState.isPlaying
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-inner'
              : 'text-slate-400 hover:text-slate-100 border-slate-850 hover:bg-slate-900/40'
          }`}
          title="Select Gameplay Ambience Soundtrack"
        >
          <Music size={13} className={`${playerState.isPlaying ? 'animate-bounce text-amber-400' : ''}`} />
          <span>SOUNDTRACK:</span>
          <span className={`font-black ${playerState.isPlaying ? 'text-amber-300' : 'text-slate-500'}`}>
            {playerState.isPlaying && activeSong ? activeSong.title.toUpperCase() : 'MUTED / STANDBY'}
          </span>
          {playerState.isPlaying && (
            <span className="flex items-center gap-0.5 ml-1 h-3 shrink-0">
              <span className={`w-0.5 rounded-full bg-amber-400 transition-all ${tempoPulse ? 'h-3' : 'h-1'}`} />
              <span className={`w-0.5 rounded-full bg-amber-400 transition-all ${!tempoPulse ? 'h-3.5' : 'h-1.5'}`} />
              <span className={`w-0.5 rounded-full bg-amber-400 transition-all ${tempoPulse ? 'h-2' : 'h-1'}`} />
            </span>
          )}
        </button>

        {isDropdownOpen && (
          <>
            {/* Backdrop to dismiss */}
            <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
            
            <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fade-in font-mono">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2.5 mb-2.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest flex items-center gap-1.5">
                  <Sliders size={12} className="text-amber-500" /> Ambience Deck
                </span>
                {playerState.isPlaying && (
                  <button
                    onClick={handleStop}
                    className="text-[9px] font-bold text-red-500 hover:text-red-400 border border-red-950 bg-red-950/20 px-2 py-0.5 rounded uppercase"
                  >
                    Kill Audio
                  </button>
                )}
              </div>

              {/* Volume Slider inside compact */}
              <div className="flex items-center gap-2 mb-3 bg-slate-900/50 p-2 rounded-lg border border-slate-900">
                <button onClick={handleToggleMute} className="text-slate-400 hover:text-amber-400 transition-all">
                  {playerState.isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={playerState.volume}
                  onChange={handleVolumeChange}
                  className="accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer flex-1"
                />
                <span className="text-[10px] text-slate-400 font-bold w-6 text-right">
                  {Math.round(playerState.volume * 100)}%
                </span>
              </div>

              {/* Station Lists */}
              <div className="space-y-1.5">
                {SONG_CHOICES.map((song) => {
                  const isCurrent = playerState.activeTrackId === song.id && playerState.isPlaying;
                  return (
                    <button
                      key={song.id}
                      onClick={() => {
                        handlePlay(song.id);
                      }}
                      className={`w-full text-left p-2 rounded-lg transition-all border text-xs flex items-center justify-between gap-1.5 ${
                        isCurrent
                          ? 'bg-amber-950/30 border-amber-600/40 text-amber-200'
                          : 'bg-slate-900/20 border-slate-900 hover:border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-extrabold truncate flex items-center gap-1">
                          <span>{song.emoji}</span>
                          <span>{song.title}</span>
                        </p>
                        <p className="text-[9px] text-slate-500 truncate mt-0.5">{song.mood}</p>
                      </div>
                      <span className={`p-1 rounded-md shrink-0 ${isCurrent ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-500'}`}>
                        {isCurrent ? <Square size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // DETAILED CONSOLE CARD COMPONENT FOR MAIN MENU
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 select-none">
      
      {/* Header of synthesizer console */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-900 font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
            <Radio size={12} className={`${playerState.isPlaying ? 'animate-pulse text-amber-400' : ''}`} /> PROURAL SYNTHESIS CO-PROCESSOR v1.1
          </span>
          <h3 className="font-black text-slate-200 text-base sm:text-lg flex items-center gap-1.5 font-sans tracking-tight">
            <span>📻</span> Continental Ambience Radio Console
          </h3>
          <p className="text-xs text-slate-400 leading-normal max-w-xl">
            Real-time procedurally synthesized soundtracks compiled in your browser. Generates ticking clocks, rhythmic high-tension sweeps, and minor synth progression layers to construct immersive acoustic tension.
          </p>
        </div>

        {/* Master Active Indicator */}
        <div className="flex items-center gap-2 font-mono text-[11px] bg-slate-950/80 border border-slate-850 p-2 rounded-xl shrink-0 self-start sm:self-center">
          <span className="text-slate-500 uppercase">SYNTH DECK:</span>
          <span className={`font-black flex items-center gap-1.5 px-2 py-0.5 rounded ${
            playerState.isPlaying ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/60' : 'bg-red-950/40 text-red-400 border border-red-900/40'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${playerState.isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`} />
            {playerState.isPlaying ? 'TRANSMITTING' : 'MUTE / RE-ROUTE'}
          </span>
        </div>
      </div>

      {/* Control panel deck: Track layout list & master fader knobs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Track Lists selectors */}
        <div className="md:col-span-8 flex flex-col gap-2.5">
          {SONG_CHOICES.map((song) => {
            const isSelected = playerState.activeTrackId === song.id && playerState.isPlaying;
            return (
              <div
                key={song.id}
                onClick={() => handlePlay(song.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500/10 via-amber-950/5 to-slate-900 border-amber-500/40 text-slate-200 shadow-md'
                    : 'bg-slate-950/50 border-slate-850 hover:border-slate-800 text-slate-400 hover:text-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{song.emoji}</span>
                    <strong className="text-sm font-black tracking-wide font-sans">{song.title}</strong>
                    <span className="text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800 py-0.5 px-1.5 rounded">
                      {song.bpm} BPM
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans pr-2 leading-relaxed">
                    {song.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {isSelected && (
                    <span className="flex items-end gap-0.5 h-4 shrink-0 px-2">
                      <span className={`w-0.5 rounded-full bg-amber-400 transition-all ${tempoPulse ? 'h-4' : 'h-1.5'}`} />
                      <span className={`w-0.5 rounded-full bg-amber-400 transition-all ${!tempoPulse ? 'h-3.5' : 'h-1'}`} />
                      <span className={`w-0.5 rounded-full bg-amber-400 transition-all ${tempoPulse ? 'h-5' : 'h-2'}`} />
                      <span className={`w-0.5 rounded-full bg-amber-400 transition-all ${!tempoPulse ? 'h-4.5' : 'h-1.5'}`} />
                      <span className={`w-0.5 rounded-full bg-amber-400 transition-all ${tempoPulse ? 'h-2.5' : 'h-1'}`} />
                    </span>
                  )}
                  <button
                    id={`btn-play-song-${song.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(song.id);
                    }}
                    className={`h-9 w-24 rounded-xl flex items-center justify-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow ${
                      isSelected
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        : 'bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800'
                    }`}
                  >
                    {isSelected ? <Square size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" />}
                    <span>{isSelected ? 'ACTIVE' : 'TUNE IN'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Master faders and status specs */}
        <div className="md:col-span-4 bg-slate-950/70 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between space-y-4 font-mono">
          <div className="space-y-4">
            <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 block">
              🔉 Master Console Fader
            </span>
            
            {/* Volume feedback loop */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                <span>SOUNDTRACK GAIN:</span>
                <span className="text-amber-400">{Math.round(playerState.volume * 100)}%</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleMute}
                  className={`p-2 rounded-lg border text-xs transition-all ${
                    playerState.isMuted
                      ? 'bg-red-950/40 border-red-900/60 text-red-400'
                      : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                  title={playerState.isMuted ? 'Muted / Unmute' : 'Gain Active / Mute'}
                >
                  {playerState.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={playerState.volume}
                  onChange={handleVolumeChange}
                  className="accent-amber-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer flex-1"
                />
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-900 text-[10px] text-slate-500 leading-normal space-y-1.5">
              <p className="font-extrabold text-[11px] text-slate-400">ACOUSTIC SPECIFICATIONS:</p>
              <p>• Output Port: Soundcard Line 1</p>
              <p>• Resolution: Stereo / Lookahead Scheduler</p>
              <p>• Dynamic EQ: Wave Type Modulated LFO</p>
              <p>• Sample Rate: Proportional Web Audio standard</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-900">
            {playerState.isPlaying && activeSong ? (
              <div className="text-[10px] text-slate-400 space-y-1">
                <p className="font-extrabold text-amber-500 tracking-wider">NOW PLAYING ON DECK:</p>
                <p className="truncate text-slate-200">{activeSong.emoji} {activeSong.title.toUpperCase()}</p>
                <p className="text-[9px] text-slate-500 italic mt-0.5">"{activeSong.mood}"</p>
              </div>
            ) : (
              <div className="text-[10px] text-slate-500 italic">
                Decom / System Standby. Select any transmission channel above to activate ambience.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
