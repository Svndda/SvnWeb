/**
 * Bloques de síntesis de bajo nivel. Todo el audio de la app se genera con
 * Web Audio API: no hay archivos de sonido que descargar ni licenciar.
 */
const MIN_GAIN = 0.0001;

export type AudioGraph = {
  ctx: AudioContext;
  sfx: GainNode;
  music: GainNode;
  /** Envío con eco para que la música suene "soñadora". */
  musicSend: GainNode;
  noise: AudioBuffer;
};

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

export const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

export function createAudioGraph(): AudioGraph | null {
  const Ctor = window.AudioContext || (window as AudioWindow).webkitAudioContext;
  if (!Ctor) return null;
  const ctx = new Ctor();

  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -14;
  limiter.ratio.value = 6;
  limiter.attack.value = 0.005;
  limiter.release.value = 0.2;
  limiter.connect(ctx.destination);

  const sfx = ctx.createGain();
  sfx.gain.value = 0.7;
  sfx.connect(limiter);

  const music = ctx.createGain();
  music.gain.value = 0;
  music.connect(limiter);

  const musicSend = ctx.createGain();
  musicSend.gain.value = 0.35;
  const echo = ctx.createDelay(1.5);
  echo.delayTime.value = 0.42;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.36;
  const damp = ctx.createBiquadFilter();
  damp.type = 'lowpass';
  damp.frequency.value = 2400;
  musicSend.connect(echo);
  echo.connect(damp);
  damp.connect(feedback);
  feedback.connect(echo);
  damp.connect(music);

  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const samples = noise.getChannelData(0);
  for (let i = 0; i < samples.length; i += 1) samples[i] = Math.random() * 2 - 1;

  return { ctx, sfx, music, musicSend, noise };
}

export type ToneSpec = {
  freq: number;
  /** Frecuencia final (glissando). */
  to?: number;
  type?: OscillatorType;
  /** Segundos desde "ahora". */
  start?: number;
  duration?: number;
  gain?: number;
  attack?: number;
  release?: number;
  bus?: 'sfx' | 'music';
  echo?: boolean;
};

export function playTone(graph: AudioGraph, spec: ToneSpec): void {
  const { ctx } = graph;
  const { freq, to, type = 'sine', start = 0, duration = 0.2, gain = 0.2, attack = 0.005, bus = 'sfx', echo = false } = spec;
  const release = Math.min(spec.release ?? duration - attack, duration - attack);
  const t0 = ctx.currentTime + start;
  const t1 = t0 + duration;

  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t1);
  env.gain.setValueAtTime(MIN_GAIN, t0);
  env.gain.exponentialRampToValueAtTime(gain, t0 + attack);
  env.gain.setValueAtTime(gain, t1 - release);
  env.gain.exponentialRampToValueAtTime(MIN_GAIN, t1);

  osc.connect(env);
  env.connect(graph[bus]);
  if (echo) env.connect(graph.musicSend);
  osc.start(t0);
  osc.stop(t1 + 0.05);
  osc.onended = () => {
    osc.disconnect();
    env.disconnect();
  };
}

export type NoiseSpec = {
  type?: BiquadFilterType;
  from: number;
  to?: number;
  q?: number;
  start?: number;
  duration?: number;
  gain?: number;
};

export function playNoise(graph: AudioGraph, spec: NoiseSpec): void {
  const { ctx } = graph;
  const { type = 'lowpass', from, to, q = 0.8, start = 0, duration = 0.2, gain = 0.2 } = spec;
  const t0 = ctx.currentTime + start;
  const t1 = t0 + duration;

  const source = ctx.createBufferSource();
  source.buffer = graph.noise;
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.Q.value = q;
  filter.frequency.setValueAtTime(from, t0);
  if (to) filter.frequency.exponentialRampToValueAtTime(to, t1);
  const env = ctx.createGain();
  env.gain.setValueAtTime(gain, t0);
  env.gain.exponentialRampToValueAtTime(MIN_GAIN, t1);

  source.connect(filter);
  filter.connect(env);
  env.connect(graph.sfx);
  source.start(t0, Math.random() * 0.4);
  source.stop(t1 + 0.05);
  source.onended = () => {
    source.disconnect();
    filter.disconnect();
    env.disconnect();
  };
}
