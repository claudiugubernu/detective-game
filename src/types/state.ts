export type GameStateData = {
  currentSceneId: string | null;
  foundClues: string[];
  completedDialogues: string[];
  unlockedScenes: string[];
  audio: {
    masterVolume: number;
    musicVolume: number;
    sfxVolume: number;
    voiceVolume: number;
    muted: boolean;
  };
  mode: GameMode;
};

export type GameMode = 'boot' | 'menu' | 'playing' | 'cutscene' | 'paused';
