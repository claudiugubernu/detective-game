export type DialogueLine = {
  id: string;
  speaker: string;
  text: string;
  audioKey?: string;
  onStartEvent?: string;
  onEndEvent?: string;
  givesClueId?: string;
};

export type Dialogue = {
  id: string;

  lines: DialogueLine[];
};
