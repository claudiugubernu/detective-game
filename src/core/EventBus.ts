import type { GameEventMap } from '../types/events';
type EventKey = keyof GameEventMap;
type EventHandler<K extends EventKey> = (payload: GameEventMap[K]) => void;

export class EventBus {
  private listeners = new Map<EventKey, Set<EventHandler<any>>>();

  public on<K extends EventKey>(
    event: K,
    handler: EventHandler<K>
  ): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    const handlers = this.listeners.get(event);

    if (!handlers) {
      throw new Error(`Failed to register handler for event: ${event}`);
    }

    handlers.add(handler);

    return () => {
      handlers.delete(handler);
    };
  }

  public emit<K extends EventKey>(event: K, payload: GameEventMap[K]): void {
    const handlers = this.listeners.get(event);

    if (!handlers) {
      return;
    }

    for (const handler of handlers) {
      handler(payload);
    }
  }
}
