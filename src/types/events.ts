export type GameEventMap = {
  'scene:changed': {
    sceneId: string;
  };
  'clue:found': {
    clueId: string;
  };
  'dialogue:started': {
    dialogueId: string;
  };
  'dialogue:ended': {
    dialogueId: string;
  };
  'dialogue:line': {
    line: import('./dialogue').DialogueLine;
  };
  'dialogue:typing': {
    text: string;
    speaker: string;
  };
  'dialogue:line-final': {
    line: import('./dialogue').DialogueLine;
  };
  'gameplay:lock': {};
  'gameplay:unlock': {};
  'audio:mute-changed': {
    muted: boolean;
  };
  'audio:volume-changed': {};
  'cutscene:started': {};
  'cutscene:ended': {};
};
