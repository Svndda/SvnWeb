export type SfxName =
  | 'click'
  | 'select'
  | 'deselect'
  | 'swap'
  | 'invalid'
  | 'match'
  | 'cascade'
  | 'land'
  | 'special-created'
  | 'striped'
  | 'wrapped'
  | 'color-bomb'
  | 'level-complete'
  | 'save'
  | 'reset'
  | 'yes';

export type PlayOptions = {
  /** Intensidad del efecto (por ejemplo, el nivel de la cascada). */
  level?: number;
  /** Segundos de espera antes de sonar. */
  delay?: number;
};

export type AudioPrefs = { music: boolean; sfx: boolean };
