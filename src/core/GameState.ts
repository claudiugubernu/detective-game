import type { GameMode, GameStateData } from '../types/state';

export class GameState {
  private state: GameStateData = {
    currentSceneId: null,
    foundClues: [],
    completedDialogues: [],
    unlockedScenes: ['menu', 'intro'],
    audio: {
      masterVolume: 1,
      musicVolume: 1,
      sfxVolume: 1,
      voiceVolume: 1,
      muted: false,
    },
    mode: 'boot',
  };

  public setMode(mode: GameMode): void {
    this.state.mode = mode;
  }

  public getMode(): GameMode {
    return this.state.mode;
  }

  public getState(): Readonly<GameStateData> {
    return structuredClone(this.state);
  }

  public setCurrentScene(sceneId: string): void {
    this.state.currentSceneId = sceneId;
  }

  public addFoundClue(clueId: string): void {
    if (this.state.foundClues.includes(clueId)) {
      return;
    }

    this.state.foundClues.push(clueId);
  }

  public completeDialogue(dialogueId: string): void {
    if (this.state.completedDialogues.includes(dialogueId)) {
      return;
    }

    this.state.completedDialogues.push(dialogueId);
  }

  public hasClue(clueId: string): boolean {
    return this.state.foundClues.includes(clueId);
  }

  public getFoundClues(): readonly string[] {
    return [...this.state.foundClues];
  }

  public unlockScene(sceneId: string): void {
    if (this.state.unlockedScenes.includes(sceneId)) {
      return;
    }

    this.state.unlockedScenes.push(sceneId);
  }

  public isSceneUnlocked(sceneId: string): boolean {
    return this.state.unlockedScenes.includes(sceneId);
  }

  public hydrate(state: GameStateData): void {
    this.state = structuredClone(state);
  }

  public setMuted(value: boolean): void {
    this.state.audio.muted = value;
  }

  public setMasterVolume(value: number): void {
    this.state.audio.masterVolume = value;
  }

  public setMusicVolume(value: number): void {
    this.state.audio.musicVolume = value;
  }

  public setSfxVolume(value: number): void {
    this.state.audio.sfxVolume = value;
  }

  public setVoiceVolume(value: number): void {
    this.state.audio.voiceVolume = value;
  }
}
