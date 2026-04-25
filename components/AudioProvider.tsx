"use client";
import { createContext, useContext, useEffect, useRef, useState, ReactNode, useCallback } from "react";

type AudioContextType = {
  isMuted: boolean;
  toggleMute: () => void;
  playClickSound: () => void;
};

const AudioCtx = createContext<AudioContextType | undefined>(undefined);

/**
 * Generate a buffer of pink noise using Paul Kellett's refined algorithm.
 * Pink noise (1/f spectrum) sounds vastly more natural than white noise —
 * it's the scientific basis for ocean waves, wind, and rain sounds.
 * Zero buzz, zero static, zero distortion.
 */
function createPinkNoiseBuffer(ctx: AudioContext, seconds = 12): AudioBuffer {
  const len = Math.ceil(ctx.sampleRate * seconds);
  // Stereo buffer for richer spatial feel
  const buffer = ctx.createBuffer(2, len, ctx.sampleRate);

  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    // Slightly offset channel seed so L and R differ naturally (stereo width)
    const offset = ch * 0.5;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1 + offset * 0.001;
      // Paul Kellett's refined pink noise coefficients
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.10;
      b6 = white * 0.115926;
    }
  }
  return buffer;
}

/**
 * Create a simple impulse-response reverb buffer for spatial depth.
 * Simulates a large open outdoor space (beach/coast).
 */
function createReverbBuffer(ctx: AudioContext): AudioBuffer {
  const duration = 2.5;
  const len = Math.ceil(ctx.sampleRate * duration);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      // Exponentially decaying noise — standard impulse response
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2);
    }
  }
  return buf;
}

/**
 * Builds the premium ocean ambient soundscape:
 *  1. Deep rolling ocean (heavily low-passed pink noise + slow LFO)
 *  2. Mid surf layer (band-passed + wave rhythm LFO)
 *  3. Gentle shoreline shimmer (high-passed soft pink noise)
 *  4. Spatial reverb on all layers for "you are at the beach" feel
 *
 * All layers use PINK NOISE — no white noise, no buzz, no static.
 */
function buildSoundscape(ctx: AudioContext) {
  const master = ctx.createGain();
  master.gain.value = 0;

  // Spatial reverb convolver
  const convolver = ctx.createConvolver();
  convolver.buffer = createReverbBuffer(ctx);

  const reverbGain = ctx.createGain();
  reverbGain.gain.value = 0.35; // Wet/dry: subtle reverb, mostly dry

  const dryGain = ctx.createGain();
  dryGain.gain.value = 0.65;

  convolver.connect(reverbGain);
  reverbGain.connect(master);
  dryGain.connect(master);
  master.connect(ctx.destination);

  const sources: AudioScheduledSourceNode[] = [];

  function makePinkSource(seconds: number) {
    const src = ctx.createBufferSource();
    src.buffer = createPinkNoiseBuffer(ctx, seconds);
    src.loop = true;
    // Randomise loop start per layer so they never sync perfectly
    src.loopStart = 0;
    src.loopEnd = seconds;
    sources.push(src);
    return src;
  }

  function makeLFO(rate: number, depth: number, target: AudioParam) {
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = rate;
    const lg = ctx.createGain();
    lg.gain.value = depth;
    lfo.connect(lg);
    lg.connect(target);
    lfo.start();
    sources.push(lfo);
  }

  // ─── Layer 1: DEEP OCEAN — low rumble, very slow swell ───────────────────
  {
    const src = makePinkSource(14);

    const lp1 = ctx.createBiquadFilter();
    lp1.type = "lowpass";
    lp1.frequency.value = 180;
    lp1.Q.value = 0.5;

    const lp2 = ctx.createBiquadFilter();
    lp2.type = "lowpass";
    lp2.frequency.value = 90;
    lp2.Q.value = 0.3;

    const g = ctx.createGain();
    g.gain.value = 1.8;

    // Very slow swell — ~10 second wave cycle
    makeLFO(0.10, 0.9, g.gain);

    src.connect(lp1); lp1.connect(lp2); lp2.connect(g);
    g.connect(dryGain); g.connect(convolver);
    src.start(0);
  }

  // ─── Layer 2: MID OCEAN SURF — wave crests ───────────────────────────────
  {
    const src = makePinkSource(10);

    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 200;
    hp.Q.value = 0.4;

    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 500;
    bp.Q.value = 0.7;

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1200;
    lp.Q.value = 0.3;

    const g = ctx.createGain();
    g.gain.value = 0.9;

    // Slightly faster — offset from deep layer to avoid phase correlation
    makeLFO(0.13, 0.5, g.gain);

    src.connect(hp); hp.connect(bp); bp.connect(lp); lp.connect(g);
    g.connect(dryGain); g.connect(convolver);
    src.start(0);
  }

  // ─── Layer 3: SHORELINE SHIMMER — soft high-freq wash ────────────────────
  {
    const src = makePinkSource(8);

    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1500;
    hp.Q.value = 0.2;

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 4000;
    lp.Q.value = 0.2;

    const g = ctx.createGain();
    g.gain.value = 0.18;

    // Faster irregular shimmer
    makeLFO(0.20, 0.10, g.gain);

    src.connect(hp); hp.connect(lp); lp.connect(g);
    g.connect(dryGain); g.connect(convolver);
    src.start(0);
  }

  // ─── Layer 4: DISTANT BREEZE — ultra-low, barely audible ─────────────────
  {
    const src = makePinkSource(16);

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 60;
    lp.Q.value = 0.2;

    const g = ctx.createGain();
    g.gain.value = 0.5;

    makeLFO(0.04, 0.2, g.gain);

    src.connect(lp); lp.connect(g);
    g.connect(dryGain);
    src.start(0);
  }

  return {
    setVolume(v: number) {
      // Use exponential ramp for perceptually smooth fade (avoids zipper noise)
      const clampedV = Math.max(0.0001, Math.min(0.28, v));
      master.gain.setTargetAtTime(v === 0 ? 0 : clampedV, ctx.currentTime, 1.2);
    },
    stop() {
      sources.forEach(s => { try { s.stop(0); s.disconnect(); } catch {} });
      try { convolver.disconnect(); reverbGain.disconnect(); dryGain.disconnect(); master.disconnect(); } catch {}
    },
  };
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const soundRef = useRef<ReturnType<typeof buildSoundscape> | null>(null);
  const startedRef = useRef(false);

  useEffect(() => () => {
    try { soundRef.current?.stop(); } catch {}
    try { ctxRef.current?.close(); } catch {}
  }, []);

  const ensureCtx = useCallback(() => {
    if (ctxRef.current) return;
    const Ctor = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctor) return;
    ctxRef.current = new Ctor();
    soundRef.current = buildSoundscape(ctxRef.current);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (!next) {
        ensureCtx();
        const actx = ctxRef.current;
        if (!actx) return next;
        if (actx.state === "suspended") actx.resume();
        startedRef.current = true;
        soundRef.current?.setVolume(0.22);
      } else {
        soundRef.current?.setVolume(0);
      }
      return next;
    });
  }, [ensureCtx]);

  return (
    <AudioCtx.Provider value={{ isMuted, toggleMute, playClickSound: () => {} }}>
      {children}
    </AudioCtx.Provider>
  );
}

export const useAudio = () => {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};
