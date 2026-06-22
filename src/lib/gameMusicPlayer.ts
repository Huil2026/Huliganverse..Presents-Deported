// Procedural Synth Loop Player using Web Audio API
// No MP3 files needed. Everything is compiled in real-time in the user's browser.

export interface SongChoice {
  id: string;
  title: string;
  mood: string;
  bpm: number;
  description: string;
  emoji: string;
}

export const SONG_CHOICES: SongChoice[] = [
  {
    id: 'bureaucracy',
    title: 'Cold Bureaucracy',
    mood: 'Tense, Mechanical Clockwork',
    bpm: 58,
    description: 'Slow, steady mechanical tick with minor bass drones. Perfect for scanning typo-ridden visas.',
    emoji: '📁'
  },
  {
    id: 'interrogation',
    title: 'The Interrogation',
    mood: 'High-Stakes Heartbeat Noir',
    bpm: 108,
    description: 'Dual-pulse heartbeat thump with sweeping retro filters. Heightens tension under interrogation.',
    emoji: '🕵️'
  },
  {
    id: 'patrol',
    title: 'Sovereign Patrol',
    mood: 'Cyber-Noir Exploratory Arpeggio',
    bpm: 82,
    description: 'Lofi background arpeggiations and soft noise backing beats. Highlights territorial isolation.',
    emoji: '🛰️'
  }
];

class GameMusicPlayer {
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timerId: any = null;
  
  private activeTrackId: string | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.35; // Default volume (35%)

  // Sequencer / Clock Parameters
  private nextNoteTime: number = 0.0;
  private stepIndex: number = 0;
  private secondsPerStep: number = 0.15;
  private lookAhead: number = 0.1; // How far ahead to schedule audio (seconds)
  private updateInterval: number = 35; // How often to run scheduling loop (ms)

  // Listeners for track changes to dynamically update UI
  private onStateChangeListeners: Set<() => void> = new Set();

  public subscribe(listener: () => void): () => void {
    this.onStateChangeListeners.add(listener);
    return () => {
      this.onStateChangeListeners.delete(listener);
    };
  }

  private notify() {
    this.onStateChangeListeners.forEach((l) => {
      try { l(); } catch (err) { /* ignore */ }
    });
  }

  private initAudio() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return false;
      this.audioCtx = new AudioContextClass();
      
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
    
