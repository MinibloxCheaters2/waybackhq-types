export class EventBus {
	listeners: Map<string, Set<(event: object) => void>>;
	on(name: string, listener: (event: object) => void): () => void;
	emit<T extends object>(name: string, event?: T): T;
}
