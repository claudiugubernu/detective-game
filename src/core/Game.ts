import { getElement } from './dom';
import { SceneManager } from './SceneManager';
import { AssetManager } from '../systems/assets/AssetManager';
import { EventBus } from './EventBus';
import { GameState } from './GameState';
import { DialogueSystem } from '../systems/dialogue/DialogueSystem';
import { NavigationSystem } from '../systems/navigation/NavigationSystem';
import { SaveSystem } from '../systems/save/SaveSystem';
import { AudioSystem } from '../systems/audio/AudioSystem';
import { ScriptRunner } from '../systems/script/ScriptRunner';

export class Game {
  public readonly root: HTMLDivElement;
  public readonly sceneLayer: HTMLDivElement;
  public readonly uiLayer: HTMLDivElement;
  public readonly sceneManager: SceneManager;
  public readonly assets: AssetManager;
  public readonly events: EventBus;
  public readonly state: GameState;
  public readonly dialogue: DialogueSystem;
  public readonly navigation: NavigationSystem;
  public readonly saves: SaveSystem;
  public readonly audio: AudioSystem;
  public readonly scripts: ScriptRunner;

  constructor() {
    this.root = getElement<HTMLDivElement>('#game');
    this.sceneLayer = getElement<HTMLDivElement>('#scene-layer');
    this.uiLayer = getElement<HTMLDivElement>('#ui-layer');
    this.sceneManager = new SceneManager();
    this.assets = new AssetManager();
    this.events = new EventBus();
    this.state = new GameState();
    this.dialogue = new DialogueSystem(this);
    this.navigation = new NavigationSystem(this);
    this.saves = new SaveSystem(this);
    this.audio = new AudioSystem(this);
    this.scripts = new ScriptRunner(this);
  }

  public start(): void {
    console.log('Game started');

    this.events.on('gameplay:lock', () => {
      this.sceneManagerLock(true);
    });

    this.events.on('gameplay:unlock', () => {
      this.sceneManagerLock(false);
    });

    this.events.on('scene:changed', ({ sceneId }) => {
      console.log(`Scene changed to: ${sceneId}`);
    });

    const autoSave = (): void => {
      this.saves.save();
    };

    this.events.on('clue:found', autoSave);
    this.events.on('scene:changed', autoSave);
    this.events.on('dialogue:ended', autoSave);

    this.events.on('cutscene:started', () => {
      this.sceneLayer.style.pointerEvents = 'none';
    });

    this.events.on('cutscene:ended', () => {
      this.sceneLayer.style.pointerEvents = 'auto';
    });
  }

  private sceneManagerLock(value: boolean): void {
    this.sceneLayer.style.pointerEvents = value ? 'none' : 'auto';
  }
}
