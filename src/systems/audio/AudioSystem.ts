import type { Game } from '../../core/Game';
import type { AudioChannel } from '../../types/audio';

export class AudioSystem {
  private game: Game;
  private channels = new Map<AudioChannel, HTMLAudioElement | null>();

  constructor(game: Game) {
    this.game = game;
    this.channels.set('music', null);
    this.channels.set('sfx', null);
    this.channels.set('voice', null);
  }

  public play(key: string, channel: AudioChannel): void {
    const audio = this.game.assets.getAudio(key);

    this.stop(channel);
    this.applyVolume(audio, channel);
    audio.loop = channel === 'music';

    audio.play().catch(() => {
      console.warn(`Failed to play audio: ${key}`);
    });

    this.channels.set(channel, audio);
  }

  public stop(channel: AudioChannel): void {
    const current = this.channels.get(channel);

    if (!current) {
      return;
    }

    current.pause();
    current.currentTime = 0;
    this.channels.set(channel, null);
  }

  public stopAll(): void {
    this.stop('music');
    this.stop('sfx');
    this.stop('voice');
  }

  public refreshVolumes(): void {
    for (const [channel, audio] of this.channels.entries()) {
      if (!audio) {
        continue;
      }

      this.applyVolume(audio, channel);
    }
  }

  private applyVolume(audio: HTMLAudioElement, channel: AudioChannel): void {
    const settings = this.game.state.getState().audio;

    if (settings.muted) {
      audio.volume = 0;
      return;
    }

    let channelVolume = 1;

    switch (channel) {
      case 'music':
        channelVolume = settings.musicVolume;
        break;

      case 'sfx':
        channelVolume = settings.sfxVolume;
        break;

      case 'voice':
        channelVolume = settings.voiceVolume;
        break;
    }

    audio.volume = settings.masterVolume * channelVolume;
  }
}
