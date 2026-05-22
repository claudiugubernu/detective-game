export type ImageAsset = {
  type: 'image';

  key: string;

  src: string;
};

export type AudioAsset = {
  type: 'audio';

  key: string;

  src: string;
};

export type AssetDefinition = ImageAsset | AudioAsset;
