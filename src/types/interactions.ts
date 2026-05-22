export type HotspotDefinition = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  cursor?: 'pointer' | 'help';
  onClick?: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
};