    // Resume context if suspended (browser security policy autoplay)
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return true;
  }

  public playTrack(trackId: string) {
    const initialized = this.initAudio();
    if (!initialized || !this.audioCtx) return;

    if (this.activeTrackId === trackId && this.isPlaying) {
      // Already playing this song, do nothing
      return;
    }

    // Stop current schedule if any
    this.stopSequencer();

    const song = SONG_CHOICES.find(s => s.id === trackId);
    if (!song) return;

    this.activeTrackId = trackId;
    this.isPlaying = true;
    
    // Calculate timing: 4 steps per beat
    const beatsPerSecond = song.bpm / 60;
    const secondsPerBeat = 1.0 / beatsPerSecond;
    this.secondsPerStep = secondsPerBeat / 2.0; // 8th note resolution

    this.nextNoteTime = this.audioCtx.currentTime + 0.1;
    this.stepIndex = 0;

    // Start scheduling loop
    this.startSequencer();
    this.notify();
  }

  public stop() {
    this.stopSequencer();
    this.isPlaying = false;
    this.activeTrackId = null;
    this.notify();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.audioCtx) {
      const targetVol = muted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(targetVol, this.audioCtx.currentTime, 0.01);
    }
    this.notify();
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.audioCtx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.audioCtx.currentTime, 0.02);
    }
    this.notify();
  }

  public getPlaybackState() {
    return {
      activeTrackId: this.activeTrackId,
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume
    };
  }

  private startSequencer() {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => this.schedulerLoop(), this.updateInterval);
  }

  private stopSequencer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private schedulerLoop() {
    if (!this.audioCtx || !this.isPlaying) return;

    // Schedule any notes that fall within lookAhead window
    while (this.nextNoteTime < this.audioCtx.currentTime + this.lookAhead) {
      this.scheduleStep(this.stepIndex, this.nextNoteTime);
      
      this.nextNoteTime += this.secondsPerStep;
      this.stepIndex = (this.stepIndex + 1) % 32; // 32 steps = 4 bars of 8 steps
    }
  }

  // --- AUDIO SYNTH TRIGGERS ---
  private scheduleStep(step: number, time: number) {
    if (!this.audioCtx || !this.masterGain) return;

    const ctx = this.audioCtx;
    const dest = this.masterGain;

    if (this.activeTrackId === 'bureaucracy') {
      // --- COLD BUREAUCRACY SYNTH ACTION ---
      
      // 1. Tick Sound on every major beat (even steps: 0, 2, 4...)
      if (step % 2 === 0) {
        const isDownbeat = step % 8 === 0;
        
        const tick = ctx.createOscillator();
        const tickGain = ctx.createGain();
        tick.connect(tickGain);
        tickGain.connect(dest);

        tick.type = 'triangle';
        // Downbeat gets heavier stamp tick, backbeat gets faint mechanical click
        tick.frequency.setValueAtTime(isDownbeat ? 120 : 1200, time);
        
        tickGain.gain.setValueAtTime(isDownbeat ? 0.08 : 0.02, time);
        tickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        tick.start(time);
        tick.stop(time + 0.06);
      }

      // 2. Heavy Sub Bass drone holding long envelopes
      if (step % 8 === 0) {
        const rootIndex = Math.floor(step / 8); // 0, 1, 2, 3
        const notes = [
          55.0,  // A1
          43.65, // F1
          48.99, // G1
          51.91  // G#1 (reaches dark resolve)
        ];
        const freq = notes[rootIndex % notes.length];

        const bass = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bass.connect(bassGain);
        bassGain.connect(dest);

        bass.type = 'sawtooth';
        bass.frequency.setValueAtTime(freq, time);
        
        // Soft lowpass filter to keep it dark/subby rather than buzzy
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, time);
        
        bass.disconnect(bassGain);
        bass.connect(filter);
        filter.connect(bassGain);

        bassGain.gain.setValueAtTime(0.0, time);
        bassGain.gain.linearRampToValueAtTime(0.18, time + 0.4);
        bassGain.gain.exponentialRampToValueAtTime(0.001, time + (this.secondsPerStep * 7.5));

        bass.start(time);
        bass.stop(time + (this.secondsPerStep * 7.9));
      }

      // 3. Faint high-pitched bureaucratic "paper sweep" chord pad (very soft atmospheric)
      if (step === 4 || step === 20) {
        // Soft minor pads
        const notes = [440.0, 523.25, 659.25]; // A4, C5, E5
        notes.forEach((freq) => {
          const osc = ctx.createOscillator();
          const pGain = ctx.createGain();
          osc.connect(pGain);
          pGain.connect(dest);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, time);

          pGain.gain.setValueAtTime(0.0, time);
          pGain.gain.linearRampToValueAtTime(0.015, time + 0.8);
          pGain.gain.exponentialRampToValueAtTime(0.001, time + (this.secondsPerStep * 10));

          osc.start(time);
          osc.stop(time + (this.secondsPerStep * 11));
        });
      }
    } 
    else if (this.activeTrackId === 'interrogation') {
      // --- THE INTERROGATION ACTION ---
      
      // 1. Dual Pulse heart beat (th-thump ... th-thump)
      // Play high bass drum thump on 0 and 1.5, 4 and 5.5, etc.
      const grid = step % 8;
      if (grid === 0 || grid === 2) {
        const kick = ctx.createOscillator();
        const kGain = ctx.createGain();
        kick.connect(kGain);
        kGain.connect(dest);

        kick.type = 'sine';
        // Pitch sweep from 140Hz down to 25Hz
        kick.frequency.setValueAtTime(grid === 0 ? 110 : 85, time);
        kick.frequency.exponentialRampToValueAtTime(25, time + 0.16);

        kGain.gain.setValueAtTime(0.3, time);
        kGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

        kick.start(time);
        kick.stop(time + 0.2);
      }

      // 2. High friction ticking hihat on off-beats
      if (step % 2 === 1) {
        const hat = ctx.createOscillator();
        const hGain = ctx.createGain();
        
        // Bandpassed sweep filter for high-tension rustle
        const hFilter = ctx.createBiquadFilter();
        hFilter.type = 'bandpass';
        hFilter.frequency.setValueAtTime(8000, time);
        hFilter.Q.setValueAtTime(8, time);

        hat.connect(hFilter);
        hFilter.connect(hGain);
        hGain.connect(dest);

        hat.type = 'sawtooth';
        hat.frequency.setValueAtTime(10000, time);

        hGain.gain.setValueAtTime(0.008, time);
        hGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);

        hat.start(time);
        hat.stop(time + 0.05);
      }

      // 3. Eerie sliding tension-wave oscillator (sweeps frequency, high intensity)
      if (step === 8 || step === 24) {
        const drone = ctx.createOscillator();
        const dGain = ctx.createGain();
        const dFilter = ctx.createBiquadFilter();

        dFilter.type = 'lowpass';
        dFilter.frequency.setValueAtTime(250, time);
        // Resonant slide
        dFilter.frequency.exponentialRampToValueAtTime(900, time + (this.secondsPerStep * 6));

        drone.connect(dFilter);
        dFilter.connect(dGain);
        dGain.connect(dest);

        drone.type = 'sawtooth';
        // Play tense microtone chord (tritone tension relative to A)
        drone.frequency.setValueAtTime(147.0, time); // D#3 tense flat 5th
        
        dGain.gain.setValueAtTime(0.0, time);
        dGain.gain.linearRampToValueAtTime(0.09, time + 0.4);
        dGain.gain.exponentialRampToValueAtTime(0.0001, time + (this.secondsPerStep * 12));

        drone.start(time);
        drone.stop(time + (this.secondsPerStep * 13));
      }
    } 
    else if (this.activeTrackId === 'patrol') {
      // --- SOVEREIGN PATROL SCI-FI ACTION ---

      // 1. Warm Arpeggiated Bass Loop (Plays index values in minor key scale)
      if (step % 2 === 0) {
        const arpIndex = (step / 2) % 16;
        // Minor melody: A2, C3, E3, D3, C3, E3, A3, G3 ...
        const scale = [
          110.00, // A2 (0)
          130.81, // C3 (1)
          164.81, // E3 (2)
          146.83, // D3 (3)
          130.81, // C3 (4)
          164.81, // E3 (5)
          220.00, // A3 (6)
          196.00, // G3 (7)
          110.00, // A2 (8)
          130.81, // C3 (9)
          164.81, // E3 (10)
          146.83, // D3 (11)
          164.81, // E3 (12)
          220.00, // A3 (13)
          261.63, // C4 (14)
          196.00  // G3 (15)
        ];
        
        const noteFreq = scale[arpIndex];

        const bass = ctx.createOscillator();
        const bGain = ctx.createGain();
        bass.connect(bGain);
        bGain.connect(dest);

        bass.type = 'triangle';
        bass.frequency.setValueAtTime(noteFreq, time);

        // Arp pluck envelope
        bGain.gain.setValueAtTime(0.12, time);
        bGain.gain.exponentialRampToValueAtTime(0.002, time + (this.secondsPerStep * 1.8));

        bass.start(time);
        bass.stop(time + (this.secondsPerStep * 1.9));
      }

      // 2. Soft white noise "wind breeze" on backbeats (step 4, 12, 20, 28)
      if (step % 8 === 4) {
        // Compile a transient white noise buffer
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1000, time);
        noiseFilter.frequency.exponentialRampToValueAtTime(300, time + 0.25);
        noiseFilter.Q.setValueAtTime(3.0, time);

        const noiseGain = ctx.createGain();
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(dest);

        noiseGain.gain.setValueAtTime(0.025, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.24);

        noise.start(time);
        noise.stop(time + 0.25);
      }

      // 3. Exploring high space melody notes (very soft long tones)
      if (step === 0 || step === 12 || step === 22) {
        const melodyFreqs = [440.0, 523.25, 587.33]; // A4, C5, D5
        const melodyNote = melodyFreqs[Math.floor(step / 10) % melodyFreqs.length];

        const lead = ctx.createOscillator();
        const lGain = ctx.createGain();
        lead.connect(lGain);
        lGain.connect(dest);

        lead.type = 'sine';
        lead.frequency.setValueAtTime(melodyNote, time);

        lGain.gain.setValueAtTime(0.0, time);
        lGain.gain.linearRampToValueAtTime(0.022, time + 0.5);
        lGain.gain.exponentialRampToValueAtTime(0.001, time + (this.secondsPerStep * 6));

        lead.start(time);
        lead.stop(time + (this.secondsPerStep * 6.5));
      }
    }
  }
}

export const gameMusicPlayer = new GameMusicPlayer();
