import './styles/main.css';

import { Game } from './core/Game';
import { DialogueUI } from './ui/dialogue/DialogueUI';
import { JournalUI } from './ui/journal/JournalUI';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App container not found');
}

app.innerHTML = `
  <div
    id="game"
    class="relative h-screen w-screen overflow-hidden bg-background text-text"
  >
    <div id="scene-layer" class="absolute inset-0"></div>
    <div id="ui-layer" class="pointer-events-none absolute inset-0"></div>
  </div>
`;

const game = new Game();

new DialogueUI(game);
new JournalUI(game);

game.start();

const loaded = game.saves.load();

game.state.setMode('menu');
game.state.unlockScene('menu');
game.audio.refreshVolumes();

await game.navigation.goToScene('menu');

if (!loaded) {
  console.log('Starting new game');
}

window.addEventListener('keydown', async (event) => {
  if (event.key === 'F5') {
    game.saves.save();
  }

  if (event.key === 'F9') {
    const ok = game.saves.load();

    if (ok) {
      const sceneId = game.state.getState().currentSceneId;

      if (sceneId) {
        await game.navigation.goToScene(sceneId);
      }
    }
  }

  if (event.key === 'F10') {
    game.saves.clear();
    location.reload();
  }

  if (event.key === 'm') {
    const state = game.state.getState();
    const muted = !state.audio.muted;

    game.state.setMuted(muted);
    game.audio.refreshVolumes();
    game.saves.save();

    console.log(muted ? 'Muted' : 'Unmuted');
  }
});
