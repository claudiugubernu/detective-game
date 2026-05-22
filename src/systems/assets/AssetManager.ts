import type {
  AssetDefinition,
  AudioAsset,
  ImageAsset,
} from '../../types/assets';

export class AssetManager {
  private images = new Map<string, HTMLImageElement>();

  private audio = new Map<string, HTMLAudioElement>();

  public async preload(assets: AssetDefinition[]): Promise<void> {
    await Promise.all(assets.map((asset) => this.loadAsset(asset)));
  }

  public getImage(key: string): HTMLImageElement {
    const asset = this.images.get(key);

    if (!asset) {
      throw new Error(`Image asset not found: ${key}`);
    }

    return asset.cloneNode(true) as HTMLImageElement;
  }

  public getAudio(key: string): HTMLAudioElement {
    const asset = this.audio.get(key);

    if (!asset) {
      throw new Error(`Audio asset not found: ${key}`);
    }

    return asset.cloneNode(true) as HTMLAudioElement;
  }

  private async loadAsset(asset: AssetDefinition): Promise<void> {
    switch (asset.type) {
      case 'image':
        await this.loadImage(asset);
        break;

      case 'audio':
        await this.loadAudio(asset);
        break;
    }
  }

  private loadImage(asset: ImageAsset): Promise<void> {
    if (this.images.has(asset.key)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const image = new Image();

      image.src = asset.src;

      image.onload = () => {
        this.images.set(asset.key, image);

        resolve();
      };

      image.onerror = () => {
        reject(new Error(`Failed to load image: ${asset.src}`));
      };
    });
  }

  private loadAudio(asset: AudioAsset): Promise<void> {
    if (this.audio.has(asset.key)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const audio = new Audio();

      audio.src = asset.src;

      const handleLoaded = (): void => {
        cleanup();

        this.audio.set(asset.key, audio);

        resolve();
      };

      const handleError = (): void => {
        cleanup();

        reject(new Error(`Failed to load audio: ${asset.src}`));
      };

      const cleanup = (): void => {
        audio.removeEventListener('canplaythrough', handleLoaded);

        audio.removeEventListener('error', handleError);
      };

      audio.addEventListener('canplaythrough', handleLoaded);

      audio.addEventListener('error', handleError);
    });
  }
}
