import { AUDIO_STORAGE_KEY } from '../constants';
import { readStorage, writeStorage } from '../utils/storage';
import { BAR_SECONDS, scheduleBar } from './music';
import { SFX } from './sfx';
import type { AudioPrefs, PlayOptions, SfxName } from './types';
import { createAudioGraph, type AudioGraph } from './voices';

const DEFAULT_PREFS: AudioPrefs = { music: true, sfx: true };
const MUSIC_LEVEL = 0.55;
const LOOKAHEAD_SECONDS = 1.2;
const SCHEDULER_INTERVAL_MS = 250;

function readPrefs(): AudioPrefs {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  try {
    const raw = readStorage(AUDIO_STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<AudioPrefs>;
      return { music: saved.music ?? true, sfx: saved.sfx ?? true };
    }
  } catch {
    // JSON corrupto: se usan los valores por defecto.
  }
  return DEFAULT_PREFS;
}

/**
 * Motor de audio único para toda la app.
 * - El AudioContext se crea en el primer gesto del usuario (política de autoplay).
 * - La música se programa por compases con un "lookahead" para que no se corte.
 * - Se pausa automáticamente cuando la pestaña queda oculta.
 */
class SoundEngine {
  private graph: AudioGraph | null = null;
  private prefs: AudioPrefs = readPrefs();
  private listeners = new Set<() => void>();
  private active = false;
  private timer: number | null = null;
  private nextBarTime = 0;
  private barIndex = 0;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getPrefs = () => this.prefs;

  /** Se llama dentro de un gesto del usuario. Devuelve true si el audio ya está sonando. */
  unlock = async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false;
    if (!this.graph) {
      this.graph = createAudioGraph();
      if (!this.graph) return false;
      document.addEventListener('visibilitychange', this.handleVisibility);
    }
    const { ctx } = this.graph;
    if (ctx.state !== 'running') await ctx.resume().catch(() => undefined);
    this.syncMusic();
    return (ctx.state as AudioContextState) === 'running';
  };

  /** La página avisa si está en pantalla; al salir, la música se desvanece. */
  setActive = (active: boolean) => {
    this.active = active;
    this.syncMusic();
  };

  play = (name: SfxName, options: PlayOptions = {}) => {
    if (!this.graph || !this.prefs.sfx) return;
    SFX[name](this.graph, options.delay ?? 0, options.level ?? 0);
  };

  toggleMusic = () => {
    void this.unlock();
    this.updatePrefs({ music: !this.prefs.music });
  };

  toggleSfx = () => {
    void this.unlock();
    this.updatePrefs({ sfx: !this.prefs.sfx });
    if (this.prefs.sfx) this.play('click');
  };

  private updatePrefs(patch: Partial<AudioPrefs>) {
    this.prefs = { ...this.prefs, ...patch };
    writeStorage(AUDIO_STORAGE_KEY, JSON.stringify(this.prefs));
    this.listeners.forEach((listener) => listener());
    this.syncMusic();
  }

  private syncMusic() {
    const graph = this.graph;
    if (!graph) return;
    const shouldPlay = this.active && this.prefs.music;
    graph.music.gain.setTargetAtTime(shouldPlay ? MUSIC_LEVEL : 0, graph.ctx.currentTime, 0.15);
    if (shouldPlay) this.startScheduler(graph);
    else this.stopScheduler();
  }

  private startScheduler(graph: AudioGraph) {
    if (this.timer !== null) return;
    this.nextBarTime = graph.ctx.currentTime + 0.15;
    this.tick();
    this.timer = window.setInterval(this.tick, SCHEDULER_INTERVAL_MS);
  }

  private stopScheduler() {
    if (this.timer === null) return;
    window.clearInterval(this.timer);
    this.timer = null;
  }

  private tick = () => {
    const graph = this.graph;
    if (!graph) return;
    while (this.nextBarTime < graph.ctx.currentTime + LOOKAHEAD_SECONDS) {
      scheduleBar(graph, this.nextBarTime, this.barIndex);
      this.nextBarTime += BAR_SECONDS;
      this.barIndex += 1;
    }
  };

  private handleVisibility = () => {
    const ctx = this.graph?.ctx;
    if (!ctx) return;
    if (document.hidden) void ctx.suspend();
    else void ctx.resume();
  };
}

export const soundEngine = new SoundEngine();
export const playSound = soundEngine.play;
