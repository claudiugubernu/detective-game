import type { Dialogue } from './dialogue';
import type { AudioChannel } from './audio';

export type ScriptAction =
  | {
      type: 'wait';
      duration: number;
    }
  | {
      type: 'dialogue';
      dialogue: Dialogue;
    }
  | {
      type: 'scene';
      sceneId: string;
    }
  | {
      type: 'audio';
      audioKey: string;
      channel: AudioChannel;
    }
  | {
      type: 'event';
      event: string;
      payload?: unknown;
    };

export type Script = {
  id: string;
  actions: ScriptAction[];
};
